import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  speed?: "slow" | "normal" | "fast";
}

const SPEED_CLASS = {
  slow: "marquee-track-slow",
  normal: "marquee-track",
  fast: "marquee-track-fast",
} as const;

export default function Marquee({
  items,
  className,
  itemClassName,
  speed = "normal",
}: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div className={cn("marquee-track flex w-max gap-10", SPEED_CLASS[speed])}>
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              "shrink-0 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground",
              itemClassName
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
