"use client";

import { useLocale } from "@/src/shared/i18n/LocaleProvider";
import { localeRoutes } from "@/src/shared/config/site";
import type { Locale } from "@/src/shared/i18n/types";

const localeLabels: Record<Locale, string> = { ru: "RU", uz: "UZ" };

export function LanguageSwitch({ ariaLabel }: { ariaLabel: string }) {
  const { locale } = useLocale();

  return (
    <div className="language-switch" role="group" aria-label={ariaLabel}>
      {(Object.keys(localeLabels) as Locale[]).map((item) => (
        <a
          key={item}
          href={localeRoutes[item]}
          hrefLang={item}
          lang={item}
          className={locale === item ? "is-active" : ""}
          aria-current={locale === item ? "page" : undefined}
        >
          {localeLabels[item]}
        </a>
      ))}
    </div>
  );
}
