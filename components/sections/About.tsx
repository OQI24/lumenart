import { ABOUT_PARAGRAPHS } from "@/lib/constants";
import FadeUp from "@/components/ui/FadeUp";

export default function About() {
  return (
    <div className="container-main relative">
      <p
        className="pointer-events-none absolute -right-4 top-0 select-none text-[clamp(4rem,18vw,12rem)] font-bold leading-none text-foreground/[0.03] lg:-right-8"
        aria-hidden="true"
      >
        ART
      </p>

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
        <div>
          <FadeUp>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-gold">
              О компании
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="mb-10 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
              Мы — <span className="text-gold">LumenArt</span>
            </h2>
          </FadeUp>
          <div className="space-y-6">
            {ABOUT_PARAGRAPHS.map((paragraph, index) => (
              <FadeUp key={index} delay={0.12 + index * 0.08}>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl lg:leading-relaxed">
                  {paragraph}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>

        <FadeUp delay={0.2}>
          <div className="cloud-card dashed-placeholder relative flex aspect-[4/5] items-center justify-center overflow-hidden sm:aspect-square lg:aspect-[4/5]">
            <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#222222" />
                  <stop offset="100%" stopColor="#C6A15B" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#aboutGrad)" />
              {[...Array(5)].map((_, i) => (
                <line
                  key={i}
                  x1={40 + i * 80}
                  y1="60"
                  x2={40 + i * 80}
                  y2="240"
                  stroke="#C6A15B"
                  strokeWidth="0.5"
                  opacity="0.25"
                />
              ))}
              <circle cx="200" cy="150" r="70" fill="none" stroke="#C6A15B" strokeWidth="1" opacity="0.45" />
            </svg>
            <span className="relative z-10 text-xs font-medium uppercase tracking-[0.25em] text-gold/70 sm:text-sm">
              Индивидуальный подход
            </span>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
