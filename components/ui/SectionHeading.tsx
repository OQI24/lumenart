"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import FadeUp from "@/components/ui/FadeUp";
import type { SectionShapeId } from "@/config/section-shapes";
import { cn } from "@/lib/utils";
import InViewMount from "@/components/motion/InViewMount";
import StaggeredLetters from "@/components/originkit/ui/stagger-text-rise";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  sectionLabel?: string;
  sectionShape?: SectionShapeId;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  sectionLabel,
  sectionShape,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={cn("mb-12 md:mb-16 lg:mb-20", isCenter ? "text-center" : "text-left")}>
      {sectionLabel && (
        <FadeUp>
          <SectionLabel
            label={sectionLabel}
            shape={sectionShape}
            align={isCenter ? "center" : "left"}
            className={isCenter ? "mx-auto" : undefined}
          />
        </FadeUp>
      )}
      <InViewMount
        className="mb-4"
        rootId="snap-container"
        once={false}
        fallback={
          <h2
            className={cn(
              "text-3xl font-bold leading-[1.02] text-foreground opacity-0 sm:text-4xl lg:text-5xl xl:text-6xl",
              isCenter && "text-center",
            )}
          >
            {title}
          </h2>
        }
      >
        <StaggeredLetters
          text={title}
          tag="h2"
          color="var(--foreground)"
          y={28}
          startOpacity={0}
          staggerMs={24}
          transition={{ type: "spring", stiffness: 200, damping: 18, mass: 1 }}
          font={{
            fontFamily: "Magistral, var(--font-exo), system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.875rem, 4vw, 3.75rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            textAlign: isCenter ? "center" : "left",
          }}
        />
      </InViewMount>
      {subtitle && (
        <FadeUp delay={0.12}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl",
              isCenter && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
