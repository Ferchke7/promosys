"use client";

import { Activity, Boxes, Factory, Gauge, RadioTower } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export function HeroFactory() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 22 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);

  return (
    <div
      className="factory-visual relative mx-auto aspect-[1.05] w-full max-w-[690px]"
      onPointerMove={(event) => {
        if (reducedMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
      aria-label="Схематичная цифровая модель производства с показателями"
      role="img"
    >
      <div className="absolute inset-[9%] rounded-full bg-blue-500/15 blur-[70px]" aria-hidden="true" />
      <motion.div className="factory-board absolute inset-[8%_3%_5%_5%]" style={reducedMotion ? undefined : { rotateX, rotateY }}>
        <div className="factory-grid" aria-hidden="true" />
        <div className="iso-world" aria-hidden="true">
          <div className="iso-block iso-block-a" />
          <div className="iso-block iso-block-b" />
          <div className="iso-block iso-block-c" />
          <div className="iso-tank iso-tank-a" />
          <div className="iso-tank iso-tank-b" />
          <div className="iso-conveyor"><span /><span /><span /><span /></div>
          <div className="iso-rack iso-rack-a"><i /><i /><i /><i /></div>
          <div className="iso-rack iso-rack-b"><i /><i /><i /><i /></div>
          <div className="data-line data-line-a" />
          <div className="data-line data-line-b" />
          <div className="data-node data-node-a" />
          <div className="data-node data-node-b" />
          <div className="data-node data-node-c" />
        </div>

        <div className="factory-topbar">
          <span className="inline-flex items-center gap-2"><Factory className="size-3.5 text-cyan-300" /> ЦЕХ · 01</span>
          <span className="text-emerald-300">● ONLINE</span>
        </div>

        <motion.div className="kpi-card kpi-card-oee" animate={reducedMotion ? undefined : { y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
          <div className="kpi-icon bg-blue-500/20 text-blue-300"><Gauge /></div>
          <div><small>OEE линии</small><strong>87.4%</strong></div>
          <span className="kpi-up">+4.8%</span>
        </motion.div>

        <motion.div className="kpi-card kpi-card-plan" animate={reducedMotion ? undefined : { y: [0, 7, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}>
          <div className="kpi-icon bg-orange-500/20 text-orange-300"><Activity /></div>
          <div><small>План смены</small><strong>94%</strong></div>
          <div className="mini-bars"><i /><i /><i /><i /><i /></div>
        </motion.div>

        <motion.div className="kpi-card kpi-card-stock" animate={reducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
          <div className="kpi-icon bg-cyan-500/20 text-cyan-300"><Boxes /></div>
          <div><small>Склад</small><strong>1 248</strong></div>
          <span className="text-[9px] text-white/35">позиций</span>
        </motion.div>

        <div className="factory-signal"><RadioTower className="size-3.5" /><span>12 узлов передают данные</span></div>
      </motion.div>
    </div>
  );
}
