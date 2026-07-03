import type { SectionShapeId } from "@/config/section-shapes";
import SectionLabel from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

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
        <SectionLabel
          label={sectionLabel}
          shape={sectionShape}
          align={isCenter ? "center" : "left"}
          className={isCenter ? "mx-auto" : undefined}
        />
      )}
      <h2 className="mb-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl",
            isCenter && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
