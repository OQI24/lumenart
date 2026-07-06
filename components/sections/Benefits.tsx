import { BENEFITS } from "@/lib/constants";
import { SECTION_CHAPTERS } from "@/config/section-chapters";
import FadeUp from "@/components/ui/FadeUp";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";

const GOLD = "#C6A15B";

function RocketIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4C16 4 8 12 8 20C8 22 9 24 11 25L13 28H19L21 25C23 24 24 22 24 20C24 12 16 4 16 4Z" stroke={GOLD} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="16" cy="18" r="3" stroke={GOLD} strokeWidth="1.5" />
      <path d="M11 28L9 30M21 28L23 30" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="5" y="7" width="22" height="20" rx="2" stroke={GOLD} strokeWidth="1.5" />
      <path d="M5 13h22M11 5v4M21 5v4" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 19l3 3 6-6" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="12" cy="20" r="6" stroke={GOLD} strokeWidth="1.5" />
      <path d="M17 15l10-4-2 6 4 2-4 4" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="20" r="2" fill={GOLD} />
    </svg>
  );
}

const ICONS = { rocket: RocketIcon, calendar: CalendarIcon, key: KeyIcon };

const chapter = SECTION_CHAPTERS.benefits!;

export default function Benefits() {
  const [card1, card2, card3] = BENEFITS;

  return (
    <SectionFrame>
      <SectionHeading
        title="Почему LumenArt"
        subtitle="Три ключевых преимущества, которые отличают нас от конкурентов"
        sectionLabel={chapter.label}
        sectionShape={chapter.shape}
        align="left"
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-6 lg:gap-7">
        <FadeUp delay={0.05}>
          <BenefitCard benefit={card1} index={1} className="md:col-span-2 md:row-span-1" />
        </FadeUp>
        <FadeUp delay={0.12}>
          <BenefitCard benefit={card2} index={2} className="md:col-span-1 md:row-span-1" />
        </FadeUp>
        <FadeUp delay={0.18}>
          <BenefitCard
            benefit={card3}
            index={3}
            className="md:col-span-3 ring-1 ring-gold/30 ring-offset-2 ring-offset-background"
          />
        </FadeUp>
      </div>
    </SectionFrame>
  );
}

function BenefitCard({
  benefit,
  index,
  className = "",
}: {
  benefit: (typeof BENEFITS)[number];
  index: number;
  className?: string;
}) {
  const Icon = ICONS[benefit.icon];
  return (
    <article className={`bento-card interactive-card group h-full ${className}`}>
      <span
        className="pointer-events-none absolute -right-1 -top-2 select-none text-5xl font-bold leading-none text-foreground/[0.04] sm:text-6xl"
        aria-hidden="true"
      >
        {String(index).padStart(2, "0")}
      </span>
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 transition-colors duration-500 group-hover:bg-gold/20">
        <Icon />
      </div>
      <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl lg:text-3xl">{benefit.title}</h3>
      <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{benefit.description}</p>
    </article>
  );
}
