"use client";

import { useEffect, useState, useCallback, MouseEvent } from "react";
import { sections } from "@/config/sections";
import type { SectionId } from "@/config/sections";
import { scrollToSection } from "@/lib/scroll-to-section";

interface HeaderProps {
  scrollContainerId?: string;
}

export default function Header({ scrollContainerId = "snap-container" }: HeaderProps) {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleNavClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
      e.preventDefault();
      closeMenu();
      scrollToSection(id, scrollContainerId);
    },
    [closeMenu, scrollContainerId]
  );

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.3, root: document.getElementById(scrollContainerId) }
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, [scrollContainerId]);

  useEffect(() => {
    const root = document.getElementById(scrollContainerId);
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4, root }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [scrollContainerId]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinkClass = (id: SectionId) =>
    `text-sm transition-colors ${
      activeSection === id ? "text-gold" : "text-muted hover:text-foreground"
    }`;

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isHeroVisible
            ? "border-transparent bg-transparent"
            : "border-b border-white/5 bg-background/90 backdrop-blur-md"
        }`}
      >
        <div className="container-main flex h-14 items-center justify-between sm:h-16">
          <a
            href="#hero"
            className="text-lg font-bold tracking-wide text-gold"
            onClick={(e) => handleNavClick(e, "hero")}
          >
            LumenArt
          </a>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Основная навигация">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={navLinkClass(id)}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-foreground lg:hidden"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeMenu} aria-hidden="true" />
          <nav
            className="absolute right-0 top-0 flex h-full w-72 flex-col gap-1 bg-background p-6 pt-20 shadow-2xl"
            aria-label="Мобильная навигация"
          >
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`rounded-lg px-4 py-3 text-base ${navLinkClass(id)}`}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
