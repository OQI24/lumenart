"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LandingImage } from "@/components/landings/shared";

type StickerId = "a" | "b" | "c" | "front";
type LayoutMode = "mobile" | "medium" | "desktop";

type StickerPose = {
  left?: string;
  top?: string;
  x: number;
  y: number;
  rotate: number;
  zIndex: number;
};

const HERO_STICKERS = [
  {
    id: "a" as const,
    src: "/images/stock/hero.jpg",
    alt: "Светильник с объекта LumenArt",
    className: "s12-hero-sticker is-a",
  },
  {
    id: "b" as const,
    src: "/images/stock/hero-globe.jpg",
    alt: "Стеклянный шар-подвес",
    className: "s12-hero-sticker is-b",
  },
  {
    id: "c" as const,
    src: "/images/stock/hero-domes-modern.jpg",
    alt: "Современные купольные подвесы",
    className: "s12-hero-sticker is-c",
  },
  {
    id: "front" as const,
    src: "/images/stock/hero-sculptural.jpg",
    alt: "Геометрический чёрный подвес",
    className: "s12-hero-sticker is-front",
    priority: true,
  },
] as const;

const DESKTOP_MQ = "(min-width: 1100px)";
const WIDE_MQ = "(min-width: 1400px)";
const FOLD_SCROLL_PX = 24;
const FOLD_SCROLL_VH = 0.05;
/** Mobile fold by hero geometry + hysteresis (not scrollY). */
const MOBILE_FOLD_BOTTOM_VH = 0.22;
const MOBILE_SPREAD_BOTTOM_VH = 0.38;
const MOBILE_FOLD_TOP_RATIO = 0.72;
const MOBILE_SPREAD_TOP_RATIO = 0.52;
const STICKER_EASE = [0.22, 1, 0.36, 1] as const;
const STICKER_DURATION = 0.55;

/** Wide ≥1400 — sync theme.css. */
const SPREAD_POSES: Record<StickerId, StickerPose> = {
  a: { left: "0%", top: "10%", x: 0, y: 0, rotate: -2.5, zIndex: 2 },
  b: { left: "28.9%", top: "6%", x: 0, y: 0, rotate: 2, zIndex: 2 },
  c: { left: "57.8%", top: "12%", x: 0, y: 0, rotate: -1.5, zIndex: 2 },
  front: { left: "86.7%", top: "8%", x: 0, y: 0, rotate: 1.5, zIndex: 3 },
};

const FOLDED_POSES: Record<StickerId, StickerPose> = {
  a: { left: "25%", top: "14%", x: -10, y: 12, rotate: -7, zIndex: 1 },
  b: { left: "29%", top: "4%", x: 8, y: -8, rotate: 5, zIndex: 2 },
  c: { left: "32.5%", top: "11%", x: -6, y: 6, rotate: -3.5, zIndex: 3 },
  front: { left: "34%", top: "7%", x: 2, y: -1, rotate: 1.5, zIndex: 4 },
};

/** ≤1399 2×2 — sync theme.css SSR fallbacks. */
const GRID_SPREAD_POSES: Record<StickerId, StickerPose> = {
  a: { left: "2%", top: "6%", x: 0, y: 0, rotate: -2.2, zIndex: 2 },
  b: { left: "50%", top: "2%", x: 0, y: 0, rotate: 2, zIndex: 2 },
  c: { left: "2%", top: "48%", x: 0, y: 0, rotate: -1.6, zIndex: 2 },
  front: { left: "50%", top: "44%", x: 0, y: 0, rotate: 1.4, zIndex: 3 },
};

const GRID_FOLDED_POSES: Record<StickerId, StickerPose> = {
  a: { left: "24%", top: "22%", x: -8, y: 10, rotate: -7, zIndex: 1 },
  b: { left: "28%", top: "12%", x: 6, y: -6, rotate: 5, zIndex: 2 },
  c: { left: "31%", top: "19%", x: -4, y: 5, rotate: -3.5, zIndex: 3 },
  front: { left: "33%", top: "14%", x: 2, y: -2, rotate: 1.5, zIndex: 4 },
};

function desktopPose(id: StickerId, folded: boolean): StickerPose {
  return folded ? FOLDED_POSES[id] : SPREAD_POSES[id];
}

function gridPose(id: StickerId, folded: boolean): StickerPose {
  return folded ? GRID_FOLDED_POSES[id] : GRID_SPREAD_POSES[id];
}

function poseFor(id: StickerId, mode: LayoutMode, folded: boolean): StickerPose {
  if (mode === "desktop") return desktopPose(id, folded);
  return gridPose(id, folded);
}

function desktopFoldFromScroll(): boolean {
  const vh = window.innerHeight || 0;
  const y = window.scrollY || document.documentElement.scrollTop || 0;
  return y > Math.max(FOLD_SCROLL_PX, vh * FOLD_SCROLL_VH);
}

function mobileFoldFromHero(
  hero: Element,
  currentlyFolded: boolean,
): boolean {
  const rect = hero.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const heroHeight = rect.height || 1;
  const foldBottom = vh * MOBILE_FOLD_BOTTOM_VH;
  const spreadBottom = vh * MOBILE_SPREAD_BOTTOM_VH;
  const foldTop = -MOBILE_FOLD_TOP_RATIO * heroHeight;
  const spreadTop = -MOBILE_SPREAD_TOP_RATIO * heroHeight;

  if (!currentlyFolded) {
    if (rect.bottom < foldBottom || rect.top < foldTop) return true;
    return false;
  }
  if (rect.bottom > spreadBottom && rect.top > spreadTop) return false;
  return true;
}

export default function HeroStickers() {
  const stackRef = useRef<HTMLDivElement>(null);
  const foldedRef = useRef(false);
  const [folded, setFolded] = useState(false);
  const [straight, setStraight] = useState(false);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("mobile");
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const hero = stackRef.current?.closest("section.s12-hero");
    if (!hero) return;

    const desktopMq = window.matchMedia(DESKTOP_MQ);
    const wideMq = window.matchMedia(WIDE_MQ);

    const applyFolded = (next: boolean) => {
      if (foldedRef.current === next) return;
      foldedRef.current = next;
      setFolded(next);
    };

    const update = () => {
      const mediumUp = desktopMq.matches;
      const wide = wideMq.matches;
      const mode: LayoutMode = wide ? "desktop" : mediumUp ? "medium" : "mobile";
      setLayoutMode(mode);

      if (mode === "mobile") {
        applyFolded(mobileFoldFromHero(hero, foldedRef.current));
        return;
      }
      applyFolded(desktopFoldFromScroll());
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    desktopMq.addEventListener("change", update);
    wideMq.addEventListener("change", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      desktopMq.removeEventListener("change", update);
      wideMq.removeEventListener("change", update);
    };
  }, []);

  const stackState = [
    layoutMode === "desktop" ? "is-wide" : layoutMode === "medium" ? "is-medium" : "is-mobile",
    folded ? "is-folded" : "is-spread",
  ].join(" ");
  const transition = {
    duration: reduceMotion ? 0 : STICKER_DURATION,
    ease: STICKER_EASE,
  };

  return (
    <div className="s12-hero-media">
      <div ref={stackRef} className={`s12-hero-stack ${stackState}`}>
        {HERO_STICKERS.map((sticker) => {
          const isFront = sticker.id === "front";
          const pose = poseFor(sticker.id, layoutMode, folded);
          const animatePose =
            isFront && straight
              ? { ...pose, rotate: 0 }
              : pose;

          return (
            <motion.div
              key={sticker.src}
              className={`${sticker.className}${isFront && straight ? " is-straight" : ""}`}
              layout={false}
              initial={false}
              animate={animatePose}
              transition={transition}
              style={{ zIndex: pose.zIndex }}
              onTouchStart={isFront ? () => setStraight(true) : undefined}
              onTouchEnd={isFront ? () => setStraight(false) : undefined}
              onTouchCancel={isFront ? () => setStraight(false) : undefined}
            >
              <span className="s12-sticker-tape s12-hero-tape" aria-hidden="true" />
              <span className="s12-sticker-tape s12-hero-tape-2" aria-hidden="true" />
              <LandingImage
                src={sticker.src}
                alt={sticker.alt}
                className="s12-heroimg"
                priority={"priority" in sticker && sticker.priority}
                loading={"priority" in sticker && sticker.priority ? undefined : "eager"}
              />
            </motion.div>
          );
        })}
        <p className="s12-hand s12-hand-deep s12-caption">{"референсы с объектов"}</p>
      </div>
    </div>
  );
}
