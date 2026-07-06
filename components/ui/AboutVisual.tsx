"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutVisual() {
  return (
    <div className="cloud-card relative aspect-[4/5] w-full overflow-hidden border border-gold/10 bg-background-card sm:aspect-square lg:aspect-[4/5]">
      <Image
        src="/images/stock/about.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/35 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_45%,rgba(198,161,91,0.15),transparent_70%)]"
        aria-hidden="true"
      />

      <svg viewBox="0 0 400 300" className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={40 + i * 80}
            y1="60"
            x2={40 + i * 80}
            y2="240"
            stroke="#C6A15B"
            strokeWidth="0.75"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>

      <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-14 sm:px-8 sm:pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold sm:text-sm">
          Производство и монтаж
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Полный цикл — от эскиза до включения световых сценариев
        </p>
      </div>
    </div>
  );
}
