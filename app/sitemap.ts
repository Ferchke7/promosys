import type { MetadataRoute } from "next";
import { absoluteUrl, localeRoutes } from "@/src/shared/config/site";
import type { Locale } from "@/src/shared/i18n/types";

const languages = {
  ru: absoluteUrl(localeRoutes.ru),
  uz: absoluteUrl(localeRoutes.uz),
  "x-default": absoluteUrl(localeRoutes.ru),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.entries(localeRoutes) as [Locale, string][]).map(([locale, path]) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "ru" ? 1 : 0.9,
    alternates: { languages },
  }));
}
