import Image from "next/image";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { SECTION_CHAPTERS } from "@/config/section-chapters";
import { BLUR_DATA_URL } from "@/lib/blur-data";
import Counter from "@/components/ui/Counter";
import FadeUp from "@/components/ui/FadeUp";
import Marquee from "@/components/ui/Marquee";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";

function ComingSoonIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

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
        subtitle="Примеры реализованных проектов — скоро здесь появятся фотографии"
        sectionLabel={chapter.label}
        sectionShape={chapter.shape}
        align="left"
      />

      <FadeUp className="mb-10 flex flex-wrap items-baseline gap-3">
        <span className="display-num text-gold">
          <Counter to={PORTFOLIO_ITEMS.length} suffix="+" />
        </span>
        <span className="text-lg text-muted-foreground sm:text-xl">проектов в работе</span>
      </FadeUp>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 md:gap-6 lg:gap-7">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <FadeUp key={item.id} delay={index * 0.06} className={GRID_CLASSES[item.size]}>
            <article
              className="cloud-card group relative h-full min-h-[inherit] overflow-hidden border border-dashed border-gold/25 bg-gradient-card"
            >
              <Image
                src="/portfolio-placeholder.svg"
                alt={`${item.title} — фото скоро будет загружено`}
                fill
                className="object-cover opacity-25 transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 overflow-hidden bg-gold/90 py-2">
                <Marquee
                  items={[item.title, item.title, "Скоро"]}
                  itemClassName="text-background/90 text-xs"
                  speed="fast"
                />
              </div>
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold transition-transform duration-500 group-hover:scale-110">
                  <ComingSoonIcon />
                </div>
                <span className="pill-tag border-gold/30 bg-background/40 text-gold/80">
                  Скоро загрузится
                </span>
                <h3 className="text-center text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">
                  {item.title}
                </h3>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </SectionFrame>
  );
}
