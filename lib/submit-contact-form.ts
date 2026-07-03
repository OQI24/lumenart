export interface ContactFormPayload {
  name: string;
  phone: string;
  message: string;
  consent: boolean;
  honeypot?: string;
}

function getFormEmail(): string | undefined {
  return process.env.FORM_EMAIL?.trim() || undefined;
}

function getFormSubmitUrl(): string | undefined {
  const email = getFormEmail();
  if (!email) return undefined;

  return `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;
}

async function postJson(url: string, body: Record<string, unknown>): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
}

function isFormSubmitSuccess(data: unknown): boolean {
  if (typeof data !== "object" || data === null || !("success" in data)) {
    return false;
  }

  const success = (data as { success: unknown }).success;
  return typeof success === "string" && success.length > 0 && success !== "false";
}

function getFormSubmitError(data: unknown): string | null {
  if (typeof data !== "object" || data === null || !("message" in data)) {
    return null;
  }

  const message = (data as { message: unknown }).message;
  return typeof message === "string" ? message : null;
}

export async function submitContactForm(
  data: ContactFormPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const formUrl = getFormSubmitUrl();
  if (!formUrl) {
    return { ok: false, error: "Не настроен FORM_EMAIL." };
  }

  if (data.honeypot?.trim()) {
    return { ok: true };
  }

  const subject = "New order LumenArt";
  const message = data.message.trim();

  try {
    const res = await postJson(formUrl, {
      name: data.name,
      phone: data.phone,
      message,
      consent: data.consent ? "да" : "нет",
      discount: "5%",
      source: "landing",
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _honey: "",
    });

    const payload: unknown = await res.json().catch(() => null);
    if (!res.ok || !isFormSubmitSuccess(payload)) {
      const providerMessage = getFormSubmitError(payload);
      if (providerMessage?.toLowerCase().includes("activation")) {
        throw new Error("activation");
      }
      throw new Error("FormSubmit rejected submission");
    }

    return { ok: true };
  } catch (error) {
    if (error instanceof Error && error.message === "activation") {
      return {
        ok: false,
        error:
          "Форма ещё не активирована. Подтвердите email от FormSubmit.co (письмо «Activate Form»).",
      };
    }

    return {
      ok: false,
      error: "Не удалось отправить заявку. Попробуйте позже или позвоните нам.",
    };
  }
}
