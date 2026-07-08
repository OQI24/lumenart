import { cn } from "@/lib/utils";

type KpiStatProps = {
  value: React.ReactNode;
  label: string;
  className?: string;
  /** Акцентная цифра золотым (по умолчанию true) */
  accentValue?: boolean;
  /** Горизонтальная или вертикальная компоновка */
  layout?: "stack" | "inline";
};

export default function KpiStat({
  value,
  label,
  className,
  accentValue = true,
  layout = "stack",
}: KpiStatProps) {
  return (
    <div
      className={cn(
        layout === "stack" && "flex flex-col gap-1",
        layout === "inline" && "flex items-baseline gap-3",
        className
      )}
    >
      <span
        className={cn(
          "text-3xl font-bold leading-none tabular-nums sm:text-4xl lg:text-5xl",
          accentValue ? "text-gold" : "text-foreground"
        )}
      >
        {value}
      </span>
      <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-sm">
        {label}
      </span>
    </div>
  );
}
