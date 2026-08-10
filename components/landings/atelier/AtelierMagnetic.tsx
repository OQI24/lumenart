"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

type AtelierMagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function AtelierMagnetic({
  children,
  className,
  strength = 0.12,
}: AtelierMagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 190, damping: 20, mass: 0.55 });
  const springY = useSpring(y, { stiffness: 190, damping: 20, mass: 0.55 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const element = ref.current;
    if (!element) return;

    const onPointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2 - springX.get();
      const centerY = bounds.top + bounds.height / 2 - springY.get();
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      const reach = Math.max(bounds.width, bounds.height) * 0.85;

      if (distance > reach) {
        x.set(0);
        y.set(0);
        return;
      }

      const falloff = 1 - distance / reach;
      x.set(dx * strength * falloff);
      y.set(dy * strength * falloff);
    };

    const reset = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", reset);
    };
  }, [reduceMotion, springX, springY, strength, x, y]);

  if (reduceMotion) {
    return <figure className={className}>{children}</figure>;
  }

  return (
    <motion.figure
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, willChange: "transform" }}
    >
      {children}
    </motion.figure>
  );
}
