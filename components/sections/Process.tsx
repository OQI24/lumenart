import type { ReactNode } from "react";
import { TIMELINE_STEPS } from "@/lib/constants";
import { SECTION_CHAPTERS } from "@/config/section-chapters";
import Counter from "@/components/ui/Counter";
import FadeUp from "@/components/ui/FadeUp";
import SectionFrame from "@/components/ui/SectionFrame";
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
      className={`flex h-full flex-col rounded-[1.75rem] sm:rounded-[2rem] ${
        horizontal
          ? "min-h-[340px] p-8 xl:min-h-[380px] xl:p-9"
          : "p-7 sm:p-9"
      } ${
        step.highlight
          ? "bg-gradient-gold text-background shadow-xl shadow-gold/30"
          : "bento-card hover:scale-[1.01]"
      }`}
    >
      <div className={`mb-5 flex items-center gap-3 ${horizontal ? "xl:mb-6" : ""}`}>
        <div
          className={`flex items-center justify-center rounded-2xl ${
            horizontal ? "h-14 w-14" : "h-12 w-12"
          } ${step.highlight ? "bg-background/20 text-background" : "bg-gold/10 text-gold"}`}
        >
          <StepIcon type={step.icon} size={horizontal ? 28 : 24} />
        </div>
        <span
          className={`text-sm font-medium uppercase tracking-[0.2em] xl:text-base ${
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
              ? "text-xl xl:text-2xl"
              : "text-2xl sm:text-3xl"
            : horizontal
              ? "text-lg text-foreground xl:text-xl"
              : "text-xl text-foreground sm:text-2xl"
        }`}
      >
        {step.title}
      </h3>
      <p
        className={`flex-1 leading-relaxed ${
          horizontal ? "text-base xl:text-lg" : "text-base sm:text-lg"
        } ${step.highlight ? "text-background/80" : "text-muted-foreground"}`}
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
      <ol className="space-y-7 lg:space-y-9">
        {TIMELINE_STEPS.map((step, index) => {
          const isLeft = index % 2 === 0;
          return (
            <li
              key={step.id}
              className={`relative flex items-start gap-6 md:gap-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-6 top-8 z-10 -translate-x-1/2 md:left-1/2">
                <div
                  className={`h-3.5 w-3.5 rounded-full border-2 ${
                    step.highlight
                      ? "border-gold bg-gold shadow-lg shadow-gold/50"
                      : "border-gold/60 bg-background"
                  }`}
                />
              </div>
              <div className="hidden md:block md:w-1/2" />
              <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
                <FadeUp delay={index * 0.06}>
                  <StepCard step={step} />
                </FadeUp>
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
        className="absolute left-0 right-0 top-10 h-px bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0"
        aria-hidden="true"
      />
      <ol className="grid grid-cols-5 items-stretch gap-5 xl:gap-7">
        {TIMELINE_STEPS.map((step, index) => (
          <li key={step.id} className="relative flex flex-col items-center pt-6 xl:pt-8">
            <div
              className={`relative z-10 mb-7 h-5 w-5 shrink-0 rounded-full border-2 xl:mb-9 ${
                step.highlight
                  ? "border-gold bg-gold shadow-lg shadow-gold/50"
                  : "border-gold/60 bg-background"
              }`}
            />
            <FadeUp delay={index * 0.06} className="w-full flex-1">
              <StepCard step={step} horizontal />
            </FadeUp>
          </li>
        ))}
      </ol>
    </div>
  );
}

const chapter = SECTION_CHAPTERS.process!;

export default function Process() {
  return (
    <SectionFrame>
      <SectionHeading
        title="Этапы работы"
        subtitle="От идеи до монтажа — полный цикл под ключ"
        sectionLabel={chapter.label}
        sectionShape={chapter.shape}
        align="left"
      />

      <FadeUp className="mb-12">
        <p className="text-5xl font-bold text-gold sm:text-6xl lg:text-7xl">
          <Counter to={TIMELINE_STEPS.length} suffix=" этапов" />
        </p>
      </FadeUp>

      <div className="lg:hidden">
        <ProcessVertical />
      </div>
      <ProcessHorizontal />
    </SectionFrame>
  );
}
