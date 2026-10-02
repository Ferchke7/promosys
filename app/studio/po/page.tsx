import type { Metadata } from "next";
import { ProductionModuleWorkspace } from "@/src/features/operations/OperationsWorkspace";

export const metadata: Metadata = { title: "Production Orders | PROMSYS" };

export default function ProductionOrdersPage() {
  return <ProductionModuleWorkspace module="po" />;
}
