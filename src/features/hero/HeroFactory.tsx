"use client";

import { Factory, RadioTower } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { FactoryDiorama } from "./FactoryDiorama";
import { FactoryImpact } from "./FactoryImpact";
import { FactorySystems } from "./FactorySystems";
import type { HeroFactoryContent } from "./content";
import styles from "./HeroFactory.module.css";

export function HeroFactory({ content }: { content: HeroFactoryContent }) {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 22 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3.2, 3.2]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [2.2, -2.2]);

  return (
    <div
      className={styles.visual}
      onPointerMove={(event) => {
        if (reducedMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      aria-label={content.ariaLabel}
      role="img"
    >
      <div className={styles.ambientGlow} aria-hidden="true" />
      <motion.div className={styles.board} style={reducedMotion ? undefined : { rotateX, rotateY }}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.topbar} aria-hidden="true">
          <span><Factory />{content.boardLabel}</span>
          <strong><i />{content.online}</strong>
        </div>

        <FactorySystems label={content.systemsLabel} roles={content.systemRoles} />
        <FactoryDiorama label={content.processLabel} stages={content.processStages} />
        <FactoryImpact
          label={content.impactLabel}
          caption={content.impactCaption}
          beforeLabel={content.before}
          afterLabel={content.after}
          metrics={content.metrics}
        />

        <div className={styles.signal} aria-hidden="true">
          <RadioTower />
          <span>{content.connected}</span>
        </div>
      </motion.div>
    </div>
  );
}
