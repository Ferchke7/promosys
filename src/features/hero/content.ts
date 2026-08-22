import type { LocalizedContent } from "@/src/shared/i18n/types";

export interface HeroFactoryContent {
  ariaLabel: string;
  boardLabel: string;
  online: string;
  systemsLabel: string;
  processLabel: string;
  impactLabel: string;
  impactCaption: string;
  before: string;
  after: string;
  connected: string;
  systemRoles: [string, string, string];
  processStages: [string, string, string, string];
  metrics: [HeroFactoryMetric, HeroFactoryMetric, HeroFactoryMetric];
}

export interface HeroFactoryMetric {
  label: string;
  before: string;
  after: string;
  delta: string;
}

interface HeroContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  benefits: string[];
  platformLabel: string;
  trustLabels: string[];
  factory: HeroFactoryContent;
}

export const heroContent: LocalizedContent<HeroContent> = {
  ru: {
    eyebrow: "MES · WMS · APS ДЛЯ ПРОИЗВОДСТВА",
    title: "Производство",
    titleAccent: "без брака и простоев.",
    description: "PROMSYS объединяет план, цех, качество и склад — чтобы средние и крупные предприятия выпускали больше продукции с меньшими потерями.",
    primaryCta: "Заказать демо",
    secondaryCta: "Посмотреть возможности",
    benefits: ["Для средних и крупных предприятий", "От пилота до всего завода"],
    platformLabel: "Единая платформа",
    trustLabels: ["MES", "WMS", "APS", "OEE", "АНАЛИТИКА"],
    factory: {
      ariaLabel: "Объёмная модель предприятия: MES, WMS и APS снижают брак и простои",
      boardLabel: "ЦИФРОВОЙ КОНТУР · ЛИНИЯ 01",
      online: "ONLINE",
      systemsLabel: "Подключаем системы",
      processLabel: "Единый производственный поток",
      impactLabel: "Результат внедрения",
      impactCaption: "Демонстрационный сценарий за 90 дней",
      before: "Было",
      after: "Стало",
      connected: "3 системы синхронизированы",
      systemRoles: ["операции и качество", "сырьё и склад", "план и мощности"],
      processStages: ["Сырьё", "Производство", "Контроль", "Склад"],
      metrics: [
        { label: "Брак", before: "8,4%", after: "2,1%", delta: "−75%" },
        { label: "Простои", before: "14,2%", after: "6,8%", delta: "−52%" },
        { label: "Выполнение плана", before: "68%", after: "94%", delta: "+26%" },
      ],
    },
  },
  uz: {
    eyebrow: "ISHLAB CHIQARISH UCHUN MES · WMS · APS",
    title: "Ishlab chiqarish",
    titleAccent: "nuqson va to‘xtashlarsiz.",
    description: "PROMSYS reja, sex, sifat va omborni birlashtiradi — o‘rta va yirik korxonalar kamroq yo‘qotish bilan ko‘proq mahsulot ishlab chiqarishi uchun.",
    primaryCta: "Demo buyurtma qilish",
    secondaryCta: "Imkoniyatlarni ko‘rish",
    benefits: ["O‘rta va yirik korxonalar uchun", "Pilotdan butun zavodgacha"],
    platformLabel: "Yagona platforma",
    trustLabels: ["MES", "WMS", "APS", "OEE", "TAHLIL"],
    factory: {
      ariaLabel: "MES, WMS va APS nuqson hamda to‘xtashlarni kamaytiradigan hajmli korxona modeli",
      boardLabel: "RAQAMLI KONTUR · LINIYA 01",
      online: "ONLINE",
      systemsLabel: "Tizimlarni ulaymiz",
      processLabel: "Yagona ishlab chiqarish oqimi",
      impactLabel: "Joriy etish natijasi",
      impactCaption: "90 kunlik namoyish ssenariysi",
      before: "Oldin",
      after: "Keyin",
      connected: "3 ta tizim sinxronlashtirildi",
      systemRoles: ["operatsiya va sifat", "xomashyo va ombor", "reja va quvvat"],
      processStages: ["Xomashyo", "Ishlab chiqarish", "Nazorat", "Ombor"],
      metrics: [
        { label: "Nuqson", before: "8,4%", after: "2,1%", delta: "−75%" },
        { label: "To‘xtash", before: "14,2%", after: "6,8%", delta: "−52%" },
        { label: "Reja bajarilishi", before: "68%", after: "94%", delta: "+26%" },
      ],
    },
  },
};
