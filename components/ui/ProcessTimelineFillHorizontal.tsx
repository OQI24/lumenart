"use client";

import { motion } from "framer-motion";

export default function ProcessTimelineFillHorizontal() {
  return (
    <motion.div
      className="absolute left-0 right-0 top-10 h-px origin-left bg-gradient-to-r from-gold/0 via-gold to-gold/0"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    />
  );
}
