import Image from "next/image";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { SECTION_CHAPTERS } from "@/config/section-chapters";
import { BLUR_DATA_URL } from "@/lib/blur-data";
import Counter from "@/components/ui/Counter";
import FadeUp from "@/components/ui/FadeUp";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";

const GRID_CLASSES: Record<string, string> = {
  large: "md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-[420px]",
  small: "min-h-[220px]",
  medium: "md:col-span-2 min-h-[240px]",
};

const chapter = SECTION_CHAPTERS.portfolio!;

export default function Portfolio() {
  return (
    <SectionFrame>
      <SectionHeading
        title="Портфолио"
        subtitle="Реализованные сценарии освещения для разных типов пространств"
        sectionLabel={chapter.label}
        sectionShape={chapter.shape}
        align="left"
      />

      <FadeUp className="mb-10 flex flex-wrap items-baseline gap-3">
        <span className="display-num text-gold">
          <Counter to={PORTFOLIO_ITEMS.length} suffix="+" />
        </span>
        <span className="text-lg text-muted-foreground sm:text-xl">направлений</span>
      </FadeUp>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-3 md:gap-6 lg:gap-7">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <FadeUp key={item.id} delay={index * 0.06} className={GRID_CLASSES[item.size]}>
            <article className="portfolio-card group relative h-full min-h-[inherit] overflow-hidden rounded-[2rem] border border-white/5">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-background/10" />

              <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-8 lg:p-9">
                <span className="pill-tag w-fit border-gold/25 bg-background/60 text-gold backdrop-blur-sm">
                  {item.category}
                </span>

                <div>
                  <h3 className="text-2xl font-bold text-foreground transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-3xl lg:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">{item.subtitle}</p>
                </div>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </SectionFrame>
  );
}
