"use client";

import { useLocale } from "@/src/shared/i18n/LocaleProvider";
import type { Locale } from "@/src/shared/i18n/types";

const localeLabels: Record<Locale, string> = { ru: "RU", uz: "UZ" };

export function LanguageSwitch({ ariaLabel }: { ariaLabel: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div className="language-switch" role="group" aria-label={ariaLabel}>
      {(Object.keys(localeLabels) as Locale[]).map((item) => (
        <button key={item} type="button" className={locale === item ? "is-active" : ""} aria-pressed={locale === item} onClick={() => setLocale(item)}>
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}

