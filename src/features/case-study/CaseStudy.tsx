import { ArrowRight, Check, FileSpreadsheet, TimerReset, TrendingDown } from "lucide-react";
import { Container } from "@/src/shared/ui/Container";
import { Reveal } from "@/src/shared/ui/Reveal";
import { SectionHeading } from "@/src/shared/ui/SectionHeading";

const beforeItems = ["План производства в Excel", "Остатки уточняются вручную", "Причины простоев неизвестны", "Отчёты собираются часами"];
const afterItems = ["Единый план по линиям и сменам", "Онлайн-остатки сырья и пряжи", "Причины отклонений фиксируются", "Руководство видит KPI сразу"];
const metrics = [
  { value: "−25%", label: "простоев", icon: TimerReset },
  { value: "−18%", label: "потерь сырья", icon: TrendingDown },
  { value: "2 мин", label: "на отчёт", icon: FileSpreadsheet },
];

export function CaseStudy() {
  return (
    <section className="section-pad bg-[#f1f6fa]">
      <Container>
        <Reveal><SectionHeading eyebrow="Сценарий внедрения" title="Как PROMSYS меняет работу текстильной фабрики." description="Демонстрационный пример того, как единый цифровой контур связывает планирование, сырьё, производство и управленческие показатели." /></Reveal>
        <Reveal className="mt-14 overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_28px_90px_rgba(15,23,42,.08)]">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-7 py-6 sm:flex-row sm:items-center sm:px-9">
            <div><span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-orange-600">Демонстрационный сценарий</span><h3 className="mt-2 text-2xl font-bold tracking-[-.035em] text-[#071426]">Текстильная фабрика · 3 производственные линии</h3></div>
            <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[.14em] text-emerald-700">Целевой эффект</span>
          </div>
          <div className="grid lg:grid-cols-[1fr_auto_1fr]">
            <div className="p-7 sm:p-9"><span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">До внедрения</span><div className="mt-6 grid gap-3">{beforeItems.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-600"><span className="size-2 rounded-full bg-orange-500" />{item}</div>)}</div></div>
            <div className="hidden items-center justify-center lg:flex"><span className="grid size-12 place-items-center rounded-full bg-[#071426] text-cyan-300"><ArrowRight className="size-5" /></span></div>
            <div className="border-t border-slate-100 bg-blue-50/50 p-7 sm:p-9 lg:border-l lg:border-t-0"><span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-blue-600">После внедрения</span><div className="mt-6 grid gap-3">{afterItems.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white p-4 text-sm font-semibold text-[#071426]"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check className="size-3" /></span>{item}</div>)}</div></div>
          </div>
          <div className="grid border-t border-slate-100 sm:grid-cols-3">{metrics.map(({ value, label, icon: MetricIcon }) => <div key={label} className="flex items-center gap-4 border-b border-slate-100 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><span className="grid size-11 place-items-center rounded-2xl bg-[#071426] text-cyan-300"><MetricIcon className="size-5" /></span><div><strong className="block text-2xl font-bold tracking-[-.04em] text-[#071426]">{value}</strong><span className="text-sm text-slate-500">{label}</span></div></div>)}</div>
        </Reveal>
      </Container>
    </section>
  );
}
