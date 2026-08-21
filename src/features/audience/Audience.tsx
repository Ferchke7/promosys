"use client";

import { UsersRound } from "lucide-react";
import { useLocale } from "@/src/shared/i18n/LocaleProvider";
import { Container } from "@/src/shared/ui/Container";
import { Icon } from "@/src/shared/ui/Icon";
import { Reveal } from "@/src/shared/ui/Reveal";
import { SectionHeading } from "@/src/shared/ui/SectionHeading";
import { audienceContent } from "./content";

export function Audience() {
  const { locale } = useLocale();
  const content = audienceContent[locale];

  return (
    <section id="audience" className="section-pad bg-white">
      <Container>
        <Reveal><SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} /></Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.items.map((audience, index) => (
            <Reveal key={audience.title} delay={(index % 2) * 0.07}>
              <article className="audience-card group relative flex min-h-[390px] flex-col overflow-hidden rounded-[30px] border border-slate-200 bg-[#f8fafc] p-7 sm:p-8">
                <span className="absolute right-5 top-2 text-[74px] font-semibold leading-none tracking-[-.08em] text-slate-200/60">{audience.number}</span>
                <div className="audience-orbit absolute -bottom-20 -right-14 size-64 rounded-full border border-blue-200/80" aria-hidden="true"><span className="absolute inset-8 rounded-full border border-cyan-200" /><span className="absolute left-12 top-2 size-3 rounded-full bg-orange-500 shadow-[0_0_20px_rgba(255,122,26,.6)]" /></div>
                <span className="relative grid size-14 place-items-center rounded-[20px] bg-[#071426] text-cyan-300 shadow-xl transition duration-500 group-hover:-translate-y-1 group-hover:rotate-3"><Icon name={audience.icon} className="size-6" /></span>
                <div className="relative mt-10 flex flex-1 flex-col"><span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[.12em] text-blue-700">{audience.scale}</span><h3 className="mt-4 text-2xl font-bold tracking-[-.035em] text-[#071426]">{audience.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{audience.description}</p><div className="mt-5 flex flex-wrap gap-2">{audience.tags.map((tag) => <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[.12em] text-slate-500">{tag}</span>)}</div><div className="mt-auto pt-6"><span className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[.14em] text-slate-400"><UsersRound className="size-3.5 text-blue-600" />{content.rolesLabel}</span><div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold text-slate-600">{audience.roles.map((role) => <span key={role}>{role}</span>)}</div></div></div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
