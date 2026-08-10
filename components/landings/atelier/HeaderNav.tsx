"use client";

import { useEffect, useState } from "react";
import {
  ATELIER_COPY,
  ATELIER_MOBILE_NAV,
  ATELIER_TOC,
} from "@/lib/landings/atelier-content";

export default function HeaderNav() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const update = () => setStuck(window.scrollY > 20);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`atelier-nav${stuck ? " is-stuck" : ""}`}>
        <a className="atelier-brand" href="#opening" aria-label="LumenArt Atelier">
          <strong>{ATELIER_COPY.brand}</strong>
          <span>{ATELIER_COPY.tagline}</span>
        </a>

        <nav className="atelier-nav-links" aria-label={ATELIER_COPY.menu}>
          {ATELIER_TOC.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="atelier-nav-request" href="#contacts">
          {ATELIER_COPY.request}
        </a>

        <button
          className="atelier-menu-button"
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <aside className={`atelier-mobile-menu${open ? " is-open" : ""}`} hidden={!open}>
        <p>{ATELIER_COPY.menu}</p>
        {ATELIER_MOBILE_NAV.map((item, index) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        ))}
      </aside>
    </>
  );
}
