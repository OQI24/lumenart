import type { Metadata } from "next";
import { Bebas_Neue, Caveat, Literata, Manrope } from "next/font/google";

const hand = Caveat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-atelier-hand",
});

const display = Literata({
  subsets: ["latin", "cyrillic"],
  variable: "--font-atelier-display",
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-atelier-sans",
});

const condensed = Bebas_Neue({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-atelier-condensed",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AtelierLayout({ children }: { children: React.ReactNode }) {
  const fonts = [hand.variable, display.variable, sans.variable, condensed.variable].join(" ");
  return <div className={fonts}>{children}</div>;
}
