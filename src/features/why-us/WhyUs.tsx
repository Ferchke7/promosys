"use client";

import { useLocale } from "@/src/shared/i18n/LocaleProvider";
import { Container } from "@/src/shared/ui/Container";
import { Icon } from "@/src/shared/ui/Icon";
import { Reveal } from "@/src/shared/ui/Reveal";
import { SectionHeading } from "@/src/shared/ui/SectionHeading";
import { whyUsContent } from "./content";

export function WhyUs() {
  const { locale } = useLocale();
  const content = whyUsContent[locale];

  return (
    <section className="section-pad bg-white">
      <Container>
        <Reveal><SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} /></Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{content.items.map((item, index) => <Reveal key={item.title} delay={index * 0.05}><article className="h-full rounded-[26px] border border-slate-200 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"><span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-600"><Icon name={item.icon} className="size-5" /></span><h3 className="mt-8 text-lg font-bold text-[#071426]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p></article></Reveal>)}</div>
        <Reveal className="mt-16 rounded-[32px] bg-[#071426] p-7 text-white sm:p-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300">{content.pathEyebrow}</span><h3 className="mt-3 text-3xl font-semibold tracking-[-.045em]">{content.pathTitle}</h3></div><p className="max-w-md text-sm leading-6 text-slate-400">{content.pathDescription}</p></div>
          <div className="mt-9 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">{content.steps.map((step) => <div key={step.number} className="bg-[#0b1b2f] p-5"><span className="font-mono text-[10px] text-cyan-300">{step.number}</span><h4 className="mt-5 font-bold">{step.title}</h4><p className="mt-2 text-sm text-slate-500">{step.text}</p></div>)}</div>
        </Reveal>
      </Container>
    </section>
  );
}
