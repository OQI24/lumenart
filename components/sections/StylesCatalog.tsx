"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import Image from "next/image";
import { STYLE_CATALOG } from "@/lib/constants";
import { SECTION_CHAPTERS } from "@/config/section-chapters";
import FadeUp from "@/components/ui/FadeUp";
import SectionBackdropText from "@/components/ui/SectionBackdropText";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const chapter = SECTION_CHAPTERS.styles!;
const SCROLL_ROOT_ID = "snap-container";
const STYLES_SECTION_ID = "styles";
const PARALLAX_STRENGTH = 0.22;
const AUTOPLAY_INTERVAL_MS = 5200;
const AUTOPLAY_VISIBLE_THRESHOLD = 0.35;

function smoothstep(value: number): number {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

type StylesSectionScroll = {
  reveal: number;
  parallaxY: number;
};

function useStylesSectionScroll(): StylesSectionScroll {
  const [scroll, setScroll] = useState<StylesSectionScroll>({ reveal: 0, parallaxY: 0 });

  useEffect(() => {
    const section = document.getElementById(STYLES_SECTION_ID);
    const root = document.getElementById(SCROLL_ROOT_ID);
    if (!section || !root) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;

    const update = () => {
      const sectionRect = section.getBoundingClientRect();
      const rootRect = root.getBoundingClientRect();
      const viewHeight = rootRect.height;
      const sectionHeight = sectionRect.height;

      const visibleTop = Math.max(sectionRect.top, rootRect.top);
      const visibleBottom = Math.min(sectionRect.bottom, rootRect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibilityRatio = visibleHeight / Math.min(viewHeight, sectionHeight);
      const rawReveal = Math.min(1, Math.max(0, (visibilityRatio - 0.02) / 0.88));
      const reveal = smoothstep(rawReveal);

      const sectionCenter = sectionRect.top + sectionHeight / 2;
      const viewCenter = rootRect.top + viewHeight / 2;
      const parallaxY = prefersReducedMotion
        ? 0
        : (sectionCenter - viewCenter) * PARALLAX_STRENGTH;

      setScroll({ reveal, parallaxY });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return scroll;
}

function useStylesAutoplay(
  setActiveId: Dispatch<SetStateAction<string>>,
  {
    isPaused,
    isVisible,
  }: {
    isPaused: boolean;
    isVisible: boolean;
  },
) {
  useEffect(() => {
    if (isPaused || !isVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = STYLE_CATALOG.findIndex((style) => style.id === currentId);
        const nextIndex = (currentIndex + 1) % STYLE_CATALOG.length;
        return STYLE_CATALOG[nextIndex].id;
      });
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, isVisible, setActiveId]);
}

export default function StylesCatalog() {
  const [activeId, setActiveId] = useState<string>(STYLE_CATALOG[0].id);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [isGalleryFocused, setIsGalleryFocused] = useState(false);
  const mobileGalleryRef = useRef<HTMLDivElement>(null);
  const { reveal: sectionReveal, parallaxY } = useStylesSectionScroll();

  const expandedId = hoverId ?? activeId;
  const isSectionVisible = sectionReveal >= AUTOPLAY_VISIBLE_THRESHOLD;
  const isAutoplayPaused = hoverId !== null || isGalleryFocused;

  useStylesAutoplay(setActiveId, {
    isPaused: isAutoplayPaused,
    isVisible: isSectionVisible,
  });

  useEffect(() => {
    if (document.documentElement.dataset.programmaticScroll) return;

    const container = mobileGalleryRef.current;
    if (!container || !isSectionVisible) return;

    const target = container.querySelector<HTMLElement>(`[data-style-id="${activeId}"]`);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetLeft = target.offsetLeft;
    const targetWidth = target.offsetWidth;
    const containerWidth = container.clientWidth;
    const scrollLeft = targetLeft - (containerWidth - targetWidth) / 2;

    container.scrollTo({
      left: Math.max(0, scrollLeft),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeId, isSectionVisible]);

  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col justify-center">
      <SectionBackdropText variant="section-anchor" chapterNumber="05" align="right">
        STYLE
      </SectionBackdropText>

      <div
        className="style-gallery-ambient-root pointer-events-none absolute -inset-x-8 -inset-y-24 sm:-inset-x-12 lg:-inset-y-32"
        style={{ opacity: sectionReveal }}
        aria-hidden="true"
      >
        {STYLE_CATALOG.map((style) => {
          const isVisible = expandedId === style.id;

          return (
            <div
              key={style.id}
              className={cn("style-gallery-ambient", isVisible ? "opacity-100" : "opacity-0")}
            >
              <div
                className="style-gallery-ambient-media"
                style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}
              >
                <Image
                  src={style.image}
                  alt=""
                  fill
                  className="style-gallery-ambient-image"
                  sizes="100vw"
                  priority={style.id === STYLE_CATALOG[0].id}
                />
              </div>
              <div className="style-gallery-ambient-scrim" />
              <div className="style-gallery-ambient-vignette" />
              <div className="style-gallery-ambient-edge" />
            </div>
          );
        })}
      </div>

      <div className="container-main relative z-10">
      <SectionHeading
        title="Выберите свой стиль"
        subtitle="Наведите на панель: увидите характер света для каждого направления"
        sectionLabel={chapter.label}
        sectionShape={chapter.shape}
        align="left"
      />

      <FadeUp>
        <div
          className="style-gallery hidden h-[28rem] gap-2 md:flex lg:h-[34rem] lg:gap-2.5"
          onMouseLeave={() => setHoverId(null)}
          onFocusCapture={() => setIsGalleryFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsGalleryFocused(false);
            }
          }}
        >
          {STYLE_CATALOG.map((style, index) => {
            const isExpanded = expandedId === style.id;

            return (
              <button
                key={style.id}
                type="button"
                aria-pressed={activeId === style.id}
                aria-label={`Стиль: ${style.title}`}
                className={cn(
                  "style-gallery-panel group/panel",
                  style.accentClass,
                  isExpanded && "is-expanded",
                )}
                onMouseEnter={() => setHoverId(style.id)}
                onFocus={() => setHoverId(style.id)}
                onBlur={() => setHoverId(null)}
                onClick={() => setActiveId(style.id)}
              >
                <Image
                  src={style.image}
                  alt={style.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/panel:scale-105"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
                <div
                  className={cn(
                    "absolute inset-0 bg-gold/10 opacity-0 transition-opacity duration-500",
                    isExpanded && "opacity-100",
                  )}
                />

                <span
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 text-xs font-medium uppercase tracking-[0.35em] text-white/50 [writing-mode:vertical-rl] transition-opacity duration-200",
                    isExpanded ? "pointer-events-none opacity-0" : "opacity-100",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p
                  className={cn(
                    "absolute bottom-8 right-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/80 [writing-mode:vertical-rl] transition-opacity duration-200",
                    isExpanded ? "pointer-events-none opacity-0" : "opacity-100",
                  )}
                >
                  {style.title}
                </p>

                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-6 text-left lg:p-8",
                    isExpanded
                      ? "pointer-events-auto translate-y-0 opacity-100 transition-[opacity,transform] duration-500 delay-100 ease-out"
                      : "pointer-events-none translate-y-3 opacity-0 transition-[opacity,transform] duration-200 ease-in",
                  )}
                >
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-gold">
                    {String(index + 1).padStart(2, "0")} · направление
                  </p>
                  <h3 className="text-2xl font-bold text-white lg:text-4xl">{style.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80 lg:text-base">
                    {style.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div
          ref={mobileGalleryRef}
          className="style-gallery-mobile -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:hidden"
          onFocusCapture={() => setIsGalleryFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsGalleryFocused(false);
            }
          }}
        >
          {STYLE_CATALOG.map((style, index) => {
            const isActive = activeId === style.id;

            return (
              <button
                key={style.id}
                type="button"
                data-style-id={style.id}
                aria-pressed={isActive}
                onClick={() => setActiveId(style.id)}
                className={cn(
                  "relative h-[22rem] w-[78vw] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border transition-colors",
                  style.accentClass,
                  isActive ? "is-expanded border-gold" : "border-white/10",
                )}
              >
                <Image src={style.image} alt={style.title} fill className="object-cover" sizes="80vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                  <p className="mb-1 text-xs uppercase tracking-[0.25em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-2xl font-bold text-white">{style.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{style.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </FadeUp>
      </div>
    </div>
  );
}
