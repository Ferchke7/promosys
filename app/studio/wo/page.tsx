import type { Metadata } from "next";
import { ProductionModuleWorkspace } from "@/src/features/operations/OperationsWorkspace";

export const metadata: Metadata = { title: "Work Orders и Batch | PROMSYS" };

export default function WorkOrdersPage() {
  return <ProductionModuleWorkspace module="wo" />;
}
