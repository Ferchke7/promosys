import type { LocalizedContent } from "@/src/shared/i18n/types";

export interface HeroFactoryContent {
  ariaLabel: string;
  boardLabel: string;
  online: string;
  effectLabel: string;
  before: string;
  after: string;
  defect: string;
  downtime: string;
  plan: string;
  connected: string;
  systemRoles: [string, string, string];
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
      effectLabel: "Эффект после подключения",
      before: "Было",
      after: "Стало",
      defect: "Брак",
      downtime: "Простои",
      plan: "Выполнение плана",
      connected: "3 системы синхронизированы",
      systemRoles: ["операции и качество", "сырьё и склад", "план и мощности"],
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
      effectLabel: "Ulangandan keyingi samara",
      before: "Oldin",
      after: "Keyin",
      defect: "Nuqson",
      downtime: "To‘xtash",
      plan: "Reja bajarilishi",
      connected: "3 ta tizim sinxronlashtirildi",
      systemRoles: ["operatsiya va sifat", "xomashyo va ombor", "reja va quvvat"],
    },
  },
};

