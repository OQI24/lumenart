import { cn } from "@/lib/utils";

type SpotlightGridProps = {
  className?: string;
  /** Интенсивность 0–1 (по умолчанию — едва заметный фон) */
  intensity?: "subtle" | "medium";
};

/**
 * Ambient stage-light wash — без буквальных «софитов», только мягкие пятна света.
 */
export default function SpotlightGrid({
  className,
  intensity = "subtle",
}: SpotlightGridProps) {
  const strong = intensity === "medium";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-0 h-[min(65vh,520px)] overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0",
          strong ? "opacity-100" : "opacity-70",
        )}
        style={{
          background: `
            radial-gradient(ellipse 55% 42% at 18% 0%, color-mix(in srgb, var(--color-gold) 14%, transparent) 0%, transparent 72%),
            radial-gradient(ellipse 48% 38% at 50% 0%, color-mix(in srgb, var(--color-gold) 10%, transparent) 0%, transparent 68%),
            radial-gradient(ellipse 52% 40% at 82% 0%, color-mix(in srgb, var(--color-gold) 12%, transparent) 0%, transparent 70%)
          `,
        }}
      />

      <div
        className="absolute inset-x-[8%] top-[28%] h-[45%] opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 28% 55% at 22% 50%, color-mix(in srgb, var(--color-gold) 8%, transparent) 0%, transparent 100%),
            radial-gradient(ellipse 28% 55% at 50% 50%, color-mix(in srgb, var(--color-gold) 6%, transparent) 0%, transparent 100%),
            radial-gradient(ellipse 28% 55% at 78% 50%, color-mix(in srgb, var(--color-gold) 7%, transparent) 0%, transparent 100%)
          `,
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-background via-background/90 to-transparent" />
    </div>
  );
}
