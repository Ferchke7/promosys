import { brand, contacts } from "@/src/content/constants";
import { absoluteUrl, localeRoutes, seoContent, siteConfig } from "@/src/shared/config/site";
import type { Locale } from "@/src/shared/i18n/types";

export function createOrganizationSchema(locale: Locale): Record<string, unknown> {
  const organizationId = `${siteConfig.url}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: brand.name,
        url: siteConfig.url,
        logo: absoluteUrl("/favicon.svg"),
        description: seoContent[locale].description,
        email: contacts.email,
        telephone: contacts.phoneHref,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: contacts.phoneHref,
          email: contacts.email,
          contactType: "sales",
          availableLanguage: ["Russian", "Uzbek"],
          areaServed: "UZ",
        },
        sameAs: [`https://t.me/${contacts.telegramUsername}`],
        areaServed: {
          "@type": "Country",
          name: "Uzbekistan",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: brand.name,
        inLanguage: [...siteConfig.locales],
        publisher: { "@id": organizationId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#software`,
        name: brand.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: absoluteUrl(localeRoutes[locale]),
        description: seoContent[locale].description,
        provider: { "@id": organizationId },
        areaServed: "UZ",
      },
    ],
  };
}
