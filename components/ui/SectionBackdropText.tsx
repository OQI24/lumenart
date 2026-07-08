import { cn } from "@/lib/utils";

type SectionBackdropTextProps = {
  children: React.ReactNode;
  align?: "center" | "bottom" | "left" | "right";
  variant?: "default" | "section-anchor";
  /** Номер главы для variant="section-anchor" (например "01") */
  chapterNumber?: string;
  className?: string;
};

export default function SectionBackdropText({
  children,
  align = "center",
  variant = "default",
  chapterNumber,
  className,
}: SectionBackdropTextProps) {
  const isAnchor = variant === "section-anchor";

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-0 select-none",
        isAnchor ? "section-watermark" : "left-1/2 -translate-x-1/2 whitespace-nowrap",
        isAnchor && align === "left" && "align-left",
        isAnchor && align === "right" && "align-right",
        align === "center" && !isAnchor && "top-1/2 -translate-y-1/2",
        align === "bottom" && !isAnchor && "-bottom-8",
        isAnchor && align === "center" && "inset-x-0 top-1/2 -translate-y-1/2 text-center",
        isAnchor && align === "bottom" && "inset-x-0 bottom-0 text-center",
        isAnchor && align === "left" && "left-0 top-1/2 -translate-y-1/2 text-left",
        isAnchor && align === "right" && "right-0 top-1/2 -translate-y-1/2 text-right",
        className
      )}
      aria-hidden="true"
    >
      {isAnchor && chapterNumber ? (
        <span className="section-watermark-number">{chapterNumber}</span>
      ) : null}
      <p
        className={cn(
          isAnchor
            ? "section-watermark-title"
            : "text-[clamp(4rem,20vw,14rem)] font-bold leading-none text-foreground/[0.03]"
        )}
      >
        {children}
      </p>
    </div>
  );
}
