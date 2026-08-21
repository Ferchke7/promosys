"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "./types";

const STORAGE_KEY = "promsys-locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === "ru" || value === "uz";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
  }, []);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    const detectedLocale: Locale = navigator.language.toLowerCase().startsWith("uz") ? "uz" : "ru";
    const nextLocale = isLocale(storedLocale) ? storedLocale : detectedLocale;
    const timer = window.setTimeout(() => {
      setLocaleState(nextLocale);
      document.documentElement.lang = nextLocale;
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
