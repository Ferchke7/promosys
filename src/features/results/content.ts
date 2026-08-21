import type { LocalizedContent } from "@/src/shared/i18n/types";
import type { ResultItem } from "@/src/shared/types/content";

interface ResultsContent {
  eyebrow: string;
  title: string;
  description: string;
  items: ResultItem[];
}

export const resultsContent: LocalizedContent<ResultsContent> = {
  ru: {
    eyebrow: "Результат автоматизации",
    title: "Решения быстрее. Потери меньше. Картина яснее.",
    description: "PROMSYS превращает производственные данные в понятные управленческие действия.",
    items: [
      { value: 100, suffix: "%", label: "Контроль", description: "единый источник достоверных данных" },
      { value: 24, suffix: "/7", label: "Доступность", description: "показатели предприятия всегда под рукой" },
      { value: 2, suffix: " мин", label: "Скорость", description: "на формирование управленческого отчёта" },
      { value: 30, prefix: "−", suffix: "%", label: "Затраты", description: "потенциал снижения операционных потерь" },
      { value: 40, prefix: "−", suffix: "%", label: "Ошибки", description: "меньше ручного ввода и пересчётов" },
      { value: 1, suffix: " экран", label: "Управление", description: "вся картина производства в реальном времени" },
    ],
  },
  uz: {
    eyebrow: "Avtomatlashtirish natijasi",
    title: "Qaror tezroq. Yo‘qotish kamroq. Manzara aniqroq.",
    description: "PROMSYS ishlab chiqarish ma’lumotlarini tushunarli boshqaruv harakatlariga aylantiradi.",
    items: [
      { value: 100, suffix: "%", label: "Nazorat", description: "ishonchli ma’lumotlarning yagona manbai" },
      { value: 24, suffix: "/7", label: "Mavjudlik", description: "korxona ko‘rsatkichlari doim qo‘l ostida" },
      { value: 2, suffix: " daq", label: "Tezlik", description: "boshqaruv hisobotini tayyorlash uchun" },
      { value: 30, prefix: "−", suffix: "%", label: "Xarajat", description: "operatsion yo‘qotishlarni kamaytirish salohiyati" },
      { value: 40, prefix: "−", suffix: "%", label: "Xatolar", description: "qo‘lda kiritish va qayta hisoblash kamroq" },
      { value: 1, suffix: " ekran", label: "Boshqaruv", description: "ishlab chiqarishning real vaqtdagi to‘liq manzarasi" },
    ],
  },
};
