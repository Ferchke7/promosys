import type { LocalizedContent } from "@/src/shared/i18n/types";
import type { LeadValidationMessages, TelegramMessageLabels } from "@/src/shared/types/content";

interface ContactContent {
  eyebrow: string;
  title: string;
  description: string;
  phoneLabel: string;
  dataNotice: string;
  formEyebrow: string;
  formTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  phoneFieldLabel: string;
  consentLabel: string;
  submit: string;
  success: string;
  popupError: string;
  validation: LeadValidationMessages;
  telegram: TelegramMessageLabels;
}

export const contactContent: LocalizedContent<ContactContent> = {
  ru: {
    eyebrow: "Начнём с разговора",
    title: "Покажем, где производство теряет деньги.",
    description: "Оставьте контакты. На первой встрече разберём процессы и предложим реалистичный сценарий автоматизации.",
    phoneLabel: "Телефон",
    dataNotice: "Ваши данные используются только для связи по заявке.",
    formEyebrow: "Запросить демо",
    formTitle: "Расскажите о предприятии",
    nameLabel: "Ваше имя",
    namePlaceholder: "Азиз",
    companyLabel: "Компания",
    companyPlaceholder: "Название предприятия",
    phoneFieldLabel: "Номер телефона",
    consentLabel: "Я согласен на обработку данных для связи по заявке.",
    submit: "Отправить в Telegram",
    success: "Telegram открыт — нажмите «Отправить», чтобы передать заявку.",
    popupError: "Разрешите всплывающие окна и попробуйте ещё раз.",
    validation: { name: "Укажите имя", company: "Укажите компанию", phone: "Введите номер в формате +998", consent: "Необходимо согласие" },
    telegram: { heading: "Новая заявка с сайта PROMSYS", name: "Имя", company: "Компания", phone: "Телефон" },
  },
  uz: {
    eyebrow: "Suhbatdan boshlaymiz",
    title: "Ishlab chiqarish qayerda pul yo‘qotayotganini ko‘rsatamiz.",
    description: "Aloqa ma’lumotlarini qoldiring. Birinchi uchrashuvda jarayonlarni tahlil qilib, real avtomatlashtirish ssenariysini taklif qilamiz.",
    phoneLabel: "Telefon",
    dataNotice: "Ma’lumotlaringiz faqat so‘rov bo‘yicha bog‘lanish uchun ishlatiladi.",
    formEyebrow: "Demo so‘rash",
    formTitle: "Korxonangiz haqida ayting",
    nameLabel: "Ismingiz",
    namePlaceholder: "Aziz",
    companyLabel: "Kompaniya",
    companyPlaceholder: "Korxona nomi",
    phoneFieldLabel: "Telefon raqami",
    consentLabel: "So‘rov bo‘yicha bog‘lanish uchun ma’lumotlarimni qayta ishlashga roziman.",
    submit: "Telegram orqali yuborish",
    success: "Telegram ochildi — so‘rovni yuborish uchun «Jo‘natish» tugmasini bosing.",
    popupError: "Qalqib chiquvchi oynalarga ruxsat bering va qayta urinib ko‘ring.",
    validation: { name: "Ismingizni kiriting", company: "Kompaniyani kiriting", phone: "+998 formatidagi raqamni kiriting", consent: "Rozilik kerak" },
    telegram: { heading: "PROMSYS saytidan yangi so‘rov", name: "Ism", company: "Kompaniya", phone: "Telefon" },
  },
};
