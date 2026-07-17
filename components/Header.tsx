"use client";

import { useEffect, useState, useCallback, MouseEvent } from "react";
import { Menu } from "lucide-react";
import { sections } from "@/config/sections";
import type { SectionId } from "@/config/sections";
import { scrollToSection } from "@/lib/scroll-to-section";
import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

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
      const url = id === "hero" ? window.location.pathname : `#${id}`;
      window.history.replaceState(null, "", url);
    },
    [closeMenu, scrollContainerId]
  );

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || !sections.some(({ id }) => id === hash)) return;

    requestAnimationFrame(() => {
      scrollToSection(hash, scrollContainerId);
    });
  }, [scrollContainerId]);

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
        { threshold: 0.55, root }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [scrollContainerId]);

  const navLinkClass = (id: SectionId) =>
    cn(
      "text-sm transition-colors",
      activeSection === id ? "text-gold" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isHeroVisible
            ? "border-transparent bg-transparent"
            : "border-b border-border bg-background/90 backdrop-blur-md"
        )}
      >
        <div className="container-main flex h-14 items-center justify-between sm:h-16">
          <a
            href="#hero"
            className="text-gold"
            onClick={(e) => handleNavClick(e, "hero")}
            aria-label="LumenArt: на главную"
          >
            <Logo variant="icon" height={28} className="sm:hidden" />
            <Logo variant="horizontal" height={32} className="hidden sm:block" />
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

          <Button
            variant="outline"
            size="icon"
            className="border-border text-foreground lg:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent
          side="right"
          className="w-72 border-border bg-background p-0 sm:max-w-xs"
          aria-label="Мобильная навигация"
        >
          <SheetHeader className="border-b border-border p-6 pb-4">
            <SheetTitle className="text-left text-gold">
              <Logo variant="horizontal" height={28} />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 p-4" aria-label="Мобильная навигация">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn("rounded-lg px-4 py-3 text-base", navLinkClass(id))}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
