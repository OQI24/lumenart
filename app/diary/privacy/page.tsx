import type { Metadata } from "next";
import DiaryPrivacy from "@/components/landings/diary/PrivacyPage";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | LumenArt Diary",
  description: "Политика обработки персональных данных компании LumenArt",
  robots: { index: false, follow: false },
};

export default function DiaryPrivacyPage() {
  return <DiaryPrivacy />;
}
