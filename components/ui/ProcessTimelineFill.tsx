"use client";

import { motion } from "framer-motion";

export default function ProcessTimelineFill() {
  return (
    <motion.div
      className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-gold/0 via-gold to-gold/0 md:left-1/2 md:-translate-x-px"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    />
  );
}
