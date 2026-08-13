"use client";

import { useRef, useState, type MouseEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import MagneticButton from "@/components/originkit/ui/magnetic-hover-button";
import { submitContactForm } from "@/lib/submit-contact-form";
import { formatPhoneInput, validatePhone, PHONE_PLACEHOLDER } from "@/lib/validation";
import { LANDING_COPY } from "@/lib/landings/copy";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  phone: string;
  message?: string;
  consent: boolean;
}

interface LandingFormProps {
  className?: string;
  submitLabel?: string;
  /** URL политики (trailing slash). По умолчанию общий /privacy/. */
  privacyHref?: string;
  /** OriginKit fill wipe, no magnetic pull (diary). */
  submitVariant?: "default" | "fill";
}

/**
 * Форма заявки для /styleN.
 * Логика FormSubmit скопирована по паттерну ContactForm, без импорта из sections.
 */
export default function LandingForm({
  className,
  submitLabel = LANDING_COPY.contacts.formCta,
  privacyHref = "/privacy/",
  submitVariant = "default",
}: LandingFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { name: "", phone: "+7 ", message: "", consent: false },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);

    const result = await submitContactForm({
      name: data.name,
      phone: data.phone,
      message: data.message ?? "",
      consent: data.consent,
      honeypot,
    });

    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }

    reset();
    setIsSuccess(true);
  };

  const onFillClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    formRef.current?.requestSubmit();
  };

  if (isSuccess) {
    return (
      <div
        className={cn(
          "rounded-sm border border-[var(--landing-border)] bg-[var(--landing-surface)] p-6",
          className,
        )}
        role="status"
      >
        <p className="font-[family-name:var(--landing-font-display)] text-xl text-[var(--landing-fg)]">
          {LANDING_COPY.contacts.successTitle}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--landing-muted)]">
          {LANDING_COPY.contacts.successText}
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-5 text-sm text-[var(--landing-accent)] underline-offset-4 hover:underline"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full border border-[var(--landing-border)] bg-[var(--landing-bg)] px-4 py-3 text-base text-[var(--landing-fg)] outline-none transition-colors placeholder:text-[var(--landing-muted)] focus:border-[var(--landing-accent)]";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("space-y-5", className)}
    >
      <input
        type="text"
        name="_honey"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-label="Не заполнять"
        className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0"
      />

      <div className="space-y-2">
        <label htmlFor="landing-name" className="block text-sm text-[var(--landing-fg)]">
          {"Имя "}
          <span className="text-[var(--landing-accent)]">{"*"}</span>
        </label>
        <input
          id="landing-name"
          type="text"
          placeholder="Как к вам обращаться?"
          aria-invalid={!!errors.name}
          className={fieldClass}
          {...register("name", { required: "Введите ваше имя" })}
        />
        {errors.name && (
          <p className="text-xs text-red-700">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="landing-phone" className="block text-sm text-[var(--landing-fg)]">
          {"Телефон "}
          <span className="text-[var(--landing-accent)]">{"*"}</span>
        </label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Введите номер телефона",
            validate: (v) => validatePhone(v) || "Формат: +7 (XXX) XXX-XX-XX",
          }}
          render={({ field }) => (
            <input
              id="landing-phone"
              type="tel"
              placeholder={PHONE_PLACEHOLDER}
              aria-invalid={!!errors.phone}
              className={fieldClass}
              value={field.value}
              onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
              onBlur={field.onBlur}
            />
          )}
        />
        {errors.phone && (
          <p className="text-xs text-red-700">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="landing-message" className="block text-sm text-[var(--landing-fg)]">
          {"Кратко опишите задачу"}
        </label>
        <textarea
          id="landing-message"
          rows={3}
          placeholder="Тип помещения, пожелания по стилю..."
          className={cn(fieldClass, "min-h-24 resize-none")}
          {...register("message")}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Controller
            name="consent"
            control={control}
            rules={{ required: "Необходимо согласие на обработку данных" }}
            render={({ field }) => (
              <input
                id="landing-consent"
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                aria-invalid={!!errors.consent}
                className="mt-1 size-4 accent-[var(--landing-accent)]"
              />
            )}
          />
          <label
            htmlFor="landing-consent"
            className="text-xs leading-relaxed text-[var(--landing-muted)] sm:text-sm"
          >
            {"Согласен на "}
            <Link
              href={privacyHref}
              className="text-[var(--landing-accent)] underline underline-offset-2"
            >
              {"обработку персональных данных"}
            </Link>{" "}
            <span className="text-[var(--landing-accent)]">{"*"}</span>
          </label>
        </div>
        {errors.consent && (
          <p className="text-xs text-red-700">{errors.consent.message}</p>
        )}
      </div>

      {submitError && (
        <p className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {submitError}
        </p>
      )}

      {submitVariant === "fill" ? (
        <div
          className={cn(
            "s12-form-fill",
            isSubmitting && "pointer-events-none opacity-60",
          )}
          onClick={onFillClick}
        >
          <MagneticButton
            label={isSubmitting ? "Отправляем..." : submitLabel}
            link="#submit"
            magnet={0}
            fill="#f6efdf"
            textColor="#1d2b39"
            sweepColor="#9a6846"
            sweepTextColor="#fffaf2"
            radius={4}
            paddingX={36}
            paddingY={18}
            border
            borderOptions={{ color: "#1d2b39", width: 2 }}
            font={{
              fontFamily: "var(--landing-font-hand, cursive)",
              fontWeight: 500,
              fontSize: 22,
              letterSpacing: "0.01em",
              lineHeight: "1.1em",
            }}
            style={{ width: "100%", justifyContent: "center" }}
          />
        </div>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 w-full items-center justify-center bg-[var(--landing-accent)] px-6 text-sm font-medium tracking-wide text-[var(--landing-accent-fg,#fff)] transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? "Отправляем..." : submitLabel}
        </button>
      )}
    </form>
  );
}
