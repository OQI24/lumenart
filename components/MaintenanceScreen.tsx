"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { SITE } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const contacts = [
  {
    label: "Телефон",
    value: SITE.phone,
    href: `tel:${SITE.phoneRaw}`,
    icon: Phone,
  },
  {
    label: "Почта",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: Mail,
  },
  {
    label: "Telegram",
    value: SITE.social.telegramHandle,
    href: SITE.social.telegram,
    icon: Send,
  },
] as const;

export default function MaintenanceScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[min(90vw,640px)] w-[min(90vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[15%] top-[20%] h-40 w-40 rounded-full bg-gold/8 blur-2xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[18%] right-[12%] h-52 w-52 rounded-full bg-gold/6 blur-2xl"
          animate={{ x: [0, -24, 0], y: [0, 16, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/70"
            style={{
              left: `${12 + i * 14}%`,
              top: `${22 + (i % 3) * 18}%`,
            }}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.6, 1.4, 0.6],
            }}
            transition={{
              duration: 2.4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35,
            }}
          />
        ))}

        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07]"
          aria-hidden
        >
          <defs>
            <radialGradient id="beam" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor="#c6a15b" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <motion.rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#beam)"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-xl text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-6 flex justify-center">
          <motion.div
            className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-background-card/80 shadow-[0_0_40px_rgba(198,161,91,0.15)]"
            animate={{ boxShadow: ["0 0 20px rgba(198,161,91,0.15)", "0 0 48px rgba(198,161,91,0.35)", "0 0 20px rgba(198,161,91,0.15)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-3xl font-bold text-gold">L</span>
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/50"
              animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>

        <motion.p variants={item} className="mb-2 text-sm uppercase tracking-[0.35em] text-gold/80">
          LumenArt
        </motion.p>

        <motion.h1
          variants={item}
          className="mb-4 text-3xl font-bold text-foreground sm:text-4xl"
        >
          Сайт на обслуживании
        </motion.h1>

        <motion.p variants={item} className="mb-10 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Мы готовим новую версию. По всем вопросам — свяжитесь с нами удобным
          способом:
        </motion.p>

        <motion.div variants={item} className="space-y-3">
          {contacts.map((contact) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.label === "Telegram" ? "_blank" : undefined}
              rel={contact.label === "Telegram" ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-background-card/60 px-5 py-4 text-left backdrop-blur-sm transition-colors hover:border-gold/35 hover:bg-background-card"
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                <contact.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                  {contact.label}
                </span>
                <span className="block truncate text-sm font-medium text-foreground sm:text-base">
                  {contact.value}
                </span>
              </span>
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          variants={item}
          className="mt-10 text-xs text-muted-foreground/70"
        >
          Скоро вернёмся с обновлённым сайтом
        </motion.p>
      </motion.div>
    </div>
  );
}
