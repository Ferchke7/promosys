import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/src/shared/lib/cn";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2",
        variant === "primary" && "bg-[#ff7a1a] text-white shadow-[0_16px_45px_rgba(255,122,26,.28)] hover:-translate-y-0.5 hover:bg-[#ff8d37]",
        variant === "secondary" && "border border-white/15 bg-white/[.06] text-white backdrop-blur-xl hover:border-white/30 hover:bg-white/[.1]",
        variant === "light" && "border border-slate-200 bg-white text-[#071426] shadow-sm hover:-translate-y-0.5 hover:border-blue-200",
        className,
      )}
    >
      {children}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
    </a>
  );
}
