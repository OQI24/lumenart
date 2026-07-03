"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { STYLE_CATALOG } from "@/lib/constants";
import { SECTION_CHAPTERS } from "@/config/section-chapters";
import SectionLabel from "@/components/ui/SectionLabel";

type StyleItem = (typeof STYLE_CATALOG)[number];

const TRANSITION = { duration: 0.7, ease: "easeInOut" as const };

function getStyleIndex(id: string) {
  return STYLE_CATALOG.findIndex((s) => s.id === id);
}

function CurtainBackground({
  style,
  direction,
  isExiting,
  onExitComplete,
  skipEnterAnimation,
}: {
  style: StyleItem;
  direction: number;
  isExiting: boolean;
  onExitComplete?: () => void;
  skipEnterAnimation?: boolean;
}) {
  const enterFrom = direction > 0 ? "inset(0 0% 0 100%)" : "inset(0 100% 0 0%)";
  const exitTo = direction > 0 ? "inset(0 100% 0 0%)" : "inset(0 0% 0 100%)";

  return (
    <motion.div
      className={`absolute inset-0 ${style.bgClass} ${isExiting ? "z-10" : "z-0"}`}
      initial={
        isExiting
          ? { clipPath: "inset(0 0% 0 0%)" }
          : skipEnterAnimation
            ? { clipPath: "inset(0 0% 0 0%)" }
            : { clipPath: enterFrom }
      }
      animate={{ clipPath: isExiting ? exitTo : "inset(0 0% 0 0%)" }}
      transition={TRANSITION}
      onAnimationComplete={() => {
        if (isExiting) onExitComplete?.();
      }}
      aria-hidden="true"
    >
      {/* TODO: replace bgClass with next/image fill when photos ready */}
    </motion.div>
  );
}

function StyleCard({
  style,
  isActive,
  isDarkTheme,
  onActivate,
}: {
  style: StyleItem;
  isActive: boolean;
  isDarkTheme: boolean;
  onActivate: () => void;
}) {
  const glassBase = isDarkTheme
    ? "bg-black/10 border-black/20 text-gray-900"
    : "bg-white/10 border-white/20 text-white";

  return (
    <button
      type="button"
      className={`rounded-[1.75rem] border p-6 text-left backdrop-blur-sm transition-all duration-500 sm:rounded-[2rem] sm:p-7 ${glassBase} ${
        isActive
          ? "scale-[1.03] border-gold shadow-xl shadow-gold/25"
          : "hover:border-gold/60 hover:scale-[1.01]"
      }`}
      onMouseEnter={onActivate}
      onClick={onActivate}
      aria-pressed={isActive}
    >
      <span className="mb-3 block text-2xl" aria-hidden="true">
        {style.icon}
      </span>
      <h3 className="mb-1 text-lg font-bold sm:text-xl">{style.title}</h3>
      <p className={`text-sm ${isDarkTheme ? "text-gray-700" : "text-white/80"}`}>
        {style.description}
      </p>
    </button>
  );
}

export default function StylesCatalog() {
  const [activeId, setActiveId] = useState<string>(STYLE_CATALOG[0].id);
  const [direction, setDirection] = useState(1);
  const [exitingStyle, setExitingStyle] = useState<StyleItem | null>(null);
  const isAnimating = useRef(false);

  const activeStyle = STYLE_CATALOG.find((s) => s.id === activeId) ?? STYLE_CATALOG[0];
  const isDarkTheme = activeStyle.textTheme === "dark";
  const chapter = SECTION_CHAPTERS.styles!;

  const activateStyle = useCallback(
    (id: string) => {
      if (id === activeId || isAnimating.current) return;

      const prevIndex = getStyleIndex(activeId);
      const nextIndex = getStyleIndex(id);
      const prevStyle = STYLE_CATALOG[prevIndex];

      setDirection(nextIndex > prevIndex ? 1 : -1);
      setExitingStyle(prevStyle);
      setActiveId(id);
      isAnimating.current = true;
    },
    [activeId]
  );

  const handleExitComplete = useCallback(() => {
    setExitingStyle(null);
    isAnimating.current = false;
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <CurtainBackground
          style={activeStyle}
          direction={direction}
          isExiting={false}
          skipEnterAnimation={!exitingStyle}
        />
        {exitingStyle && (
          <CurtainBackground
            style={exitingStyle}
            direction={direction}
            isExiting
            onExitComplete={handleExitComplete}
          />
        )}
      </div>

      <div
        className={`relative z-20 flex h-full flex-col px-4 pb-16 pt-24 sm:px-6 lg:px-8 ${
          isDarkTheme ? "text-gray-900" : "text-white"
        }`}
      >
        <div className="mx-auto w-full max-w-3xl">
          <SectionLabel
            number={chapter.number}
            label={chapter.label}
            className={isDarkTheme ? "text-gray-900" : ""}
          />
        </div>
        <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl lg:text-5xl xl:text-6xl">
          Выберите свой стиль
        </h2>

        <div className="mx-auto grid w-full max-w-3xl flex-1 grid-cols-1 content-center gap-4 sm:grid-cols-2">
          {STYLE_CATALOG.map((style) => (
            <StyleCard
              key={style.id}
              style={style}
              isActive={activeId === style.id}
              isDarkTheme={isDarkTheme}
              onActivate={() => activateStyle(style.id)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {STYLE_CATALOG.map((style) => (
          <button
            key={style.id}
            type="button"
            aria-label={`Стиль: ${style.title}`}
            onClick={() => activateStyle(style.id)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeId === style.id
                ? "w-6 bg-gold"
                : `w-2 ${isDarkTheme ? "bg-gray-900/40" : "bg-white/40"}`
            }`}
          />
        ))}
      </div>
    </div>
  );
}
