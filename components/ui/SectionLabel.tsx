import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number: number;
  label: string;
  className?: string;
}

export default function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <div className={cn("mb-8 flex items-end gap-4 md:mb-10", className)}>
      <span className="display-num text-gold/25">{number}</span>
      <span className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-gold sm:mb-2 sm:text-sm">
        {label}
      </span>
    </div>
  );
}
