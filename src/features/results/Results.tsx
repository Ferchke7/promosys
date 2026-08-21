import { results } from "@/src/content/constants";
import { AnimatedCounter } from "@/src/shared/ui/AnimatedCounter";
import { Container } from "@/src/shared/ui/Container";
import { Reveal } from "@/src/shared/ui/Reveal";
import { SectionHeading } from "@/src/shared/ui/SectionHeading";

export function Results() {
  return (
    <section className="section-pad results-shell relative overflow-hidden bg-[#071426] text-white">
      <div className="absolute -right-40 top-0 size-[36rem] rounded-full bg-blue-600/15 blur-[140px]" aria-hidden="true" />
      <Container className="relative">
        <Reveal><SectionHeading eyebrow="Результат автоматизации" title="Решения быстрее. Потери меньше. Картина яснее." description="PROMSYS превращает производственные данные в понятные управленческие действия." inverted /></Reveal>
        <div className="mt-14 grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) => (
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
