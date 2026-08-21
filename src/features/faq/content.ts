import type { LocalizedContent } from "@/src/shared/i18n/types";
import type { FaqItem } from "@/src/shared/types/content";

interface FaqContent {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
}

export const faqContent: LocalizedContent<FaqContent> = {
  ru: {
    eyebrow: "FAQ",
    title: "Коротко о главном.",
    description: "Ответы на вопросы, которые чаще всего возникают перед первой встречей.",
    items: [
      { question: "Что такое MES и чем она отличается от ERP?", answer: "ERP управляет ресурсами предприятия на верхнем уровне, а MES связывает план с реальным производством: заданиями, оборудованием, материалами, качеством и выработкой в цехе." },
      { question: "Сколько времени занимает внедрение?", answer: "Пилотный контур проектируется поэтапно. Срок зависит от количества участков, интеграций и качества исходных данных. После аудита вы получите понятную дорожную карту." },
      { question: "Как рассчитывается стоимость?", answer: "Стоимость зависит от выбранных модулей, числа пользователей, площадок и объёма кастомизации. Мы предлагаем начинать с самого ценного бизнес-сценария." },
      { question: "Подойдёт ли PROMSYS для нашего завода?", answer: "Система ориентирована на средние и крупные производственные предприятия. На консультации мы разберём процессы и честно оценим применимость решения для вашей отрасли." },
    ],
  },
  uz: {
    eyebrow: "FAQ",
    title: "Asosiy savollarga qisqa javob.",
    description: "Birinchi uchrashuvdan oldin eng ko‘p beriladigan savollarga javoblar.",
    items: [
      { question: "MES nima va ERP’dan nimasi bilan farq qiladi?", answer: "ERP korxona resurslarini yuqori darajada boshqaradi, MES esa rejani sexdagi real ish bilan bog‘laydi: topshiriq, uskuna, material, sifat va ishlab chiqarish hajmi." },
      { question: "Joriy etish qancha vaqt oladi?", answer: "Pilot kontur bosqichma-bosqich loyihalanadi. Muddat uchastkalar, integratsiyalar va boshlang‘ich ma’lumotlar sifatiga bog‘liq. Auditdan keyin aniq yo‘l xaritasini olasiz." },
      { question: "Narx qanday hisoblanadi?", answer: "Narx tanlangan modullar, foydalanuvchilar, maydonlar va moslashtirish hajmiga bog‘liq. Eng qimmatli biznes ssenariydan boshlashni tavsiya qilamiz." },
      { question: "PROMSYS bizning zavodga mos keladimi?", answer: "Tizim o‘rta va yirik ishlab chiqarish korxonalariga mo‘ljallangan. Maslahatda jarayonlarni tahlil qilib, yechimning sohangizga mosligini xolis baholaymiz." },
    ],
  },
};

