"use client";

import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/src/shared/lib/cn";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
