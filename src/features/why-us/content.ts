import type { LocalizedContent } from "@/src/shared/i18n/types";
import type { ContentCard } from "@/src/shared/types/content";

interface WhyUsContent {
  eyebrow: string;
  title: string;
  description: string;
  items: ContentCard[];
  pathEyebrow: string;
  pathTitle: string;
  pathDescription: string;
  steps: { number: string; title: string; text: string }[];
}

export const whyUsContent: LocalizedContent<WhyUsContent> = {
  ru: {
    eyebrow: "Почему PROMSYS",
    title: "Технология — это половина успеха. Вторая половина — внедрение.",
    description: "Мы фокусируемся не на количестве функций, а на том, чтобы система стала рабочим инструментом команды.",
    items: [
      { title: "Локальная команда", description: "Поддержка и внедрение на месте, с пониманием реалий предприятий Узбекистана.", icon: "headphones" },
      { title: "Под ваши процессы", description: "Не ломаем работающую модель — адаптируем систему под производство.", icon: "settings" },
      { title: "Поэтапный запуск", description: "Начинаем с приоритетного участка и масштабируем подтверждённый результат.", icon: "layers" },
      { title: "Понятная экономика", description: "Прозрачный объём работ и фокус на измеримом эффекте от внедрения.", icon: "bank" },
    ],
    pathEyebrow: "Путь внедрения",
    pathTitle: "Двигаемся поэтапно.",
    pathDescription: "Каждый этап заканчивается понятным результатом — без бесконечного проекта автоматизации.",
    steps: [{ number: "01", title: "Аудит", text: "Изучаем процессы и точки потерь" }, { number: "02", title: "Настройка", text: "Проектируем цифровой контур" }, { number: "03", title: "Пилот", text: "Запускаем на одном участке" }, { number: "04", title: "Масштаб", text: "Подключаем всё предприятие" }],
  },
  uz: {
    eyebrow: "Nega PROMSYS",
    title: "Texnologiya — muvaffaqiyatning yarmi. Ikkinchi yarmi — joriy etish.",
    description: "Biz funksiyalar soniga emas, tizim jamoaning amaliy ish quroliga aylanishiga e’tibor beramiz.",
    items: [
      { title: "Mahalliy jamoa", description: "O‘zbekiston korxonalari sharoitini tushungan holda joyida yordam va joriy etish.", icon: "headphones" },
      { title: "Jarayoningizga mos", description: "Ishlayotgan modelni buzmaymiz — tizimni ishlab chiqarishga moslaymiz.", icon: "settings" },
      { title: "Bosqichma-bosqich ishga tushirish", description: "Muhim uchastkadan boshlaymiz va tasdiqlangan natijani kengaytiramiz.", icon: "layers" },
      { title: "Tushunarli iqtisod", description: "Ish hajmi shaffof, e’tibor esa o‘lchanadigan samaraga qaratilgan.", icon: "bank" },
    ],
    pathEyebrow: "Joriy etish yo‘li",
    pathTitle: "Bosqichma-bosqich harakat qilamiz.",
    pathDescription: "Har bir bosqich aniq natija bilan tugaydi — cheksiz avtomatlashtirish loyihasisiz.",
    steps: [{ number: "01", title: "Audit", text: "Jarayon va yo‘qotish nuqtalarini o‘rganamiz" }, { number: "02", title: "Sozlash", text: "Raqamli konturni loyihalaymiz" }, { number: "03", title: "Pilot", text: "Bitta uchastkada ishga tushiramiz" }, { number: "04", title: "Masshtab", text: "Butun korxonani ulaymiz" }],
  },
};
