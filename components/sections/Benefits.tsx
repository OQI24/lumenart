import { BENEFITS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

const GOLD = "#C6A15B";

function RocketIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4C16 4 8 12 8 20C8 22 9 24 11 25L13 28H19L21 25C23 24 24 22 24 20C24 12 16 4 16 4Z" stroke={GOLD} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="16" cy="18" r="3" stroke={GOLD} strokeWidth="1.5" />
      <path d="M11 28L9 30M21 28L23 30" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="5" y="7" width="22" height="20" rx="2" stroke={GOLD} strokeWidth="1.5" />
      <path d="M5 13h22M11 5v4M21 5v4" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 19l3 3 6-6" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="12" cy="20" r="6" stroke={GOLD} strokeWidth="1.5" />
      <path d="M17 15l10-4-2 6 4 2-4 4" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="20" r="2" fill={GOLD} />
    </svg>
  );
}

const ICONS = { rocket: RocketIcon, calendar: CalendarIcon, key: KeyIcon };

export default function Benefits() {
  const [card1, card2, card3] = BENEFITS;

  return (
    <div className="container-main">
      <SectionHeading
        title="Почему LumenArt"
        subtitle="Три ключевых преимущества, которые отличают нас от конкурентов"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
        <BenefitCard benefit={card1} className="md:col-span-2 md:row-span-1" />
        <BenefitCard benefit={card2} className="md:col-span-1 md:row-span-1" />
        <BenefitCard
          benefit={card3}
          className="md:col-span-3 ring-2 ring-gold/60 ring-offset-2 ring-offset-background"
        />
      </div>
    </div>
  );
}

function BenefitCard({
  benefit,
  className = "",
}: {
  benefit: (typeof BENEFITS)[number];
  className?: string;
}) {
  const Icon = ICONS[benefit.icon];
  return (
    <article className={`bento-card group ${className}`}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 transition-colors group-hover:bg-gold/20">
        <Icon />
      </div>
      <h3 className="mb-2 text-lg font-bold text-foreground sm:text-xl">{benefit.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{benefit.description}</p>
    </article>
  );
}
