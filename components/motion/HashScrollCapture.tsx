"use client";

import { type MouseEvent, type ReactNode } from "react";
import {
  isSectionHash,
  scrollToSection,
  sectionIdFromHash,
} from "@/lib/scroll-to-section";

/** Captures in-page hash clicks from OriginKit anchors (e.g. MagneticButton). */
export default function HashScrollCapture({
  children,
  className,
  scrollContainerId = "snap-container",
}: {
  children: ReactNode;
  className?: string;
  scrollContainerId?: string;
}) {
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || !isSectionHash(href)) return;
    e.preventDefault();
    scrollToSection(sectionIdFromHash(href), scrollContainerId);
  };

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}
