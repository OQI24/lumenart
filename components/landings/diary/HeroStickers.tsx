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

/** Fold enable + 4 stickers from 1100; 1×4 layout only at 1400+. */
const DESKTOP_MQ = "(min-width: 1100px)";
const WIDE_MQ = "(min-width: 1400px)";
/** Spread only near page top; fold once scroll exceeds ~5% viewport. */
const FOLD_SCROLL_PX = 24;
const FOLD_SCROLL_VH = 0.05;
/** Matches prior CSS: 0.55s cubic-bezier(0.22, 1, 0.36, 1). */
const STICKER_EASE = [0.22, 1, 0.36, 1] as const;
const STICKER_DURATION = 0.55;

/** Wide ≥1400 spread — sync theme.css (width 34%, step 28.9%, overlap 15%). */
const SPREAD_POSES: Record<StickerId, StickerPose> = {
  a: { left: "0%", top: "10%", x: 0, y: 0, rotate: -2.5, zIndex: 2 },
  b: { left: "28.9%", top: "6%", x: 0, y: 0, rotate: 2, zIndex: 2 },
  c: { left: "57.8%", top: "12%", x: 0, y: 0, rotate: -1.5, zIndex: 2 },
  front: { left: "86.7%", top: "8%", x: 0, y: 0, rotate: 1.5, zIndex: 3 },
};

/**
 * Wide folded fan — centers preserved vs prior 30% stickers
 * (old centers ≈ 44/48/51.5/53% → left = center − 19%).
 */
const FOLDED_POSES: Record<StickerId, StickerPose> = {
  a: { left: "25%", top: "14%", x: -10, y: 12, rotate: -7, zIndex: 1 },
  b: { left: "29%", top: "4%", x: 8, y: -8, rotate: 5, zIndex: 2 },
  c: { left: "32.5%", top: "11%", x: -6, y: 6, rotate: -3.5, zIndex: 3 },
  front: { left: "34%", top: "7%", x: 2, y: -1, rotate: 1.5, zIndex: 4 },
};

/**
 * Medium 1100–1399 spread — 2×2 corners, width ~42% inset
 * so rotate/tape/shadow stay inside media (no page scrollWidth blowout).
 */
const MEDIUM_SPREAD_POSES: Record<StickerId, StickerPose> = {
  a: { left: "3%", top: "16%", x: 0, y: 0, rotate: -2.2, zIndex: 2 },
  b: { left: "55%", top: "12%", x: 0, y: 0, rotate: 2, zIndex: 2 },
  c: { left: "3%", top: "54%", x: 0, y: 0, rotate: -1.6, zIndex: 2 },
  front: { left: "55%", top: "50%", x: 0, y: 0, rotate: 1.4, zIndex: 3 },
};

/** Medium folded — one fan stack, desktop spirit scaled to media column. */
const MEDIUM_FOLDED_POSES: Record<StickerId, StickerPose> = {
  a: { left: "26%", top: "30%", x: -8, y: 10, rotate: -7, zIndex: 1 },
  b: { left: "30%", top: "20%", x: 6, y: -6, rotate: 5, zIndex: 2 },
  c: { left: "33%", top: "27%", x: -4, y: 5, rotate: -3.5, zIndex: 3 },
  front: { left: "35%", top: "22%", x: 2, y: -2, rotate: 1.5, zIndex: 4 },
};

function desktopPose(id: StickerId, folded: boolean): StickerPose {
  return folded ? FOLDED_POSES[id] : SPREAD_POSES[id];
}

function mediumPose(id: StickerId, folded: boolean): StickerPose {
  return folded ? MEDIUM_FOLDED_POSES[id] : MEDIUM_SPREAD_POSES[id];
}

function mobilePose(id: StickerId, straight: boolean): StickerPose {
  if (id !== "front") {
    return { left: "auto", top: "auto", x: 0, y: 0, rotate: 0, zIndex: 1 };
  }
  return {
    left: "auto",
    top: "auto",
    x: 0,
    y: 0,
    rotate: straight ? 0 : 1.5,
    zIndex: 4,
  };
}

function poseFor(
  id: StickerId,
  mode: LayoutMode,
  folded: boolean,
  straight: boolean
): StickerPose {
  if (mode === "desktop") return desktopPose(id, folded);
  if (mode === "medium") return mediumPose(id, folded);
  return mobilePose(id, straight);
}

export default function HeroStickers() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [folded, setFolded] = useState(false);
  const [straight, setStraight] = useState(false);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("mobile");
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!stackRef.current?.closest("section.s12-hero")) return;

    const desktopMq = window.matchMedia(DESKTOP_MQ);
    const wideMq = window.matchMedia(WIDE_MQ);

    const foldThreshold = () =>
      Math.max(FOLD_SCROLL_PX, (window.innerHeight || 0) * FOLD_SCROLL_VH);

    const update = () => {
      const foldEnabled = desktopMq.matches;
      const wide = wideMq.matches;
      const mode: LayoutMode = wide ? "desktop" : foldEnabled ? "medium" : "mobile";
      setLayoutMode(mode);

      if (!foldEnabled) {
        setFolded(false);
        return;
      }
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setFolded(y > foldThreshold());
    };

    window.addEventListener("scroll", update, { passive: true });
    desktopMq.addEventListener("change", update);
    wideMq.addEventListener("change", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      desktopMq.removeEventListener("change", update);
      wideMq.removeEventListener("change", update);
    };
  }, []);

  const stackState =
    layoutMode === "mobile"
      ? "is-mobile"
      : [
          layoutMode === "medium" ? "is-medium" : "is-wide",
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
          const pose = poseFor(sticker.id, layoutMode, folded, straight);

          return (
            <motion.div
              key={sticker.src}
              className={`${sticker.className}${isFront && straight ? " is-straight" : ""}`}
              layout={false}
              initial={false}
              animate={pose}
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
              />
            </motion.div>
          );
        })}
        <p className="s12-hand s12-hand-deep s12-caption">референсы с объектов</p>
      </div>
    </div>
  );
}
