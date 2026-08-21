"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/src/shared/i18n/LocaleProvider";
import { Container } from "@/src/shared/ui/Container";
import { Icon } from "@/src/shared/ui/Icon";
import { Reveal } from "@/src/shared/ui/Reveal";
import { SectionHeading } from "@/src/shared/ui/SectionHeading";
import { problemsContent } from "./content";

export function Problems() {
  const { locale } = useLocale();
  const content = problemsContent[locale];

  return (
    <section id="about" className="section-pad bg-[#f8fafc]">
      <Container>
        <Reveal><SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} /></Reveal>
        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((problem, index) => (
            <Reveal key={problem.title} delay={index * 0.045}>
              <article className="problem-card group h-full rounded-[26px] border border-slate-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_22px_60px_rgba(15,23,42,.08)]">
                <div className="mb-8 flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-orange-50 text-orange-600"><Icon name={problem.icon} className="size-5" /></span>
                  <span className="font-mono text-[10px] tracking-[.16em] text-slate-300">0{index + 1} / RISK</span>
                </div>
                <h3 className="text-xl font-bold tracking-[-.025em] text-[#071426]">{problem.title}</h3>
                <p className="mt-3 leading-6 text-slate-500">{problem.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-5 rounded-[28px] bg-[#071426] p-6 text-white sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cyan-300 text-[#071426]"><CheckCircle2 className="size-5" /></span><div><h3 className="text-xl font-bold">{content.solutionTitle}</h3><p className="mt-1 text-sm text-slate-400">{content.solutionDescription}</p></div></div>
            <a href="#features" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition hover:gap-3">{content.solutionLink} <ArrowRight className="size-4" /></a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
