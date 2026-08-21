"use client";

import { ArrowRight, Check, Factory, Layers3, RadioTower } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { HeroFactoryContent } from "./content";

const systems = ["MES", "WMS", "APS"] as const;

export function HeroFactory({ content }: { content: HeroFactoryContent }) {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 22 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3.5, 3.5]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [2.5, -2.5]);

  const metrics = [
    { label: content.defect, before: "8.4%", after: "2.1%", delta: "−75%" },
    { label: content.downtime, before: "14.2%", after: "6.8%", delta: "−52%" },
    { label: content.plan, before: "68%", after: "94%", delta: "+26%" },
  ];

  return (
    <div
      className="factory-visual outcome-visual relative mx-auto aspect-[1.04] w-full max-w-[690px]"
      onPointerMove={(event) => {
        if (reducedMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
      aria-label={content.ariaLabel}
      role="img"
    >
      <div className="absolute inset-[8%] rounded-full bg-blue-500/15 blur-[80px]" aria-hidden="true" />
      <motion.div className="factory-board outcome-board absolute inset-[6%_1%_5%_3%]" style={reducedMotion ? undefined : { rotateX, rotateY }}>
        <div className="outcome-grid" aria-hidden="true" />
        <div className="factory-topbar">
          <span className="inline-flex items-center gap-2"><Factory className="size-3.5 text-cyan-300" />{content.boardLabel}</span>
          <span className="text-emerald-300">● {content.online}</span>
        </div>

        <div className="system-stack">
          {systems.map((system, index) => (
            <motion.div key={system} className="system-module" animate={reducedMotion ? undefined : { x: [0, 4, 0] }} transition={{ duration: 3.6, delay: index * 0.45, repeat: Infinity, ease: "easeInOut" }}>
              <span>{system}</span><small>{content.systemRoles[index]}</small><Check className="size-3" />
            </motion.div>
          ))}
        </div>

        <div className="system-flow" aria-hidden="true"><i /><i /><i /></div>

        <div className="outcome-factory" aria-hidden="true">
          <div className="plant-base" />
          <div className="plant-hall hall-a"><span /><span /><span /></div>
          <div className="plant-hall hall-b"><span /><span /></div>
          <div className="plant-tower"><i /><i /></div>
          <div className="plant-conveyor"><i /><i /><i /><i /></div>
          <div className="plant-pulse pulse-a" /><div className="plant-pulse pulse-b" /><div className="plant-pulse pulse-c" />
        </div>

        <motion.div className="effect-panel" animate={reducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <div className="effect-heading"><span><Layers3 className="size-4" />{content.effectLabel}</span><strong>LIVE</strong></div>
          <div className="effect-labels"><span>{content.before}</span><span>{content.after}</span></div>
          <div className="effect-metrics">
            {metrics.map((metric) => (
              <div key={metric.label} className="effect-row"><small>{metric.label}</small><span>{metric.before}</span><ArrowRight className="size-3" /><strong>{metric.after}</strong><em>{metric.delta}</em></div>
            ))}
          </div>
        </motion.div>

        <div className="factory-signal outcome-signal"><RadioTower className="size-3.5" /><span>{content.connected}</span></div>
      </motion.div>
    </div>
  );
}
