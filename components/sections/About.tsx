import { ABOUT_PARAGRAPHS } from "@/lib/constants";
import AboutVisual from "@/components/ui/AboutVisual";
import FadeUp from "@/components/ui/FadeUp";
import SectionBackdropText from "@/components/ui/SectionBackdropText";

export default function About() {
  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col justify-center">
      <SectionBackdropText>ART</SectionBackdropText>

      <div className="container-main relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          <div>
            <FadeUp>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                О компании
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mb-10 text-3xl font-bold leading-[1.02] text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
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
            <AboutVisual />
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
