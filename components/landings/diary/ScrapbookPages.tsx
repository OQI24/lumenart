"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LandingImage } from "@/components/landings/shared";

type ScrapbookItem = {
  title: string;
  caption: string;
  image: string;
};

/** Spread when section.top < vh * SPREAD_TOP_VH; fold on scroll-up past FOLD_TOP_VH. */
const SPREAD_TOP_VH = 0.45;
const FOLD_TOP_VH = 0.65;
const DESKTOP_MQ = "(min-width: 1100px)";
const SPREAD_EASE = [0.33, 1, 0.32, 1] as const;
const SPREAD_ROTATE = [0, 0.8, -1] as const;

type Mode = "is-stacked" | "is-spread";

type CardPose = {
  x: number | string;
  y: number | string;
  rotate: number;
  zIndex: number;
};

/** Two side piles on mid band; row pitch ≈ card + 1.25rem gap. */
const COL = "(100% + 1.25rem)";
const MID = "50% + 0.625rem";

const STACKED_POSES: readonly CardPose[] = [
  { x: "0.15rem", y: `calc(${MID} - 0.4rem)`, rotate: -6, zIndex: 3 },
  {
    x: `calc(-1 * ${COL} + 0.45rem)`,
    y: `calc(${MID} + 0.1rem)`,
    rotate: -2,
    zIndex: 2,
  },
  {
    x: `calc(-2 * ${COL} + 0.75rem)`,
    y: `calc(${MID} + 0.45rem)`,
    rotate: 3,
    zIndex: 1,
  },
  {
    x: `calc(2 * ${COL} - 0.75rem)`,
    y: `calc(-1 * (${MID}) + 0.65rem)`,
    rotate: -3,
    zIndex: 1,
  },
  {
    x: `calc(1 * ${COL} - 0.45rem)`,
    y: `calc(-1 * (${MID}) + 0.35rem)`,
    rotate: 2,
    zIndex: 2,
  },
  { x: "-0.15rem", y: `calc(-1 * (${MID}) - 0.15rem)`, rotate: 6, zIndex: 3 },
];

function spreadPose(index: number): CardPose {
  return {
    x: 0,
    y: 0,
    rotate: SPREAD_ROTATE[index % 3] ?? 0,
    zIndex: 1,
  };
}

function cardPose(mode: Mode, index: number): CardPose {
  if (mode === "is-spread") return spreadPose(index);
  return STACKED_POSES[index] ?? spreadPose(index);
}

export default function ScrapbookPages({
  items,
}: {
  items: readonly ScrapbookItem[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  /** Default spread: avoid SSR desktop stack translates on mobile. */
  const modeRef = useRef<Mode>("is-spread");
  const lastScrollY = useRef(0);
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<Mode>("is-spread");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const section =
      grid.closest<HTMLElement>("section.s12-pages") ?? grid;
    const desktopMq = window.matchMedia(DESKTOP_MQ);

    lastScrollY.current =
      window.scrollY || document.documentElement.scrollTop || 0;

    const applyMode = (next: Mode) => {
      if (next === modeRef.current) return;
      modeRef.current = next;
      setMode(next);
    };

    const resolveDesiredMode = (): Mode => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const dy = y - lastScrollY.current;
      const scrollingUp = dy < -0.5;
      lastScrollY.current = y;

      const vh = window.innerHeight || 0;
      const enterLine = vh * SPREAD_TOP_VH;
      const foldLine = vh * FOLD_TOP_VH;
      const sectionTop = section.getBoundingClientRect().top;

      if (modeRef.current === "is-spread") {
        if (scrollingUp && sectionTop > foldLine) {
          return "is-stacked";
        }
        return "is-spread";
      }

      if (sectionTop < enterLine) {
        return "is-spread";
      }

      return "is-stacked";
    };

    const update = () => {
      const desktop = desktopMq.matches;
      setIsDesktop(desktop);
      if (!desktop) {
        applyMode("is-spread");
        return;
      }
      applyMode(resolveDesiredMode());
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    desktopMq.addEventListener("change", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      desktopMq.removeEventListener("change", update);
    };
  }, []);

  const transition = {
    duration: reduceMotion ? 0 : 0.9,
    ease: SPREAD_EASE,
  };

  return (
    <div ref={gridRef} className={`s12-pages-grid ${mode}`}>
      {items.map((item, index) => {
        const pose = isDesktop ? cardPose(mode, index) : spreadPose(index);

        return (
          <motion.figure
            key={item.title}
            className={`s12-page-card r${index % 3}`}
            layout={false}
            initial={false}
            animate={pose}
            transition={transition}
            style={{ zIndex: pose.zIndex }}
          >
            <LandingImage
              src={item.image}
              alt={item.title}
              className="s12-page"
              loading="eager"
            />
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.caption}</span>
            </figcaption>
          </motion.figure>
        );
      })}
    </div>
  );
}
