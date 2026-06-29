import type { ReactNode } from "react";
import { TIMELINE_STEPS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

type Step = (typeof TIMELINE_STEPS)[number];

function StepIcon({ type, size = 24 }: { type: string; size?: number }) {
  const icons: Record<string, ReactNode> = {
    idea: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C8.5 2 6 4.5 6 8c0 2 .8 3.8 2 5.2V16h8v-2.8c1.2-1.4 2-3.2 2-5.2 0-3.5-2.5-6-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 18h6M10 21h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    model: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 12l9-5M12 12v10M12 12L3 7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    factory: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2 20h20M4 20V10l4-2v12M10 20V6l4-2v16M16 20V8l4-2v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    delivery: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1" y="6" width="15" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 10h4l3 4v2h-7V10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    install: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  };
  return <>{icons[type] ?? icons.idea}</>;
}

function StepCard({
  step,
  horizontal = false,
}: {
  step: Step;
  horizontal?: boolean;
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-3xl ${
        horizontal
          ? "min-h-[320px] p-7 xl:min-h-[365px] xl:p-8 2xl:min-h-[390px] 2xl:p-9"
          : "p-6 sm:p-8"
      } ${
        step.highlight
          ? "bg-gradient-gold text-background shadow-xl shadow-gold/30"
          : "bento-card"
      }`}
    >
      <div className={`mb-4 flex items-center gap-3 ${horizontal ? "xl:mb-5" : ""}`}>
        <div
          className={`flex items-center justify-center rounded-xl ${
            horizontal ? "h-12 w-12 xl:h-14 xl:w-14" : "h-10 w-10"
          } ${step.highlight ? "bg-background/20 text-background" : "bg-gold/10 text-gold"}`}
        >
          <StepIcon type={step.icon} size={horizontal ? 28 : 24} />
        </div>
        <span
          className={`text-sm font-medium uppercase tracking-wider xl:text-base ${
            step.highlight ? "text-background/70" : "text-gold"
          }`}
        >
          Шаг {step.id}
        </span>
      </div>
      <h3
        className={`mb-3 font-bold ${
          step.highlight
            ? horizontal
              ? "text-lg xl:text-xl 2xl:text-2xl"
              : "text-2xl sm:text-3xl"
            : horizontal
              ? "text-base text-foreground xl:text-lg 2xl:text-xl"
              : "text-xl text-foreground"
        }`}
      >
        {step.title}
      </h3>
      <p
        className={`flex-1 leading-relaxed ${
          horizontal ? "text-sm xl:text-base 2xl:text-lg" : "text-base"
        } ${step.highlight ? "text-background/80" : "text-muted"}`}
      >
        {step.description}
      </p>
    </article>
  );
}

function ProcessVertical() {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div
        className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-gold/0 via-gold/40 to-gold/0 md:left-1/2 md:-translate-x-px"
        aria-hidden="true"
      />
      <ol className="space-y-6 lg:space-y-8">
        {TIMELINE_STEPS.map((step, index) => {
          const isLeft = index % 2 === 0;
          return (
            <li
              key={step.id}
              className={`relative flex items-start gap-6 md:gap-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-6 top-6 z-10 -translate-x-1/2 md:left-1/2">
                <div
                  className={`h-3 w-3 rounded-full border-2 ${
                    step.highlight
                      ? "border-gold bg-gold shadow-lg shadow-gold/50"
                      : "border-gold/60 bg-background"
                  }`}
                />
              </div>
              <div className="hidden md:block md:w-1/2" />
              <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
                <StepCard step={step} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ProcessHorizontal() {
  return (
    <div className="relative hidden lg:block">
      <div
        className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 xl:top-9"
        aria-hidden="true"
      />
      <ol className="grid grid-cols-5 items-stretch gap-4 xl:gap-7 2xl:gap-8">
        {TIMELINE_STEPS.map((step) => (
          <li key={step.id} className="relative flex flex-col items-center pt-5 xl:pt-6">
            <div
              className={`relative z-10 mb-6 h-5 w-5 shrink-0 rounded-full border-2 xl:mb-8 xl:h-5 xl:w-5 ${
                step.highlight
                  ? "border-gold bg-gold shadow-lg shadow-gold/50"
                  : "border-gold/60 bg-background"
              }`}
            />
            <div className="w-full flex-1">
              <StepCard step={step} horizontal />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Process() {
  return (
    <div className="container-main">
      <SectionHeading
        title="Этапы работы"
        subtitle="От идеи до монтажа — полный цикл под ключ"
      />
      <div className="lg:hidden">
        <ProcessVertical />
      </div>
      <ProcessHorizontal />
    </div>
  );
}
