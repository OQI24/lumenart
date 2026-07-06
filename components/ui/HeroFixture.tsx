"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function HeroFixture() {
  return (
    <div className="cloud-card relative aspect-[4/5] max-h-[28rem] w-full overflow-hidden border border-gold/10 bg-background-card sm:aspect-square lg:max-h-none lg:aspect-[4/5]">
      <Image
        src="/images/stock/hero.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/20" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(198,161,91,0.2),transparent_70%)]"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#C6A15B" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.circle
          cx="200"
          cy="160"
          r="140"
          fill="url(#heroGlow)"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <circle cx="200" cy="160" r="48" fill="none" stroke="#C6A15B" strokeWidth="1" opacity="0.55" />
        <circle cx="200" cy="160" r="10" fill="#C6A15B" opacity="0.95" />

        {RAY_ANGLES.map((angle, index) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 200 + 55 * Math.cos(rad);
          const y1 = 160 + 55 * Math.sin(rad);
          const x2 = 200 + 90 * Math.cos(rad);
          const y2 = 160 + 90 * Math.sin(rad);

          return (
            <motion.line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#C6A15B"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.55, 0.2] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.15,
              }}
            />
          );
        })}
      </svg>

      <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-16 sm:px-8 sm:pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold sm:text-sm">
          Дизайнерский свет
        </p>
        <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-foreground/80">
          Индивидуальные светильники под архитектуру пространства
        </p>
      </div>
    </div>
  );
}
