import type { Metadata } from "next";
import { DemoDomainEntry } from "@/src/features/operations/OperationsWorkspace";

export const metadata: Metadata = {
  title: "Выбор Digital Twin | PROMSYS",
  description: "Выберите производственный домен перед запуском цифрового двойника.",
};

export default function DemoPage() {
  return <DemoDomainEntry />;
}
