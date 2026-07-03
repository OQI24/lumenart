"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PHRASES = [
  "для частных интерьеров",
  "для ресторанов и отелей",
  "для офисов и шоурумов",
  "для архитектурных объектов",
];

export default function HeroRotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block min-h-[1.4em] overflow-hidden text-gold">
      <AnimatePresence mode="wait">
        <motion.span
          key={PHRASES[index]}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {PHRASES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
