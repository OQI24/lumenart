import type { Metadata } from "next";
import DiaryMaintenance from "@/components/landings/diary/MaintenancePage";

export const metadata: Metadata = {
  title: "Сайт на обслуживании | LumenArt Diary",
  description: "Дневник LumenArt временно на обслуживании. Свяжитесь с нами напрямую.",
  robots: { index: false, follow: false },
};

export default function DiaryMaintenancePreviewPage() {
  return <DiaryMaintenance />;
}
