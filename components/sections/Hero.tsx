import CtaButton from "@/components/ui/CtaButton";
import FadeUp from "@/components/ui/FadeUp";
import HeroFixture from "@/components/ui/HeroFixture";
import HeroRotatingText from "@/components/ui/HeroRotatingText";
import Marquee from "@/components/ui/Marquee";
import SectionBackdropText from "@/components/ui/SectionBackdropText";

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
              <h1 className="mb-5 max-w-xl text-[2rem] font-bold leading-[1.02] text-foreground sm:mb-7 sm:text-5xl lg:text-6xl xl:text-7xl">
                Индивидуальный
                <br />
                свет.{" "}
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
          <FadeUp delay={0.2}>
            <HeroFixture />
          </FadeUp>
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
