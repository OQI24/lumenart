import type { Metadata } from "next";
import { Caveat, Literata, Manrope } from "next/font/google";

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

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DiaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${hand.variable} ${display.variable} ${sans.variable}`}>
      {children}
    </div>
  );
}
