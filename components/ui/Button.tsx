"use client";

import { ReactNode, ButtonHTMLAttributes, MouseEvent } from "react";
import {
  isSectionHash,
  scrollToSection,
  sectionIdFromHash,
} from "@/lib/scroll-to-section";

type ButtonVariant = "primary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
  scrollContainerId?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-gold text-background font-semibold hover:opacity-90 shadow-lg shadow-gold/20",
  outline: "border border-gold/60 text-gold hover:bg-gold/10",
  ghost: "text-muted hover:text-white",
};

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  scrollContainerId = "snap-container",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm sm:text-base transition-all duration-200 ${variantClasses[variant]} ${className}`;

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!href || !isSectionHash(href)) return;
    e.preventDefault();
    scrollToSection(sectionIdFromHash(href), scrollContainerId);
  };

  if (href) {
    return (
      <a href={href} className={classes} onClick={handleAnchorClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
