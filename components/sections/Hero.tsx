import Button from "@/components/ui/Button";

function HeroVisual() {
  return (
    <div className="dashed-placeholder relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl lg:aspect-square">
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#C6A15B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
          </radialGradient>
          <filter id="heroBlur">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <circle cx="200" cy="160" r="120" fill="url(#heroGlow)" filter="url(#heroBlur)" />
        <path
          d="M200 80 L220 200 L200 320 L180 200 Z"
          fill="none"
          stroke="#C6A15B"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle cx="200" cy="160" r="40" fill="none" stroke="#C6A15B" strokeWidth="1" opacity="0.8" />
        <circle cx="200" cy="160" r="8" fill="#C6A15B" opacity="0.9" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="200"
            y1="160"
            x2={200 + 80 * Math.cos((angle * Math.PI) / 180)}
            y2={160 + 80 * Math.sin((angle * Math.PI) / 180)}
            stroke="#C6A15B"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
      </svg>
      <span className="relative z-10 text-sm font-medium uppercase tracking-widest text-gold/80">
        Ваш арт-объект
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-main">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-in-up">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              LumenArt — дизайнерский свет
            </p>
            <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
              Индивидуальный свет.{" "}
              <span className="text-gold">Без компромиссов.</span>
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Разработка, изготовление и монтаж дизайнерского освещения любой
              сложности. Быстро, качественно, в срок.
            </p>
            <Button href="#contacts">Получить расчёт со скидкой 5%</Button>
          </div>
          <HeroVisual />
        </div>
      </div>
    </div>
  );
}
