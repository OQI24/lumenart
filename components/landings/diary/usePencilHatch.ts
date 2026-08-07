"use client";

import { useEffect, type RefObject } from "react";

const BRAND_LABEL = "LumenArt";
const HATCH_GRAPHITE = "rgba(45, 38, 32, 0.92)";
const HATCH_SOFT = "rgba(70, 58, 48, 0.55)";

export function usePencilHatch({
  rootRef,
  canvasRef,
  brandRef,
  isLight,
  reduceMotion,
  finePointer,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  brandRef: RefObject<HTMLParagraphElement | null>;
  isLight: boolean;
  reduceMotion: boolean;
  finePointer: boolean;
}) {
  useEffect(() => {
    if (!isLight) return;

    const root = rootRef.current;
    const canvas = canvasRef.current;
    const brand = brandRef.current;
    if (!root || !canvas || !brand) return;

    const reveal = document.createElement("canvas");
    const letter = document.createElement("canvas");
    let dpr = 1;
    let brandBox = { x: 0, y: 0, w: 0, h: 0, font: "", padX: 0, padY: 0 };
    let lastPt: { x: number; y: number } | null = null;
    let dirty = false;
    let raf = 0;
    let paused = document.hidden;

    const composite = () => {
      raf = 0;
      if (!dirty) return;
      dirty = false;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(reveal, 0, 0, w, h);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(letter, 0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    };

    const scheduleComposite = () => {
      if (!raf) raf = requestAnimationFrame(composite);
    };

    const measure = () => {
      const rect = root.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);

      const prevReveal = document.createElement("canvas");
      prevReveal.width = reveal.width;
      prevReveal.height = reveal.height;
      const prevCtx = prevReveal.getContext("2d");
      if (prevCtx && reveal.width > 0) {
        prevCtx.drawImage(reveal, 0, 0);
      }
      const prevW = reveal.width;
      const prevH = reveal.height;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      reveal.width = canvas.width;
      reveal.height = canvas.height;
      letter.width = canvas.width;
      letter.height = canvas.height;

      const rctx = reveal.getContext("2d");
      if (rctx && prevW > 0 && prevH > 0 && prevCtx) {
        rctx.drawImage(prevReveal, 0, 0, prevW, prevH, 0, 0, reveal.width, reveal.height);
      }

      const cs = getComputedStyle(brand);
      const fontWeight = cs.fontWeight || "700";
      const fontSize = cs.fontSize || "96px";
      const fontFamily = cs.fontFamily || "sans-serif";
      const font = `${fontWeight} ${fontSize} ${fontFamily}`;
      const padBottom = Number.parseFloat(cs.paddingBottom || "52") || 52;
      const label = BRAND_LABEL.toUpperCase();
      const fontPx = Number.parseFloat(fontSize) || 96;

      const probe = document.createElement("canvas").getContext("2d");
      let textW = w * 0.8;
      if (probe) {
        probe.font = font;
        textW = probe.measureText(label).width;
      }
      const textH = fontPx * 0.92;
      const cx = w / 2;
      const cy = h - padBottom - textH * 0.42;

      brandBox = {
        x: cx - textW / 2,
        y: cy - textH / 2,
        w: textW,
        h: textH,
        font,
        padX: Math.max(28, w * 0.03),
        padY: Math.max(24, textH * 0.35),
      };

      const lctx = letter.getContext("2d");
      if (!lctx) return;
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.clearRect(0, 0, w, h);
      lctx.font = font;
      lctx.textAlign = "center";
      lctx.textBaseline = "middle";
      lctx.fillStyle = "#fff";
      lctx.fillText(label, cx, cy);

      lastPt = null;
      dirty = true;
      scheduleComposite();
    };

    const inBrandZone = (x: number, y: number) => {
      const { x: bx, y: by, w, h, padX, padY } = brandBox;
      return (
        x >= bx - padX &&
        x <= bx + w + padX &&
        y >= by - padY &&
        y <= by + h + padY
      );
    };

    const strokeHatch = (x: number, y: number, from: { x: number; y: number } | null) => {
      const rctx = reveal.getContext("2d");
      if (!rctx) return;
      rctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const x0 = from?.x ?? x;
      const y0 = from?.y ?? y;
      const dist = Math.hypot(x - x0, y - y0);
      const steps = Math.max(1, Math.ceil(dist / 2.8));

      for (let i = 0; i <= steps; i++) {
        const t = steps === 0 ? 0 : i / steps;
        const px = x0 + (x - x0) * t;
        const py = y0 + (y - y0) * t;
        const ang = -Math.PI / 3.2 + (Math.random() - 0.5) * 0.55;
        const len = 5 + Math.random() * 11;
        const wobble = (Math.random() - 0.5) * 1.8;

        rctx.strokeStyle = Math.random() > 0.35 ? HATCH_GRAPHITE : HATCH_SOFT;
        // ~2.75× prior brush radius (light hatch only)
        rctx.lineWidth = 2.5 + Math.random() * 4.4;
        rctx.lineCap = "round";
        rctx.globalAlpha = 0.55 + Math.random() * 0.4;
        rctx.beginPath();
        rctx.moveTo(
          px - Math.cos(ang) * len * 0.5 + wobble,
          py - Math.sin(ang) * len * 0.5,
        );
        rctx.lineTo(
          px + Math.cos(ang) * len * 0.5 + wobble,
          py + Math.sin(ang) * len * 0.5,
        );
        rctx.stroke();

        // Soft graphite dab — denser fill on pass
        if (Math.random() > 0.45) {
          rctx.globalAlpha = 0.06 + Math.random() * 0.1;
          rctx.fillStyle = HATCH_GRAPHITE;
          rctx.beginPath();
          rctx.ellipse(
            px + (Math.random() - 0.5) * 5.5,
            py + (Math.random() - 0.5) * 5.5,
            8.5 + Math.random() * 14,
            5.5 + Math.random() * 9.5,
            ang,
            0,
            Math.PI * 2,
          );
          rctx.fill();
        }
      }
      rctx.globalAlpha = 1;
      dirty = true;
      scheduleComposite();
    };

    const onMove = (event: PointerEvent) => {
      if (paused || reduceMotion || !finePointer) return;
      const rect = root.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (!inBrandZone(x, y)) {
        lastPt = null;
        return;
      }
      strokeHatch(x, y, lastPt);
      lastPt = { x, y };
    };

    const onLeave = () => {
      lastPt = null;
    };

    measure();

    // Reduced motion: soft full reveal, no pointer hatch
    if (reduceMotion) {
      const rctx = reveal.getContext("2d");
      if (rctx) {
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        rctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        rctx.fillStyle = "rgba(45, 38, 32, 0.35)";
        rctx.fillRect(0, 0, w, h);
        dirty = true;
        scheduleComposite();
      }
    }

    const ro = new ResizeObserver(() => measure());
    ro.observe(root);

    const onVisibility = () => {
      paused = document.hidden;
    };

    document.addEventListener("visibilitychange", onVisibility);
    if (!reduceMotion && finePointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
      window.addEventListener("blur", onLeave);
    }

    return () => {
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isLight, reduceMotion, finePointer, rootRef, canvasRef, brandRef]);
}

export { BRAND_LABEL };
