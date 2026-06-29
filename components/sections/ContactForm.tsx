"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import SocialLinks from "@/components/ui/SocialLinks";
import { SITE } from "@/lib/constants";
import { formatPhoneInput, validatePhone, PHONE_PLACEHOLDER } from "@/lib/validation";

interface FormData {
  name: string;
  phone: string;
  message?: string;
  consent: boolean;
}

export default function ContactForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const year = new Date().getFullYear();

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
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
    if (!webhookUrl) {
      setSubmitError("Webhook URL не настроен. Обратитесь к администратору сайта.");
      return;
    }

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          message: data.message || "",
          consent: data.consent,
          discount: "5%",
          source: "landing",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      reset();
      setIsModalOpen(true);
    } catch {
      setSubmitError("Не удалось отправить заявку. Попробуйте позже или позвоните нам.");
    }
  };

  return (
    <>
      <div className="container-main">
        <div className="relative mx-auto max-w-2xl">
          <div
            className="absolute -right-2 -top-4 z-20 sm:-right-4 sm:-top-6"
            aria-label="Скидка 5% на первый заказ"
          >
            <div className="animate-pulse-gold flex h-20 w-20 rotate-45 items-center justify-center rounded-lg bg-gradient-gold shadow-lg sm:h-24 sm:w-24">
              <span className="-rotate-45 text-center text-[10px] font-bold leading-tight text-background sm:text-xs">
                -5%
                <br />
                на первый
                <br />
                заказ
              </span>
            </div>
          </div>

          <div className="form-card relative overflow-hidden rounded-2xl bg-background-card p-6 sm:p-10">
            <h2 className="mb-2 pr-16 text-2xl font-bold text-foreground sm:text-3xl">
              Получите расчёт за 1 день и сэкономьте 5%
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted sm:text-base">
              Заполните форму — мы подготовим смету с учётом всех ваших пожеланий. При
              старте проекта скидка 5% автоматически заморозится.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Имя <span className="text-gold">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Как к вам обращаться?"
                  className="form-input"
                  {...register("name", { required: "Введите ваше имя" })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                  Телефон <span className="text-gold">*</span>
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
                      id="phone"
                      type="tel"
                      placeholder={PHONE_PLACEHOLDER}
                      className="form-input"
                      value={field.value}
                      onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                  Кратко опишите задачу
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Тип помещения, пожелания по стилю..."
                  className="form-input resize-none"
                  {...register("message")}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gold/40 bg-background accent-gold"
                  {...register("consent", {
                    required: "Необходимо согласие на обработку данных",
                  })}
                />
                <label htmlFor="consent" className="text-xs leading-relaxed text-muted sm:text-sm">
                  Согласен на{" "}
                  <Link href="/privacy" className="text-gold underline hover:text-gold-light">
                    обработку персональных данных
                  </Link>{" "}
                  <span className="text-gold">*</span>
                </label>
              </div>
              {errors.consent && (
                <p className="text-xs text-red-400">{errors.consent.message}</p>
              )}

              {submitError && (
                <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-gradient-gold py-4 text-base font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Отправляем..." : "Рассчитать стоимость со скидкой"}
              </button>
            </form>
          </div>
        </div>

        {/* Contacts block */}
        <div className="mx-auto mt-12 max-w-2xl border-t border-white/5 pt-10">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="mb-3 text-lg font-bold text-gold">LumenArt</p>
              <div className="space-y-1 text-sm text-muted">
                <p>
                  <a href={`tel:${SITE.phoneRaw}`} className="transition-colors hover:text-foreground">
                    {SITE.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-foreground">
                    {SITE.email}
                  </a>
                </p>
              </div>
            </div>
            <SocialLinks />
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 text-xs text-muted sm:flex-row sm:justify-between">
            <p>© {year} LumenArt. Все права защищены.</p>
            <Link href="/privacy" className="transition-colors hover:text-gold">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Заявка отправлена!"
      >
        Спасибо! Мы свяжемся с вами в течение 30 минут и применим скидку 5% к вашему
        проекту.
      </Modal>
    </>
  );
}
