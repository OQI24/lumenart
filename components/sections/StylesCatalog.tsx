"use client";

import { useState } from "react";
import Image from "next/image";
import { STYLE_CATALOG } from "@/lib/constants";
import { SECTION_CHAPTERS } from "@/config/section-chapters";
import FadeUp from "@/components/ui/FadeUp";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const chapter = SECTION_CHAPTERS.styles!;

export default function StylesCatalog() {
  const [activeId, setActiveId] = useState<string>(STYLE_CATALOG[0].id);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const expandedId = hoverId ?? activeId;

  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {STYLE_CATALOG.map((style) => {
          const isVisible = expandedId === style.id;

          return (
            <div
              key={style.id}
              className={cn("style-gallery-ambient", isVisible ? "opacity-100" : "opacity-0")}
            >
              <Image
                src={style.image}
                alt=""
                fill
                className="style-gallery-ambient-image"
                sizes="100vw"
                priority={style.id === STYLE_CATALOG[0].id}
              />
              <div className="style-gallery-ambient-scrim" />
              <div className="style-gallery-ambient-vignette" />
            </div>
          );
        })}
      </div>

      <div className="container-main relative z-10">
      <SectionHeading
        title="Выберите свой стиль"
        subtitle="Наведите на панель — увидите характер света для каждого направления"
        sectionLabel={chapter.label}
        sectionShape={chapter.shape}
        align="left"
      />

      <FadeUp>
        <div
          className="style-gallery hidden h-[28rem] gap-2 md:flex lg:h-[34rem] lg:gap-2.5"
          onMouseLeave={() => setHoverId(null)}
        >
          {STYLE_CATALOG.map((style, index) => {
            const isExpanded = expandedId === style.id;

            return (
              <button
                key={style.id}
                type="button"
                aria-pressed={activeId === style.id}
                aria-label={`Стиль: ${style.title}`}
                className={cn("style-gallery-panel group/panel", isExpanded && "is-expanded")}
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
                    {String(index + 1).padStart(2, "0")} — направление
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

        <div className="style-gallery-mobile -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:hidden">
          {STYLE_CATALOG.map((style, index) => {
            const isActive = activeId === style.id;

            return (
              <button
                key={style.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(style.id)}
                className={cn(
                  "relative h-[22rem] w-[78vw] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border transition-colors",
                  isActive ? "border-gold" : "border-white/10",
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
