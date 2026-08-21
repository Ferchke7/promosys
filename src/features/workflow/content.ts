import type { LocalizedContent } from "@/src/shared/i18n/types";
import type { WorkflowStep } from "@/src/shared/types/content";

interface WorkflowContent {
  eyebrow: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
}

export const workflowContent: LocalizedContent<WorkflowContent> = {
  ru: {
    eyebrow: "Сквозной процесс",
    title: "От заказа до отгрузки — без разрывов.",
    description: "Каждый этап передаёт данные следующему автоматически. Команды работают синхронно, а руководитель видит статус в моменте.",
    steps: [
      { number: "01", title: "Заказ", label: "Продажи", icon: "briefcase" },
      { number: "02", title: "План", label: "APS", icon: "route" },
      { number: "03", title: "Производство", label: "MES", icon: "factory" },
      { number: "04", title: "Контроль", label: "OEE / QA", icon: "check" },
      { number: "05", title: "Склад", label: "WMS", icon: "warehouse" },
      { number: "06", title: "Отгрузка", label: "Логистика", icon: "truck" },
    ],
  },
  uz: {
    eyebrow: "Uzluksiz jarayon",
    title: "Buyurtmadan jo‘natishgacha — uzilishsiz.",
    description: "Har bir bosqich ma’lumotni keyingisiga avtomatik uzatadi. Jamoalar bir vaqtda ishlaydi, rahbar esa holatni real vaqtda ko‘radi.",
    steps: [
      { number: "01", title: "Buyurtma", label: "Savdo", icon: "briefcase" },
      { number: "02", title: "Reja", label: "APS", icon: "route" },
      { number: "03", title: "Ishlab chiqarish", label: "MES", icon: "factory" },
      { number: "04", title: "Nazorat", label: "OEE / QA", icon: "check" },
      { number: "05", title: "Ombor", label: "WMS", icon: "warehouse" },
      { number: "06", title: "Jo‘natish", label: "Logistika", icon: "truck" },
    ],
  },
};

