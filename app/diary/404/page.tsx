import type { Metadata } from "next";
import DiaryNotFound from "@/components/landings/diary/NotFoundPage";

export const metadata: Metadata = {
  title: "404 — страница не найдена | LumenArt Diary",
  description: "Этой записи нет в тетради проекта LumenArt.",
  robots: { index: false, follow: false },
};

export default function DiaryNotFoundPreviewPage() {
  return <DiaryNotFound />;
}
