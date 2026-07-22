import type { Metadata } from "next";
import { Bebas_Neue, Caveat, Literata, Manrope } from "next/font/google";

const hand = Caveat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-diary-hand",
});

const display = Literata({
  subsets: ["latin", "cyrillic"],
  variable: "--font-diary-display",
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-diary-sans",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-diary-bebas-neue",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DiaryLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [hand.variable, display.variable, sans.variable, bebasNeue.variable].join(
    " ",
  );

  return <div className={fontVars}>{children}</div>;
}
