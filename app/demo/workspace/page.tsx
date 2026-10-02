import type { Metadata } from "next";
import { DigitalTwinStudio } from "@/src/features/digital-twin/DigitalTwinStudio";

export const metadata: Metadata = {
  title: "Digital Twin Workspace | PROMSYS",
  description: "Конструктор и симулятор выбранного производственного домена.",
};

export default function DigitalTwinWorkspacePage() {
  return <DigitalTwinStudio />;
}
