import { Header } from "@/src/features/header/Header";
import { Hero } from "@/src/features/hero/Hero";
import { Problems } from "@/src/features/problems/Problems";
import { Features } from "@/src/features/features-grid/Features";
import { Workflow } from "@/src/features/workflow/Workflow";
import { Results } from "@/src/features/results/Results";
import { Audience } from "@/src/features/audience/Audience";
import { CaseStudy } from "@/src/features/case-study/CaseStudy";
import { WhyUs } from "@/src/features/why-us/WhyUs";
import { Faq } from "@/src/features/faq/Faq";
import { Contact } from "@/src/features/contact/Contact";
import { Footer } from "@/src/features/footer/Footer";
import { LocaleProvider } from "@/src/shared/i18n/LocaleProvider";
import type { Locale } from "@/src/shared/i18n/types";

export function LandingPage({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider initialLocale={locale}>
      <div lang={locale}>
        <Header />
        <main>
          <Hero />
          <Problems />
          <Features />
          <Workflow />
          <Results />
          <Audience />
          <CaseStudy />
          <WhyUs />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
