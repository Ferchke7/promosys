import type { NavItem } from "@/src/shared/types/content";
import type { LocalizedContent } from "@/src/shared/i18n/types";

interface HeaderContent {
  navigation: NavItem[];
  cta: string;
  homeLabel: string;
  navigationLabel: string;
  mobileNavigationLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  languageLabel: string;
}

export const headerContent: LocalizedContent<HeaderContent> = {
  ru: {
    navigation: [
      { label: "О системе", href: "#about" },
      { label: "Функции", href: "#features" },
      { label: "Отрасли", href: "#audience" },
      { label: "Контакты", href: "#contacts" },
    ],
    cta: "Получить консультацию",
    homeLabel: "PROMSYS — на главную",
    navigationLabel: "Основная навигация",
    mobileNavigationLabel: "Мобильная навигация",
    openMenuLabel: "Открыть меню",
    closeMenuLabel: "Закрыть меню",
    languageLabel: "Выбор языка",
  },
  uz: {
    navigation: [
      { label: "Tizim haqida", href: "#about" },
      { label: "Imkoniyatlar", href: "#features" },
      { label: "Sohalar", href: "#audience" },
      { label: "Aloqa", href: "#contacts" },
    ],
    cta: "Maslahat olish",
    homeLabel: "PROMSYS — bosh sahifa",
    navigationLabel: "Asosiy navigatsiya",
    mobileNavigationLabel: "Mobil navigatsiya",
    openMenuLabel: "Menyuni ochish",
    closeMenuLabel: "Menyuni yopish",
    languageLabel: "Tilni tanlash",
  },
};

