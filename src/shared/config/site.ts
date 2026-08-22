import type { Locale, LocalizedContent } from "@/src/shared/i18n/types";

export const siteConfig = {
  name: "PROMSYS",
  url: "https://promosys.duda.uz",
  defaultLocale: "ru" as const,
  locales: ["ru", "uz"] as const,
} as const;

export const localeRoutes: Record<Locale, string> = {
  ru: "/",
  uz: "/uz",
};

export const seoContent: LocalizedContent<{
  title: string;
  description: string;
  keywords: string[];
  imageAlt: string;
}> = {
  ru: {
    title: "PROMSYS — MES, WMS и APS для производства в Узбекистане",
    description:
      "Управление производством для средних и крупных предприятий: планирование, склад, качество, OEE и аналитика в реальном времени.",
    keywords: [
      "MES система Узбекистан",
      "WMS система",
      "APS планирование",
      "автоматизация производства",
      "управление заводом",
      "PROMSYS",
    ],
    imageAlt: "PROMSYS — производство под полным контролем",
  },
  uz: {
    title: "PROMSYS — O‘zbekistonda ishlab chiqarish uchun MES, WMS va APS",
    description:
      "O‘rta va yirik korxonalar uchun ishlab chiqarishni boshqarish: rejalashtirish, ombor, sifat, OEE va real vaqt tahlili.",
    keywords: [
      "MES tizimi O‘zbekiston",
      "WMS tizimi",
      "APS rejalashtirish",
      "ishlab chiqarishni avtomatlashtirish",
      "zavodni boshqarish",
      "PROMSYS",
    ],
    imageAlt: "PROMSYS — ishlab chiqarish to‘liq nazorat ostida",
  },
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
