import type { ReactNode } from "react";
import { TECHNOLOGIES } from "@/lib/constants";
import { SECTION_CHAPTERS } from "@/config/section-chapters";
import Counter from "@/components/ui/Counter";
import FadeUp from "@/components/ui/FadeUp";
import Marquee from "@/components/ui/Marquee";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";

function TechIcon({ type }: { type: string }) {
  const icons: Record<string, ReactNode> = {
    led: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 2v3M14 19v3M2 12h3M23 12h3M5.5 5.5l2 2M20.5 20.5l2 2M5.5 18.5l2-2M20.5 7.5l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    metal: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M6 22l4-16h8l4 16H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 14h8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    smart: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 14h2M13 14h2M17 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    quality: (
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4l2.5 5 5.5.8-4 3.9.9 5.5L14 16.5 10.1 19.2l.9-5.5-4-3.9 5.5-.8L14 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  };
  return <>{icons[type] ?? icons.quality}</>;
}

const chapter = SECTION_CHAPTERS.technologies!;

export default function Technologies() {
  return (
    <SectionFrame>
      <SectionHeading
        title="Технологии, которым мы доверяем"
        sectionLabel={chapter.label}
        sectionShape={chapter.shape}
        align="left"
      />

      <FadeUp className="mb-8 flex flex-wrap items-baseline gap-3">
        <span className="display-num text-gold">
          <Counter to={TECHNOLOGIES.length} suffix="+" />
        </span>
        <span className="text-lg text-muted-foreground sm:text-xl">направления в производстве</span>
      </FadeUp>

      <FadeUp className="mb-10" delay={0.06}>
        <Marquee
          items={TECHNOLOGIES.map((t) => t.title)}
          itemClassName="text-gold/40"
          speed="slow"
        />
      </FadeUp>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-7">
        {TECHNOLOGIES.map((tech, index) => (
          <FadeUp key={tech.id} delay={0.08 + index * 0.06}>
            <article className="bento-card interactive-card group flex h-full gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors duration-500 group-hover:bg-gold/20">
                <TechIcon type={tech.icon} />
              </div>
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-gold/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 text-xl font-bold text-foreground sm:text-2xl">{tech.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{tech.description}</p>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </SectionFrame>
  );
}
