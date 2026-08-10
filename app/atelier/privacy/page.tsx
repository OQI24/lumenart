import type { Metadata } from "next";
import AtelierPrivacy from "@/components/landings/atelier/PrivacyPage";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | LumenArt Atelier",
  description: "Политика обработки персональных данных компании LumenArt",
  robots: { index: false, follow: false },
};

export default function AtelierPrivacyPage() {
  return <AtelierPrivacy />;
}
