import { BENEFITS } from "@/lib/constants";
import { SECTION_CHAPTERS } from "@/config/section-chapters";
import FadeUp from "@/components/ui/FadeUp";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const chapter = SECTION_CHAPTERS.benefits!;

type BenefitVisualId = (typeof BENEFITS)[number]["visual"];

function BenefitVisual({ visual, className }: { visual: BenefitVisualId; className?: string }) {
  return (
    <div className={cn("benefit-visual", className)} aria-hidden="true">
      {visual === "beams" && (
        <svg viewBox="0 0 160 120" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="benefit-beam" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M80 8 L80 112" stroke="var(--color-gold)" strokeOpacity="0.2" strokeWidth="0.5" />
          <path d="M28 18 L72 108" stroke="url(#benefit-beam)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M80 12 L80 108" stroke="url(#benefit-beam)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M132 18 L88 108" stroke="url(#benefit-beam)" strokeWidth="1.2" strokeLinecap="round" />
          <ellipse cx="80" cy="108" rx="36" ry="4" fill="var(--color-gold)" fillOpacity="0.12" />
        </svg>
      )}
      {visual === "arc" && (
        <svg viewBox="0 0 160 120" className="h-full w-full" fill="none">
          <path
            d="M24 88 A56 56 0 0 1 136 88"
            stroke="var(--color-gold)"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <path
            d="M32 88 A48 48 0 0 1 128 88"
            stroke="var(--color-gold)"
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="128" cy="88" r="4" fill="var(--color-gold)" fillOpacity="0.9" />
          <line x1="80" y1="36" x2="80" y2="52" stroke="var(--color-gold)" strokeOpacity="0.35" />
          <line x1="80" y1="52" x2="80" y2="88" stroke="var(--color-gold)" strokeOpacity="0.2" strokeDasharray="2 4" />
        </svg>
      )}
      {visual === "grid" && (
        <svg viewBox="0 0 160 120" className="h-full w-full" fill="none">
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1="20"
              y1={24 + i * 18}
              x2="140"
              y2={24 + i * 18}
              stroke="var(--color-gold)"
              strokeOpacity="0.12"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={32 + i * 22}
              y1="24"
              x2={32 + i * 22}
              y2="96"
              stroke="var(--color-gold)"
              strokeOpacity="0.12"
              strokeWidth="0.5"
            />
          ))}
          <circle cx="98" cy="60" r="14" stroke="var(--color-gold)" strokeOpacity="0.35" strokeWidth="1" />
          <circle cx="98" cy="60" r="5" fill="var(--color-gold)" fillOpacity="0.85" />
          <path
            d="M98 46 L98 28 M98 74 L98 92 M84 60 L66 60 M112 60 L130 60"
            stroke="var(--color-gold)"
            strokeOpacity="0.25"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

export default function Benefits() {
  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col justify-center">
      <div className="benefit-grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

      <SectionFrame>
        <SectionHeading
          title="Почему LumenArt"
          subtitle="Срок, производство и монтаж в одних руках"
          sectionLabel={chapter.label}
          sectionShape={chapter.shape}
          align="left"
        />

        <div className="benefit-pillars">
          <div className="benefit-pillars-grid">
            {BENEFITS.map((benefit, index) => (
              <FadeUp key={benefit.id} delay={0.06 + index * 0.08} className="h-full">
                <BenefitPillar benefit={benefit} index={index + 1} />
              </FadeUp>
            ))}
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}

function BenefitPillar({
  benefit,
  index,
}: {
  benefit: (typeof BENEFITS)[number];
  index: number;
}) {
  const step = String(index).padStart(2, "0");

  return (
    <article className="benefit-pillar group">
      <div className="benefit-pillar-grid" aria-hidden="true" />

      <div className="benefit-pillar-header">
        <span className="benefit-pillar-step">{step}</span>
        <BenefitVisual visual={benefit.visual} className="benefit-pillar-visual" />
      </div>

      <div className="benefit-pillar-body">
        <h3 className="benefit-pillar-title">{benefit.title}</h3>
        <p className="benefit-pillar-desc">{benefit.description}</p>
        <p className="benefit-pillar-highlight">{benefit.highlight}</p>
      </div>

      <div className="benefit-pillar-metric">
        <span className="benefit-pillar-metric-value">
          {benefit.metric.value}
          <span className="benefit-pillar-metric-suffix">{benefit.metric.suffix}</span>
        </span>
        <span className="benefit-pillar-metric-label">{benefit.metric.label}</span>
      </div>

      <p className="benefit-pillar-keyword font-display-serif" aria-hidden="true">
        {benefit.keyword}
      </p>
    </article>
  );
}
