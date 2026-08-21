import { Factory } from "lucide-react";
import { brand } from "@/src/content/constants";
import { cn } from "@/src/shared/lib/cn";

interface BrandProps {
  inverted?: boolean;
  compact?: boolean;
}

export function Brand({ inverted = false, compact = false }: BrandProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-[13px] bg-gradient-to-br from-[#2f7cff] to-[#17c9d6] text-white shadow-[0_10px_30px_rgba(37,99,235,.3)]">
        <Factory className="size-5" strokeWidth={2.1} aria-hidden="true" />
      </span>
      <span className="grid leading-none">
        <span className={cn("text-[17px] font-extrabold tracking-[.16em]", inverted ? "text-white" : "text-[#071426]")}>{brand.name}</span>
        {!compact && <span className={cn("mt-1 font-mono text-[8px] uppercase tracking-[.2em]", inverted ? "text-white/45" : "text-slate-400")}>{brand.tagline}</span>}
      </span>
    </span>
  );
}
