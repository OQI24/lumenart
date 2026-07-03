"use client";

import { SECTION_MARKER_CONFIG, type MarkerLayerConfig } from "@/config/section-marker-layers";
import type { SectionShapeId } from "@/config/section-shapes";
import { useSectionParallax } from "@/hooks/useSectionParallax";
import { computeMarkerLayerTransform, type SectionMotionStyle } from "@/lib/section-marker-motion";
import {
  getMarkerWireframeByType,
  type WireframeType,
} from "@/lib/section-marker-geometry";
import { cn } from "@/lib/utils";

type SectionMarkerShapeProps = {
  variant: SectionShapeId;
  align?: "left" | "center";
  className?: string;
  strokeClassName?: string;
};

function WireframeSvg({
  wireframe,
  uniqueId,
  strokeClassName,
  opacity,
}: {
  wireframe: WireframeType;
  uniqueId: string;
  strokeClassName?: string;
  opacity: number;
}) {
  const { lines } = getMarkerWireframeByType(wireframe);
  const gradientId = `marker-glow-${uniqueId}`;

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#C6A15B" stopOpacity={opacity * 0.7} />
          <stop offset="100%" stopColor="#C6A15B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="88" fill={`url(#${gradientId})`} />
      <g
        fill="none"
        stroke="#C6A15B"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("stroke-gold/25", strokeClassName)}
        style={{ opacity }}
      >
        {lines.map(([x1, y1, x2, y2], index) => (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth={index % 5 === 0 ? 1.35 : 0.85}
            opacity={0.4 + (index % 4) * 0.1}
          />
        ))}
      </g>
      <g
        fill="#C6A15B"
        className={cn("fill-gold/20", strokeClassName)}
        style={{ opacity: opacity * 0.85 }}
      >
        {lines
          .filter((_, index) => index % 11 === 0)
          .map(([x1, y1], index) => (
            <circle key={index} cx={x1} cy={y1} r={1.6} />
          ))}
      </g>
    </svg>
  );
}

function MarkerLayer({
  layer,
  layerIndex,
  variant,
  progress,
  intensity,
  motion,
  strokeClassName,
}: {
  layer: MarkerLayerConfig;
  layerIndex: number;
  variant: SectionShapeId;
  progress: number;
  intensity: number;
  motion: SectionMotionStyle;
  strokeClassName?: string;
}) {
  const { x, y, rotate, scale, skewX, skewY } = computeMarkerLayerTransform(motion, {
    progress,
    layerIndex,
    layer,
    intensity,
  });

  return (
    <div
      className="absolute will-change-transform"
      style={{
        left: layer.offsetX,
        top: layer.offsetY,
        width: `${layer.scale * 100}%`,
        height: `${layer.scale * 100}%`,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale}) skewX(${skewX}deg) skewY(${skewY}deg)`,
        filter: layer.blur > 0 ? `blur(${layer.blur}px)` : undefined,
      }}
    >
      <WireframeSvg
        wireframe={layer.wireframe}
        uniqueId={`${variant}-${layerIndex}-${layer.wireframe}`}
        strokeClassName={strokeClassName}
        opacity={layer.opacity}
      />
    </div>
  );
}

export default function SectionMarkerShape({
  variant,
  align = "left",
  className,
  strokeClassName,
}: SectionMarkerShapeProps) {
  const { ref, progress } = useSectionParallax();
  const { motion, intensity, layers } = SECTION_MARKER_CONFIG[variant];

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute z-0",
        "h-[clamp(22rem,95vw,52rem)] w-[clamp(22rem,95vw,52rem)]",
        "sm:h-[clamp(26rem,88vw,58rem)] sm:w-[clamp(26rem,88vw,58rem)]",
        align === "left"
          ? "-left-[clamp(4rem,32vw,18rem)] -top-[clamp(8rem,42vw,22rem)]"
          : "left-1/2 -top-[clamp(10rem,48vw,26rem)] -translate-x-1/2",
        className
      )}
      aria-hidden="true"
      style={{ perspective: "1400px" }}
    >
      <div className="relative h-full w-full">
        {layers.map((layer, index) => (
          <MarkerLayer
            key={`${layer.wireframe}-${index}`}
            layer={layer}
            layerIndex={index}
            variant={variant}
            progress={progress}
            intensity={intensity}
            motion={motion}
            strokeClassName={strokeClassName}
          />
        ))}
      </div>
    </div>
  );
}
