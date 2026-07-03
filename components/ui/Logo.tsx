import { cn } from "@/lib/utils";

const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;

const ICON_CX = 24;
const ICON_CY = 24;
const ICON_INNER_R = 7;
const ICON_SEG1_END = 14;
const ICON_GAP = 2.5;
const ICON_SEG2_END = 18;
const ICON_STROKE_W = 1.15;

function LogoIconRays() {
  return (
    <>
      {RAY_ANGLES.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const seg2Start = ICON_SEG1_END + ICON_GAP;

        return (
          <g key={angle}>
            <line
              x1={ICON_CX + ICON_INNER_R * cos}
              y1={ICON_CY + ICON_INNER_R * sin}
              x2={ICON_CX + ICON_SEG1_END * cos}
              y2={ICON_CY + ICON_SEG1_END * sin}
              stroke="currentColor"
              strokeWidth={ICON_STROKE_W}
              strokeLinecap="round"
            />
            <line
              x1={ICON_CX + seg2Start * cos}
              y1={ICON_CY + seg2Start * sin}
              x2={ICON_CX + ICON_SEG2_END * cos}
              y2={ICON_CY + ICON_SEG2_END * sin}
              stroke="currentColor"
              strokeWidth={ICON_STROKE_W}
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </>
  );
}

interface LogoIconProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className, size = 40 }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <LogoIconRays />
    </svg>
  );
}

type LogoVariant = "horizontal" | "stacked" | "wordmark" | "icon";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  /** Высота логотипа в px */
  height?: number;
}

const WORDMARK = "ЛЮМЕН АРТ";

export default function Logo({
  variant = "horizontal",
  className,
  height = 32,
}: LogoProps) {
  if (variant === "icon") {
    return <LogoIcon className={className} size={height} />;
  }

  if (variant === "wordmark") {
    return (
      <svg
        viewBox="0 0 200 32"
        height={height}
        className={cn("shrink-0", className)}
        role="img"
        aria-label={WORDMARK}
      >
        <text
          x="0"
          y="24"
          fill="currentColor"
          fontFamily="Magistral, var(--font-exo), system-ui, sans-serif"
          fontSize="22"
          fontWeight="400"
          letterSpacing="0.28em"
        >
          {WORDMARK}
        </text>
      </svg>
    );
  }

  if (variant === "stacked") {
    return (
      <svg
        viewBox="0 0 120 100"
        height={height}
        className={cn("shrink-0", className)}
        role="img"
        aria-label={WORDMARK}
      >
        <g transform="translate(36, 0) scale(0.85)">
          <LogoIconRays />
        </g>
        <text
          x="60"
          y="88"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="Magistral, var(--font-exo), system-ui, sans-serif"
          fontSize="14"
          fontWeight="400"
          letterSpacing="0.22em"
        >
          {WORDMARK}
        </text>
      </svg>
    );
  }

  const iconScale = height / 48;
  const iconWidth = 48 * iconScale;
  const textX = iconWidth + 10;
  const viewWidth = textX + 168;

  return (
    <svg
      viewBox={`0 0 ${viewWidth} ${height}`}
      height={height}
      className={cn("shrink-0", className)}
      role="img"
      aria-label={WORDMARK}
    >
      <g transform={`translate(0, ${(height - 48 * iconScale) / 2}) scale(${iconScale})`}>
        <LogoIconRays />
      </g>
      <text
        x={textX}
        y={height * 0.78}
        fill="currentColor"
        fontFamily="Magistral, var(--font-exo), system-ui, sans-serif"
        fontSize={height * 0.62}
        fontWeight="400"
        letterSpacing="0.18em"
      >
        {WORDMARK}
      </text>
    </svg>
  );
}
