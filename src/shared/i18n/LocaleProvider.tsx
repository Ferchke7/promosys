"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import type { Locale } from "./types";

interface LocaleContextValue {
  locale: Locale;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children, initialLocale }: { children: ReactNode; initialLocale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = initialLocale;
  }, [initialLocale]);

  const value = useMemo(() => ({ locale: initialLocale }), [initialLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
