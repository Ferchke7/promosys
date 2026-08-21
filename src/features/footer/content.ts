import type { LocalizedContent } from "@/src/shared/i18n/types";
import type { NavItem } from "@/src/shared/types/content";

interface FooterContent {
  description: string;
  navigationLabel: string;
  contactsLabel: string;
  copyright: string;
  navigation: NavItem[];
}

export const footerContent: LocalizedContent<FooterContent> = {
  ru: { description: "Система управления производством для средних и крупных предприятий Узбекистана.", navigationLabel: "Навигация", contactsLabel: "Связаться", copyright: "© 2026 PROMSYS. Все права защищены.", navigation: [{ label: "О системе", href: "#about" }, { label: "Функции", href: "#features" }, { label: "Отрасли", href: "#audience" }, { label: "Контакты", href: "#contacts" }] },
  uz: { description: "O‘zbekistonning o‘rta va yirik korxonalari uchun ishlab chiqarishni boshqarish tizimi.", navigationLabel: "Navigatsiya", contactsLabel: "Bog‘lanish", copyright: "© 2026 PROMSYS. Barcha huquqlar himoyalangan.", navigation: [{ label: "Tizim haqida", href: "#about" }, { label: "Imkoniyatlar", href: "#features" }, { label: "Sohalar", href: "#audience" }, { label: "Aloqa", href: "#contacts" }] },
};
