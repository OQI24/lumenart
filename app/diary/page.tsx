import type { Metadata } from "next";
import Landing from "@/components/landings/diary/Landing";

export const metadata: Metadata = {
  title: "LumenArt Workshop Diary",
  description: "Дневник создания индивидуального света",
  robots: { index: false, follow: false },
};

export default function DiaryPage() {
  return <Landing />;
}
