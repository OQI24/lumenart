"use client";

import {
  useEffect,
  type Dispatch,
  type MutableRefObject,
  type RefObject,
  type SetStateAction,
} from "react";

type SpotlightMode = "on" | "static" | "off";
type Anchor = "home" | "cursor";
type Phase = "linger" | "hover" | "dart" | "hesitate";

export type StatusFirefly = {
  el: HTMLElement;
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  anchor: Anchor;
  phase: Phase;
  phaseUntil: number;
  nextDecision: number;
  nextKick: number;
  orbitAng: number;
  orbitR: number;
  curiosity: number;
  twitch: number;
  seed: number;
};

type Firefly = StatusFirefly;

/** UL lantern in % of backdrop (matches static spot ~8% / 10%). */
const LIGHT_X = 0.08;
const LIGHT_Y = 0.1;

const NOTICE_RADIUS = 420;
const RING_MIN_HOME = 45;
const RING_MIN_CURSOR = 48;
const ORBIT_NEAR_HOME = 64;
const ORBIT_FAR_HOME = 304;
const ORBIT_NEAR_CURSOR = 60;
const ORBIT_FAR_CURSOR = 240;
/* Keep idle crumbs in a radial lantern cloud — not a packed wall or long trail */
const DART_FAR_HOME = 448;
const DART_FAR_CURSOR = 320;

/** px/s — insects: chaotic but calmer (~0.45× prior energy). */
const MAX_SPEED_CRAWL = 12.8;
const MAX_SPEED_HOVER = 45.5;
const MAX_SPEED_DART = 105.3;
const MIN_ALIVE_SPEED = 7.4;

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function hash01(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function lightPos(
  anchor: Anchor,
  w: number,
  h: number,
  cursor: { x: number; y: number },
  cursorLive: boolean,
) {
  if (anchor === "cursor" && cursorLive) {
    return { x: cursor.x, y: cursor.y };
  }
  return { x: LIGHT_X * w, y: LIGHT_Y * h };
}

function ringMin(anchor: Anchor) {
  return anchor === "cursor" ? RING_MIN_CURSOR : RING_MIN_HOME;
}

function orbitBand(anchor: Anchor) {
  if (anchor === "cursor") {
    return { near: ORBIT_NEAR_CURSOR, far: ORBIT_FAR_CURSOR, dartFar: DART_FAR_CURSOR };
  }
  return { near: ORBIT_NEAR_HOME, far: ORBIT_FAR_HOME, dartFar: DART_FAR_HOME };
}

function pickOrbitTarget(
  light: { x: number; y: number },
  ang: number,
  r: number,
  wobble: number,
  minR: number,
) {
  const rr = Math.max(r, minR);
  return {
    x: light.x + Math.cos(ang) * rr + rand(-wobble, wobble),
    y: light.y + Math.sin(ang) * rr * 0.85 + rand(-wobble, wobble),
  };
}

/** Slam velocity toward target so the eye reads a real jump. */
function kickToward(p: Firefly, speed: number, sideways = 0) {
  const dx = p.tx - p.x;
  const dy = p.ty - p.y;
  const d = Math.hypot(dx, dy) || 1;
  p.vx = (dx / d) * speed;
  p.vy = (dy / d) * speed;
  if (sideways !== 0) {
    p.vx += (-dy / d) * sideways;
    p.vy += (dx / d) * sideways;
  }
}

function applyPos(p: Firefly) {
  // GPU-friendly flight — left/top stay at 0 (CSS), position via transform.
  p.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
  // Motion streak opposite velocity so eye reads flight, not twinkle.
  const crumb = p.el.firstElementChild as HTMLElement | null;
  if (crumb) {
    const sp = Math.hypot(p.vx, p.vy);
    const trail = Math.min(48, sp * 0.032);
    const tx = sp > 1 ? (-p.vx / sp) * trail : 0;
    const ty = sp > 1 ? (-p.vy / sp) * trail : 0;
    crumb.style.setProperty("--crumb-tx", `${tx.toFixed(1)}px`);
    crumb.style.setProperty("--crumb-ty", `${ty.toFixed(1)}px`);
    crumb.style.setProperty("--crumb-trail", `${Math.max(0.4, trail / 48).toFixed(2)}`);
  }
}

function enterPhase(
  p: Firefly,
  phase: Phase,
  now: number,
  light: { x: number; y: number },
) {
  p.phase = phase;
  const band = orbitBand(p.anchor);
  const minR = ringMin(p.anchor);

  if (phase === "linger") {
    // Rare option only — still micro-crawl, never parked
    p.phaseUntil = now + rand(120, 280);
    p.tx = p.x + rand(-36, 36);
    p.ty = p.y + rand(-30, 30);
    kickToward(p, rand(4.05, 8.1));
    p.nextKick = now + rand(220, 420);
    return;
  }

  if (phase === "hesitate") {
    // Brief coast before next burst
    p.phaseUntil = now + rand(110, 240);
    p.tx = p.x + rand(-22, 22);
    p.ty = p.y + rand(-18, 18);
    kickToward(p, rand(3.15, 6.1));
    p.nextKick = now + rand(180, 360);
    return;
  }

  if (phase === "hover") {
    // Busy shuffle — large orbit hops, calmer cadence
    p.phaseUntil = now + rand(320, 900);
    p.orbitAng += rand(-2.2, 2.4);
    p.orbitR = rand(band.near * 0.9, band.far);
    const t = pickOrbitTarget(light, p.orbitAng, p.orbitR, 36, minR);
    p.tx = t.x;
    p.ty = t.y;
    kickToward(p, rand(21.2, 39.6) * p.twitch, rand(-36, 36));
    p.nextKick = now + rand(240, 480);
    return;
  }

  // dart — obvious relocation: tens–hundreds of px (calmer cadence)
  p.phaseUntil = now + rand(220, 560);
  const mode = Math.random();
  p.orbitAng = Math.random() * Math.PI * 2;
  if (mode < 0.38) {
    p.orbitR = rand(band.far * 0.75, band.dartFar);
  } else if (mode < 0.72) {
    p.orbitAng += Math.PI * rand(0.6, 1.25);
    p.orbitR = rand(band.near, band.far * 1.1);
  } else {
    p.orbitR = rand(band.near, band.far * 0.55);
  }
  const t = pickOrbitTarget(light, p.orbitAng, p.orbitR, 48, minR);
  p.tx = t.x;
  p.ty = t.y;
  kickToward(p, rand(55.6, 99.5) * p.twitch, rand(-81, 81));
  p.nextKick = now + rand(180, 380);
}

function nextPhase(p: Firefly, now: number, light: { x: number; y: number }) {
  // Linger is a rare option, not the default
  const roll = Math.random();
  if (roll < 0.02) enterPhase(p, "linger", now, light);
  else if (roll < 0.06) enterPhase(p, "hesitate", now, light);
  else if (roll < 0.28) enterPhase(p, "hover", now, light);
  else enterPhase(p, "dart", now, light);
}

export function useStatusFireflies({
  rootRef,
  crumbsRef,
  swarmRef,
  cursorRef,
  cursorInRef,
  mode,
  isLight,
  setCursorIn,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  crumbsRef: RefObject<HTMLDivElement | null>;
  swarmRef: MutableRefObject<Firefly[]>;
  cursorRef: MutableRefObject<{ x: number; y: number; active: boolean }>;
  cursorInRef: MutableRefObject<boolean>;
  mode: SpotlightMode;
  isLight: boolean;
  setCursorIn: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    if (isLight || mode === "off") {
      cursorInRef.current = false;
      setCursorIn(false);
      cursorRef.current.active = false;
      for (const p of swarmRef.current) {
        p.vx = 0;
        p.vy = 0;
        p.x = (p.homeX / 100) * (rootRef.current?.clientWidth || 0);
        p.y = (p.homeY / 100) * (rootRef.current?.clientHeight || 0);
        p.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
        p.el.style.setProperty("--crumb-tx", "0px");
        p.el.style.setProperty("--crumb-ty", "0px");
        p.el.style.setProperty("--crumb-trail", "0");
      }
      return;
    }

    const root = rootRef.current;
    const crumbs = crumbsRef.current;
    if (!root || !crumbs) return;

    const size = { w: 0, h: 0 };
    const syncSize = () => {
      size.w = root.clientWidth;
      size.h = root.clientHeight;
    };
    syncSize();

    const wraps = crumbs.querySelectorAll<HTMLElement>(".s12-status-crumb-wrap");
    const now0 = performance.now();
    const w0 = Math.max(1, size.w);
    const h0 = Math.max(1, size.h);
    const homeLight = { x: LIGHT_X * w0, y: LIGHT_Y * h0 };

    swarmRef.current = Array.from(wraps).map((el, i) => {
      const homeX = Number(el.dataset.homeX) || 8;
      const homeY = Number(el.dataset.homeY) || 10;
      const hx = (homeX / 100) * w0;
      const hy = (homeY / 100) * h0;
      const seed = i * 17.13 + 3.7;
      const fly: Firefly = {
        el,
        homeX,
        homeY,
        x: hx + rand(-38, 38),
        y: hy + rand(-38, 38),
        vx: rand(-76.5, 76.5),
        vy: rand(-76.5, 76.5),
        tx: hx,
        ty: hy,
        anchor: "home",
        phase: "dart",
        phaseUntil: now0 + rand(0, 320),
        nextDecision: now0 + rand(320, 1400),
        nextKick: now0 + rand(70, 250),
        orbitAng: hash01(seed) * Math.PI * 2,
        orbitR: rand(ORBIT_NEAR_HOME, ORBIT_FAR_HOME),
        curiosity: 0.48 + hash01(seed + 1) * 0.48,
        twitch: 0.85 + hash01(seed + 2) * 0.55,
        seed,
      };
      enterPhase(fly, Math.random() < 0.72 ? "dart" : "hover", now0, homeLight);
      applyPos(fly);
      return fly;
    });

    let raf = 0;
    let last = performance.now();
    let paused = document.hidden;

    const tick = (now: number) => {
      if (paused || document.hidden) {
        raf = 0;
        return;
      }

      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      const w = size.w;
      const h = size.h;
      if (w <= 0 || h <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const cursor = cursorRef.current;
      const allowCursor = mode === "on" && cursor.active;

      for (const p of swarmRef.current) {
        const light = lightPos(p.anchor, w, h, cursor, allowCursor);
        const minR = ringMin(p.anchor);
        const band = orbitBand(p.anchor);

        if (allowCursor && now >= p.nextDecision) {
          // Eager decisions — more curiosity, shorter wait near the lamp
          p.nextDecision = now + rand(160, 720) * (1.05 - p.curiosity * 0.45);
          const distToCursor = Math.hypot(cursor.x - p.x, cursor.y - p.y);
          const inNotice = distToCursor < NOTICE_RADIUS;
          const nearSwarm =
            Math.hypot(cursor.x - LIGHT_X * w, cursor.y - LIGHT_Y * h) <
            NOTICE_RADIUS * 0.85;

          if (p.anchor === "home" && inNotice) {
            const proximity = 1 - distToCursor / NOTICE_RADIUS;
            const urge =
              p.curiosity * proximity * (nearSwarm ? 1.35 : 1) +
              (nearSwarm ? 0.18 : 0);
            const roll = Math.random();
            if (roll < Math.min(0.92, urge * 0.92)) {
              p.anchor = "cursor";
              p.orbitAng = Math.atan2(p.y - cursor.y, p.x - cursor.x) + rand(-0.9, 0.9);
              p.orbitR = rand(ORBIT_NEAR_CURSOR, ORBIT_FAR_CURSOR);
              enterPhase(p, "dart", now, { x: cursor.x, y: cursor.y });
            } else if (roll < Math.min(0.98, urge * 1.15)) {
              enterPhase(p, "hesitate", now, light);
              const peek = pickOrbitTarget(
                { x: cursor.x, y: cursor.y },
                p.orbitAng,
                rand(70, 160),
                20,
                RING_MIN_CURSOR,
              );
              p.tx = p.x + (peek.x - p.x) * rand(0.4, 0.75);
              p.ty = p.y + (peek.y - p.y) * rand(0.4, 0.75);
              kickToward(p, rand(23.4, 41.0));
            }
          } else if (p.anchor === "cursor") {
            const leave =
              Math.random() < 0.06 + (1 - p.curiosity) * 0.1 ||
              distToCursor > NOTICE_RADIUS * 1.55;
            if (leave) {
              p.anchor = "home";
              enterPhase(p, "dart", now, {
                x: LIGHT_X * w,
                y: LIGHT_Y * h,
              });
            } else if (Math.random() < 0.72) {
              // Stay in lively cloud around the lamp
              p.orbitAng += rand(-1.8, 1.8);
              p.orbitR = rand(ORBIT_NEAR_CURSOR, ORBIT_FAR_CURSOR * (nearSwarm ? 0.85 : 1));
              enterPhase(p, Math.random() < 0.55 ? "hover" : "dart", now, {
                x: cursor.x,
                y: cursor.y,
              });
            }
          }
        } else if (!allowCursor && p.anchor === "cursor") {
          p.anchor = "home";
          enterPhase(p, "dart", now, { x: LIGHT_X * w, y: LIGHT_Y * h });
        }

        if (now >= p.phaseUntil) {
          nextPhase(p, now, lightPos(p.anchor, w, h, cursor, allowCursor));
        }

        // Continuous chaos: retarget + re-kick on a short timer
        if (now >= p.nextKick) {
          const L = lightPos(p.anchor, w, h, cursor, allowCursor);
          if (p.phase === "hover" || p.phase === "dart") {
            p.orbitAng += rand(-1.4, 1.5);
            p.orbitR = rand(
              band.near,
              p.phase === "dart" ? band.dartFar : band.far,
            );
            const t = pickOrbitTarget(L, p.orbitAng, p.orbitR, 40, minR);
            p.tx = t.x;
            p.ty = t.y;
            const spd =
              p.phase === "dart"
                ? rand(45.5, 90.7) * p.twitch
                : rand(19.1, 41.6) * p.twitch;
            kickToward(p, spd, rand(-54, 54));
            p.nextKick = now + rand(200, 420);
          } else {
            p.nextKick = now + rand(280, 520);
          }
        }

        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;
        const px = -ny;
        const py = nx;
        const noiseAmp = (0.7 + p.twitch) * (p.phase === "dart" ? 163.1 : 69.8);
        const n1 = (hash01(p.seed + now * 0.0031) - 0.5) * 2;
        const n2 = (hash01(p.seed * 1.3 + now * 0.0041) - 0.5) * 2;

        let accel = 0;
        let maxSp = MAX_SPEED_HOVER;
        let friction = 0.55;

        if (p.phase === "linger") {
          accel = 14.0 * p.twitch;
          maxSp = MAX_SPEED_CRAWL;
          friction = 2.2;
        } else if (p.phase === "hesitate") {
          accel = 8.8;
          maxSp = MAX_SPEED_CRAWL * 0.9;
          friction = 2.8;
        } else if (p.phase === "hover") {
          accel = 70.2 * p.twitch;
          maxSp = MAX_SPEED_HOVER * (0.85 + p.twitch * 0.25);
          friction = 0.7;
        } else {
          accel = dist > 18 ? 160.9 * p.twitch : 30.6;
          maxSp = MAX_SPEED_DART * (0.85 + p.twitch * 0.3);
          friction = 0.35;
        }

        // Soft lure toward flashlight — desire only, no radius wall
        if (allowCursor && p.anchor === "cursor") {
          const cx = cursor.x - p.x;
          const cy = cursor.y - p.y;
          const cd = Math.hypot(cx, cy) || 1;
          if (cd < NOTICE_RADIUS) {
            const pull = 247.5 * p.curiosity * (1 - cd / NOTICE_RADIUS);
            p.vx += (cx / cd) * pull * dt;
            p.vy += (cy / cd) * pull * dt;
          }
        }

        p.vx += nx * accel * dt + px * n1 * noiseAmp * dt;
        p.vy += ny * accel * dt + py * n2 * noiseAmp * dt;

        const damp = Math.exp(-friction * dt);
        p.vx *= damp;
        p.vy *= damp;

        let sp = Math.hypot(p.vx, p.vy);
        if (sp > maxSp) {
          p.vx = (p.vx / sp) * maxSp;
          p.vy = (p.vy / sp) * maxSp;
          sp = maxSp;
        }

        // Never freeze during active flight
        if (sp < MIN_ALIVE_SPEED && (p.phase === "hover" || p.phase === "dart")) {
          const ang = hash01(p.seed + now * 0.002) * Math.PI * 2;
          const boost = MIN_ALIVE_SPEED * 1.15;
          p.vx = Math.cos(ang) * boost + nx * boost * 0.45;
          p.vy = Math.sin(ang) * boost + ny * boost * 0.45;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Soft home leash only (static UL). Cursor never hard-clamps —
        // that scraped insects along the moving spotlight ring.
        if (p.anchor === "home") {
          const leash = band.dartFar * 1.3;
          const lx = p.x - light.x;
          const ly = p.y - light.y;
          const ld = Math.hypot(lx, ly);
          if (ld > leash) {
            const pullBack = ((ld - leash) / leash) * 101.3;
            p.vx -= (lx / ld) * pullBack * dt;
            p.vy -= (ly / ld) * pullBack * dt;
            if (ld > leash * 1.35 && now >= p.nextKick) {
              p.orbitAng += Math.PI * rand(0.4, 0.9);
              enterPhase(p, "dart", now, light);
            }
          }
        }

        p.x = clamp(p.x, -40, w + 40);
        p.y = clamp(p.y, -40, h + 40);

        applyPos(p);
      }

      raf = requestAnimationFrame(tick);
    };

    const scheduleTick = () => {
      if (!raf && !paused) raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      paused = document.hidden;
      if (paused) {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        return;
      }
      last = performance.now();
      scheduleTick();
    };

    document.addEventListener("visibilitychange", onVisibility);
    scheduleTick();

    const ro = new ResizeObserver(() => {
      syncSize();
    });
    ro.observe(root);

    const onMove = (event: PointerEvent) => {
      if (mode !== "on" || paused) return;
      const w = size.w;
      const h = size.h;
      if (w <= 0 || h <= 0) return;

      // Offset vs viewport: root may not be at (0,0) — use one rect for cursor only.
      const rect = root.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      if (!cursorInRef.current) {
        cursorInRef.current = true;
        setCursorIn(true);
      }

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      root.style.setProperty("--spot-x", `${x}%`);
      root.style.setProperty("--spot-y", `${y}%`);

      cursorRef.current.x = event.clientX - rect.left;
      cursorRef.current.y = event.clientY - rect.top;
      cursorRef.current.active = true;
    };

    const onLeave = () => {
      if (cursorInRef.current) {
        cursorInRef.current = false;
        setCursorIn(false);
      }
      cursorRef.current.active = false;
    };

    if (mode === "on") {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
      window.addEventListener("blur", onLeave);
    }

    return () => {
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (mode === "on") {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("blur", onLeave);
      }
      if (raf) cancelAnimationFrame(raf);
    };
  }, [
    mode,
    isLight,
    rootRef,
    crumbsRef,
    swarmRef,
    cursorRef,
    cursorInRef,
    setCursorIn,
  ]);
}
