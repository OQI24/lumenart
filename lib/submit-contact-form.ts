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

function getFormSubmitAjaxUrl(): string | undefined {
  const email = getFormEmail();
  if (!email) return undefined;

  return `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;
}

function getFormSubmitPostUrl(): string | undefined {
  const email = getFormEmail();
  if (!email) return undefined;

  return `https://formsubmit.co/${encodeURIComponent(email)}`;
}

function buildFormFields(data: ContactFormPayload): Record<string, string> {
  return {
    name: data.name,
    phone: data.phone,
    message: data.message.trim(),
    consent: data.consent ? "да" : "нет",
    discount: "5%",
    source: "landing",
    _subject: "New order LumenArt",
    _template: "table",
    _captcha: "false",
    _honey: "",
  };
}

function isMobileLikeClient(): boolean {
  if (typeof window === "undefined") return false;

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const narrowViewport = window.matchMedia("(max-width: 768px)").matches;
  return coarsePointer || narrowViewport;
}

function isFormSubmitSuccess(data: unknown): boolean {
  if (typeof data !== "object" || data === null || !("success" in data)) {
    return false;
  }

  const success = (data as { success: unknown }).success;
  if (success === true) return true;
  return typeof success === "string" && success.length > 0 && success !== "false";
}

function getFormSubmitError(data: unknown): string | null {
  if (typeof data !== "object" || data === null || !("message" in data)) {
    return null;
  }

  const message = (data as { message: unknown }).message;
  return typeof message === "string" ? message : null;
}

function activationError(): { ok: false; error: string } {
  return {
    ok: false,
    error:
      "Форма ещё не активирована. Подтвердите email от FormSubmit.co (письмо «Activate Form»).",
  };
}

function genericError(): { ok: false; error: string } {
  return {
    ok: false,
    error: "Не удалось отправить заявку. Попробуйте позже или позвоните нам.",
  };
}

async function submitViaFetch(
  data: ContactFormPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const formUrl = getFormSubmitAjaxUrl();
  if (!formUrl) {
    return { ok: false, error: "Не настроен FORM_EMAIL." };
  }

  const res = await fetch(formUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(buildFormFields(data)),
    mode: "cors",
    credentials: "omit",
  });

  const payload: unknown = await res.json().catch(() => null);
  if (!res.ok || !isFormSubmitSuccess(payload)) {
    const providerMessage = getFormSubmitError(payload);
    if (providerMessage?.toLowerCase().includes("activation")) {
      return activationError();
    }
    throw new Error("FormSubmit rejected submission");
  }

  return { ok: true };
}

function submitViaHiddenForm(
  data: ContactFormPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const formUrl = getFormSubmitPostUrl();
  if (!formUrl) {
    return Promise.resolve({ ok: false, error: "Не настроен FORM_EMAIL." });
  }

  return new Promise((resolve) => {
    const iframeName = `formsubmit_${Date.now()}`;
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    iframe.style.cssText =
      "position:fixed;width:0;height:0;border:0;opacity:0;pointer-events:none";

    const form = document.createElement("form");
    form.method = "POST";
    form.action = formUrl;
    form.target = iframeName;
    form.style.display = "none";
    form.setAttribute("accept-charset", "UTF-8");

    for (const [name, value] of Object.entries(buildFormFields(data))) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    }

    let settled = false;
    let submitted = false;

    const settle = (result: { ok: true } | { ok: false; error: string }) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      form.remove();
      iframe.remove();
      resolve(result);
    };

    const timeoutId = window.setTimeout(() => settle({ ok: true }), 10_000);

    iframe.addEventListener("load", () => {
      if (submitted) {
        settle({ ok: true });
      }
    });

    document.body.appendChild(iframe);
    document.body.appendChild(form);
    submitted = true;
    form.submit();
  });
}

export async function submitContactForm(
  data: ContactFormPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (data.honeypot?.trim()) {
    return { ok: true };
  }

  const useHiddenForm = isMobileLikeClient();

  try {
    if (useHiddenForm) {
      return await submitViaHiddenForm(data);
    }

    return await submitViaFetch(data);
  } catch (error) {
    if (error instanceof Error && error.message === "activation") {
      return activationError();
    }

    if (!useHiddenForm) {
      try {
        return await submitViaHiddenForm(data);
      } catch {
        return genericError();
      }
    }

    return genericError();
  }
}
