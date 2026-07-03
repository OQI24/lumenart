"use client";

import { useEffect } from "react";
import { applyTheme } from "@/lib/theme";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return children;
}
