import type { LocalizedContent } from "@/src/shared/i18n/types";

interface CaseMetric { value: string; label: string }

interface CaseStudyContent {
  eyebrow: string;
  title: string;
  description: string;
  demoLabel: string;
  factoryLabel: string;
  effectLabel: string;
  beforeLabel: string;
  afterLabel: string;
  beforeItems: string[];
  afterItems: string[];
  metrics: CaseMetric[];
}

export const caseStudyContent: LocalizedContent<CaseStudyContent> = {
  ru: {
    eyebrow: "Сценарий внедрения",
    title: "Как PROMSYS меняет работу текстильной фабрики.",
    description: "Демонстрационный пример того, как единый цифровой контур связывает планирование, сырьё, производство и управленческие показатели.",
    demoLabel: "Демонстрационный сценарий",
    factoryLabel: "Текстильная фабрика · 3 производственные линии",
    effectLabel: "Целевой эффект",
    beforeLabel: "До внедрения",
    afterLabel: "После внедрения",
    beforeItems: ["План производства в Excel", "Остатки уточняются вручную", "Причины простоев неизвестны", "Отчёты собираются часами"],
    afterItems: ["Единый план по линиям и сменам", "Онлайн-остатки сырья и пряжи", "Причины отклонений фиксируются", "Руководство видит KPI сразу"],
    metrics: [{ value: "−25%", label: "простоев" }, { value: "−18%", label: "потерь сырья" }, { value: "2 мин", label: "на отчёт" }],
  },
  uz: {
    eyebrow: "Joriy etish ssenariysi",
    title: "PROMSYS to‘qimachilik fabrikasi ishini qanday o‘zgartiradi.",
    description: "Yagona raqamli kontur rejalash, xomashyo, ishlab chiqarish va boshqaruv ko‘rsatkichlarini qanday bog‘lashining namoyish namunasi.",
    demoLabel: "Namoyish ssenariysi",
    factoryLabel: "To‘qimachilik fabrikasi · 3 ta ishlab chiqarish liniyasi",
    effectLabel: "Maqsadli samara",
    beforeLabel: "Joriy etishdan oldin",
    afterLabel: "Joriy etilgandan keyin",
    beforeItems: ["Ishlab chiqarish rejasi Excel’da", "Qoldiq qo‘lda aniqlanadi", "To‘xtash sabablari noma’lum", "Hisobot soatlab yig‘iladi"],
    afterItems: ["Liniya va smenalar bo‘yicha yagona reja", "Xomashyo va ipning onlayn qoldig‘i", "Og‘ish sabablari qayd etiladi", "Rahbariyat KPI’ni darhol ko‘radi"],
    metrics: [{ value: "−25%", label: "to‘xtashlar" }, { value: "−18%", label: "xomashyo yo‘qotishi" }, { value: "2 daq", label: "hisobot uchun" }],
  },
};

