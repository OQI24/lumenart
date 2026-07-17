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

export default function StatusParticles() {
  return (
    <div className="s12-status-crumbs" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="s12-status-crumb"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
