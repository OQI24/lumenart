"use client";

import { MouseEvent, ReactNode } from "react";
import {
  isSectionHash,
  scrollToSection,
  sectionIdFromHash,
} from "@/lib/scroll-to-section";
import { Button, buttonVariants } from "@/components/ui/Button";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href?: string;
  children: ReactNode;
  scrollContainerId?: string;
  className?: string;
} & Omit<VariantProps<typeof buttonVariants>, "variant" | "size">;

export default function CtaButton({
  href,
  children,
  scrollContainerId = "snap-container",
  className,
  ...props
}: CtaButtonProps) {
  const classes = cn(buttonVariants({ variant: "gold", size: "cta" }), className);

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
    <Button variant="gold" size="cta" className={className} {...props}>
      {children}
    </Button>
  );
}
