"use client";

import { useSyncExternalStore } from "react";
import { getSystemTheme, subscribeToSystemTheme, type Theme } from "@/lib/theme";

export function useTheme(): Theme {
  return useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, () => "dark");
}
