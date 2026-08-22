import { Boxes, Factory, ScanLine, Warehouse } from "lucide-react";
import styles from "./HeroFactory.module.css";

export function FactoryDiorama({ label, stages }: { label: string; stages: [string, string, string, string] }) {
  return (
    <div className={styles.diorama} aria-hidden="true">
      <div className={styles.sectionLabel}><span>02</span>{label}</div>
      <div className={styles.floor} />
      <div className={styles.dataTrack}><i /><i /><i /></div>

      <div className={`${styles.processZone} ${styles.materialZone}`}>
        <span className={styles.zoneIcon}><Boxes /></span>
        <div className={styles.crates}><i /><i /><i /></div>
        <small>{stages[0]}</small>
      </div>

      <div className={`${styles.processZone} ${styles.productionZone}`}>
        <span className={styles.zoneIcon}><Factory /></span>
        <div className={styles.machineRow}>
          <i><b /></i><i><b /></i><i><b /></i>
        </div>
        <small>{stages[1]}</small>
      </div>

      <div className={`${styles.processZone} ${styles.qualityZone}`}>
        <span className={styles.zoneIcon}><ScanLine /></span>
        <div className={styles.scanner}><i /></div>
        <small>{stages[2]}</small>
      </div>

      <div className={`${styles.processZone} ${styles.warehouseZone}`}>
        <span className={styles.zoneIcon}><Warehouse /></span>
        <div className={styles.rack}><i /><i /><i /><i /><i /><i /></div>
        <small>{stages[3]}</small>
      </div>

      <div className={styles.conveyor}>
        <span /><span /><span /><span />
      </div>
    </div>
  );
}
