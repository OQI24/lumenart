import CtaButton from "@/components/ui/CtaButton";
import FadeUp from "@/components/ui/FadeUp";
import HeroRotatingText from "@/components/ui/HeroRotatingText";
import Marquee from "@/components/ui/Marquee";
import SectionBackdropText from "@/components/ui/SectionBackdropText";

function HeroVisual() {
  return (
    <FadeUp delay={0.2} className="relative w-full">
      <div className="cloud-card dashed-placeholder relative flex aspect-[4/5] max-h-[28rem] w-full items-center justify-center overflow-hidden sm:aspect-square lg:max-h-none lg:aspect-[4/5]">
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="heroGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#C6A15B" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="160" r="140" fill="url(#heroGlow)" />
          <path
            d="M200 60 L225 200 L200 340 L175 200 Z"
            fill="none"
            stroke="#C6A15B"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <circle cx="200" cy="160" r="48" fill="none" stroke="#C6A15B" strokeWidth="1" opacity="0.7" />
          <circle cx="200" cy="160" r="10" fill="#C6A15B" opacity="0.95" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x2 = 200 + 90 * Math.cos(rad);
            const y2 = 160 + 90 * Math.sin(rad);
            const x3 = 200 + 105 * Math.cos(rad);
            const y3 = 160 + 105 * Math.sin(rad);
            return (
              <g key={angle}>
                <line x1={200 + 55 * Math.cos(rad)} y1={160 + 55 * Math.sin(rad)} x2={x2} y2={y2} stroke="#C6A15B" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
                <line x1={x3} y1={y3} x2={200 + 118 * Math.cos(rad)} y2={160 + 118 * Math.sin(rad)} stroke="#C6A15B" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
              </g>
            );
          })}
        </svg>
        <span className="relative z-10 text-xs font-medium uppercase tracking-[0.25em] text-gold/80 sm:text-sm">
          Ваш арт-объект
        </span>
      </div>
    </FadeUp>
  );
}

export default function Hero() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <SectionBackdropText>СВЕТ</SectionBackdropText>

      <div className="container-main relative z-10 flex min-h-0 flex-1 flex-col justify-center">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div>
            <FadeUp>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-gold sm:mb-6 sm:text-sm">
                LumenArt — дизайнерский свет
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="mb-5 max-w-xl text-[2rem] font-bold leading-[1.05] text-foreground sm:mb-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                Индивидуальный свет.{" "}
                <span className="text-gold">Без компромиссов.</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mb-3 text-lg font-medium text-foreground sm:text-xl lg:text-2xl">
                <HeroRotatingText />
              </p>
            </FadeUp>
            <FadeUp delay={0.22}>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg lg:text-xl">
                Разработка, изготовление и монтаж дизайнерского освещения любой
                сложности. Быстро, качественно, в срок.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <CtaButton href="#contacts" className="h-14 rounded-2xl px-8 text-base sm:h-16 sm:px-10 sm:text-lg">
                Получить расчёт со скидкой 5%
              </CtaButton>
            </FadeUp>
          </div>
          <HeroVisual />
        </div>
      </div>

      <FadeUp delay={0.4} className="mt-10 sm:mt-14">
        <Marquee
          items={["LED", "Латунь", "Алюминий", "Умный свет", "DALI", "Монтаж под ключ", "14 дней"]}
          itemClassName="text-gold/50"
          speed="slow"
        />
      </FadeUp>
    </div>
  );
}
