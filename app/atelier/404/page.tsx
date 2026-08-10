import type { Metadata } from "next";
import AtelierNotFound from "@/components/landings/atelier/NotFoundPage";

export const metadata: Metadata = {
  title: "404 — сцена не найдена | LumenArt Atelier",
  description: "Этой страницы нет в ателье LumenArt.",
  robots: { index: false, follow: false },
};

export default function AtelierNotFoundPreviewPage() {
  return <AtelierNotFound />;
}
