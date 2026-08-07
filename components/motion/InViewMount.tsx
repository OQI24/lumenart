"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts children while in view; unmounts when leaving so mount-triggered
 * animations (e.g. OriginKit Stagger) replay on re-entry.
 */
export default function InViewMount({
  children,
  className,
  rootMargin = "-8% 0px -8% 0px",
  threshold = 0.2,
  fallback = null,
  /** null = viewport (diary). Pass element id for snap-scroll pages. */
  rootId = null as string | null,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  fallback?: ReactNode;
  rootId?: string | null;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const wasVisible = useRef(false);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const root = rootId != null ? document.getElementById(rootId) : null;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (!wasVisible.current) {
            wasVisible.current = true;
            setCycle((c) => c + 1);
            setVisible(true);
          }
        } else if (!once) {
          wasVisible.current = false;
          setVisible(false);
        }
      },
      { root, rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootId, rootMargin, threshold, once]);

  return (
    <div ref={ref} className={className}>
      {visible ? <div key={cycle}>{children}</div> : fallback}
    </div>
  );
}
