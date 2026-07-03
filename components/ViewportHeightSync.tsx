"use client";

import { useEffect } from "react";

function setAppViewportHeight() {
  const height = window.visualViewport?.height ?? window.innerHeight;
  document.documentElement.style.setProperty("--app-vh", `${height}px`);
}

export default function ViewportHeightSync() {
  useEffect(() => {
    setAppViewportHeight();

    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", setAppViewportHeight);
    viewport?.addEventListener("scroll", setAppViewportHeight);
    window.addEventListener("resize", setAppViewportHeight);
    window.addEventListener("orientationchange", setAppViewportHeight);

    return () => {
      viewport?.removeEventListener("resize", setAppViewportHeight);
      viewport?.removeEventListener("scroll", setAppViewportHeight);
      window.removeEventListener("resize", setAppViewportHeight);
      window.removeEventListener("orientationchange", setAppViewportHeight);
    };
  }, []);

  return null;
}
