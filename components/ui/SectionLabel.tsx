import type { SectionShapeId } from "@/config/section-shapes";
import SectionMarkerShape from "@/components/ui/SectionMarkerShape";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  shape?: SectionShapeId;
  align?: "left" | "center";
  className?: string;
  markerClassName?: string;
  markerStrokeClassName?: string;
  labelClassName?: string;
}

export default function SectionLabel({
  label,
  shape,
  align = "left",
  className,
  markerClassName,
  markerStrokeClassName,
  labelClassName,
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "relative mb-8 md:mb-10",
        align === "center" ? "mx-auto w-fit" : "w-fit max-w-full",
        className
      )}
    >
      {shape && (
        <SectionMarkerShape
          variant={shape}
          align={align}
          className={markerClassName}
          strokeClassName={markerStrokeClassName}
        />
      )}
      <p
        className={cn(
          "relative z-10 text-xs font-medium uppercase tracking-[0.25em] text-gold sm:text-sm",
          labelClassName
        )}
      >
        {label}
      </p>
    </div>
  );
}
