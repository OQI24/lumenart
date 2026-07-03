import { cn } from "@/lib/utils";

type SectionBackdropTextProps = {
  children: React.ReactNode;
  align?: "center" | "bottom";
  className?: string;
};

export default function SectionBackdropText({
  children,
  align = "center",
  className,
}: SectionBackdropTextProps) {
  return (
    <p
      className={cn(
        "pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(4rem,20vw,14rem)] font-bold leading-none text-foreground/[0.03]",
        align === "center" && "top-1/2 -translate-y-1/2",
        align === "bottom" && "-bottom-8",
        className
      )}
      aria-hidden="true"
    >
      {children}
    </p>
  );
}
