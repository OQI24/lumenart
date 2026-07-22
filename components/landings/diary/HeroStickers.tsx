"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { LandingImage } from "@/components/landings/shared";

type StickerId = "a" | "b" | "c" | "front";
type LayoutMode = "mobile" | "medium" | "desktop";

type StickerPose = {
  left: string;
  top: string;
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
const DESKTOP_FOLD_SPAN_VH = 0.18;
const DESKTOP_FOLD_SPAN_PX = 120;

/** Former fold bottom 0.37vh; start 25% earlier (+15% vs prior), end shifted same way to keep ~25% scrub. */
const MOBILE_FOLD_BOTTOM_VH = 0.37;
const MOBILE_START_EARLIER_VH = 0.25;
const MOBILE_END_LATER_VH = 0;
/** Former fold top ratio 0.57; same ± shifts. */
const MOBILE_FOLD_TOP_RATIO = 0.57;
const MOBILE_START_EARLIER_TOP = 0.25;
const MOBILE_END_LATER_TOP = 0;

const MOBILE_BOTTOM_START = MOBILE_FOLD_BOTTOM_VH + MOBILE_START_EARLIER_VH;
const MOBILE_BOTTOM_END = MOBILE_FOLD_BOTTOM_VH - MOBILE_END_LATER_VH;
const MOBILE_TOP_START = MOBILE_FOLD_TOP_RATIO - MOBILE_START_EARLIER_TOP;
const MOBILE_TOP_END = MOBILE_FOLD_TOP_RATIO + MOBILE_END_LATER_TOP;

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

function clamp01(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

function easeOutProgress(t: number): number {
  const p = clamp01(t);
  return 1 - (1 - p) * (1 - p);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpPercent(a: string, b: string, t: number): string {
  const na = Number.parseFloat(a);
  const nb = Number.parseFloat(b);
  if (Number.isNaN(na) || Number.isNaN(nb)) return t < 0.5 ? a : b;
  return `${lerp(na, nb, t)}%`;
}

function modeFromCode(code: number): LayoutMode {
  if (code >= 2) return "desktop";
  if (code >= 1) return "medium";
  return "mobile";
}

function spreadPoseFor(id: StickerId, mode: LayoutMode): StickerPose {
  return mode === "desktop" ? SPREAD_POSES[id] : GRID_SPREAD_POSES[id];
}

function foldedPoseFor(id: StickerId, mode: LayoutMode): StickerPose {
  return mode === "desktop" ? FOLDED_POSES[id] : GRID_FOLDED_POSES[id];
}

function mixPose(from: StickerPose, to: StickerPose, t: number): StickerPose {
  return {
    left: lerpPercent(from.left, to.left, t),
    top: lerpPercent(from.top, to.top, t),
    x: lerp(from.x, to.x, t),
    y: lerp(from.y, to.y, t),
    rotate: lerp(from.rotate, to.rotate, t),
    zIndex: Math.round(lerp(from.zIndex, to.zIndex, t)),
  };
}

function desktopFoldFromScrollY(y: number): number {
  const vh = typeof window === "undefined" ? 1 : window.innerHeight || 1;
  const start = Math.max(FOLD_SCROLL_PX, vh * FOLD_SCROLL_VH);
  const span = Math.max(DESKTOP_FOLD_SPAN_PX, vh * DESKTOP_FOLD_SPAN_VH);
  return clamp01((y - start) / span);
}

function useLayoutModeValue(): MotionValue<number> {
  const layoutMode = useMotionValue(0);

  useLayoutEffect(() => {
    const desktopMq = window.matchMedia(DESKTOP_MQ);
    const wideMq = window.matchMedia(WIDE_MQ);

    const sync = () => {
      if (wideMq.matches) layoutMode.set(2);
      else if (desktopMq.matches) layoutMode.set(1);
      else layoutMode.set(0);
    };

    sync();
    desktopMq.addEventListener("change", sync);
    wideMq.addEventListener("change", sync);
    return () => {
      desktopMq.removeEventListener("change", sync);
      wideMq.removeEventListener("change", sync);
    };
  }, [layoutMode]);

  return layoutMode;
}

function useHeroFoldProgress(
  heroRef: RefObject<HTMLElement | null>,
  layoutMode: MotionValue<number>,
  reduceMotion: boolean | null,
): MotionValue<number> {
  const { scrollYProgress: bottomProgress } = useScroll({
    target: heroRef,
    offset: [
      `end ${MOBILE_BOTTOM_START * 100}%`,
      `end ${MOBILE_BOTTOM_END * 100}%`,
    ],
  });

  const { scrollYProgress: topProgress } = useScroll({
    target: heroRef,
    offset: [
      `${MOBILE_TOP_START * 100}% start`,
      `${MOBILE_TOP_END * 100}% start`,
    ],
  });

  const { scrollY } = useScroll();

  const reduceMV = useMotionValue(reduceMotion ? 1 : 0);
  useLayoutEffect(() => {
    reduceMV.set(reduceMotion ? 1 : 0);
  }, [reduceMotion, reduceMV]);

  const mobileRaw = useTransform(
    [bottomProgress, topProgress],
    ([bottom, top]: number[]) =>
      easeOutProgress(Math.max(bottom ?? 0, top ?? 0)),
  );

  const desktopRaw = useTransform(scrollY, (y) => desktopFoldFromScrollY(y));

  return useTransform(
    [mobileRaw, desktopRaw, layoutMode, reduceMV],
    ([mobile, desktop, mode, reduce]: number[]) => {
      const raw = (mode ?? 0) >= 1 ? (desktop ?? 0) : (mobile ?? 0);
      if (reduce) return raw < 0.5 ? 0 : 1;
      return raw;
    },
  );
}

function HeroSticker({
  sticker,
  foldProgress,
  layoutMode,
}: {
  sticker: (typeof HERO_STICKERS)[number];
  foldProgress: MotionValue<number>;
  layoutMode: MotionValue<number>;
}) {
  const isFront = sticker.id === "front";
  const straight = useMotionValue(0);
  const [isStraight, setIsStraight] = useState(false);

  const left = useTransform([foldProgress, layoutMode], ([p, mode]: number[]) => {
    const m = modeFromCode(mode ?? 0);
    return mixPose(
      spreadPoseFor(sticker.id, m),
      foldedPoseFor(sticker.id, m),
      p ?? 0,
    ).left;
  });
  const top = useTransform([foldProgress, layoutMode], ([p, mode]: number[]) => {
    const m = modeFromCode(mode ?? 0);
    return mixPose(
      spreadPoseFor(sticker.id, m),
      foldedPoseFor(sticker.id, m),
      p ?? 0,
    ).top;
  });
  const x = useTransform([foldProgress, layoutMode], ([p, mode]: number[]) => {
    const m = modeFromCode(mode ?? 0);
    return mixPose(
      spreadPoseFor(sticker.id, m),
      foldedPoseFor(sticker.id, m),
      p ?? 0,
    ).x;
  });
  const y = useTransform([foldProgress, layoutMode], ([p, mode]: number[]) => {
    const m = modeFromCode(mode ?? 0);
    return mixPose(
      spreadPoseFor(sticker.id, m),
      foldedPoseFor(sticker.id, m),
      p ?? 0,
    ).y;
  });
  const rotate = useTransform(
    [foldProgress, layoutMode, straight],
    ([p, mode, s]: number[]) => {
      if (isFront && s) return 0;
      const m = modeFromCode(mode ?? 0);
      return mixPose(
        spreadPoseFor(sticker.id, m),
        foldedPoseFor(sticker.id, m),
        p ?? 0,
      ).rotate;
    },
  );
  const zIndex = useTransform([foldProgress, layoutMode], ([p, mode]: number[]) => {
    const m = modeFromCode(mode ?? 0);
    return mixPose(
      spreadPoseFor(sticker.id, m),
      foldedPoseFor(sticker.id, m),
      p ?? 0,
    ).zIndex;
  });

  return (
    <motion.div
      className={`${sticker.className}${isFront && isStraight ? " is-straight" : ""}`}
      layout={false}
      style={{ left, top, x, y, rotate, zIndex }}
      onTouchStart={
        isFront
          ? () => {
              straight.set(1);
              setIsStraight(true);
            }
          : undefined
      }
      onTouchEnd={
        isFront
          ? () => {
              straight.set(0);
              setIsStraight(false);
            }
          : undefined
      }
      onTouchCancel={
        isFront
          ? () => {
              straight.set(0);
              setIsStraight(false);
            }
          : undefined
      }
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
}

function HeroStickersMotion({ hero }: { hero: HTMLElement }) {
  const heroRef = useRef(hero);
  heroRef.current = hero;

  const layoutMode = useLayoutModeValue();
  const reduceMotion = useReducedMotion();
  const foldProgress = useHeroFoldProgress(heroRef, layoutMode, reduceMotion);

  const [modeLabel, setModeLabel] = useState<LayoutMode>("mobile");
  const [folded, setFolded] = useState(false);

  useMotionValueEvent(layoutMode, "change", (code) => {
    setModeLabel(modeFromCode(code));
  });
  useMotionValueEvent(foldProgress, "change", (p) => {
    setFolded(p >= 0.5);
  });

  useLayoutEffect(() => {
    setModeLabel(modeFromCode(layoutMode.get()));
    setFolded(foldProgress.get() >= 0.5);
  }, [layoutMode, foldProgress]);

  const stackState = [
    modeLabel === "desktop" ? "is-wide" : modeLabel === "medium" ? "is-medium" : "is-mobile",
    folded ? "is-folded" : "is-spread",
  ].join(" ");

  return (
    <div className={`s12-hero-stack ${stackState}`}>
      {HERO_STICKERS.map((sticker) => (
        <HeroSticker
          key={sticker.src}
          sticker={sticker}
          foldProgress={foldProgress}
          layoutMode={layoutMode}
        />
      ))}
      <p className="s12-hand s12-hand-deep s12-caption">{"референсы с объектов"}</p>
    </div>
  );
}

export default function HeroStickers() {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [hero, setHero] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setHero(mediaRef.current?.closest("section.s12-hero") ?? null);
  }, []);

  return (
    <div ref={mediaRef} className="s12-hero-media">
      {hero ? (
        <HeroStickersMotion hero={hero} />
      ) : (
        <div className="s12-hero-stack is-mobile is-spread">
          {HERO_STICKERS.map((sticker) => (
            <div key={sticker.src} className={sticker.className}>
              <span className="s12-sticker-tape s12-hero-tape" aria-hidden="true" />
              <span className="s12-sticker-tape s12-hero-tape-2" aria-hidden="true" />
              <LandingImage
                src={sticker.src}
                alt={sticker.alt}
                className="s12-heroimg"
                priority={"priority" in sticker && sticker.priority}
                loading={
                  "priority" in sticker && sticker.priority ? undefined : "eager"
                }
              />
            </div>
          ))}
          <p className="s12-hand s12-hand-deep s12-caption">{"референсы с объектов"}</p>
        </div>
      )}
    </div>
  );
}
