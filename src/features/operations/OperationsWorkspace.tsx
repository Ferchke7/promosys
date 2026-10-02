"use client";

import {
  ArrowLeft,
  ArrowRight,
  BatteryCharging,
  Boxes,
  CalendarDays,
  Check,
  CheckCircle2,
  CircuitBoard,
  ClipboardList,
  Factory,
  GitBranch,
  Layers3,
  PaintBucket,
  PauseCircle,
  Play,
  Plus,
  Printer,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Utensils,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Brand } from "@/src/shared/ui/Brand";
import { Barcode } from "./Barcode";
import styles from "./OperationsWorkspace.module.css";

type DomainId = "battery" | "electronics" | "metal" | "food";
type ModuleId = "po" | "wo" | "routing" | "schedule";
type RecordStatus = "planned" | "running" | "hold" | "done";

interface TwinNode {
  id: string;
  kind: "source" | "machine" | "operator" | "quality" | "buffer" | "shipping";
  title: string;
  subtitle: string;
  x: number;
  y: number;
  duration: number;
  capacity: number;
  defect: number;
}

interface DomainConfig {
  id: DomainId;
  label: string;
  description: string;
  accent: string;
  unit: string;
  icon: LucideIcon;
  product: string;
  route: Array<{ code: string; label: string; area: string }>;
  twinNodes: TwinNode[];
}

interface ProductionOrder {
  id: string;
  number: string;
  product: string;
  quantity: number;
  due: string;
  customer: string;
  status: RecordStatus;
}

interface WorkOrder {
  id: string;
  poId: string;
  number: string;
  batch: string;
  segment: string;
  quantity: number;
  step: number;
  line: string;
  workstation?: string;
  plannedStart?: string;
  plannedEnd?: string;
  barcode?: string;
  status: RecordStatus;
}

interface Records {
  orders: ProductionOrder[];
  workOrders: WorkOrder[];
}

const ACTIVE_DOMAIN_KEY = "promsys-active-domain-v1";
const RECORDS_KEY = "promsys-module-records-v1";
const TWIN_KEY = "promsys-digital-twin-demo-v1";

const domains: Record<DomainId, DomainConfig> = {
  battery: {
    id: "battery", label: "Батареи", description: "Electrode → Cell → Module → Pack", accent: "#2563eb", unit: "мод.", icon: BatteryCharging, product: "LFP Module 51.2V · 100Ah",
    route: [
      { code: "MIX", label: "Mixing", area: "Slurry preparation" }, { code: "COAT", label: "Coating", area: "Electrode coating" }, { code: "CAL", label: "Calendaring", area: "Electrode density" }, { code: "SLIT", label: "Slitting", area: "Electrode cutting" }, { code: "CELL", label: "Cell stacking", area: "Cell assembly" }, { code: "FILL", label: "Electrolyte filling", area: "Electrolyte line" }, { code: "FORM", label: "Formation", area: "Charge cycles" }, { code: "AGE", label: "Aging", area: "Stabilization" }, { code: "ASM", label: "Module assembly", area: "Module line" }, { code: "EOL", label: "BMS & EOL", area: "Final testing" },
    ],
    twinNodes: [
      { id: "battery-raw", kind: "source", title: "Electrode materials", subtitle: "LFP · Graphite · Foil", x: 28, y: 236, duration: 4, capacity: 96, defect: .4 },
      { id: "battery-coat", kind: "machine", title: "Coating line", subtitle: "Cathode + Anode", x: 228, y: 236, duration: 12, capacity: 84, defect: 1.2 },
      { id: "battery-cell", kind: "machine", title: "Cell assembly", subtitle: "Stacking & filling", x: 428, y: 236, duration: 10, capacity: 81, defect: 1.7 },
      { id: "battery-form", kind: "operator", title: "Formation & aging", subtitle: "Charge / stabilization", x: 628, y: 236, duration: 18, capacity: 76, defect: .8 },
      { id: "battery-module", kind: "machine", title: "Module assembly", subtitle: "Busbar · BMS · Housing", x: 828, y: 236, duration: 9, capacity: 88, defect: 1.1 },
      { id: "battery-eol", kind: "quality", title: "EOL & OQC", subtitle: "Capacity · Isolation · Pack", x: 1028, y: 236, duration: 6, capacity: 94, defect: .3 },
    ],
  },
  electronics: {
    id: "electronics", label: "Электроника", description: "SMT → PCBA → Final assembly", accent: "#7c3aed", unit: "шт.", icon: CircuitBoard, product: "BMS Controller v4",
    route: [
      { code: "IQC", label: "Incoming components", area: "IQC" }, { code: "PASTE", label: "Solder paste", area: "Printer" }, { code: "SMT", label: "Pick & place", area: "SMT line" }, { code: "REFLOW", label: "Reflow", area: "Reflow oven" }, { code: "AOI", label: "AOI", area: "Optical inspection" }, { code: "THT", label: "THT assembly", area: "Manual cell" }, { code: "ICT", label: "ICT test", area: "Test station" }, { code: "FINAL", label: "Final assembly", area: "Assembly line" }, { code: "OQC", label: "Packaging & OQC", area: "Dispatch" },
    ],
    twinNodes: [
      { id: "elec-raw", kind: "source", title: "Components IQC", subtitle: "PCB · IC · Passive", x: 28, y: 236, duration: 3, capacity: 97, defect: .5 },
      { id: "elec-smt", kind: "machine", title: "SMT placement", subtitle: "Printer + Pick & Place", x: 228, y: 236, duration: 7, capacity: 89, defect: 1.1 },
      { id: "elec-reflow", kind: "machine", title: "Reflow & AOI", subtitle: "Profile + inspection", x: 428, y: 236, duration: 6, capacity: 86, defect: 1.4 },
      { id: "elec-tht", kind: "operator", title: "THT assembly", subtitle: "Manual components", x: 628, y: 236, duration: 8, capacity: 78, defect: 1.5 },
      { id: "elec-final", kind: "machine", title: "Final assembly", subtitle: "Housing & firmware", x: 828, y: 236, duration: 6, capacity: 87, defect: .9 },
      { id: "elec-test", kind: "quality", title: "ICT & OQC", subtitle: "Electrical test", x: 1028, y: 236, duration: 5, capacity: 95, defect: .2 },
    ],
  },
  metal: {
    id: "metal", label: "Металлообработка", description: "Cut → Bend → Coat → Assembly", accent: "#0891b2", unit: "шт.", icon: PaintBucket, product: "Корпус шкафа IP54",
    route: [
      { code: "CUT", label: "Laser cutting", area: "Laser cell" }, { code: "BEND", label: "Bending", area: "Press brake" }, { code: "WELD", label: "Welding", area: "Welding cell" }, { code: "PREP", label: "Surface prep", area: "Pretreatment" }, { code: "COAT", label: "Powder coating", area: "Paint line" }, { code: "ASM", label: "Assembly", area: "Assembly line" }, { code: "QC", label: "Final QC", area: "Inspection" }, { code: "FG", label: "Finished goods", area: "Warehouse" },
    ],
    twinNodes: [
      { id: "metal-raw", kind: "source", title: "Sheet metal", subtitle: "08ПС · 1.5 mm", x: 28, y: 236, duration: 3, capacity: 96, defect: .5 },
      { id: "metal-cut", kind: "machine", title: "Laser cutting", subtitle: "TRUMPF 3030", x: 228, y: 236, duration: 9, capacity: 86, defect: 1.1 },
      { id: "metal-bend", kind: "machine", title: "Bend & weld", subtitle: "Fabrication cell", x: 428, y: 236, duration: 12, capacity: 79, defect: 1.8 },
      { id: "metal-coat", kind: "machine", title: "Powder coating", subtitle: "RAL 7035", x: 628, y: 236, duration: 14, capacity: 82, defect: 1.2 },
      { id: "metal-asm", kind: "operator", title: "Assembly", subtitle: "Assembly line 02", x: 828, y: 236, duration: 8, capacity: 88, defect: .8 },
      { id: "metal-qc", kind: "quality", title: "Final QC & stock", subtitle: "OQC · Finished goods", x: 1028, y: 236, duration: 5, capacity: 94, defect: .3 },
    ],
  },
  food: {
    id: "food", label: "Пищевое производство", description: "Raw → Process → Pack → OQC", accent: "#059669", unit: "кг", icon: Utensils, product: "Протеиновый батончик 60 г",
    route: [
      { code: "RAW", label: "Raw material", area: "Receiving & IQC" }, { code: "MIX", label: "Mixing", area: "Mixing room" }, { code: "FORM", label: "Forming", area: "Forming line" }, { code: "HEAT", label: "Thermal process", area: "Oven" }, { code: "COOL", label: "Cooling", area: "Cooling tunnel" }, { code: "PACK", label: "Packaging", area: "Packing line" }, { code: "MD", label: "Metal detector", area: "Food safety" }, { code: "OQC", label: "OQC & palletizing", area: "Dispatch" },
    ],
    twinNodes: [
      { id: "food-raw", kind: "source", title: "Raw material IQC", subtitle: "COA · Temperature", x: 28, y: 236, duration: 3, capacity: 97, defect: .4 },
      { id: "food-mix", kind: "machine", title: "Mixing", subtitle: "Recipe & dosing", x: 228, y: 236, duration: 8, capacity: 88, defect: .9 },
      { id: "food-heat", kind: "machine", title: "Thermal process", subtitle: "Time & temperature", x: 428, y: 236, duration: 12, capacity: 84, defect: 1.1 },
      { id: "food-cool", kind: "buffer", title: "Cooling", subtitle: "Cooling tunnel", x: 628, y: 236, duration: 10, capacity: 90, defect: .5 },
      { id: "food-pack", kind: "machine", title: "Packaging", subtitle: "Primary pack & label", x: 828, y: 236, duration: 7, capacity: 87, defect: 1.2 },
      { id: "food-oqc", kind: "quality", title: "Metal detect & OQC", subtitle: "Release to dispatch", x: 1028, y: 236, duration: 4, capacity: 96, defect: .2 },
    ],
  },
};

interface WorkstationOption {
  id: string;
  name: string;
  area: string;
  capacity: string;
}

const workstations: Record<DomainId, WorkstationOption[]> = {
  battery: [
    { id: "BAT-COAT-01", name: "Electrode line 01", area: "Coating", capacity: "12 400 electrodes / shift" },
    { id: "BAT-CELL-02", name: "Cell line 02", area: "Cell assembly", capacity: "4 000 cells / shift" },
    { id: "BAT-FORM-01", name: "Formation bank 01", area: "Formation & aging", capacity: "960 cells / cycle" },
    { id: "BAT-ASM-01", name: "Assembly line 01", area: "Module assembly", capacity: "520 modules / shift" },
  ],
  electronics: [
    { id: "EMS-SMT-01", name: "SMT line 01", area: "SMT", capacity: "28 000 CPH" },
    { id: "EMS-AOI-01", name: "AOI station 01", area: "Inspection", capacity: "1 800 panels / shift" },
    { id: "EMS-ASM-03", name: "Assembly cell 03", area: "Final assembly", capacity: "1 200 pcs / shift" },
    { id: "EMS-TEST-02", name: "ICT station 02", area: "Electrical test", capacity: "900 pcs / shift" },
  ],
  metal: [
    { id: "MET-FAB-01", name: "Fabrication line 01", area: "Cut & bend", capacity: "260 pcs / shift" },
    { id: "MET-WELD-02", name: "Welding cell 02", area: "Welding", capacity: "180 pcs / shift" },
    { id: "MET-PAINT-01", name: "Paint line 01", area: "Powder coating", capacity: "240 pcs / shift" },
    { id: "MET-ASM-02", name: "Assembly line 02", area: "Assembly", capacity: "320 pcs / shift" },
  ],
  food: [
    { id: "FOOD-PROC-01", name: "Process line 01", area: "Mixing & forming", capacity: "1 350 kg / shift" },
    { id: "FOOD-OVEN-01", name: "Thermal line 01", area: "Thermal process", capacity: "1 100 kg / shift" },
    { id: "FOOD-PACK-02", name: "Packing line 02", area: "Packaging", capacity: "10 000 pcs / shift" },
    { id: "FOOD-OQC-01", name: "OQC station 01", area: "Release", capacity: "24 lots / shift" },
  ],
};

const calendarDays = [
  { iso: "2026-09-19", day: "СБ", date: "19 SEP" },
  { iso: "2026-09-20", day: "ВС", date: "20 SEP" },
  { iso: "2026-09-21", day: "ПН", date: "21 SEP" },
  { iso: "2026-09-22", day: "ВТ", date: "22 SEP" },
  { iso: "2026-09-23", day: "СР", date: "23 SEP" },
  { iso: "2026-09-24", day: "ЧТ", date: "24 SEP" },
  { iso: "2026-09-25", day: "ПТ", date: "25 SEP" },
];
const initialRecords: Record<DomainId, Records> = {
  battery: {
    orders: [
      { id: "bat-po-014", number: "PO-BAT-2609-014", product: "LFP Module 51.2V · 100Ah", quantity: 480, due: "26 сен", customer: "Solar Grid Systems", status: "running" },
      { id: "bat-po-015", number: "PO-BAT-2609-015", product: "LFP Battery Pack · 15 kWh", quantity: 120, due: "30 сен", customer: "Volt House", status: "planned" },
    ],
    workOrders: [
      { id: "bat-wo-1", poId: "bat-po-014", number: "WO-ELE-0919-A", batch: "EL-240919-A", segment: "Electrode batch", quantity: 12400, step: 2, line: "Electrode line 01", status: "running" },
      { id: "bat-wo-2", poId: "bat-po-014", number: "WO-CELL-0919-B", batch: "CL-240919-B", segment: "Cell batch", quantity: 3840, step: 6, line: "Cell line 02", status: "running" },
      { id: "bat-wo-3", poId: "bat-po-014", number: "WO-MOD-0919-C", batch: "MD-240919-C", segment: "Module batch", quantity: 480, step: 8, line: "Assembly line 01", status: "planned" },
    ],
  },
  electronics: {
    orders: [{ id: "el-po-202", number: "PO-EMS-2609-202", product: "BMS Controller v4", quantity: 2400, due: "24 сен", customer: "Battery Division", status: "running" }, { id: "el-po-203", number: "PO-EMS-2609-203", product: "IoT Gateway PCB", quantity: 800, due: "28 сен", customer: "Smart Factory", status: "planned" }],
    workOrders: [{ id: "el-wo-1", poId: "el-po-202", number: "WO-SMT-0919-A", batch: "PCB-240919-A", segment: "SMT batch", quantity: 1200, step: 4, line: "SMT line 01", status: "running" }, { id: "el-wo-2", poId: "el-po-202", number: "WO-ASM-0920-B", batch: "BMS-240920-B", segment: "Final assembly", quantity: 1200, step: 6, line: "Assembly cell 03", status: "planned" }],
  },
  metal: {
    orders: [{ id: "mt-po-1048", number: "PO-MET-2609-1048", product: "Корпус шкафа IP54", quantity: 420, due: "22 сен", customer: "Assembly Division", status: "running" }, { id: "mt-po-1050", number: "PO-MET-2609-1050", product: "Рама напольная 1200", quantity: 96, due: "27 сен", customer: "Data Center Systems", status: "planned" }],
    workOrders: [{ id: "mt-wo-1", poId: "mt-po-1048", number: "WO-FAB-0919-A", batch: "MT-240919-A", segment: "Fabrication", quantity: 210, step: 2, line: "Fabrication line 01", status: "running" }, { id: "mt-wo-2", poId: "mt-po-1048", number: "WO-PNT-0919-B", batch: "PN-240919-B", segment: "Coating batch", quantity: 210, step: 4, line: "Paint line 01", status: "hold" }],
  },
  food: {
    orders: [{ id: "fd-po-077", number: "PO-FD-2609-077", product: "Протеиновый батончик 60 г", quantity: 18000, due: "20 сен", customer: "Retail Central", status: "running" }, { id: "fd-po-078", number: "PO-FD-2609-078", product: "Гранола · 400 г", quantity: 6400, due: "23 сен", customer: "Fresh Market", status: "planned" }],
    workOrders: [{ id: "fd-wo-1", poId: "fd-po-077", number: "WO-MIX-0919-A", batch: "LOT-240919-A", segment: "Process batch", quantity: 1080, step: 3, line: "Process line 01", status: "running" }, { id: "fd-wo-2", poId: "fd-po-077", number: "WO-PACK-0919-B", batch: "LOT-240919-B", segment: "Packaging lot", quantity: 9000, step: 5, line: "Packing line 02", status: "planned" }],
  },
};

const statusLabel: Record<RecordStatus, string> = { planned: "Запланирован", running: "В работе", hold: "Hold", done: "Завершён" };

function cloneRecords() {
  return JSON.parse(JSON.stringify(initialRecords)) as Record<DomainId, Records>;
}

function saveDomain(id: DomainId) {
  window.localStorage.setItem(ACTIVE_DOMAIN_KEY, id);
}

function seedTwin(id: DomainId) {
  const domain = domains[id];
  window.localStorage.setItem(ACTIVE_DOMAIN_KEY, id);
  window.localStorage.setItem(TWIN_KEY, JSON.stringify({ nodes: domain.twinNodes, processName: `${domain.label} · Digital Twin`, targetVolume: id === "battery" ? 480 : id === "food" ? 18000 : 420 }));
}

function DomainPicker({ title, description, onSelect, selectedId }: { title: string; description: string; onSelect: (id: DomainId) => void; selectedId?: DomainId | null }) {
  return <section className={styles.picker}><div className={styles.pickerIntro}><span><Sparkles /> НАСТРОЙКА РАБОЧЕЙ ОБЛАСТИ</span><h1>{title}</h1><p>{description}</p></div><div className={styles.domainCards}>{(Object.keys(domains) as DomainId[]).map((id) => { const domain = domains[id]; const Icon = domain.icon; return <button type="button" key={id} className={selectedId === id ? styles.selectedDomainCard : ""} onClick={() => onSelect(id)} style={{ "--domain-color": domain.accent } as React.CSSProperties}><span className={styles.domainIcon}><Icon /></span><div><strong>{domain.label}</strong><small>{domain.description}</small></div><em>{domain.route.length} операций</em><ArrowRight /></button>; })}</div><small className={styles.pickerHint}>Домен определяет структуру PO, WO/Batch, routing, quality gates и стартовую модель Digital Twin.</small></section>;
}

export function StudioHome() {
  const [domainId, setDomainId] = useState<DomainId | null>(null);
  useEffect(() => { const timer = window.setTimeout(() => setDomainId(window.localStorage.getItem(ACTIVE_DOMAIN_KEY) as DomainId | null), 0); return () => window.clearTimeout(timer); }, []);
  const choose = (id: DomainId) => { saveDomain(id); setDomainId(id); };
  if (!domainId) return <AppFrame><DomainPicker title="Выберите производственный домен" description="Сначала выберите отрасль. После этого PO, WO, партии и маршруты будут открываться отдельными модулями." onSelect={choose} /></AppFrame>;
  const domain = domains[domainId];
  const Icon = domain.icon;
  const liveWorkOrders = initialRecords[domainId].workOrders.filter((item) => item.status === "running").length;
  const shiftOutput = domainId === "battery" ? "412 / 480" : domainId === "electronics" ? "1 864 / 2 400" : domainId === "metal" ? "346 / 420" : "15 660 / 18 000";

  return <AppFrame><section className={styles.hub} style={{ "--accent": domain.accent } as React.CSSProperties}>
    <div className={styles.hubHeader}><div><span>PLANT CONTROL CENTER · TAS-01</span><h1><Icon />{domain.label}</h1><p>{domain.description} · производственная смена B</p></div><button type="button" onClick={() => setDomainId(null)}>Сменить домен</button></div>

    <section className={styles.kpiStrip} aria-label="Сводка производства">
      <div><span>SHIFT OUTPUT</span><strong>{shiftOutput}</strong><small>87.4% выполнения плана</small></div>
      <div><span>OEE · ALL LINES</span><strong>82.6%</strong><small><i className={styles.goodDot} /> +2.8% к прошлой смене</small></div>
      <div><span>ACTIVE WORK ORDERS</span><strong>{liveWorkOrders}</strong><small>{initialRecords[domainId].workOrders.length} WO всего в очереди</small></div>
      <div><span>QUALITY HOLDS</span><strong className={styles.warningValue}>1</strong><small><i className={styles.warnDot} /> требует решения</small></div>
      <div><span>LINE STATUS</span><strong>5 / 6</strong><small><i className={styles.goodDot} /> линий в работе</small></div>
    </section>

    <div className={styles.dispatchGrid}>
      <section className={styles.dispatchPanel}>
        <div className={styles.panelTitle}><div><span>SHOP FLOOR DISPATCH</span><strong>Состояние операций</strong></div><Link href="/studio/routing">Открыть routing <ArrowRight /></Link></div>
        <div className={styles.operationRows}>{domain.route.slice(0, 6).map((stage, index) => <div key={stage.code} className={styles.operationRow}><span className={index === 3 ? styles.operationHold : index < 3 ? styles.operationDone : styles.operationRunning}>{stage.code}</span><div><strong>{stage.label}</strong><small>{stage.area}</small></div><em>{index === 3 ? "HOLD" : index < 3 ? "COMPLETE" : "RUNNING"}</em><div className={styles.miniProgress}><i style={{ width: `${index === 3 ? 48 : index < 3 ? 100 : 64 + index * 4}%` }} /></div><b>{index === 3 ? "48%" : index < 3 ? "100%" : `${64 + index * 4}%`}</b></div>)}</div>
      </section>
      <section className={styles.eventPanel}>
        <div className={styles.panelTitle}><div><span>LIVE EVENT BOARD</span><strong>События смены</strong></div><small>4 события</small></div>
        <div className={styles.eventList}><div className={styles.eventCritical}><span>14:37</span><div><strong>Quality hold · Coating</strong><small>PQC-2609-3013 · толщина вне допуска</small></div><em>HOLD</em></div><div><span>14:26</span><div><strong>WO переведён на следующую операцию</strong><small>{initialRecords[domainId].workOrders[0]?.number}</small></div><em>MES</em></div><div><span>14:18</span><div><strong>Материал принят по IQC</strong><small>Incoming lot released to production</small></div><em>IQC</em></div><div><span>14:03</span><div><strong>Смена B запущена</strong><small>План и ресурсы синхронизированы</small></div><em>SYS</em></div></div>
      </section>
    </div>

    <div className={styles.sectionLabel}><span>EXECUTION MODULES</span><small>Рабочие места производства, качества и инженерии</small></div>
    <div className={styles.moduleCards}>
      <Link href="/studio/po"><ClipboardList /><span>01</span><strong>Production Orders</strong><small>Плановые заказы и потребность производства.</small><em>Открыть PO <ArrowRight /></em></Link>
      <Link href="/studio/wo"><Boxes /><span>02</span><strong>Work Orders / Batch</strong><small>WO, партии, barcode и исполнение.</small><em>Открыть WO <ArrowRight /></em></Link>
      <Link href="/studio/schedule"><CalendarDays /><span>03</span><strong>Workstation Calendar</strong><small>Загрузка рабочих центров по дням и сменам.</small><em>Открыть Calendar <ArrowRight /></em></Link>
      <Link href="/studio/routing"><Layers3 /><span>04</span><strong>Routing</strong><small>Операции, участки и статус прохождения.</small><em>Открыть Routing <ArrowRight /></em></Link>
      <Link href="/quality"><ShieldCheck /><span>05</span><strong>Quality</strong><small>Последовательные IQC–OQC quality gates.</small><em>Открыть Quality <ArrowRight /></em></Link>
      <Link href="/demo"><GitBranch /><span>06</span><strong>Digital Twin</strong><small>Модель линии и симуляция производительности.</small><em>Открыть Twin <ArrowRight /></em></Link>
    </div>
  </section></AppFrame>;
}
export function DemoDomainEntry() {
  const [selectedId, setSelectedId] = useState<DomainId | null>(null);
  useEffect(() => { const timer = window.setTimeout(() => setSelectedId(window.localStorage.getItem(ACTIVE_DOMAIN_KEY) as DomainId | null), 0); return () => window.clearTimeout(timer); }, []);
  const launch = (id: DomainId) => { seedTwin(id); window.location.assign("/demo/workspace"); };
  return <AppFrame><DomainPicker title="Какой Digital Twin запустить?" description="Выберите домен отдельно для этой симуляции. Мы загрузим подходящую линию, операции и исходные параметры." onSelect={launch} selectedId={selectedId} /></AppFrame>;
}

export function ProductionModuleWorkspace({ module }: { module: ModuleId }) {
  const [domainId, setDomainId] = useState<DomainId | null>(null);
  const [records, setRecords] = useState<Record<DomainId, Records>>(cloneRecords);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<"po" | "wo" | null>(null);
  const [selectedPoId, setSelectedPoId] = useState("");
  const [selectedWoId, setSelectedWoId] = useState("");
  const loadedRef = useRef(false);

  useEffect(() => { const timer = window.setTimeout(() => { const savedDomain = window.localStorage.getItem(ACTIVE_DOMAIN_KEY) as DomainId | null; const savedRecords = window.localStorage.getItem(RECORDS_KEY); if (savedDomain) setDomainId(savedDomain); if (savedRecords) setRecords(JSON.parse(savedRecords) as Record<DomainId, Records>); loadedRef.current = true; }, 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { if (!loadedRef.current) return; const timer = window.setTimeout(() => window.localStorage.setItem(RECORDS_KEY, JSON.stringify(records)), 300); return () => window.clearTimeout(timer); }, [records]);

  if (!domainId) return <AppFrame><DomainPicker title="Сначала выберите домен" description="Выбор сохранится для отдельных модулей PO, WO/Batch, Workstation Calendar и Routing." onSelect={(id) => { saveDomain(id); setDomainId(id); }} /></AppFrame>;
  const domain = domains[domainId];
  const domainRecords = records[domainId];
  const selectedPo = domainRecords.orders.find((item) => item.id === selectedPoId) ?? domainRecords.orders[0];
  const selectedWo = domainRecords.workOrders.find((item) => item.id === selectedWoId) ?? domainRecords.workOrders[0];
  const filteredOrders = domainRecords.orders.filter((item) => `${item.number} ${item.product} ${item.customer}`.toLowerCase().includes(query.toLowerCase()));
  const filteredWorkOrders = domainRecords.workOrders.filter((item) => `${item.number} ${item.batch} ${item.segment} ${item.line} ${item.barcode ?? ""}`.toLowerCase().includes(query.toLowerCase()));
  const moduleTitle = module === "po" ? "Production Orders" : module === "wo" ? "Work Orders / Batch" : module === "schedule" ? "Workstation Calendar" : "Technological Routing";
  const moduleDescription = module === "po" ? "Плановые производственные заказы без смешивания с исполнительным уровнем." : module === "wo" ? "Задания, партии, barcode и назначенный workstation." : module === "schedule" ? "Планирование WO по рабочим центрам, датам и доступной мощности." : "Операции и последовательность прохождения для выбранного домена.";

  const createRecord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const stamp = Date.now();
    if (modal === "po") {
      const record: ProductionOrder = { id: `${domainId}-po-${stamp}`, number: `PO-${domainId.slice(0,3).toUpperCase()}-${String(stamp).slice(-6)}`, product: String(form.get("product")), quantity: Number(form.get("quantity")), due: String(form.get("due") || "Без срока"), customer: String(form.get("customer") || "Внутренний заказ"), status: "planned" };
      setRecords((current) => ({ ...current, [domainId]: { ...current[domainId], orders: [record, ...current[domainId].orders] } }));
    }
    if (modal === "wo") {
      const number = `WO-${String(stamp).slice(-6)}`;
      const batch = String(form.get("batch"));
      const workstation = String(form.get("workstation") || workstations[domainId][0].name);
      const record: WorkOrder = { id: `${domainId}-wo-${stamp}`, poId: String(form.get("poId")), number, batch, segment: String(form.get("segment")), quantity: Number(form.get("quantity")), step: 0, line: workstation, workstation, plannedStart: String(form.get("plannedStart") || calendarDays[0].iso), plannedEnd: String(form.get("plannedEnd") || calendarDays[1].iso), barcode: `${number}-${batch}`.toUpperCase(), status: "planned" };
      setRecords((current) => ({ ...current, [domainId]: { ...current[domainId], workOrders: [record, ...current[domainId].workOrders] } }));
      setSelectedWoId(record.id);
    }
    setModal(null);
  };

  const updateWoStatus = (status: RecordStatus) => {
    if (!selectedWo) return;
    setRecords((current) => ({ ...current, [domainId]: { ...current[domainId], workOrders: current[domainId].workOrders.map((item) => item.id === selectedWo.id ? { ...item, status } : item) } }));
  };

  const advanceWo = () => {
    if (!selectedWo) return;
    const nextStep = Math.min(domain.route.length - 1, selectedWo.step + 1);
    setRecords((current) => ({ ...current, [domainId]: { ...current[domainId], workOrders: current[domainId].workOrders.map((item) => item.id === selectedWo.id ? { ...item, step: nextStep, status: nextStep === domain.route.length - 1 ? item.status : "running" } : item) } }));
  };

  return <AppFrame>
    <div className={styles.moduleLayout} style={{ "--accent": domain.accent } as React.CSSProperties}>
      <aside className={styles.moduleSidebar}>
        <div className={styles.activeDomain}><domain.icon /><div><span>АКТИВНЫЙ ДОМЕН</span><strong>{domain.label}</strong><small>{domain.description}</small></div></div>
        <button type="button" onClick={() => setDomainId(null)}>Сменить домен</button>
        <nav>
          <span className={styles.navGroup}>PRODUCTION EXECUTION</span>
          <Link className={module === "po" ? styles.activeModule : ""} href="/studio/po"><ClipboardList />Production Orders</Link>
          <Link className={module === "wo" ? styles.activeModule : ""} href="/studio/wo"><Boxes />Work Orders / Batch</Link>
          <Link className={module === "schedule" ? styles.activeModule : ""} href="/studio/schedule"><CalendarDays />Workstation Calendar</Link>
          <Link className={module === "routing" ? styles.activeModule : ""} href="/studio/routing"><Layers3 />Routing</Link>
          <span className={styles.navGroup}>QUALITY & ENGINEERING</span>
          <Link href="/quality"><ShieldCheck />Quality Management</Link>
          <Link href="/demo"><GitBranch />Digital Twin</Link>
        </nav>
      </aside>

      <section className={styles.moduleContent}>
        <div className={styles.workTabs}>
          <Link className={module === "po" ? styles.activeWorkTab : ""} href="/studio/po">Production Orders</Link>
          <Link className={module === "wo" ? styles.activeWorkTab : ""} href="/studio/wo">Work Orders</Link>
          <Link className={module === "schedule" ? styles.activeWorkTab : ""} href="/studio/schedule">Workstation Calendar</Link>
          <Link className={module === "routing" ? styles.activeWorkTab : ""} href="/studio/routing">Routing</Link>
          <Link href="/quality">Quality</Link>
        </div>
        <div className={styles.moduleHeader}>
          <div><span><Factory /> {domain.label.toUpperCase()}</span><h1>{moduleTitle}</h1><p>{moduleDescription}</p></div>
          {(module === "po" || module === "wo") && <button type="button" onClick={() => setModal(module)}><Plus />{module === "po" ? "Новый PO" : "Новый WO / Batch"}</button>}
        </div>

        {(module === "po" || module === "wo") && <div className={styles.searchBar}><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={module === "po" ? "Поиск PO, продукции или заказчика" : "Поиск WO, batch, barcode или workstation"} /></div>}

        {module === "po" && <section className={styles.moduleCard}><table><thead><tr><th>Production order</th><th>Продукция</th><th>Заказчик</th><th>Количество</th><th>Срок</th><th>Связанные WO</th><th>Статус</th></tr></thead><tbody>{filteredOrders.map((item) => <tr key={item.id} className={selectedPo?.id === item.id ? styles.selectedRow : ""} onClick={() => setSelectedPoId(item.id)}><td><strong className={styles.mono}>{item.number}</strong></td><td><strong>{item.product}</strong></td><td>{item.customer}</td><td>{item.quantity.toLocaleString("ru-RU")} {domain.unit}</td><td>{item.due}</td><td>{domainRecords.workOrders.filter((wo) => wo.poId === item.id).length}</td><td><Status status={item.status} /></td></tr>)}</tbody></table></section>}

        {module === "wo" && <>
          <section className={styles.moduleCard}><table><thead><tr><th>Work order</th><th>Parent PO</th><th>Batch / Lot</th><th>Barcode</th><th>Workstation</th><th>План</th><th>Текущая операция</th><th>Статус</th></tr></thead><tbody>{filteredWorkOrders.map((item) => <tr key={item.id} className={selectedWo?.id === item.id ? styles.selectedRow : ""} onClick={() => setSelectedWoId(item.id)}><td><strong className={styles.mono}>{item.number}</strong><small>{item.quantity.toLocaleString("ru-RU")} {domain.unit}</small></td><td><span className={styles.reference}>{domainRecords.orders.find((po) => po.id === item.poId)?.number ?? "—"}</span></td><td><strong>{item.batch}</strong><small>{item.segment}</small></td><td><span className={styles.tableBarcode}><Barcode value={item.barcode ?? `${item.number}-${item.batch}`} height={20} showText={false} /></span></td><td><strong>{item.workstation ?? item.line}</strong><small>{workstations[domainId].find((center) => center.name === (item.workstation ?? item.line))?.id ?? "WORK CENTER"}</small></td><td><strong>{item.plannedStart ?? "19 сен"}</strong><small>до {item.plannedEnd ?? "20 сен"}</small></td><td><strong>{domain.route[item.step]?.label}</strong><small>{item.step + 1} / {domain.route.length}</small></td><td><Status status={item.status} /></td></tr>)}</tbody></table></section>
          {selectedWo && <WoExecutionPanel domain={domain} order={domainRecords.orders.find((item) => item.id === selectedWo.poId)} workOrder={selectedWo} onAdvance={advanceWo} onStatus={updateWoStatus} />}
        </>}

        {module === "schedule" && <WorkstationCalendar domainId={domainId} workOrders={domainRecords.workOrders} selectedWoId={selectedWo?.id} onSelect={setSelectedWoId} />}
        {module === "routing" && <RoutingView domain={domain} workOrders={domainRecords.workOrders} selectedWo={selectedWo} onSelect={setSelectedWoId} onAdvance={advanceWo} />}
      </section>
    </div>
    {modal && <RecordModal module={modal} domain={domain} domainId={domainId} records={domainRecords} onClose={() => setModal(null)} onSubmit={createRecord} />}
  </AppFrame>;
}

function WoExecutionPanel({ domain, order, workOrder, onAdvance, onStatus }: { domain: DomainConfig; order?: ProductionOrder; workOrder: WorkOrder; onAdvance: () => void; onStatus: (status: RecordStatus) => void }) {
  const canComplete = workOrder.step === domain.route.length - 1 && workOrder.status !== "done";
  return <section className={styles.executionPanel}>
    <div className={styles.executionIdentity}><div><span>EXECUTION TICKET</span><strong>{workOrder.number}</strong><small>{order?.number ?? "No parent PO"} · {workOrder.batch}</small></div><Status status={workOrder.status} /></div>
    <div className={styles.executionBarcode}><Barcode value={workOrder.barcode ?? `${workOrder.number}-${workOrder.batch}`} height={48} /><small>Автоматически создан для WO + Batch. Готов для печати и сканирования.</small></div>
    <div className={styles.executionFacts}><div><span>WORKSTATION</span><strong>{workOrder.workstation ?? workOrder.line}</strong></div><div><span>PLAN WINDOW</span><strong>{workOrder.plannedStart ?? "2026-09-19"} → {workOrder.plannedEnd ?? "2026-09-20"}</strong></div><div><span>CURRENT OPERATION</span><strong>{domain.route[workOrder.step]?.label}</strong></div><div><span>PROGRESS</span><strong>{workOrder.step + 1} / {domain.route.length}</strong></div></div>
    <div className={styles.executionActions}>
      {workOrder.status === "planned" && <button type="button" className={styles.primaryAction} onClick={() => onStatus("running")}><Play />Start WO</button>}
      {workOrder.status === "running" && <button type="button" onClick={() => onStatus("hold")}><PauseCircle />Hold</button>}
      {workOrder.status === "hold" && <button type="button" className={styles.primaryAction} onClick={() => onStatus("running")}><RotateCcw />Resume</button>}
      {workOrder.status !== "done" && <button type="button" onClick={onAdvance} disabled={workOrder.step === domain.route.length - 1}>Next operation <ArrowRight /></button>}
      <button type="button" className={styles.completeAction} disabled={!canComplete} onClick={() => onStatus("done")}><Check />Complete</button>
      <button type="button" onClick={() => window.print()}><Printer />Print label</button>
      <Link href="/quality"><ShieldCheck />Open Quality Gate</Link>
    </div>
  </section>;
}

function WorkstationCalendar({ domainId, workOrders, selectedWoId, onSelect }: { domainId: DomainId; workOrders: WorkOrder[]; selectedWoId?: string; onSelect: (id: string) => void }) {
  const [workstationFilter, setWorkstationFilter] = useState("all");
  const centers = workstationFilter === "all" ? workstations[domainId] : workstations[domainId].filter((center) => center.id === workstationFilter);
  return <section className={styles.scheduleCard}>
    <div className={styles.scheduleToolbar}><div><span>FINITE CAPACITY SCHEDULE</span><strong>Workstation load · 7 days</strong><small>Перетащите взглядом WO от рабочего центра к календарной дате; выбор открывает задание.</small></div><label><CalendarDays /><select value={workstationFilter} onChange={(event) => setWorkstationFilter(event.target.value)}><option value="all">Все workstation</option>{workstations[domainId].map((center) => <option key={center.id} value={center.id}>{center.id} · {center.name}</option>)}</select></label></div>
    <div className={styles.calendarViewport}>
      <div className={styles.calendarHeader}><div>WORKSTATION / CAPACITY</div>{calendarDays.map((day) => <div key={day.iso}><span>{day.day}</span><strong>{day.date}</strong></div>)}</div>
      {centers.map((center, centerIndex) => <div className={styles.calendarRow} key={center.id}><div className={styles.centerCell}><span>{center.id}</span><strong>{center.name}</strong><small>{center.area} · {center.capacity}</small></div>{calendarDays.map((day, dayIndex) => { const scheduled = workOrders.filter((workOrder, workOrderIndex) => (workOrder.workstation ?? workOrder.line) === center.name && (workOrder.plannedStart ? workOrder.plannedStart === day.iso : workOrderIndex % calendarDays.length === dayIndex)); return <div className={styles.dayCell} key={day.iso}>{scheduled.map((workOrder) => <button type="button" key={workOrder.id} className={`${styles.scheduleBlock} ${styles[`schedule_${workOrder.status}`]} ${selectedWoId === workOrder.id ? styles.selectedScheduleBlock : ""}`} onClick={() => onSelect(workOrder.id)}><strong>{workOrder.number}</strong><small>{workOrder.batch}</small><em>{workOrder.quantity.toLocaleString("ru-RU")}</em></button>)}{!scheduled.length && dayIndex === (centerIndex + 3) % calendarDays.length && <span className={styles.capacitySlot}>Available</span>}</div>; })}</div>)}
    </div>
    <div className={styles.scheduleLegend}><span><i className={styles.legendPlanned} />Planned</span><span><i className={styles.legendRunning} />Running</span><span><i className={styles.legendHold} />Hold</span><span><i className={styles.legendDone} />Complete</span><small>Календарь использует те же WO, workstation и статусы, что и Execution.</small></div>
  </section>;
}
function RoutingView({ domain, workOrders, selectedWo, onSelect, onAdvance }: { domain: DomainConfig; workOrders: WorkOrder[]; selectedWo?: WorkOrder; onSelect: (id: string) => void; onAdvance: () => void }) {
  return <div className={styles.routingGrid}><section className={styles.woRail}><div><span>WORK ORDERS</span><strong>Выберите задание</strong></div>{workOrders.map((wo) => <button key={wo.id} type="button" className={selectedWo?.id === wo.id ? styles.selectedWo : ""} onClick={() => onSelect(wo.id)}><span>{wo.number}</span><strong>{wo.batch}</strong><small>{wo.segment} · {wo.line}</small><em>{wo.step + 1}/{domain.route.length}</em></button>)}</section><section className={styles.routePanel}><div className={styles.routeHeader}><div><span>TECHNOLOGICAL ROUTE</span><h2>{selectedWo?.number ?? "Выберите WO"}</h2><p>{selectedWo?.batch} · {selectedWo?.segment}</p></div><button type="button" onClick={onAdvance} disabled={!selectedWo || selectedWo.status === "done"}>Следующая операция <ArrowRight /></button></div><div className={styles.routeList}>{domain.route.map((stage, index) => { const done = selectedWo ? index < selectedWo.step : false; const active = selectedWo ? index === selectedWo.step : false; return <div key={stage.code} className={`${styles.routeItem} ${done ? styles.routeDone : ""} ${active ? styles.routeActive : ""}`}><span>{done ? <Check /> : String(index + 1).padStart(2,"0")}</span><div><strong>{stage.label}</strong><small>{stage.area}</small></div><em>{stage.code}</em>{index < domain.route.length - 1 && <i />}</div>; })}</div></section></div>;
}

function RecordModal({ module, domain, domainId, records, onClose, onSubmit }: { module: "po" | "wo"; domain: DomainConfig; domainId: DomainId; records: Records; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="record-modal-title">
    <div className={styles.modalHeader}><div><span>{module === "po" ? "PRODUCTION ORDER" : "WORK ORDER / BATCH"}</span><h2 id="record-modal-title">{module === "po" ? "Создать новый PO" : "Создать и запланировать WO"}</h2></div><button type="button" onClick={onClose} aria-label="Закрыть"><X /></button></div>
    <form onSubmit={onSubmit}>
      {module === "po" ? <>
        <label>Продукция<input name="product" required placeholder={domain.product} /></label>
        <div className={styles.formRow}><label>Количество<input name="quantity" type="number" min="1" required defaultValue="100" /></label><label>Единица<input value={domain.unit} disabled /></label></div>
        <label>Заказчик<input name="customer" placeholder="Внутренний заказ" /></label>
        <label>Срок<input name="due" type="date" /></label>
      </> : <>
        <div className={styles.autoCodeNote}><Barcode value="WO-AUTO-BATCH" height={28} showText={false} /><div><strong>Barcode создаётся автоматически</strong><small>Идентификатор объединяет WO и Batch и сразу готов для этикетки.</small></div></div>
        <label>Родительский PO<select name="poId" required>{records.orders.map((po) => <option key={po.id} value={po.id}>{po.number} · {po.product}</option>)}</select></label>
        <div className={styles.formRow}><label>Batch / Lot<input name="batch" required placeholder="LOT-240919-A" /></label><label>Количество<input name="quantity" type="number" min="1" required defaultValue="100" /></label></div>
        <label>Сегмент<input name="segment" required placeholder="Electrode / Cell / Module batch" /></label>
        <label>Workstation<select name="workstation" required defaultValue={workstations[domainId][0].name}>{workstations[domainId].map((center) => <option key={center.id} value={center.name}>{center.id} · {center.name} · {center.capacity}</option>)}</select></label>
        <div className={styles.formRow}><label>Плановое начало<input name="plannedStart" type="date" required defaultValue={calendarDays[0].iso} /></label><label>Плановое окончание<input name="plannedEnd" type="date" required defaultValue={calendarDays[1].iso} /></label></div>
      </>}
      <div className={styles.modalActions}><button type="button" onClick={onClose}>Отмена</button><button type="submit"><Plus />{module === "po" ? "Создать PO" : "Создать WO + barcode"}</button></div>
    </form>
  </section></div>;
}
function Status({ status }: { status: RecordStatus }) {
  return <span className={`${styles.status} ${styles[`status_${status}`]}`}><i />{statusLabel[status]}</span>;
}

function AppFrame({ children }: { children: React.ReactNode }) {
  return <main className={styles.shell}><header className={styles.header}><div className={styles.brandGroup}><Link href="/" className={styles.backButton} aria-label="На главную"><ArrowLeft /></Link><Link href="/" className={styles.brandLink}><Brand inverted compact /></Link><span className={styles.headerLine} /><div className={styles.productTitle}><strong>Smart Factory MES</strong><small>PRODUCTION EXECUTION SYSTEM</small></div></div><nav className={styles.productNav}><Link href="/studio"><Factory />Control center</Link><Link href="/studio/po"><ClipboardList />PO</Link><Link href="/studio/wo"><Boxes />WO / Batch</Link><Link href="/studio/schedule"><CalendarDays />Schedule</Link><Link href="/studio/routing"><Layers3 />Routing</Link><Link href="/quality"><ShieldCheck />Quality</Link><Link href="/demo"><GitBranch />Twin</Link></nav><div className={styles.headerState}><span><i /> MES Online</span><small><CheckCircle2 />Auto sync</small></div></header><section className={styles.systemBar}><div className={styles.systemContext}><label><span>PLANT</span><select aria-label="Завод"><option>TAS-01 · Main Plant</option><option>FER-02 · Secondary Plant</option></select></label><label><span>AREA</span><select aria-label="Производственный участок"><option>All production areas</option><option>Electrode shop</option><option>Assembly shop</option></select></label><label><span>SHIFT</span><select aria-label="Смена"><option>Shift B · 14:00–22:00</option><option>Shift A · 06:00–14:00</option></select></label></div><div className={styles.systemStatus}><span><i /> LIVE DATA</span><strong>19 SEP 2026</strong><small>Updated just now</small></div></section>{children}</main>;
}
