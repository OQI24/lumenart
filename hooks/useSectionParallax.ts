"use client";

import { useEffect, useRef, useState } from "react";

/** Нормализованная позиция секции в viewport контейнера: -1…1 */
export function useSectionParallax(scrollContainerId = "snap-container") {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = document.getElementById(scrollContainerId);
    if (!container) return;

    const update = () => {
      const element = ref.current;
      if (!element) return;

      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const centerOffset =
        elementRect.top + elementRect.height / 2 - containerRect.top - containerRect.height / 2;
      const normalized = centerOffset / (containerRect.height * 0.42);
      const clamped = Math.max(-1, Math.min(1, normalized));

      setProgress(clamped);
    };

    update();
    container.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      container.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollContainerId]);

  return { ref, progress };
}
