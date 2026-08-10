import type { Metadata } from "next";
import AtelierMaintenance from "@/components/landings/atelier/MaintenancePage";

export const metadata: Metadata = {
  title: "Сайт на обслуживании | LumenArt Atelier",
  description: "Ателье LumenArt временно на обслуживании. Свяжитесь с нами напрямую.",
  robots: { index: false, follow: false },
};

export default function AtelierMaintenancePreviewPage() {
  return <AtelierMaintenance />;
}
