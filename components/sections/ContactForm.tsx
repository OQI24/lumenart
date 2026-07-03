"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SocialLinks from "@/components/ui/SocialLinks";
import SectionBackdropText from "@/components/ui/SectionBackdropText";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionLabel from "@/components/ui/SectionLabel";
import { SECTION_CHAPTERS } from "@/config/section-chapters";
import { SITE } from "@/lib/constants";
import { submitContactForm } from "@/lib/submit-contact-form";
import { formatPhoneInput, validatePhone, PHONE_PLACEHOLDER } from "@/lib/validation";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  phone: string;
  message?: string;
  consent: boolean;
}

const fieldInputClass =
  "h-11 border-border bg-background px-4 text-sm sm:text-base focus-visible:border-gold/50 focus-visible:ring-gold/30";

export default function ContactForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const year = new Date().getFullYear();
  const chapter = SECTION_CHAPTERS.contacts!;

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
    setIsDialogOpen(true);
  };

  return (
    <>
      <SectionFrame>
        <SectionLabel label={chapter.label} shape={chapter.shape} />

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

          <div className="form-card relative overflow-hidden rounded-[2rem] bg-background-card p-7 sm:p-10 lg:p-12">
            <h2 className="mb-3 pr-16 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Получите расчёт за 1 день и сэкономьте 5%
            </h2>
            <p className="mb-10 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Заполните форму — мы подготовим смету с учётом всех ваших пожеланий. При
              старте проекта скидка 5% автоматически заморозится.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <input
                type="text"
                name="_honey"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="space-y-2">
                <Label htmlFor="name">
                  Имя <span className="text-gold">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Как к вам обращаться?"
                  aria-invalid={!!errors.name}
                  className={fieldInputClass}
                  {...register("name", { required: "Введите ваше имя" })}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Телефон <span className="text-gold">*</span>
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Введите номер телефона",
                    validate: (v) => validatePhone(v) || "Формат: +7 (XXX) XXX-XX-XX",
                  }}
                  render={({ field }) => (
                    <Input
                      id="phone"
                      type="tel"
                      placeholder={PHONE_PLACEHOLDER}
                      aria-invalid={!!errors.phone}
                      className={fieldInputClass}
                      value={field.value}
                      onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Кратко опишите задачу</Label>
                <Textarea
                  id="message"
                  rows={3}
                  placeholder="Тип помещения, пожелания по стилю..."
                  className={cn(fieldInputClass, "min-h-24 resize-none py-3")}
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
                      <Checkbox
                        id="consent"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                        onBlur={field.onBlur}
                        aria-invalid={!!errors.consent}
                        className="mt-0.5 border-gold/40 data-checked:border-primary data-checked:bg-primary"
                      />
                    )}
                  />
                  <Label
                    htmlFor="consent"
                    className="text-xs font-normal leading-relaxed text-muted-foreground sm:text-sm"
                  >
                    Согласен на{" "}
                    <Link href="/privacy" className="text-gold underline hover:text-gold-light">
                      обработку персональных данных
                    </Link>{" "}
                    <span className="text-gold">*</span>
                  </Label>
                </div>
                {errors.consent && (
                  <p className="text-xs text-destructive">{errors.consent.message}</p>
                )}
              </div>

              {submitError && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                variant="gold"
                size="cta"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Отправляем..." : "Рассчитать стоимость со скидкой"}
              </Button>
            </form>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-2xl border-t border-border pt-12">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="mb-3 text-lg font-bold text-gold">LumenArt</p>
              <div className="space-y-1 text-sm text-muted-foreground">
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
          <div className="mt-8 flex flex-col items-center gap-3 text-xs text-muted-foreground sm:flex-row sm:justify-between">
            <p>© {year} LumenArt. Все права защищены.</p>
            <Link href="/privacy" className="transition-colors hover:text-gold">
              Политика конфиденциальности
            </Link>
          </div>
        </div>

        <SectionBackdropText align="bottom">LUMENART</SectionBackdropText>
      </SectionFrame>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-gold/30 bg-background-card text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Заявка отправлена!</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Спасибо! Мы свяжемся с вами в течение 30 минут и применим скидку 5% к вашему
              проекту.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-0 bg-transparent p-0 sm:justify-stretch">
            <Button
              variant="gold"
              size="cta"
              className="w-full"
              onClick={() => setIsDialogOpen(false)}
            >
              Отлично
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
