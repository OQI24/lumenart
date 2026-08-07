"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import StatusParticles from "@/components/landings/diary/StatusParticles";
import { BRAND_LABEL, usePencilHatch } from "@/components/landings/diary/usePencilHatch";
import {
  useStatusFireflies,
  type StatusFirefly,
} from "@/components/landings/diary/useStatusFireflies";

function subscribeMq(query: string, onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useMediaQuery(query: string, serverSnapshot = false) {
  return useSyncExternalStore(
    (onChange) => subscribeMq(query, onChange),
    () => window.matchMedia(query).matches,
    () => serverSnapshot,
  );
}

/** html.light / html.dark from ThemeProvider (or forced class). */
function useHtmlLight() {
  return useSyncExternalStore(
    (onChange) => {
      const root = document.documentElement;
      const obs = new MutationObserver(onChange);
      obs.observe(root, { attributes: true, attributeFilter: ["class"] });
      return () => obs.disconnect();
    },
    () => document.documentElement.classList.contains("light"),
    () => false,
  );
}

type SpotlightMode = "on" | "static" | "off";

/**
 * Brand void backdrop for diary 404.
 * Dark: top-left ambient lantern + firefly swarm + spotlight watermark.
 * Light: paper void + pencil hatch reveal of LUMENART (no lantern / swarm).
 */
export default function DiaryStatusBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const crumbsRef = useRef<HTMLDivElement>(null);
  const hatchCanvasRef = useRef<HTMLCanvasElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const swarmRef = useRef<StatusFirefly[]>([]);
  const cursorRef = useRef({ x: 0, y: 0, active: false });
  const cursorInRef = useRef(false);
  const isLight = useHtmlLight();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const finePointer = useMediaQuery("(pointer: fine)", false);
  const [mode, setMode] = useState<SpotlightMode>("off");
  const [cursorIn, setCursorIn] = useState(false);

  useEffect(() => {
    if (isLight || reduceMotion) {
      setMode("off");
      return;
    }
    setMode(finePointer ? "on" : "static");
  }, [finePointer, reduceMotion, isLight]);

  usePencilHatch({
    rootRef,
    canvasRef: hatchCanvasRef,
    brandRef,
    isLight,
    reduceMotion,
    finePointer,
  });

  useStatusFireflies({
    rootRef,
    crumbsRef,
    swarmRef,
    cursorRef,
    cursorInRef,
    mode,
    isLight,
    setCursorIn,
  });

  const spotStyle = {
    "--spot-x": "0%",
    "--spot-y": "0%",
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className="s12-status-backdrop"
      style={spotStyle}
      aria-hidden="true"
      data-skin={isLight ? "light" : "dark"}
      data-spotlight={isLight ? "off" : mode}
      data-cursor={!isLight && mode === "on" && cursorIn ? "in" : "out"}
    >
      <div className="s12-status-backdrop-plane" />
      {isLight ? <div className="s12-status-void-fields" aria-hidden="true" /> : null}
      {!isLight ? <div className="s12-status-soft-ray" /> : null}
      {!isLight && mode !== "off" ? <div className="s12-status-spot-core" /> : null}
      {!isLight ? <StatusParticles ref={crumbsRef} variant="void" /> : null}
      {isLight ? (
        <canvas ref={hatchCanvasRef} className="s12-status-hatch-canvas" />
      ) : null}
      <p ref={brandRef} className="s12-status-brand">
        {BRAND_LABEL}
      </p>
    </div>
  );
}
