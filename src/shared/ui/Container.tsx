import type { PropsWithChildren } from "react";
import { cn } from "@/src/shared/lib/cn";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8", className)}>{children}</div>;
}
