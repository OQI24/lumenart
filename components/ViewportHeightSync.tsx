"use client";

import { useEffect } from "react";

const STYLE_ID = "app-layout-vars";

function getOrCreateLayoutVarsStyle() {
  let el = document.getElementById(STYLE_ID);
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  return el;
}

function syncLayoutViewportVars() {
  const height = window.visualViewport?.height ?? window.innerHeight;

  const header = document.querySelector("header");
  const headerHeight =
    header instanceof HTMLElement ? header.offsetHeight : null;

  const headerHeightValue =
    headerHeight != null
      ? `${headerHeight}px`
      : "calc(3.5rem + env(safe-area-inset-top, 0px))";

  const contentHeight =
    headerHeight != null
      ? `${Math.max(0, height - headerHeight)}px`
      : "calc(var(--app-vh) - var(--header-height))";

  getOrCreateLayoutVarsStyle().textContent = `:root{--app-vh:${height}px;--header-height:${headerHeightValue};--app-content-vh:${contentHeight}}`;
}

export default function ViewportHeightSync() {
  useEffect(() => {
    syncLayoutViewportVars();

    const viewport = window.visualViewport;
    const header = document.querySelector("header");
    const headerObserver =
      header instanceof HTMLElement ? new ResizeObserver(syncLayoutViewportVars) : null;

    if (header instanceof HTMLElement) {
      headerObserver?.observe(header);
    }
    viewport?.addEventListener("resize", syncLayoutViewportVars);
    viewport?.addEventListener("scroll", syncLayoutViewportVars);
    window.addEventListener("resize", syncLayoutViewportVars);
    window.addEventListener("orientationchange", syncLayoutViewportVars);

    return () => {
      headerObserver?.disconnect();
      viewport?.removeEventListener("resize", syncLayoutViewportVars);
      viewport?.removeEventListener("scroll", syncLayoutViewportVars);
      window.removeEventListener("resize", syncLayoutViewportVars);
      window.removeEventListener("orientationchange", syncLayoutViewportVars);
    };
  }, []);

  return null;
}
