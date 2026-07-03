export type Theme = "light" | "dark";

const MEDIA_QUERY = "(prefers-color-scheme: dark)";

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia(MEDIA_QUERY).matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export function subscribeToSystemTheme(onChange: () => void) {
  const media = window.matchMedia(MEDIA_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
