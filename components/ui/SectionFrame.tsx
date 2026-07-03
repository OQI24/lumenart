import { cn } from "@/lib/utils";

type SectionFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionFrame({ children, className }: SectionFrameProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-0 w-full flex-1 flex-col justify-center",
        className
      )}
    >
      <div className="container-main relative z-10">{children}</div>
    </div>
  );
}
