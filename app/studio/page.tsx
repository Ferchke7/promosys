import type { Metadata } from "next";
import { StudioHome } from "@/src/features/operations/OperationsWorkspace";

export const metadata: Metadata = {
  title: "Production OS — выбор домена | PROMSYS",
  description: "Выберите производственный домен и откройте отдельные модули PO, WO, Routing, Quality и Digital Twin.",
};

export default function StudioPage() {
  return <StudioHome />;
}
