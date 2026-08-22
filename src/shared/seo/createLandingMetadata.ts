import type { Metadata } from "next";
import { absoluteUrl, localeRoutes, seoContent, siteConfig } from "@/src/shared/config/site";
import type { Locale } from "@/src/shared/i18n/types";

const openGraphLocales: Record<Locale, string> = {
  ru: "ru_RU",
  uz: "uz_UZ",
};

export function createLandingMetadata(locale: Locale): Metadata {
  const content = seoContent[locale];
  const canonical = absoluteUrl(localeRoutes[locale]);
  const alternateLocale = locale === "ru" ? "uz_UZ" : "ru_RU";

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical,
      languages: {
        ru: absoluteUrl(localeRoutes.ru),
        uz: absoluteUrl(localeRoutes.uz),
        "x-default": absoluteUrl(localeRoutes[siteConfig.defaultLocale]),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: canonical,
      type: "website",
      locale: openGraphLocales[locale],
      alternateLocale,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl("/og.png"),
          width: 1200,
          height: 630,
          alt: content.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [absoluteUrl("/og.png")],
    },
  };
}
