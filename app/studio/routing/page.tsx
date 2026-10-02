import type { Metadata } from "next";
import { ProductionModuleWorkspace } from "@/src/features/operations/OperationsWorkspace";

export const metadata: Metadata = { title: "Technological Routing | PROMSYS" };

export default function RoutingPage() {
  return <ProductionModuleWorkspace module="routing" />;
}
