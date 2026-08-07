"use client";

import FadeUp from "@/components/ui/FadeUp";
import HeroFixture from "@/components/ui/HeroFixture";
import HeroRotatingText from "@/components/ui/HeroRotatingText";
import KpiStat from "@/components/ui/KpiStat";
import Marquee from "@/components/ui/Marquee";
import SectionBackdropText from "@/components/ui/SectionBackdropText";
import SpotlightGrid from "@/components/ui/SpotlightGrid";
import HashScrollCapture from "@/components/motion/HashScrollCapture";
import MagneticButton from "@/components/originkit/ui/magnetic-hover-button";
import StaggeredLetters from "@/components/originkit/ui/stagger-text-rise";
import { HERO_KPIS } from "@/lib/constants";

const FONT = {
  fontFamily: "Magistral, var(--font-exo), system-ui, sans-serif",
} as const;

export default function Hero() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <SpotlightGrid className="opacity-[0.55] dark:opacity-[0.65]" />
      <SectionBackdropText>{"СВЕТ"}</SectionBackdropText>

      <div className="container-main relative z-10 flex min-h-0 flex-1 flex-col justify-center">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div>
            <FadeUp>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-gold sm:mb-6 sm:text-sm">
                {"LumenArt · дизайнерский свет"}
              </p>
            </FadeUp>

            <div className="mb-5 max-w-xl sm:mb-7">
              <StaggeredLetters
                text={"Индивидуальный свет."}
                tag="h1"
                color="var(--foreground)"
                y={36}
                startOpacity={0}
                staggerMs={28}
                transition={{ type: "spring", stiffness: 180, damping: 18, mass: 1 }}
                font={{
                  ...FONT,
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 5vw, 4.5rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em",
                  textAlign: "left",
                }}
              />
              <p className="mt-1 text-[2rem] font-bold leading-[1.02] text-gold sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="hero-tagline-emphasis">{"Без"}</span>{" "}
                <span className="font-bold">{"компромиссов."}</span>
              </p>
            </div>

            <FadeUp delay={0.16}>
              <p className="mb-3 text-lg font-medium text-foreground sm:text-xl lg:text-2xl">
                <HeroRotatingText />
              </p>
            </FadeUp>
            <FadeUp delay={0.22}>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg lg:text-xl">
                {"Проектируем, делаем и ставим дизайнерский свет любой сложности. В среднем за 14 дней."}
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <HashScrollCapture>
                <MagneticButton
                  label={"Получить расчёт со скидкой 5%"}
                  link="#contacts"
                  fill="transparent"
                  textColor="#c6a15b"
                  sweepColor="#c6a15b"
                  sweepTextColor="#0a0a0a"
                  radius={16}
                  magnet={12}
                  paddingX={40}
                  paddingY={22}
                  border
                  borderOptions={{ color: "#c6a15b", width: 1 }}
                  font={{
                    ...FONT,
                    fontWeight: 600,
                    fontSize: 17,
                    letterSpacing: "0.01em",
                  }}
                />
              </HashScrollCapture>
            </FadeUp>
            <FadeUp delay={0.36}>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border/60 pt-8 sm:gap-6 lg:mt-10 lg:pt-10 xl:hidden">
                {HERO_KPIS.map((kpi) => (
                  <KpiStat key={kpi.label} value={kpi.value} label={kpi.label} />
                ))}
              </div>
            </FadeUp>
          </div>

          <div className="flex flex-col gap-8 lg:gap-10">
            <FadeUp delay={0.2}>
              <HeroFixture />
            </FadeUp>
            <FadeUp delay={0.38} className="hidden xl:block">
              <div className="grid grid-cols-3 gap-6 border-t border-border/60 pt-8">
                {HERO_KPIS.map((kpi) => (
                  <KpiStat key={kpi.label} value={kpi.value} label={kpi.label} />
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      <FadeUp delay={0.4} className="mt-10 sm:mt-14">
        <Marquee
          items={["LED", "Латунь", "Алюминий", "DALI", "KNX", "Zigbee", "14 дней"]}
          itemClassName="text-gold/50"
          speed="slow"
        />
      </FadeUp>
    </div>
  );
}
