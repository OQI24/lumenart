import type { ReactNode } from "react";
import { TECHNOLOGIES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

function TechIcon({ type }: { type: string }) {
  const icons: Record<string, ReactNode> = {
    led: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 2v3M14 19v3M2 12h3M23 12h3M5.5 5.5l2 2M20.5 20.5l2 2M5.5 18.5l2-2M20.5 7.5l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    metal: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M6 22l4-16h8l4 16H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 14h8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    smart: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 14h2M13 14h2M17 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    quality: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4l2.5 5 5.5.8-4 3.9.9 5.5L14 16.5 10.1 19.2l.9-5.5-4-3.9 5.5-.8L14 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  };
  return <>{icons[type] ?? icons.quality}</>;
}

export default function Technologies() {
  return (
    <div className="container-main">
      <SectionHeading title="Технологии, которым мы доверяем" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
        {TECHNOLOGIES.map((tech) => (
          <article key={tech.id} className="bento-card group flex gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
              <TechIcon type={tech.icon} />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{tech.title}</h3>
              <p className="text-sm leading-relaxed text-muted sm:text-base">{tech.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
