"use client";

import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type HeaderNavLink = {
  href: string;
  label: string;
};

type HeaderNavProps = {
  brand: string;
  tagline: string;
  homeHref?: string;
  toc: readonly HeaderNavLink[];
  menu: readonly HeaderNavLink[];
  ctaHref?: string;
  ctaLabel?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const DESKTOP_MQ = "(min-width: 1100px)";

function MenuIcon({ open }: { open?: boolean }) {
  return (
    <span
      className={`s12-menu-icon${open ? " is-open" : ""}`}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
    </span>
  );
}

export default function HeaderNav({
  brand,
  tagline,
  homeHref = "#opening",
  toc,
  menu,
  ctaHref = "#last",
  ctaLabel = "К чистой странице",
}: HeaderNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.36;

  const close = useCallback(() => setOpen(false), []);

  const goHome = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      close();

      const id = homeHref.startsWith("#") ? homeHref.slice(1) : "";
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      if (id) {
        window.history.replaceState(null, "", `#${id}`);
      }
    },
    [close, homeHref, reduceMotion]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    onChange();
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const sheet =
    mounted &&
    createPortal(
      <div
        className="s12 s12-nav-host"
        data-diary-nav-host=""
        data-open={open ? "true" : undefined}
      >
        <AnimatePresence>
          {open ? (
            <motion.button
              key="diary-nav-backdrop"
              type="button"
              className="s12-nav-backdrop"
              aria-label="Закрыть меню"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration, ease: EASE }}
              onClick={close}
            />
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {open ? (
            <motion.aside
              key="diary-nav-panel"
              ref={panelRef}
              id={panelId}
              className="s12-nav-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Навигация по тетради"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration, ease: EASE }}
            >
              <div className="s12-nav-panel-head">
                <p className="s12-hand s12-hand-ink">{"Содержание"}</p>
                <button
                  type="button"
                  className="s12-nav-close"
                  aria-label="Закрыть"
                  onClick={() => {
                    close();
                    triggerRef.current?.focus();
                  }}
                >
                  <MenuIcon open />
                </button>
              </div>
              <nav className="s12-nav-list" aria-label="Разделы дневника">
                {menu.map((item) => (
                  <a key={item.href} href={item.href} onClick={close}>
                    {item.label}
                  </a>
                ))}
              </nav>
              <a className="s12-nav-cta" href={ctaHref} onClick={close}>
                {ctaLabel}
              </a>
            </motion.aside>
          ) : null}
        </AnimatePresence>
      </div>,
      document.body
    );

  return (
    <>
      <a
        className="s12-header-brand"
        href={homeHref}
        aria-label="К началу дневника"
        onClick={goHome}
      >
        <b>{brand}</b>
        <span>{tagline}</span>
      </a>

      <nav className="s12-toc" aria-label="Содержание тетради">
        {toc.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="s12-header-cta" href={ctaHref}>
        {ctaLabel}
      </a>

      <button
        ref={triggerRef}
        type="button"
        className="s12-burger"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <MenuIcon open={open} />
      </button>

      {sheet}
    </>
  );
}
