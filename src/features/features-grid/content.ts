import type { LocalizedContent } from "@/src/shared/i18n/types";
import type { FeatureItem } from "@/src/shared/types/content";

export interface FeaturePreviewContent {
  shift: string;
  billion: string;
  pipeline: string[];
  plan: string;
  suppliers: string[];
}

interface FeaturesContent {
  eyebrow: string;
  title: string;
  description: string;
  items: FeatureItem[];
  customTitle: string;
  customDescription: string;
  customBadge: string;
  preview: FeaturePreviewContent;
}

export const featuresContent: LocalizedContent<FeaturesContent> = {
  ru: {
    eyebrow: "Возможности системы",
    title: "Весь завод — в едином цифровом контуре.",
    description: "От заявки клиента до отгрузки. Модули работают вместе и дают руководству одну версию правды.",
    items: [
      { title: "Управление закупками", description: "Заявки, поставщики и сроки поставок в едином процессе.", icon: "truck", code: "SCM-01", preview: "bars", span: "wide" },
      { title: "Запасы и склады", description: "Точные остатки, партии, ячейки и перемещения.", icon: "warehouse", code: "WMS-02", preview: "grid" },
      { title: "Планирование производства", description: "Реалистичный план с учётом мощностей и сроков.", icon: "route", code: "APS-03", preview: "line", span: "wide" },
      { title: "Сырьё и материалы", description: "Нормы расхода, списания и полная прослеживаемость.", icon: "boxes", code: "MES-04", preview: "ring" },
      { title: "CRM и продажи", description: "От заявки клиента до готового производственного заказа.", icon: "briefcase", code: "CRM-05", preview: "pipeline" },
      { title: "Денежные потоки", description: "Платежи, бюджеты и взаиморасчёты без разрывов.", icon: "wallet", code: "FIN-06", preview: "cash" },
      { title: "Аналитика в реальном времени", description: "KPI, OEE, брак и отклонения на одном экране.", icon: "analytics", code: "BI-07", preview: "report", span: "wide" },
      { title: "Управление персоналом", description: "Смены, выработка и загрузка производственных команд.", icon: "people", code: "HRM-08", preview: "team" },
    ],
    customTitle: "Система адаптируется под ваше производство",
    customDescription: "Добавляем поля, маршруты, роли и отчёты под реальные процессы предприятия.",
    customBadge: "Под заказ",
    preview: { shift: "Смена A", billion: "2.4 млрд", pipeline: ["Лид", "Заказ", "План", "Готово"], plan: "План 94%", suppliers: ["Поставщик A", "Поставщик B", "Поставщик C"] },
  },
  uz: {
    eyebrow: "Tizim imkoniyatlari",
    title: "Butun zavod — yagona raqamli konturda.",
    description: "Mijoz so‘rovidan jo‘natishgacha. Modullar birga ishlaydi va rahbariyatga yagona aniq manzarani beradi.",
    items: [
      { title: "Xaridlarni boshqarish", description: "Arizalar, yetkazib beruvchilar va muddatlar yagona jarayonda.", icon: "truck", code: "SCM-01", preview: "bars", span: "wide" },
      { title: "Zaxira va ombor", description: "Aniq qoldiq, partiya, yacheyka va ko‘chirishlar.", icon: "warehouse", code: "WMS-02", preview: "grid" },
      { title: "Ishlab chiqarishni rejalash", description: "Quvvat va muddatlarni hisobga olgan real reja.", icon: "route", code: "APS-03", preview: "line", span: "wide" },
      { title: "Xomashyo va materiallar", description: "Sarf me’yorlari, hisobdan chiqarish va to‘liq kuzatuv.", icon: "boxes", code: "MES-04", preview: "ring" },
      { title: "CRM va savdo", description: "Mijoz so‘rovidan tayyor ishlab chiqarish buyurtmasigacha.", icon: "briefcase", code: "CRM-05", preview: "pipeline" },
      { title: "Pul oqimlari", description: "To‘lov, budjet va hisob-kitoblar uzilishsiz.", icon: "wallet", code: "FIN-06", preview: "cash" },
      { title: "Real vaqt tahlili", description: "KPI, OEE, nuqson va og‘ishlar bitta ekranda.", icon: "analytics", code: "BI-07", preview: "report", span: "wide" },
      { title: "Xodimlarni boshqarish", description: "Smena, ishlab chiqarish va jamoalar yuklamasi.", icon: "people", code: "HRM-08", preview: "team" },
    ],
    customTitle: "Tizim ishlab chiqarishingizga moslashadi",
    customDescription: "Korxonaning real jarayonlari uchun maydon, marshrut, rol va hisobotlarni sozlaymiz.",
    customBadge: "Moslashtiriladi",
    preview: { shift: "A smena", billion: "2.4 mlrd", pipeline: ["Lid", "Buyurtma", "Reja", "Tayyor"], plan: "Reja 94%", suppliers: ["Ta’minotchi A", "Ta’minotchi B", "Ta’minotchi C"] },
  },
};

