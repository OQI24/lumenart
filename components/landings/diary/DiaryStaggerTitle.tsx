"use client";

import InViewMount from "@/components/motion/InViewMount";
import StaggeredLetters from "@/components/originkit/ui/stagger-text-rise";

type Tag = "h1" | "h2" | "h3";

type DiaryStaggerTitleProps = {
  text: string;
  tag?: Tag;
  className?: string;
  color?: string;
  fontSize?: string;
  maxWidth?: string;
  align?: "left" | "center";
  immediate?: boolean;
};

/** Normalize spaces before punctuation so "?" never sits alone. */
function cleanTitle(text: string): string {
  return text.replace(/\s+([.,!?;:…])/g, "$1").replace(/\s{2,}/g, " ").trim();
}

/**
 * OriginKit Stagger Text Rise for diary titles — replays on each scroll-in.
 */
export default function DiaryStaggerTitle({
  text,
  tag = "h2",
  className,
  color = "var(--landing-ink, #1a1a1a)",
  fontSize = "var(--s12-h2, clamp(1.6rem, 3.5vw, 2.4rem))",
  maxWidth,
  align = "left",
  immediate = false,
}: DiaryStaggerTitleProps) {
  const safe = cleanTitle(text);

  const content = (
    <div className={className} style={maxWidth ? { maxWidth } : undefined}>
      <StaggeredLetters
        text={safe}
        tag={tag}
        color={color}
        y={tag === "h1" ? 40 : 28}
        startOpacity={0}
        staggerMs={tag === "h1" ? 32 : 22}
        transition={{ type: "spring", stiffness: 190, damping: 18, mass: 1 }}
        font={{
          fontFamily:
            "var(--landing-font-display, var(--font-diary-display), Georgia, serif)",
          fontWeight: 500,
          fontSize,
          lineHeight: tag === "h1" ? 0.98 : 1.12,
          letterSpacing: tag === "h1" ? "-0.02em" : "0",
          textAlign: align,
        }}
      />
    </div>
  );

  if (immediate) return content;

  return (
    <InViewMount
      rootId={null}
      once={false}
      fallback={
        <div className={className} style={{ opacity: 0, maxWidth }} aria-hidden>
          {safe}
        </div>
      }
    >
      {content}
    </InViewMount>
  );
}
