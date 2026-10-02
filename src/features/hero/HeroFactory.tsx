"use client";

import { useState } from "react";
import { Factory, RadioTower } from "lucide-react";
import { Factory3DCanvas } from "./Factory3DCanvas";
import { FactoryImpact } from "./FactoryImpact";
import { FactorySystems } from "./FactorySystems";
import type { HeroFactoryContent } from "./content";
import styles from "./HeroFactory.module.css";

export function HeroFactory({ content }: { content: HeroFactoryContent }) {
  const [activeModule, setActiveModule] = useState<"all" | "mes" | "wms" | "aps" | "qa">("all");

  return (
    <div className={styles.visual} aria-label={content.ariaLabel} role="region">
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.board}>
        <div className={styles.grid} aria-hidden="true" />

        {/* Top Digital Twin Bar */}
        <div className={styles.topbar}>
          <span>
            <Factory />
            {content.boardLabel}
          </span>
          <strong>
            <i />
            {content.online}
          </strong>
        </div>

        {/* 1. Connected Core Systems (MES, WMS, APS) */}
        <FactorySystems label={content.systemsLabel} roles={content.systemRoles} />

        {/* 2. Interactive Real-Time 3D WebGL Factory Model */}
        <div className={styles.diorama3DContainer}>
          <Factory3DCanvas
            content={content}
            activeModule={activeModule}
            onSelectModule={setActiveModule}
          />
        </div>

        {/* 3. Real Measurable Impact Metrics */}
        <FactoryImpact
          label={content.impactLabel}
          caption={content.impactCaption}
          beforeLabel={content.before}
          afterLabel={content.after}
          metrics={content.metrics}
        />

        {/* Bottom Synced Signal Indicator */}
        <div className={styles.signal} aria-hidden="true">
          <RadioTower />
          <span>{content.connected}</span>
        </div>
      </div>
    </div>
  );
}
