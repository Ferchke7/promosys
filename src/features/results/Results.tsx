"use client";

import { useLocale } from "@/src/shared/i18n/LocaleProvider";
import { AnimatedCounter } from "@/src/shared/ui/AnimatedCounter";
import { Container } from "@/src/shared/ui/Container";
import { Reveal } from "@/src/shared/ui/Reveal";
import { SectionHeading } from "@/src/shared/ui/SectionHeading";
import { resultsContent } from "./content";

export function Results() {
  const { locale } = useLocale();
  const content = resultsContent[locale];

  return (
    <section className="section-pad results-shell relative overflow-hidden bg-[#071426] text-white">
      <div className="absolute -right-40 top-0 size-[36rem] rounded-full bg-blue-600/15 blur-[140px]" aria-hidden="true" />
      <Container className="relative">
        <Reveal><SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} inverted /></Reveal>
        <div className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((result, index) => (
            <Reveal key={result.label} delay={(index % 3) * 0.05}>
              <article className="result-card min-h-[245px] border-b border-r border-white/10 p-7 sm:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[.18em] text-cyan-300">0{index + 1} · {result.label}</span>
                <div className="mt-8 text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-none tracking-[-.06em] text-white"><AnimatedCounter value={result.value} prefix={result.prefix} suffix={result.suffix} /></div>
                <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">{result.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
