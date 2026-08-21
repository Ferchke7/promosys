import type { LocalizedContent } from "@/src/shared/i18n/types";

interface PrivacyContent {
  button: string;
  title: string;
  closeLabel: string;
  paragraphs: string[];
}

export const privacyContent: LocalizedContent<PrivacyContent> = {
  ru: { button: "Политика конфиденциальности", title: "Политика конфиденциальности", closeLabel: "Закрыть", paragraphs: ["PROMSYS использует данные формы только для ответа на ваш запрос и организации консультации.", "Имя, компания и номер телефона передаются в Telegram только после нажатия кнопки отправки. Сайт не хранит эти данные в собственной базе.", "До публичного запуска юридическая редакция политики должна быть дополнена реквизитами оператора данных и утверждена владельцем сайта."] },
  uz: { button: "Maxfiylik siyosati", title: "Maxfiylik siyosati", closeLabel: "Yopish", paragraphs: ["PROMSYS forma ma’lumotlaridan faqat so‘rovingizga javob berish va maslahat tashkil etish uchun foydalanadi.", "Ism, kompaniya va telefon raqami faqat yuborish tugmasi bosilgandan keyin Telegram’ga uzatiladi. Sayt bu ma’lumotlarni o‘z bazasida saqlamaydi.", "Ommaviy ishga tushirishdan oldin siyosatning huquqiy matni ma’lumotlar operatori rekvizitlari bilan to‘ldirilishi va sayt egasi tomonidan tasdiqlanishi kerak."] },
};
