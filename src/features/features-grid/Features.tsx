"use client";

import { SlidersHorizontal, Sparkles } from "lucide-react";
import { cn } from "@/src/shared/lib/cn";
import { useLocale } from "@/src/shared/i18n/LocaleProvider";
import { Container } from "@/src/shared/ui/Container";
import { Icon } from "@/src/shared/ui/Icon";
import { Reveal } from "@/src/shared/ui/Reveal";
import { SectionHeading } from "@/src/shared/ui/SectionHeading";
import { FeaturePreview } from "./FeaturePreview";
import { featuresContent } from "./content";

// Map grid spans to create a balanced, gorgeous 12-column Bento Grid
const bentoSpans: Record<string, string> = {
  "SCM-01": "lg:col-span-7",
  "WMS-02": "lg:col-span-5",
  "APS-03": "lg:col-span-5",
  "MES-04": "lg:col-span-7",
  "CRM-05": "lg:col-span-4",
  "FIN-06": "lg:col-span-4",
  "HRM-08": "lg:col-span-4",
  "BI-07": "lg:col-span-12",
};

export function Features() {
  const { locale } = useLocale();
  const content = featuresContent[locale];

  return (
    <section id="features" className="section-pad bg-[#f8fafc]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
        </Reveal>

        {/* 12-Column Responsive Bento Grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {content.items.map((feature, index) => {
            const spanClass = bentoSpans[feature.code] || "lg:col-span-6";
            return (
              <Reveal
                key={feature.code}
                delay={(index % 4) * 0.05}
                className={cn("flex flex-col", spanClass)}
              >
                <article className="group relative flex h-full min-h-[310px] flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/80 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
                  {/* Subtle Background Glow */}
                  <div className="pointer-events-none absolute right-0 top-0 size-56 rounded-full bg-gradient-to-bl from-blue-500/[0.08] to-cyan-400/[0.04] blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Header: Icon + Code Badge */}
                  <div>
                    <div className="relative flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-sm border border-blue-100">
                        <Icon name={feature.icon} className="size-5" />
                      </span>
                      <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-slate-400 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200/60">
                        {feature.code}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="relative mt-6 max-w-lg">
                      <h3 className="text-xl font-bold tracking-tight text-[#071426] group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Feature Interactive Visualization / Preview */}
                  <div className="relative mt-6 pt-4 border-t border-slate-100">
                    <FeaturePreview type={feature.preview} content={content.preview} />
                  </div>
                </article>
              </Reveal>
            );
          })}

          {/* Bottom Full-Width Custom Architecture Banner */}
          <Reveal className="lg:col-span-12">
            <div className="relative overflow-hidden rounded-[28px] border border-blue-200 bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white shadow-xl shadow-blue-500/15 sm:p-10">
              <div className="absolute right-0 top-0 size-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur-md border border-white/20">
                    <SlidersHorizontal className="size-6" />
                  </span>
                  <div>
                    <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-200">
                      <Sparkles className="size-3.5" /> Гибкая интеграция
                    </div>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                      {content.customTitle}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-blue-100">
                      {content.customDescription}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 self-start sm:self-center rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-blue-700 shadow-md">
                  {content.customBadge}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
