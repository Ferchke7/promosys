"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/src/shared/lib/cn";
import { useLocale } from "@/src/shared/i18n/LocaleProvider";
import { Brand } from "@/src/shared/ui/Brand";
import { Container } from "@/src/shared/ui/Container";
import { headerContent } from "./content";
import { LanguageSwitch } from "./LanguageSwitch";

export function Header() {
  const { locale } = useLocale();
  const content = headerContent[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", isScrolled ? "border-b border-white/10 bg-[#071426]/90 py-2 shadow-[0_12px_40px_rgba(0,0,0,.16)] backdrop-blur-2xl" : "py-4")}>
      <Container className="flex h-14 items-center justify-between">
        <a href="#top" aria-label={content.homeLabel}><Brand inverted /></a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label={content.navigationLabel}>
          {content.navigation.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-white/65 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">{item.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitch ariaLabel={content.languageLabel} />
          <a href="#contacts" className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-bold text-[#071426] transition hover:-translate-y-0.5 hover:bg-cyan-50">{content.cta}</a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch ariaLabel={content.languageLabel} />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white"
            aria-label={isOpen ? content.closeMenuLabel : content.openMenuLabel}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <div id="mobile-navigation" className={cn("absolute inset-x-4 top-[78px] overflow-hidden rounded-3xl border border-white/10 bg-[#0c1d31]/98 p-3 shadow-2xl backdrop-blur-2xl transition-all duration-300 lg:hidden", isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0")}>
        <nav className="grid" aria-label={content.mobileNavigationLabel}>
          {content.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="rounded-2xl px-4 py-4 text-base font-semibold text-white/75 transition hover:bg-white/5 hover:text-white">{item.label}</a>
          ))}
          <a href="#contacts" onClick={() => setIsOpen(false)} className="mt-2 rounded-2xl bg-[#ff7a1a] px-4 py-4 text-center font-bold text-white">{content.cta}</a>
        </nav>
      </div>
    </header>
  );
}
