import type { Metadata } from "next";
import AtelierLanding from "@/components/landings/atelier/Landing";

export const metadata: Metadata = {
  title: "LumenArt Atelier — свет как сцена",
  description:
    "Экспериментальный WebGL-лендинг LumenArt: индивидуальное освещение, проект, производство и монтаж.",
  robots: { index: false, follow: false },
};

export default function AtelierPage() {
  return <AtelierLanding />;
}
