import { ABOUT_PARAGRAPHS } from "@/lib/constants";

export default function About() {
  return (
    <div className="container-main">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="mb-8 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Мы — <span className="text-gold">LumenArt</span>
          </h2>
          <div className="space-y-5 text-sm leading-relaxed text-muted sm:text-base">
            {ABOUT_PARAGRAPHS.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="dashed-placeholder relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl lg:aspect-square">
          <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#222222" />
                <stop offset="100%" stopColor="#C6A15B" stopOpacity="0.25" />
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
                opacity="0.2"
              />
            ))}
            <circle cx="200" cy="150" r="60" fill="none" stroke="#C6A15B" strokeWidth="1" opacity="0.4" />
          </svg>
          <span className="relative z-10 text-xs font-medium uppercase tracking-widest text-gold/60">
            Индивидуальный подход
          </span>
        </div>
      </div>
    </div>
  );
}
