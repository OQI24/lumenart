"use client";

import * as React from "react";
import { useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useAnimate, stagger, type Transition } from "framer-motion";

const TAGS = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "span"] as const;

type Tag = (typeof TAGS)[number];

type FontStyle = {
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number | string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
  textAlign?: React.CSSProperties["textAlign"];
};

type StaggeredLettersProps = {
  text?: string;
  font?: FontStyle;
  color?: string;
  tag?: Tag;
  y?: number;
  startOpacity?: number;
  transition?: Transition;
  staggerMs?: number;
};

export default function StaggeredLetters({
  text = "Staggered Letters",
  font = {
    fontFamily: "Inter",
    fontWeight: 700,
    fontSize: 120,
    lineHeight: 1.1,
    letterSpacing: 0,
    textAlign: "left",
  },
  color = "#FFFFFF",
  tag = "h3",
  y = 50,
  startOpacity = 1,
  transition = { type: "spring", stiffness: 200, damping: 15, mass: 1 },
  staggerMs = 30,
}: StaggeredLettersProps) {
  const [scope, animate] = useAnimate();
  const hasFiredRef = useRef(false);

  const normalizedOpacity = (startOpacity ?? 0) / 100;

  const resetToHidden = useCallback(() => {
    if (!scope.current) return;
    animate(".char", { y, opacity: normalizedOpacity }, { duration: 0 });
  }, [animate, y, normalizedOpacity, scope]);

  const runAppear = useCallback(() => {
    if (!scope.current) return;

    const staggerSeconds = Math.max(0, Math.round(staggerMs ?? 0)) / 1000;

    const animationConfig = {
      ...transition,
      delay: stagger(staggerSeconds),
    };

    animate(".char", { y: 0, opacity: 1 }, animationConfig as any);
  }, [animate, transition, staggerMs, scope]);

  useEffect(() => {
    resetToHidden();
    hasFiredRef.current = false;

    const t = setTimeout(runAppear, 50);
    return () => clearTimeout(t);
  }, [runAppear, resetToHidden]);

  const fontStyles = (font ?? {}) as React.CSSProperties;

  const safeTag = (TAGS as readonly string[]).includes(tag) ? tag : "h3";
  const MotionTag = motion[safeTag as keyof typeof motion] as any;

  // Group by words; glue trailing punctuation to the previous word ("проект?").
  const tokens = useMemo(() => {
    const raw = (text ?? "").split(/(\s+)/);
    const out: string[] = [];
    for (const token of raw) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        out.push(token);
        continue;
      }
      if (/^[.,!?;:…]+$/.test(token) && out.length > 0) {
        let i = out.length - 1;
        while (i >= 0 && /^\s+$/.test(out[i]!)) i -= 1;
        if (i >= 0) {
          out[i] = `${out[i]}${token}`;
          continue;
        }
      }
      // Also split "word ?" style already fixed in copy — keep words intact
      out.push(token);
    }
    return out;
  }, [text]);

  return (
    <MotionTag
      ref={scope}
      style={{
        margin: 0,
        display: "block",
        width: "100%",
        whiteSpace: "normal",
        textAlign: fontStyles.textAlign ?? "left",
        color,
        ...fontStyles,
        overflow: "visible",
      }}
    >
      {tokens.map((token, tokenIndex) => {
        if (/^\s+$/.test(token)) {
          return <span key={`sp-${tokenIndex}`}>{" "}</span>;
        }

        return (
          <span
            key={`w-${tokenIndex}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {token.split("").map((char, charIndex) => (
              <motion.span
                key={`${tokenIndex}-${charIndex}`}
                className="char"
                style={{
                  display: "inline-block",
                  opacity: normalizedOpacity,
                  y: y,
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </MotionTag>
  );
}