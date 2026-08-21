import type { LocalizedContent } from "@/src/shared/i18n/types";
import type { AudienceItem } from "@/src/shared/types/content";

interface AudienceContent {
  eyebrow: string;
  title: string;
  description: string;
  rolesLabel: string;
  items: AudienceItem[];
}

export const audienceContent: LocalizedContent<AudienceContent> = {
  ru: {
    eyebrow: "Отрасли и роли",
    title: "Для средних и крупных производственных предприятий.",
    description: "PROMSYS учитывает отраслевую специфику и даёт каждой роли именно те данные, которые нужны для решения её задач.",
    rolesLabel: "Кому помогает",
    items: [
      { number: "01", title: "Машиностроение", description: "Синхронизирует многоэтапную сборку, загрузку станков, комплектность деталей и контроль качества по операциям.", icon: "settings", tags: ["MES", "APS", "OEE"], scale: "Средние и крупные заводы", roles: ["Директор", "Начальник производства", "Технолог", "ОТК"] },
      { number: "02", title: "Аккумуляторы и батарейки", description: "Контролирует партии сырья, рецептуры, параметры линий и прослеживаемость каждой серии до готовой продукции.", icon: "boxes", tags: ["Партии", "Качество", "WMS"], scale: "Серийное производство", roles: ["Директор завода", "Главный технолог", "Лаборатория", "Склад"] },
      { number: "03", title: "Текстиль и лёгкая промышленность", description: "Связывает сырьё, сменные задания, выработку линий и причины брака от пряжи до готового изделия.", icon: "factory", tags: ["Смены", "Нормы", "Качество"], scale: "Фабрики и кластеры", roles: ["Руководитель", "Начальник цеха", "Диспетчер", "Технолог"] },
      { number: "04", title: "Стройматериалы и ЖБИ", description: "Управляет рецептурами, производственными заказами, формами, выдержкой, паспортами качества и отгрузкой.", icon: "warehouse", tags: ["Рецептуры", "QA", "Логистика"], scale: "Заводы и площадки", roles: ["Директор", "Производство", "Лаборатория", "Логист"] },
      { number: "05", title: "Металлообработка и автокомпоненты", description: "Планирует партии и переналадки, отслеживает маршрут детали и показывает фактическую себестоимость заказа.", icon: "route", tags: ["Маршруты", "OEE", "Себестоимость"], scale: "Цеха и группы заводов", roles: ["Операционный директор", "Мастер", "Планировщик", "Экономист"] },
      { number: "06", title: "Пищевая и химическая промышленность", description: "Обеспечивает контроль рецептур, сроков, партий и критических параметров непрерывного производства.", icon: "shield", tags: ["Рецептуры", "HACCP", "Партии"], scale: "Средние и крупные линии", roles: ["Директор", "Технолог", "Контроль качества", "Склад"] },
    ],
  },
  uz: {
    eyebrow: "Sohalar va rollar",
    title: "O‘rta va yirik ishlab chiqarish korxonalari uchun.",
    description: "PROMSYS soha xususiyatlarini hisobga oladi va har bir rolga o‘z vazifasi uchun kerakli ma’lumotni beradi.",
    rolesLabel: "Kimga yordam beradi",
    items: [
      { number: "01", title: "Mashinasozlik", description: "Ko‘p bosqichli yig‘ish, stanoklar yuklamasi, detallar komplekti va har bir operatsiya sifatini sinxronlashtiradi.", icon: "settings", tags: ["MES", "APS", "OEE"], scale: "O‘rta va yirik zavodlar", roles: ["Direktor", "Ishlab chiqarish boshlig‘i", "Texnolog", "Sifat nazorati"] },
      { number: "02", title: "Akkumulyator va batareyalar", description: "Xomashyo partiyalari, retseptura, liniya parametrlari va har bir seriyaning to‘liq kuzatuvini nazorat qiladi.", icon: "boxes", tags: ["Partiya", "Sifat", "WMS"], scale: "Seriyali ishlab chiqarish", roles: ["Zavod direktori", "Bosh texnolog", "Laboratoriya", "Ombor"] },
      { number: "03", title: "To‘qimachilik va yengil sanoat", description: "Xomashyo, smena topshirig‘i, liniya unumdorligi va nuqson sabablarini tayyor mahsulotgacha bog‘laydi.", icon: "factory", tags: ["Smena", "Me’yor", "Sifat"], scale: "Fabrika va klasterlar", roles: ["Rahbar", "Sex boshlig‘i", "Dispetcher", "Texnolog"] },
      { number: "04", title: "Qurilish materiallari va temir-beton", description: "Retseptura, ishlab chiqarish buyurtmasi, qolip, yetiltirish, sifat pasporti va jo‘natishni boshqaradi.", icon: "warehouse", tags: ["Retseptura", "QA", "Logistika"], scale: "Zavod va maydonlar", roles: ["Direktor", "Ishlab chiqarish", "Laboratoriya", "Logist"] },
      { number: "05", title: "Metallga ishlov va avtokomponentlar", description: "Partiya va qayta sozlashni rejalaydi, detal marshrutini kuzatadi va buyurtmaning haqiqiy tannarxini ko‘rsatadi.", icon: "route", tags: ["Marshrut", "OEE", "Tannarx"], scale: "Sex va zavod guruhlari", roles: ["Operatsion direktor", "Usta", "Rejalashtiruvchi", "Iqtisodchi"] },
      { number: "06", title: "Oziq-ovqat va kimyo sanoati", description: "Retseptura, muddat, partiya va uzluksiz ishlab chiqarishning muhim parametrlarini nazorat qiladi.", icon: "shield", tags: ["Retseptura", "HACCP", "Partiya"], scale: "O‘rta va yirik liniyalar", roles: ["Direktor", "Texnolog", "Sifat nazorati", "Ombor"] },
    ],
  },
};

