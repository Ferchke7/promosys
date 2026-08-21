import { cn } from "@/src/shared/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = "left", inverted = false }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-[740px]", align === "center" && "mx-auto text-center")}>
      <div className={cn("mb-5 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[.2em]", inverted ? "text-cyan-300" : "text-blue-600")}>
        <span className="size-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
        {eyebrow}
      </div>
      <h2 className={cn("text-balance text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[.98] tracking-[-.055em]", inverted ? "text-white" : "text-[#071426]")}>{title}</h2>
      {description && <p className={cn("mt-6 max-w-2xl text-base leading-7 sm:text-lg", align === "center" && "mx-auto", inverted ? "text-slate-300" : "text-slate-600")}>{description}</p>}
    </div>
  );
}
