interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-14 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
