import type { Metadata } from "next";
import MaintenanceScreen from "@/components/MaintenanceScreen";

export const metadata: Metadata = {
  title: "Сайт на обслуживании — LumenArt",
  description:
    "Сайт LumenArt временно на обслуживании. Свяжитесь с нами по телефону, почте или в Telegram.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function MaintenancePage() {
  return <MaintenanceScreen />;
}
