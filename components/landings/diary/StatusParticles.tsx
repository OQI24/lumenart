import { forwardRef, type CSSProperties } from "react";

const PARTICLES = [
  { left: "6%", top: "12%", size: 5, delay: 0, dur: 8.2 },
  { left: "14%", top: "28%", size: 3, delay: 1.1, dur: 6.4 },
  { left: "9%", top: "48%", size: 4, delay: 2.4, dur: 9.1 },
  { left: "18%", top: "66%", size: 3, delay: 0.7, dur: 7.3 },
  { left: "5%", top: "82%", size: 6, delay: 3.2, dur: 8.8 },
  { left: "28%", top: "8%", size: 3, delay: 1.8, dur: 6.9 },
  { left: "34%", top: "22%", size: 5, delay: 0.4, dur: 9.5 },
  { left: "42%", top: "38%", size: 2, delay: 2.9, dur: 5.8 },
  { left: "31%", top: "58%", size: 4, delay: 1.5, dur: 7.7 },
  { left: "38%", top: "78%", size: 3, delay: 3.8, dur: 8.4 },
  { left: "48%", top: "14%", size: 4, delay: 0.9, dur: 6.6 },
  { left: "52%", top: "44%", size: 6, delay: 2.1, dur: 9.8 },
  { left: "56%", top: "68%", size: 3, delay: 4.1, dur: 7.1 },
  { left: "61%", top: "88%", size: 5, delay: 1.3, dur: 8.6 },
  { left: "68%", top: "10%", size: 3, delay: 2.6, dur: 6.2 },
  { left: "72%", top: "30%", size: 4, delay: 0.2, dur: 9.2 },
  { left: "78%", top: "52%", size: 2, delay: 3.5, dur: 5.5 },
  { left: "74%", top: "72%", size: 5, delay: 1.7, dur: 7.9 },
  { left: "82%", top: "18%", size: 3, delay: 4.4, dur: 8.1 },
  { left: "88%", top: "36%", size: 6, delay: 0.6, dur: 9.6 },
  { left: "91%", top: "56%", size: 3, delay: 2.8, dur: 6.8 },
  { left: "86%", top: "76%", size: 4, delay: 1.9, dur: 7.5 },
  { left: "94%", top: "90%", size: 3, delay: 3.1, dur: 8.9 },
  { left: "22%", top: "40%", size: 2, delay: 4.7, dur: 5.9 },
  { left: "64%", top: "48%", size: 3, delay: 0.8, dur: 7.4 },
  { left: "12%", top: "90%", size: 4, delay: 2.2, dur: 9.0 },
  { left: "46%", top: "92%", size: 2, delay: 3.6, dur: 6.1 },
  { left: "96%", top: "8%", size: 3, delay: 1.4, dur: 8.3 },
] as const;

/**
 * Lantern swarm: homes fan along UL radial falloff — not a packed wall.
 * Flight is JS/rAF in DiaryStatusBackdrop (transform translate3d).
 * orbit a|b|c only varies glow tempo.
 * Nest ~×1.55 vs light (8/10) so the dark swarm reads as a wide cloud.
 */
const VOID_SEED = [
  { left: 0.5, top: 0.8, size: 6, delay: 0, dur: 3.4, orbit: "a" },
  { left: 6.1, top: 3.5, size: 4, delay: 0.4, dur: 2.7, orbit: "b" },
  { left: 13.3, top: 1.0, size: 5, delay: 0.85, dur: 3.9, orbit: "c" },
  { left: 0.9, top: 11.9, size: 7, delay: 0.2, dur: 3.1, orbit: "b" },
  { left: 9.9, top: 15.6, size: 4, delay: 1.15, dur: 2.5, orbit: "a" },
  { left: 18.9, top: 9.1, size: 5, delay: 0.55, dur: 3.6, orbit: "c" },
  { left: 3.7, top: 23.0, size: 4, delay: 0.95, dur: 2.3, orbit: "a" },
  { left: 15.1, top: 21.2, size: 6, delay: 0.3, dur: 3.2, orbit: "b" },
  { left: 24.7, top: 14.0, size: 4, delay: 1.35, dur: 2.9, orbit: "c" },
  { left: 0.5, top: 17.8, size: 5, delay: 0.7, dur: 3.5, orbit: "a" },
  { left: 8.0, top: 7.5, size: 4, delay: 1.5, dur: 2.4, orbit: "b" },
  { left: 17.6, top: 27.1, size: 6, delay: 0.15, dur: 3.8, orbit: "c" },
  { left: 28.9, top: 5.4, size: 3, delay: 1.05, dur: 2.6, orbit: "a" },
  { left: 22.6, top: 20.5, size: 5, delay: 0.6, dur: 3.0, orbit: "b" },
  { left: 1.8, top: 31.1, size: 4, delay: 1.25, dur: 2.8, orbit: "c" },
  { left: 12.3, top: 31.7, size: 5, delay: 0.45, dur: 3.3, orbit: "a" },
  { left: 31.6, top: 16.8, size: 4, delay: 0.9, dur: 2.2, orbit: "b" },
  { left: 5.5, top: 19.3, size: 5, delay: 1.4, dur: 3.7, orbit: "c" },
  { left: 26.0, top: 29.8, size: 3, delay: 0.25, dur: 2.5, orbit: "a" },
  { left: 16.1, top: 11.6, size: 4, delay: 0.75, dur: 3.1, orbit: "b" },
  { left: 35.9, top: 10.3, size: 3, delay: 1.1, dur: 2.9, orbit: "c" },
  { left: 20.4, top: 35.4, size: 4, delay: 0.5, dur: 3.4, orbit: "a" },
  { left: 30.3, top: 24.9, size: 3, delay: 1.6, dur: 2.6, orbit: "b" },
  { left: 7.4, top: 26.7, size: 4, delay: 0.35, dur: 3.0, orbit: "c" },
] as const;

const ORBITS = ["a", "b", "c"] as const;

/**
 * Seed + jittered echo (~¾) + sparse outer ring (~⅓).
 * 24 + 18 + 8 → ~50 without packing a wall.
 */
const VOID_SIZE_SCALE = 1.12;

const VOID_PARTICLES = (() => {
  const out: {
    left: number;
    top: number;
    size: number;
    delay: number;
    dur: number;
    orbit: (typeof ORBITS)[number];
  }[] = [];

  const sized = (n: number) => Math.round(n * VOID_SIZE_SCALE * 10) / 10;

  for (let i = 0; i < VOID_SEED.length; i++) {
    const p = VOID_SEED[i];
    out.push({
      left: p.left,
      top: p.top,
      size: sized(p.size),
      delay: p.delay,
      dur: p.dur,
      orbit: p.orbit,
    });
  }

  // Echo ~¾ seed farther along the light falloff
  for (let i = 0; i < VOID_SEED.length; i++) {
    if (i % 4 === 3) continue;
    const p = VOID_SEED[i];
    const jx = ((i * 7) % 17) * 0.34 - 1.2;
    const jy = ((i * 5) % 19) * 0.31 - 0.9;
    out.push({
      left: Math.min(44, Math.max(0.8, p.left + 7.0 + jx)),
      top: Math.min(50, Math.max(1.2, p.top + 5.0 + jy)),
      size: sized(Math.max(3, p.size - 1)),
      delay: p.delay + 0.55 + (i % 5) * 0.08,
      dur: p.dur + 0.2,
      orbit: ORBITS[(i + 1) % 3],
    });
  }

  // Sparse outer ring (~⅓ seed) — still radial cloud, not a wall
  for (let i = 0; i < VOID_SEED.length; i += 3) {
    const p = VOID_SEED[i];
    const jx = ((i * 11) % 13) * 0.43 - 1.4;
    const jy = ((i * 3) % 15) * 0.37 - 1.1;
    out.push({
      left: Math.min(48, Math.max(1.0, p.left + 12.7 + jx)),
      top: Math.min(54, Math.max(1.5, p.top + 9.9 + jy)),
      size: sized(Math.max(2, p.size - 2)),
      delay: p.delay + 1.05 + (i % 4) * 0.1,
      dur: p.dur + 0.35,
      orbit: ORBITS[(i + 2) % 3],
    });
  }

  return out;
})();

type StatusParticlesProps = {
  variant?: "desk" | "void";
};

const StatusParticles = forwardRef<HTMLDivElement, StatusParticlesProps>(
  function StatusParticles({ variant = "desk" }, ref) {
    return (
      <div
        ref={ref}
        className={
          variant === "void" ? "s12-status-crumbs s12-status-crumbs-void" : "s12-status-crumbs"
        }
        aria-hidden="true"
      >
        {variant === "void"
          ? VOID_PARTICLES.map((p, i) => (
              <span
                key={i}
                className="s12-status-crumb-wrap"
                data-home-x={p.left}
                data-home-y={p.top}
                data-orbit={p.orbit}
              >
                <span
                  className="s12-status-crumb"
                  style={
                    {
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      animationDelay: `${p.delay}s`,
                      animationDuration: `${p.dur}s`,
                      "--crumb-glow-dur": `${p.dur}s`,
                    } as CSSProperties
                  }
                />
              </span>
            ))
          : PARTICLES.map((p, i) => (
              <span
                key={i}
                className="s12-status-crumb-wrap"
                style={{ left: p.left, top: p.top }}
              >
                <span
                  className="s12-status-crumb"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.dur}s`,
                  }}
                />
              </span>
            ))}
      </div>
    );
  },
);

export default StatusParticles;
