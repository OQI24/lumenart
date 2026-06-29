import Image from "next/image";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { BLUR_DATA_URL } from "@/lib/blur-data";
import SectionHeading from "@/components/ui/SectionHeading";

function ComingSoonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const GRID_CLASSES: Record<string, string> = {
  large: "md:col-span-2 md:row-span-2 min-h-[240px] md:min-h-[360px]",
  small: "min-h-[180px]",
  medium: "md:col-span-2 min-h-[200px]",
};

export default function Portfolio() {
  return (
    <div className="container-main">
      <SectionHeading
        title="Портфолио"
        subtitle="Примеры реализованных проектов — скоро здесь появятся фотографии"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 md:gap-5">
        {PORTFOLIO_ITEMS.map((item) => (
          <article
            key={item.id}
            className={`group relative overflow-hidden rounded-2xl border border-dashed border-gold/30 bg-gradient-card ${GRID_CLASSES[item.size]}`}
          >
            <Image
              src="/portfolio-placeholder.svg"
              alt={`${item.title} — фото скоро будет загружено`}
              fill
              className="object-cover opacity-30"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                <ComingSoonIcon />
              </div>
              <p className="text-xs uppercase tracking-widest text-gold/60">Скоро загрузится</p>
              <h3 className="text-lg font-bold text-foreground sm:text-xl">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
