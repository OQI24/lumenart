"use client";

import { useEffect, useState } from "react";
import { ATELIER_COPY } from "@/lib/landings/atelier-content";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDone(true),
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 80 : 1450,
    );
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`atelier-loader${done ? " is-done" : ""}`} aria-hidden="true">
      <div className="atelier-loader-sheet">
        <span className="atelier-tape atelier-loader-tape" />
        <p>{ATELIER_COPY.preloader.eyebrow}</p>
        <div className="atelier-loader-sketch">
          <i />
          <i />
          <i />
          <i />
        </div>
        <h2>{ATELIER_COPY.preloader.title}</h2>
        <div className="atelier-loader-line">
          <span />
        </div>
        <small>{ATELIER_COPY.preloader.note}</small>
      </div>
    </div>
  );
}
