import { SlidersHorizontal } from "lucide-react";
import { features } from "@/src/content/constants";
import { cn } from "@/src/shared/lib/cn";
import { Container } from "@/src/shared/ui/Container";
import { Icon } from "@/src/shared/ui/Icon";
import { Reveal } from "@/src/shared/ui/Reveal";
import { SectionHeading } from "@/src/shared/ui/SectionHeading";
import { FeaturePreview } from "./FeaturePreview";

export function Features() {
  return (
    <section id="features" className="section-pad bg-white">
      <Container>
        <Reveal><SectionHeading eyebrow="Возможности системы" title="Весь завод — в едином цифровом контуре." description="От первой заявки клиента до отгрузки готовой продукции. Модули работают вместе и дают руководству одну версию правды." /></Reveal>
        <div className="mt-14 grid auto-rows-[minmax(280px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.code} delay={(index % 3) * 0.06} className={cn(feature.span === "wide" && "lg:col-span-2")}>
              <article className="feature-card group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[30px] border border-slate-200/80 bg-[#f8fafc] p-6 transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_28px_80px_rgba(15,23,42,.1)] sm:p-7">
                <div className="absolute right-0 top-0 size-48 rounded-full bg-blue-500/[.06] blur-3xl transition group-hover:bg-cyan-400/[.1]" />
                <div className="relative flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white text-blue-600 shadow-[0_10px_30px_rgba(15,23,42,.06)]"><Icon name={feature.icon} className="size-5" /></span>
                  <span className="font-mono text-[10px] font-bold tracking-[.16em] text-slate-400">{feature.code}</span>
                </div>
                <div className="relative mt-7 max-w-md">
                  <h3 className="text-2xl font-bold tracking-[-.035em] text-[#071426]">{feature.title}</h3>
                  <p className="mt-3 max-w-sm leading-6 text-slate-500">{feature.description}</p>
                </div>
                <div className="relative mt-auto pt-8"><FeaturePreview type={feature.preview} /></div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-4 rounded-[30px] border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-7 sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><SlidersHorizontal className="size-5" /></span><div><h3 className="text-xl font-bold text-[#071426]">Система адаптируется под ваше производство</h3><p className="mt-2 max-w-2xl text-slate-600">Добавляем поля, маршруты, роли и отчёты под реальные процессы предприятия.</p></div></div>
            <span className="shrink-0 rounded-full border border-blue-200 bg-white px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-blue-700">Custom fit</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
