"use client";

import { ArrowDown, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/src/shared/i18n/LocaleProvider";
import { ButtonLink } from "@/src/shared/ui/ButtonLink";
import { Container } from "@/src/shared/ui/Container";
import { Reveal } from "@/src/shared/ui/Reveal";
import { HeroFactory } from "./HeroFactory";
import { heroContent } from "./content";

export function Hero() {
  const { locale } = useLocale();
  const content = heroContent[locale];

  return (
    <section id="top" className="hero-shell relative flex min-h-[920px] overflow-hidden bg-[#071426] pt-28 text-white lg:min-h-[820px] lg:items-center lg:pt-24">
      <div className="hero-noise absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute left-[-12rem] top-24 size-[34rem] rounded-full bg-blue-600/15 blur-[120px]" aria-hidden="true" />
      <div className="absolute right-[-8rem] top-[-8rem] size-[32rem] rounded-full bg-cyan-400/10 blur-[120px]" aria-hidden="true" />

      <Container className="relative z-10 grid items-center gap-12 pb-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-8 lg:pb-12">
        <div className="max-w-[660px]">
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[.07] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-cyan-200">
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex size-2 rounded-full bg-emerald-400" /></span>
              {content.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-balance text-[clamp(3rem,6.8vw,6.4rem)] font-semibold leading-[.9] tracking-[-.07em]">
              {content.title} <span className="hero-gradient-text">{content.titleAccent}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">{content.description}</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contacts">{content.primaryCta}</ButtonLink>
            <ButtonLink href="#features" variant="secondary">{content.secondaryCta}</ButtonLink>
          </Reveal>
          <Reveal delay={0.24} className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
            {content.benefits.map((item) => <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-cyan-300" />{item}</span>)}
          </Reveal>
        </div>

        <Reveal delay={0.14} y={16} className="relative min-w-0">
          <HeroFactory content={content.factory} />
        </Reveal>
      </Container>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#071426]/70 backdrop-blur-xl">
        <Container className="hero-trust flex min-h-20 items-center justify-between gap-5 overflow-x-auto py-4">
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[.2em] text-white/35">{content.platformLabel}</span>
          <div className="flex min-w-max items-center gap-8 sm:gap-12">
            {content.trustLabels.map((label, index) => <span key={label} className="flex items-center gap-8 font-mono text-xs font-bold tracking-[.18em] text-white/55 sm:gap-12">{label}{index < content.trustLabels.length - 1 && <span className="size-1 rounded-full bg-cyan-300/70" />}</span>)}
          </div>
          <ArrowDown className="hidden size-4 shrink-0 text-white/30 lg:block" aria-hidden="true" />
        </Container>
      </div>
    </section>
  );
}
