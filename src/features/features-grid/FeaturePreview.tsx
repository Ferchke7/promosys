"use client";

import { cn } from "@/src/shared/lib/cn";
import { Check, UserCheck } from "lucide-react";
import type { FeatureItem } from "@/src/shared/types/content";
import type { FeaturePreviewContent } from "./content";

export function FeaturePreview({
  type,
  content,
}: {
  type: FeatureItem["preview"];
  content: FeaturePreviewContent;
}) {
  // SCM: Supplier procurement & SLA delivery status
  if (type === "bars") {
    return (
      <div className="space-y-2.5 rounded-2xl bg-slate-900/5 p-3.5 backdrop-blur-sm">
        {content.suppliers.map((label, i) => {
          const widths = ["88%", "68%", "94%"];
          const status = ["В пути", "Прибыло", "Оформлен"];
          return (
            <div key={label} className="space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span className="font-semibold text-slate-700">{label}</span>
                <span className="text-blue-600 font-bold">{status[i % status.length]}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
                  style={{ width: widths[i % widths.length] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // WMS: Warehouse storage cell matrix
  if (type === "grid") {
    return (
      <div className="rounded-2xl bg-slate-900/5 p-3.5">
        <div className="flex items-center justify-between pb-2 font-mono text-[10px] text-slate-500">
          <span>Стеллаж A-04</span>
          <span className="font-bold text-emerald-600">92% заполнение</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 12 }).map((_, i) => {
            const isFull = i % 3 === 0;
            const isMid = i % 2 === 0;
            return (
              <div
                key={i}
                className={cn(
                  "flex h-8 items-center justify-center rounded-lg border font-mono text-[9px] font-bold transition-transform hover:scale-105",
                  isFull
                    ? "border-cyan-300 bg-cyan-50 text-cyan-700 shadow-sm"
                    : isMid
                    ? "border-blue-300 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-400"
                )}
              >
                {i + 1 < 10 ? `0${i + 1}` : i + 1}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // APS: Production Schedule Timeline & Gantt
  if (type === "line") {
    return (
      <div className="rounded-2xl bg-slate-900/5 p-3.5">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span className="text-slate-500">Загрузка смены</span>
          <strong className="text-blue-600">{content.plan}</strong>
        </div>
        <div className="relative mt-3 h-6 w-full rounded-lg bg-slate-200/80 p-1">
          <div className="absolute inset-y-1 left-1 w-[45%] rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-[9px] font-bold text-white flex items-center justify-center">
            Линия 01
          </div>
          <div className="absolute inset-y-1 left-[48%] w-[48%] rounded-md bg-gradient-to-r from-cyan-500 to-teal-500 text-[9px] font-bold text-white flex items-center justify-center">
            Линия 02
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-slate-400">
          <span>08:00</span>
          <span>14:00</span>
          <span>20:00</span>
        </div>
      </div>
    );
  }

  // MES: Raw Material & Batch Yield Ring
  if (type === "ring") {
    return (
      <div className="flex items-center justify-between rounded-2xl bg-slate-900/5 p-3.5">
        <div className="space-y-1 font-mono text-[10px]">
          <span className="text-slate-500">Выход годного</span>
          <div className="text-lg font-bold text-slate-900">97.8%</div>
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <Check className="size-3" /> Норма расхода соблюдена
          </span>
        </div>
        <div className="relative grid size-16 place-items-center rounded-full border-4 border-slate-200 border-t-cyan-500 border-r-blue-600">
          <span className="font-mono text-xs font-black text-slate-800">
            82<small className="text-[9px] font-normal">%</small>
          </span>
        </div>
      </div>
    );
  }

  // CRM: Sales to Production Pipeline Funnel
  if (type === "pipeline") {
    return (
      <div className="rounded-2xl bg-slate-900/5 p-3.5">
        <div className="flex items-center justify-between gap-1">
          {content.pipeline.map((stage, i) => {
            const isCurrent = i === 2;
            const isDone = i < 2;
            return (
              <div key={stage} className="flex-1 text-center">
                <div
                  className={cn(
                    "mx-auto flex size-6 items-center justify-center rounded-full text-[10px] font-bold",
                    isDone
                      ? "bg-blue-600 text-white"
                      : isCurrent
                      ? "bg-cyan-500 text-white ring-2 ring-cyan-200 animate-pulse"
                      : "bg-slate-200 text-slate-500"
                  )}
                >
                  {isDone ? <Check className="size-3" /> : i + 1}
                </div>
                <div className="mt-1 font-mono text-[9px] font-semibold text-slate-600 truncate">
                  {stage}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // FIN: Cash Flows & Budget
  if (type === "cash") {
    return (
      <div className="rounded-2xl bg-slate-900/5 p-3.5">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span className="text-slate-500">Оборот месяца</span>
          <strong className="text-emerald-600 font-black text-sm">{content.billion}</strong>
        </div>
        <div className="mt-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-600">
            <span>Маржинальность</span>
            <span className="font-bold text-slate-900">32.4%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
          </div>
        </div>
      </div>
    );
  }

  // BI: Real-time Live Analytics & OEE Report
  if (type === "report") {
    const bars = [42, 68, 55, 88, 74, 96, 91, 84, 98];
    return (
      <div className="rounded-2xl bg-slate-900/5 p-4">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-slate-800">LIVE TELEMETRY</span>
          </div>
          <div className="font-mono text-xs font-black text-blue-600">OEE 91.4%</div>
        </div>
        <div className="flex h-16 items-end gap-1.5 sm:gap-2">
          {bars.map((h, i) => (
            <div key={i} className="group relative flex-1 h-full flex items-end">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-300 hover:from-blue-700 hover:to-cyan-300"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // HRM: Shift & Operator Allocation
  if (type === "team") {
    return (
      <div className="flex items-center justify-between rounded-2xl bg-slate-900/5 p-3.5">
        <div className="flex -space-x-2">
          {["Азиз", "Дилшод", "Рустам", "+12"].map((name, i) => (
            <span
              key={name}
              className="inline-grid size-8 place-items-center rounded-full border-2 border-white bg-gradient-to-tr from-slate-700 to-slate-900 font-mono text-[10px] font-bold text-white shadow-sm"
              style={{ zIndex: 5 - i }}
            >
              {name.slice(0, 2)}
            </span>
          ))}
        </div>
        <div className="text-right font-mono text-[10px]">
          <span className="text-slate-500">{content.shift}</span>
          <div className="font-bold text-emerald-600 flex items-center justify-end gap-1">
            <UserCheck className="size-3" /> 100% укомплектована
          </div>
        </div>
      </div>
    );
  }

  return null;
}
