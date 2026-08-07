"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Same physics constants as OriginKit Magnetic Hover Button. */
const RANGE_PER_POINT = 18;
const MAX_PULL = 0.5;

type DiaryMagneticProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** OriginKit magnet strength (default softer than CTA so scrapbook doesn't jump). */
  magnet?: number;
};

/**
 * Magnetic pull from OriginKit Magnetic Hover Button — for diary days / photos.
 * No fill sweep (that was for buttons); only the spring attraction.
 */
export default function DiaryMagnetic({
  children,
  className,
  style,
  magnet = 8,
}: DiaryMagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const node = el;
    const pull = (magnet / 20) * MAX_PULL;
    const reach = magnet * RANGE_PER_POINT;

    function onMove(event: PointerEvent) {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 - sx.get();
      const cy = rect.top + rect.height / 2 - sy.get();

      const dx = event.clientX - cx;
      const dy = event.clientY - cy;

      const edgeX = Math.max(0, Math.abs(dx) - rect.width / 2);
      const edgeY = Math.max(0, Math.abs(dy) - rect.height / 2);
      const gap = Math.hypot(edgeX, edgeY);

      if (gap > reach) {
        x.set(0);
        y.set(0);
        return;
      }
      const falloff = reach === 0 ? 0 : 1 - gap / reach;
      x.set(dx * pull * falloff);
      y.set(dy * pull * falloff);
    }

    function onLeave() {
      x.set(0);
      y.set(0);
    }

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [magnet, reduceMotion, x, y, sx, sy]);

  if (reduceMotion) {
    return (
      <div className={cn(className)} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{
        ...style,
        x: sx,
        y: sy,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
