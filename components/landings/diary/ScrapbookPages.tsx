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

type ScrapbookItem = {
  title: string;
  caption: string;
  image: string;
};

/**
 * Desktop scrub via useScroll offsets — same anchors as former binary:
 * start (stacked→spread begins): section.top @ 25vh
 * end (fully spread): section.top @ 5vh
 */
const SPREAD_TOP_VH = 0.05;
const FOLD_TOP_VH = 0.25;
const DESKTOP_MQ = "(min-width: 1100px)";
const SPREAD_ROTATE = [0, 0.8, -1] as const;

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

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function unwrapCalc(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("calc(") && trimmed.endsWith(")")) {
    return trimmed.slice(5, -1);
  }
  return trimmed;
}

function scrubLength(
  stacked: number | string,
  spread: number | string,
  progress: number,
): number | string {
  if (progress <= 0) return stacked;
  if (progress >= 1) return spread;
  if (typeof stacked === "number" && typeof spread === "number") {
    return lerp(stacked, spread, progress);
  }
  const from = unwrapCalc(String(stacked));
  const to = unwrapCalc(typeof spread === "number" ? `${spread}px` : String(spread));
  return `calc((1 - ${progress}) * (${from}) + ${progress} * (${to}))`;
}

/**
 * Do not lerp zIndex during scrub — mid-frame Math.round(lerp)
 * collapses unique stacked layers onto shared values and cards cross.
 * Keep stacked order for the whole animation; switch to spread only when done.
 */
function scrubZIndex(
  index: number,
  stackedZ: number,
  spreadZ: number,
  progress: number,
): number {
  if (progress >= 0.99) return spreadZ;
  return stackedZ + (index < 3 ? 10 : 0);
}

function spreadPose(index: number): CardPose {
  return {
    x: 0,
    y: 0,
    rotate: SPREAD_ROTATE[index % 3] ?? 0,
    zIndex: 1,
  };
}

function useDesktopFlag(): MotionValue<number> {
  const isDesktop = useMotionValue(0);

  useLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => isDesktop.set(mq.matches ? 1 : 0);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [isDesktop]);

  return isDesktop;
}

function useSpreadProgress(
  sectionRef: RefObject<HTMLElement | null>,
  isDesktop: MotionValue<number>,
  reduceMotion: boolean | null,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${FOLD_TOP_VH * 100}%`, `start ${SPREAD_TOP_VH * 100}%`],
  });

  const reduceMV = useMotionValue(reduceMotion ? 1 : 0);
  useLayoutEffect(() => {
    reduceMV.set(reduceMotion ? 1 : 0);
  }, [reduceMotion, reduceMV]);

  return useTransform(
    [scrollYProgress, isDesktop, reduceMV],
    ([progress, desktop, reduce]: number[]) => {
      if (!desktop) return 1;
      const p = progress ?? 0;
      if (reduce) return p < 0.5 ? 0 : 1;
      return p;
    },
  );
}

function ScrapbookCard({
  item,
  index,
  spreadProgress,
  enableMotion,
}: {
  item: ScrapbookItem;
  index: number;
  spreadProgress: MotionValue<number>;
  enableMotion: boolean;
}) {
  const stacked = STACKED_POSES[index] ?? spreadPose(index);
  const spread = spreadPose(index);

  const x = useTransform(spreadProgress, (p) =>
    enableMotion ? scrubLength(stacked.x, spread.x, p) : spread.x,
  );
  const y = useTransform(spreadProgress, (p) =>
    enableMotion ? scrubLength(stacked.y, spread.y, p) : spread.y,
  );
  const rotate = useTransform(spreadProgress, (p) =>
    enableMotion ? lerp(stacked.rotate, spread.rotate, p) : spread.rotate,
  );
  const zIndex = useTransform(spreadProgress, (p) =>
    enableMotion
      ? scrubZIndex(index, stacked.zIndex, spread.zIndex, p)
      : spread.zIndex,
  );

  return (
    <motion.figure
      className={`s12-page-card r${index % 3}`}
      layout={false}
      style={{ x, y, rotate, zIndex }}
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
}

function ScrapbookPagesMotion({
  items,
  section,
}: {
  items: readonly ScrapbookItem[];
  section: HTMLElement;
}) {
  const sectionRef = useRef(section);
  sectionRef.current = section;

  const isDesktopMV = useDesktopFlag();
  const reduceMotion = useReducedMotion();
  const spreadProgress = useSpreadProgress(sectionRef, isDesktopMV, reduceMotion);

  const [isDesktop, setIsDesktop] = useState(false);
  const [mode, setMode] = useState<"is-spread" | "is-stacked">("is-spread");

  useMotionValueEvent(isDesktopMV, "change", (v) => setIsDesktop(v >= 1));
  useMotionValueEvent(spreadProgress, "change", (p) => {
    setMode(p >= 0.5 ? "is-spread" : "is-stacked");
  });

  useLayoutEffect(() => {
    setIsDesktop(isDesktopMV.get() >= 1);
    setMode(spreadProgress.get() >= 0.5 ? "is-spread" : "is-stacked");
  }, [isDesktopMV, spreadProgress]);

  return (
    <div className={`s12-pages-grid ${mode}`}>
      {items.map((item, index) => (
        <ScrapbookCard
          key={item.title}
          item={item}
          index={index}
          spreadProgress={spreadProgress}
          enableMotion={isDesktop}
        />
      ))}
    </div>
  );
}

export default function ScrapbookPages({
  items,
}: {
  items: readonly ScrapbookItem[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setSection(
      gridRef.current?.closest<HTMLElement>("section.s12-pages") ??
        gridRef.current,
    );
  }, []);

  if (!section) {
    return (
      <div ref={gridRef} className="s12-pages-grid is-spread">
        {items.map((item, index) => (
          <figure key={item.title} className={`s12-page-card r${index % 3}`}>
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
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div ref={gridRef}>
      <ScrapbookPagesMotion items={items} section={section} />
    </div>
  );
}
