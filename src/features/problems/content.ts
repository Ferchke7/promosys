import type { LocalizedContent } from "@/src/shared/i18n/types";
import type { ContentCard } from "@/src/shared/types/content";

interface ProblemsContent {
  eyebrow: string;
  title: string;
  description: string;
  items: ContentCard[];
  solutionTitle: string;
  solutionDescription: string;
  solutionLink: string;
}

export const problemsContent: LocalizedContent<ProblemsContent> = {
  ru: {
    eyebrow: "Слабые места",
    title: "Что мешает производству расти?",
    description: "Большинство потерь начинается не в оборудовании, а в разрозненных данных и запоздалых решениях.",
    items: [
      { title: "Потери и хищения", description: "Непрозрачное движение сырья и готовой продукции.", icon: "shield" },
      { title: "Низкая эффективность", description: "Решения принимаются на основе устаревших данных.", icon: "gauge" },
      { title: "Нет оперативных отчётов", description: "Руководство узнаёт о проблемах слишком поздно.", icon: "chart" },
      { title: "Медленный обмен данными", description: "Цех, склад и продажи работают в разных файлах.", icon: "refresh" },
      { title: "Слабый контроль", description: "Невозможно быстро найти причину отклонения от плана.", icon: "target" },
      { title: "Ручная отчётность", description: "Сотрудники тратят часы на Excel и сверки.", icon: "clock" },
    ],
    solutionTitle: "PROMSYS объединяет процессы",
    solutionDescription: "Один цифровой контур вместо десятков таблиц и несвязанных систем.",
    solutionLink: "Как это работает",
  },
  uz: {
    eyebrow: "Zaif nuqtalar",
    title: "Ishlab chiqarish o‘sishiga nima xalaqit beradi?",
    description: "Yo‘qotishlarning aksariyati uskunada emas, tarqoq ma’lumotlar va kechikkan qarorlarda boshlanadi.",
    items: [
      { title: "Yo‘qotish va o‘g‘irlik", description: "Xomashyo va tayyor mahsulot harakati shaffof emas.", icon: "shield" },
      { title: "Past samaradorlik", description: "Qarorlar eskirgan ma’lumotlarga asoslanadi.", icon: "gauge" },
      { title: "Tezkor hisobot yo‘q", description: "Rahbariyat muammo haqida juda kech biladi.", icon: "chart" },
      { title: "Sekin ma’lumot almashinuvi", description: "Sex, ombor va savdo turli fayllarda ishlaydi.", icon: "refresh" },
      { title: "Nazorat zaif", description: "Rejadan og‘ish sababini tez topib bo‘lmaydi.", icon: "target" },
      { title: "Qo‘lda hisobot", description: "Xodimlar Excel va solishtirishga soatlab vaqt sarflaydi.", icon: "clock" },
    ],
    solutionTitle: "PROMSYS jarayonlarni birlashtiradi",
    solutionDescription: "O‘nlab jadvallar va uzilgan tizimlar o‘rniga yagona raqamli kontur.",
    solutionLink: "Qanday ishlaydi",
  },
};
