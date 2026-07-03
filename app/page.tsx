import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isMaintenanceDeploy, isProdDeploy } from "@/lib/deploy";
import HomePage from "./home/page";

export const metadata: Metadata = isProdDeploy()
  ? {}
  : {
      robots: {
        index: false,
        follow: false,
      },
    };

export default function Home() {
  if (isMaintenanceDeploy()) {
    redirect("/maintenance");
  }

  return <HomePage />;
}
