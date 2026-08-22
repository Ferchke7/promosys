import { ArrowRight, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import type { HeroFactoryMetric } from "./content";
import styles from "./HeroFactory.module.css";

interface FactoryImpactProps {
  label: string;
  caption: string;
  beforeLabel: string;
  afterLabel: string;
  metrics: [HeroFactoryMetric, HeroFactoryMetric, HeroFactoryMetric];
}

export function FactoryImpact({ label, caption, beforeLabel, afterLabel, metrics }: FactoryImpactProps) {
  const [defect, ...secondaryMetrics] = metrics;

  return (
    <div className={styles.impact} aria-hidden="true">
      <div className={styles.impactHeader}>
        <span><Sparkles />{label}</span>
        <small>{caption}</small>
      </div>

      <div className={styles.defectCard}>
        <div className={styles.defectTitle}><span>{defect.label}</span><strong>{defect.delta}</strong></div>
        <div className={styles.defectValues}>
          <span><small>{beforeLabel}</small><del>{defect.before}</del></span>
          <ArrowRight />
          <span><small>{afterLabel}</small><b>{defect.after}</b></span>
        </div>
        <div className={styles.defectChart}><i /><i /><i /><i /><i /><i /></div>
      </div>

      <div className={styles.secondaryMetrics}>
        {secondaryMetrics.map((metric) => (
          <div className={styles.metricCard} key={metric.label}>
            <span>{metric.delta.startsWith("+") ? <TrendingUp /> : <TrendingDown />}</span>
            <small>{metric.label}</small>
            <div><del>{metric.before}</del><ArrowRight /><strong>{metric.after}</strong></div>
          </div>
        ))}
      </div>
    </div>
  );
}
