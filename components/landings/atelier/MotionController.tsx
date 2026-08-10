"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MotionController() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".atelier");
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;

    if (!reduceMotion) {
      lenis = new Lenis({
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.88,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const updateLenis = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      const splitTitles = gsap.utils.toArray<HTMLElement>("[data-split-title]");
      splitTitles.forEach((title) => {
        const label = title.textContent?.trim();
        if (!label) return;

        title.setAttribute("aria-label", label);
        const words = label.split(/\s+/).map((word) => {
          const mask = document.createElement("span");
          const inner = document.createElement("span");
          mask.className = "atelier-word-mask";
          inner.className = "atelier-word";
          mask.setAttribute("aria-hidden", "true");
          inner.textContent = word;
          mask.append(inner);
          return mask;
        });
        title.replaceChildren(...words);

        const inners = title.querySelectorAll<HTMLElement>(".atelier-word");
        const isHero = title.closest(".atelier-hero");
        gsap.fromTo(
          inners,
          { yPercent: 115, rotate: 2.5, autoAlpha: 0 },
          {
            yPercent: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 1.05,
            delay: isHero ? 0.28 : 0,
            ease: "power4.out",
            stagger: 0.075,
            scrollTrigger: isHero
              ? undefined
              : {
                  trigger: title,
                  start: "top 82%",
                  once: true,
                },
          },
        );
      });

      const reveals = gsap.utils.toArray<HTMLElement>("[data-atelier-reveal]");
      reveals.forEach((element) => {
        const items = element.querySelectorAll<HTMLElement>(
          "[data-reveal-item]:not([data-split-title])",
        );
        gsap.fromTo(
          items.length ? items : element.children,
          { y: 32, autoAlpha: 0, rotate: 0.35 },
          {
            y: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: 0.95,
            ease: "power4.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-paper-layer]").forEach((paper) => {
        const distance = Number(paper.dataset.paperLayer ?? 18);
        gsap.fromTo(
          paper,
          { y: distance, rotate: distance > 0 ? 0.8 : -0.8 },
          {
            y: -distance,
            rotate: distance > 0 ? -0.4 : 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: paper.closest("section") ?? paper,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          },
        );
      });

      const heroItems = root.querySelectorAll<HTMLElement>("[data-hero-item]");
      gsap.fromTo(
        heroItems,
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.09,
          delay: 0.35,
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-stack-card]").forEach((card, index, cards) => {
        const next = cards[index + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.94,
          y: -18,
          autoAlpha: 0.78,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 76%",
            end: "top 28%",
            scrub: true,
          },
        });
      });

      const dispatchProgress = () => {
        const anchors = ["opening", "sketch", "materials", "assembly", "first-light", "contacts"]
          .map((id) => document.getElementById(id))
          .filter((element): element is HTMLElement => Boolean(element));
        const position = window.scrollY + window.innerHeight * 0.5;
        let progress = 0;

        if (anchors.length > 1) {
          const last = anchors.length - 1;
          const index = anchors.findIndex((anchor) => anchor.offsetTop > position);
          const endIndex = index === -1 ? last : Math.max(1, index);
          const startIndex = Math.max(0, endIndex - 1);
          const start = anchors[startIndex].offsetTop;
          const end = anchors[endIndex].offsetTop;
          const local = end === start ? 0 : Math.min(1, Math.max(0, (position - start) / (end - start)));
          progress = Math.min(1, (startIndex + local) / last);
        }

        window.dispatchEvent(
          new CustomEvent("atelier:progress", {
            detail: { progress },
          }),
        );
      };
      window.addEventListener("scroll", dispatchProgress, { passive: true });
      dispatchProgress();

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts.ready.then(refresh);

      return () => {
        window.removeEventListener("scroll", dispatchProgress);
        window.removeEventListener("load", refresh);
        gsap.ticker.remove(updateLenis);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        lenis?.destroy();
      };
    }

    root.classList.add("is-reduced-motion");
    window.dispatchEvent(new CustomEvent("atelier:progress", { detail: { progress: 0.82 } }));
  }, []);

  return null;
}
