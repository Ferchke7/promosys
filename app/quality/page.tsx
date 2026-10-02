import type { Metadata } from "next";
import { QualityWorkspace } from "@/src/features/quality/QualityWorkspace";

export const metadata: Metadata = {
  title: "Quality Management — IQC, PQC, QC и OQC | PROMSYS",
  description: "Контроль качества, входные, процессные и выходные инспекции, связанные с PO, WO и Batch.",
};

export default function QualityPage() {
  return <QualityWorkspace />;
}
