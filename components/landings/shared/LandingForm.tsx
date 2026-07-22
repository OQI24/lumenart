"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
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
}

/**
 * Форма заявки для /styleN.
 * Логика FormSubmit скопирована по паттерну ContactForm, без импорта из sections.
 */
export default function LandingForm({
  className,
  submitLabel = LANDING_COPY.contacts.formCta,
  privacyHref = "/privacy/",
}: LandingFormProps) {
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
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0"
      />

      <div className="space-y-2">
        <label htmlFor="landing-name" className="block text-sm text-[var(--landing-fg)]">
          Имя <span className="text-[var(--landing-accent)]">*</span>
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
          Телефон <span className="text-[var(--landing-accent)]">*</span>
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
          Кратко опишите задачу
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
            Согласен на{" "}
            <Link
              href={privacyHref}
              className="text-[var(--landing-accent)] underline underline-offset-2"
            >
              обработку персональных данных
            </Link>{" "}
            <span className="text-[var(--landing-accent)]">*</span>
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-14 w-full items-center justify-center bg-[var(--landing-accent)] px-6 text-sm font-medium tracking-wide text-[var(--landing-accent-fg,#fff)] transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "Отправляем..." : submitLabel}
      </button>
    </form>
  );
}
