import { Boxes, CalendarClock, Check, Cpu } from "lucide-react";
import styles from "./HeroFactory.module.css";

const systems = [
  { name: "MES", Icon: Cpu },
  { name: "WMS", Icon: Boxes },
  { name: "APS", Icon: CalendarClock },
] as const;

export function FactorySystems({ label, roles }: { label: string; roles: [string, string, string] }) {
  return (
    <div className={styles.systems} aria-hidden="true">
      <div className={styles.sectionLabel}><span>01</span>{label}</div>
      <div className={styles.systemRail}>
        {systems.map(({ name, Icon }, index) => (
          <div className={styles.systemCard} key={name}>
            <span className={styles.systemIcon}><Icon /></span>
            <span className={styles.systemCopy}><strong>{name}</strong><small>{roles[index]}</small></span>
            <Check className={styles.systemCheck} />
          </div>
        ))}
      </div>
      <div className={styles.systemBeam}><i /><i /><i /></div>
    </div>
  );
}
