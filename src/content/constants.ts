import type {
  AudienceItem,
  ContactInfo,
  ContentCard,
  FaqItem,
  FeatureItem,
  NavItem,
  ResultItem,
  WorkflowStep,
} from "@/src/shared/types/content";

export const brand = {
  name: "PROMSYS",
  tagline: "Manufacturing intelligence",
} as const;

export const navigation: NavItem[] = [
  { label: "О системе", href: "#about" },
  { label: "Функции", href: "#features" },
  { label: "Для кого", href: "#audience" },
  { label: "Контакты", href: "#contacts" },
];

export const trustLabels = ["MES", "WMS", "APS", "OEE", "АНАЛИТИКА"];

export const problems: ContentCard[] = [
  { title: "Потери и хищения", description: "Непрозрачное движение сырья и готовой продукции.", icon: "shield" },
  { title: "Низкая эффективность", description: "Решения принимаются на основе устаревших данных.", icon: "gauge" },
  { title: "Нет оперативных отчётов", description: "Руководство узнаёт о проблемах слишком поздно.", icon: "chart" },
  { title: "Медленный обмен данными", description: "Цех, склад и продажи работают в разных файлах.", icon: "refresh" },
  { title: "Слабый контроль", description: "Невозможно быстро найти причину отклонения от плана.", icon: "target" },
  { title: "Ручная отчётность", description: "Сотрудники тратят часы на Excel и сверки.", icon: "clock" },
];

export const features: FeatureItem[] = [
  { title: "Управление закупками", description: "Заявки, поставщики и сроки поставок в едином процессе.", icon: "truck", code: "SCM-01", preview: "bars", span: "wide" },
  { title: "Запасы и склады", description: "Точные остатки, партии, ячейки и перемещения.", icon: "warehouse", code: "WMS-02", preview: "grid" },
  { title: "Планирование производства", description: "Реалистичный план с учётом мощностей и сроков.", icon: "route", code: "APS-03", preview: "line", span: "wide" },
  { title: "Сырьё и материалы", description: "Нормы расхода, списания и полная прослеживаемость.", icon: "boxes", code: "MES-04", preview: "ring" },
  { title: "CRM и продажи", description: "От заявки клиента до готового производственного заказа.", icon: "briefcase", code: "CRM-05", preview: "pipeline" },
  { title: "Денежные потоки", description: "Платежи, бюджеты и взаиморасчёты без разрывов.", icon: "wallet", code: "FIN-06", preview: "cash" },
  { title: "Аналитика в реальном времени", description: "KPI, OEE и отклонения на одном экране.", icon: "analytics", code: "BI-07", preview: "report", span: "wide" },
  { title: "Управление персоналом", description: "Смены, выработка и загрузка производственных команд.", icon: "people", code: "HRM-08", preview: "team" },
];

export const workflowSteps: WorkflowStep[] = [
  { number: "01", title: "Заказ", label: "Продажи", icon: "briefcase" },
  { number: "02", title: "План", label: "APS", icon: "route" },
  { number: "03", title: "Производство", label: "MES", icon: "factory" },
  { number: "04", title: "Контроль", label: "OEE / QA", icon: "check" },
  { number: "05", title: "Склад", label: "WMS", icon: "warehouse" },
  { number: "06", title: "Отгрузка", label: "Логистика", icon: "truck" },
];

export const results: ResultItem[] = [
  { value: 100, suffix: "%", label: "Контроль", description: "единый источник достоверных данных" },
  { value: 24, suffix: "/7", label: "Доступность", description: "показатели предприятия всегда под рукой" },
  { value: 2, suffix: " мин", label: "Скорость", description: "на формирование управленческого отчёта" },
  { value: 30, prefix: "−", suffix: "%", label: "Затраты", description: "потенциал снижения операционных потерь" },
  { value: 40, prefix: "−", suffix: "%", label: "Ошибки", description: "меньше ручного ввода и пересчётов" },
  { value: 1, suffix: " экран", label: "Управление", description: "вся картина производства в реальном времени" },
];

export const audiences: AudienceItem[] = [
  { number: "01", title: "Заводы и фабрики", description: "Серийное, дискретное и непрерывное производство.", icon: "factory", tags: ["MES", "APS", "OEE"] },
  { number: "02", title: "Производственные цеха", description: "План смены, выработка, качество и простои.", icon: "settings", tags: ["Смены", "Качество"] },
  { number: "03", title: "Склады", description: "Адресное хранение и точное движение каждой партии.", icon: "warehouse", tags: ["WMS", "Партии"] },
  { number: "04", title: "Логистические центры", description: "От комплектации до контроля своевременной отгрузки.", icon: "truck", tags: ["Маршруты", "SLA"] },
];

export const whyUs: ContentCard[] = [
  { title: "Локальная команда", description: "Поддержка и внедрение на месте, с пониманием реалий предприятий Узбекистана.", icon: "headphones" },
  { title: "Под ваши процессы", description: "Не ломаем работающую модель — адаптируем систему под производство.", icon: "settings" },
  { title: "Поэтапный запуск", description: "Начинаем с приоритетного участка и масштабируем подтверждённый результат.", icon: "layers" },
  { title: "Понятная экономика", description: "Прозрачный объём работ и фокус на измеримом эффекте от внедрения.", icon: "bank" },
];

export const implementationSteps = [
  { number: "01", title: "Аудит", text: "Изучаем процессы и точки потерь" },
  { number: "02", title: "Настройка", text: "Проектируем цифровой контур" },
  { number: "03", title: "Пилот", text: "Запускаем на одном участке" },
  { number: "04", title: "Масштаб", text: "Подключаем всё предприятие" },
];

export const faqs: FaqItem[] = [
  { question: "Что такое MES и чем она отличается от ERP?", answer: "ERP управляет ресурсами предприятия на верхнем уровне, а MES связывает план с реальным производством: заданиями, оборудованием, материалами, качеством и выработкой в цехе." },
  { question: "Сколько времени занимает внедрение?", answer: "Пилотный контур обычно проектируется поэтапно. Срок зависит от количества участков, интеграций и качества исходных данных. После аудита вы получите понятную дорожную карту." },
  { question: "Как рассчитывается стоимость?", answer: "Стоимость зависит от выбранных модулей, числа пользователей, производственных площадок и объёма кастомизации. Мы предлагаем начинать с самого ценного бизнес-сценария." },
  { question: "Подойдёт ли PROMSYS для нашего завода?", answer: "Система подходит производственным предприятиям, цехам, складам и логистическим центрам. На консультации мы разберём процессы и честно оценим применимость решения." },
];

export const contacts: ContactInfo = {
  phone: "+998 90 000-00-00",
  phoneHref: "+998900000000",
  email: "hello@promsys.uz",
  telegram: "@promsys_uz",
  telegramUsername: "promsys_uz",
};
