"use client";

import {
  AlertTriangle,
  ArrowLeft,
  BatteryCharging,
  Check,
  CheckCircle2,
  ChevronDown,
  CircuitBoard,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Filter,
  GitBranch,
  Microscope,
  PaintBucket,
  PauseCircle,
  Plus,
  Search,
  ShieldCheck,
  Table2,
  TestTube2,
  Utensils,
  X,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Brand } from "@/src/shared/ui/Brand";
import styles from "./QualityWorkspace.module.css";

type DomainId = "battery" | "electronics" | "metal" | "food";
type QualityType = "IQC" | "IPQC" | "PQC" | "QC" | "FQC" | "OQC";
type QualityResult = "pending" | "pass" | "hold" | "reject";

interface DomainOption {
  id: DomainId;
  label: string;
  description: string;
  accent: string;
  icon: typeof BatteryCharging;
  stages: string[];
  references: string[];
}

interface QualityRecord {
  id: string;
  number: string;
  domain: DomainId;
  type: QualityType;
  reference: string;
  object: string;
  stage: string;
  sampleSize: number;
  defects: number;
  criterion: string;
  inspector: string;
  date: string;
  result: QualityResult;
}

const domains: Record<DomainId, DomainOption> = {
  battery: {
    id: "battery",
    label: "Батареи",
    description: "Cell, module и battery pack",
    accent: "#2563eb",
    icon: BatteryCharging,
    stages: ["Incoming material", "Mixing", "Coating", "Calendaring", "Slitting", "Cell stacking", "Electrolyte filling", "Formation", "Aging", "Module assembly", "BMS & EOL test", "Outgoing inspection"],
    references: ["PO-BAT-2609-014", "WO-ELE-0919-A", "EL-240919-A", "WO-CELL-0919-B", "CL-240919-B", "WO-MOD-0919-C", "MD-240919-C"],
  },
  electronics: {
    id: "electronics",
    label: "Электроника",
    description: "SMT, PCBA и final assembly",
    accent: "#7c3aed",
    icon: CircuitBoard,
    stages: ["Incoming components", "Solder paste", "Pick & place", "Reflow", "AOI", "THT assembly", "ICT test", "Final assembly", "Packaging", "Outgoing inspection"],
    references: ["PO-EMS-2609-202", "WO-SMT-0919-A", "PCB-240919-A", "WO-ASM-0920-B", "BMS-240920-B"],
  },
  metal: {
    id: "metal",
    label: "Металлообработка",
    description: "Раскрой, покрытие и сборка",
    accent: "#0891b2",
    icon: PaintBucket,
    stages: ["Incoming steel", "Laser cutting", "Bending", "Welding", "Surface prep", "Powder coating", "Assembly", "Final QC", "Outgoing inspection"],
    references: ["PO-MET-2609-1048", "WO-FAB-0919-A", "MT-240919-A", "WO-PNT-0919-B", "PN-240919-B", "WO-ASM-0920-C"],
  },
  food: {
    id: "food",
    label: "Пищевое производство",
    description: "Сырьё, процесс и упаковка",
    accent: "#059669",
    icon: Utensils,
    stages: ["Raw material", "Mixing", "Forming", "Thermal process", "Cooling", "Packaging", "Metal detector", "Palletizing", "Outgoing inspection"],
    references: ["PO-FD-2609-077", "WO-MIX-0919-A", "LOT-240919-A", "WO-PACK-0919-B", "LOT-240919-B"],
  },
};

const typeMeta: Record<QualityType, { label: string; description: string; tone: string }> = {
  IQC: { label: "IQC", description: "Входной контроль сырья и компонентов", tone: "blue" },
  IPQC: { label: "IPQC", description: "Контроль непосредственно на операции", tone: "violet" },
  PQC: { label: "PQC", description: "Контроль стабильности процесса", tone: "cyan" },
  QC: { label: "QC", description: "Общая проверка качества", tone: "slate" },
  FQC: { label: "FQC", description: "Финальная проверка продукции", tone: "amber" },
  OQC: { label: "OQC", description: "Выходной контроль перед отгрузкой", tone: "green" },
};

const resultMeta: Record<QualityResult, { label: string; tone: string }> = {
  pending: { label: "Ожидает", tone: "neutral" },
  pass: { label: "Pass", tone: "success" },
  hold: { label: "Hold", tone: "warning" },
  reject: { label: "Reject", tone: "danger" },
};

const initialRecords: QualityRecord[] = [
  { id: "q-3012", number: "IQC-2609-3012", domain: "battery", type: "IQC", reference: "EL-240919-A", object: "Катодный материал LFP", stage: "Incoming material", sampleSize: 32, defects: 0, criterion: "Влага ≤ 0.05%; PSD в допуске", inspector: "А. Каримов", date: "19 сен · 08:20", result: "pass" },
  { id: "q-3013", number: "PQC-2609-3013", domain: "battery", type: "PQC", reference: "WO-ELE-0919-A", object: "Cathode coating", stage: "Coating", sampleSize: 20, defects: 1, criterion: "Толщина 92 ± 3 μm", inspector: "М. Юсупова", date: "19 сен · 09:45", result: "hold" },
  { id: "q-3014", number: "IPQC-2609-3014", domain: "battery", type: "IPQC", reference: "CL-240919-B", object: "Cell sealing", stage: "Cell stacking", sampleSize: 50, defects: 0, criterion: "Leak test 100%", inspector: "Д. Халилов", date: "19 сен · 10:10", result: "pass" },
  { id: "q-3015", number: "FQC-2609-3015", domain: "battery", type: "FQC", reference: "MD-240919-C", object: "LFP Module 51.2V", stage: "BMS & EOL test", sampleSize: 12, defects: 0, criterion: "Capacity ≥ 100Ah; ΔV ≤ 8mV", inspector: "А. Каримов", date: "19 сен · 11:30", result: "pending" },
  { id: "q-3016", number: "OQC-2609-3016", domain: "battery", type: "OQC", reference: "PO-BAT-2609-014", object: "Shipment lot · 120 modules", stage: "Outgoing inspection", sampleSize: 8, defects: 0, criterion: "AQL 0.65; комплектность", inspector: "Не назначен", date: "20 сен · план", result: "pending" },
  { id: "q-4101", number: "IQC-2609-4101", domain: "electronics", type: "IQC", reference: "PCB-240919-A", object: "Bare PCB · rev C", stage: "Incoming components", sampleSize: 50, defects: 0, criterion: "IPC-A-600 Class 2", inspector: "Р. Насиров", date: "19 сен · 07:50", result: "pass" },
  { id: "q-4102", number: "IPQC-2609-4102", domain: "electronics", type: "IPQC", reference: "WO-SMT-0919-A", object: "BMS Controller PCBA", stage: "AOI", sampleSize: 100, defects: 3, criterion: "IPC-A-610 Class 2", inspector: "Р. Насиров", date: "19 сен · 10:35", result: "reject" },
  { id: "q-5201", number: "PQC-2609-5201", domain: "metal", type: "PQC", reference: "PN-240919-B", object: "Powder coating RAL 7035", stage: "Powder coating", sampleSize: 15, defects: 0, criterion: "Толщина 80–110 μm", inspector: "С. Юлдашев", date: "19 сен · 09:20", result: "pass" },
  { id: "q-6301", number: "IQC-2609-6301", domain: "food", type: "IQC", reference: "LOT-240919-A", object: "Сырьевая смесь", stage: "Raw material", sampleSize: 5, defects: 0, criterion: "COA; температура ≤ 8°C", inspector: "Н. Азимова", date: "19 сен · 06:40", result: "pass" },
];

const qualitySequence: QualityType[] = ["IQC", "IPQC", "PQC", "QC", "FQC", "OQC"];
const storageKey = "promsys-quality-workspace-v1";

export function QualityWorkspace() {
  const [domainId, setDomainId] = useState<DomainId>("battery");
  const [records, setRecords] = useState<QualityRecord[]>(initialRecords);
  const [activeType, setActiveType] = useState<QualityType | "ALL">("ALL");
  const [resultFilter, setResultFilter] = useState<QualityResult | "all">("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("q-3013");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [saveLabel, setSaveLabel] = useState("Все изменения сохранены");
  const [gateMessage, setGateMessage] = useState("");
  const loadedRef = useRef(false);

  const domain = domains[domainId];
  const DomainIcon = domain.icon;
  const domainRecords = records.filter((item) => item.domain === domainId);
  const visibleRecords = domainRecords.filter((item) => {
    const matchesType = activeType === "ALL" || item.type === activeType;
    const matchesResult = resultFilter === "all" || item.result === resultFilter;
    const matchesQuery = `${item.number} ${item.reference} ${item.object} ${item.stage} ${item.inspector}`.toLowerCase().includes(query.toLowerCase());
    return matchesType && matchesResult && matchesQuery;
  });
  const selected = records.find((item) => item.id === selectedId && item.domain === domainId) ?? domainRecords[0];
  const passedTypes = new Set(domainRecords.filter((item) => item.result === "pass").map((item) => item.type));
  const isTypeUnlocked = (type: QualityType) => {
    const index = qualitySequence.indexOf(type);
    return index <= 0 || qualitySequence.slice(0, index).every((previous) => passedTypes.has(previous));
  };
  const nextRequiredType = qualitySequence.find((type) => !passedTypes.has(type) && isTypeUnlocked(type)) ?? "OQC";
  const selectedMissing = selected ? qualitySequence.slice(0, qualitySequence.indexOf(selected.type)).filter((type) => !passedTypes.has(type)) : [];
  const selectedLocked = selectedMissing.length > 0;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setRecords(JSON.parse(saved) as QualityRecord[]);
      } finally {
        loadedRef.current = true;
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loadedRef.current) return;
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(storageKey, JSON.stringify(records));
      setSaveLabel("Все изменения сохранены");
    }, 300);
    return () => window.clearTimeout(timer);
  }, [records]);

  const chooseDomain = (id: DomainId) => {
    setDomainId(id);
    setActiveType("ALL");
    setQuery("");
    setResultFilter("all");
    setSelectedId(records.find((item) => item.domain === id)?.id ?? "");
    setGateMessage("");
  };

  const setResult = (result: QualityResult) => {
    if (!selected) return;
    if (selectedLocked) {
      setGateMessage(`Сначала завершите с результатом Pass: ${selectedMissing.join(" → ")}`);
      return;
    }
    setGateMessage("");
    setSaveLabel("Сохраняем…");
    setRecords((items) => items.map((item) => item.id === selected.id ? { ...item, result } : item));
  };

  const createInspection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const type = String(form.get("type")) as QualityType;
    if (!isTypeUnlocked(type)) {
      const missing = qualitySequence.slice(0, qualitySequence.indexOf(type)).filter((previous) => !passedTypes.has(previous));
      setGateMessage(`Нельзя пропустить quality gate. Сначала: ${missing.join(" → ")}`);
      setIsCreateOpen(false);
      return;
    }
    const stamp = Date.now();
    const record: QualityRecord = {
      id: `q-${stamp}`,
      number: `${type}-${new Date().getFullYear().toString().slice(-2)}${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(stamp).slice(-4)}`,
      domain: domainId,
      type,
      reference: String(form.get("reference")),
      object: String(form.get("object")),
      stage: String(form.get("stage")),
      sampleSize: Number(form.get("sampleSize")),
      defects: 0,
      criterion: String(form.get("criterion")),
      inspector: String(form.get("inspector") || "Не назначен"),
      date: "Сегодня · сейчас",
      result: "pending",
    };
    setRecords((items) => [record, ...items]);
    setSelectedId(record.id);
    setActiveType("ALL");
    setIsCreateOpen(false);
  };

  const passCount = domainRecords.filter((item) => item.result === "pass").length;
  const holdCount = domainRecords.filter((item) => item.result === "hold").length;
  const rejectCount = domainRecords.filter((item) => item.result === "reject").length;
  const pendingCount = domainRecords.filter((item) => item.result === "pending").length;
  const inspectedSamples = domainRecords.reduce((sum, item) => sum + item.sampleSize, 0);
  const totalDefects = domainRecords.reduce((sum, item) => sum + item.defects, 0);
  const fpY = domainRecords.length ? Math.round(passCount / Math.max(1, domainRecords.length - pendingCount) * 1000) / 10 : 0;

  return (
    <main className={styles.shell} style={{ "--accent": domain.accent } as React.CSSProperties}>
      <header className={styles.header}>
        <div className={styles.brandGroup}>
          <Link href="/" className={styles.backButton} aria-label="На главную"><ArrowLeft /></Link>
          <Link href="/" className={styles.brandLink}><Brand inverted compact /></Link>
          <span className={styles.headerLine} />
          <div className={styles.productTitle}><strong>Smart Factory MES</strong><small>QUALITY MANAGEMENT SYSTEM</small></div>
        </div>
        <nav className={styles.productNav} aria-label="Продуктовые модули">
          <Link href="/studio"><Factory />Production</Link>
          <span><ShieldCheck />Quality</span>
          <Link href="/demo"><GitBranch />Digital Twin</Link>
        </nav>
        <div className={styles.headerMeta}><span><i /> Online</span><small><CheckCircle2 />{saveLabel}</small></div>
      </header>
      <section className={styles.systemBar}>
        <div className={styles.systemContext}><label><span>PLANT</span><select aria-label="Завод"><option>TAS-01 · Main Plant</option></select></label><label><span>AREA</span><select aria-label="Участок"><option>All production areas</option><option>Quality laboratory</option><option>Assembly shop</option></select></label><label><span>SHIFT</span><select aria-label="Смена"><option>Shift B · 14:00–22:00</option></select></label></div>
        <div className={styles.systemStatus}><span><i /> QMS LIVE</span><strong>19 SEP 2026</strong><small>Updated just now</small></div>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeading}><span>QUALITY MANAGEMENT</span><strong>Тип контроля</strong><small>Создайте quality gate на нужном уровне процесса.</small></div>
          <button type="button" className={`${styles.typeButton} ${activeType === "ALL" ? styles.activeType : ""}`} onClick={() => setActiveType("ALL")}><span className={styles.allIcon}><Table2 /></span><div><strong>Все проверки</strong><small>{domainRecords.length} записей</small></div></button>
          <div className={styles.typeList}>{(Object.keys(typeMeta) as QualityType[]).map((type) => { const meta = typeMeta[type]; const count = domainRecords.filter((item) => item.type === type).length; return <button key={type} type="button" className={`${styles.typeButton} ${activeType === type ? styles.activeType : ""}`} onClick={() => setActiveType(type)}><span className={`${styles.typeCode} ${styles[meta.tone]}`}>{type}</span><div><strong>{meta.label}</strong><small>{meta.description}</small></div><em>{count}</em></button>; })}</div>
          <div className={styles.sidebarLegend}><strong>Quality flow</strong><span><i className={styles.legendIncoming} />IQC · до запуска WO</span><span><i className={styles.legendProcess} />IPQC / PQC · на операции</span><span><i className={styles.legendOutgoing} />FQC / OQC · перед выпуском</span></div>
        </aside>

        <section className={styles.content}>
          <div className={styles.pageHeader}>
            <div><span className={styles.eyebrow}><Microscope /> QUALITY CONTROL</span><h1>Инспекции и quality gates</h1><p>Проверки привязаны к PO, WO, Batch и технологической операции.</p></div>
            <div className={styles.headerActions}><label className={styles.domainSelect} htmlFor="quality-domain"><DomainIcon /><select id="quality-domain" value={domainId} onChange={(event) => chooseDomain(event.target.value as DomainId)}>{(Object.keys(domains) as DomainId[]).map((id) => <option key={id} value={id}>{domains[id].label}</option>)}</select><ChevronDown /></label><button type="button" className={styles.createButton} onClick={() => setIsCreateOpen(true)}><Plus />Новая проверка</button></div>
          </div>

          <div className={styles.metrics}>
            <div><span><ClipboardCheck /> Всего проверок</span><strong>{domainRecords.length}</strong><small>{pendingCount} ожидают выполнения</small></div>
            <div><span><CheckCircle2 /> First Pass Yield</span><strong>{fpY}%</strong><small>{passCount} passed inspection</small></div>
            <div><span><TestTube2 /> Проверено единиц</span><strong>{inspectedSamples}</strong><small>{totalDefects} дефектов найдено</small></div>
            <div><span><AlertTriangle /> Quality holds</span><strong className={holdCount + rejectCount ? styles.attention : ""}>{holdCount + rejectCount}</strong><small>{holdCount} hold · {rejectCount} reject</small></div>
          </div>

          <section className={styles.gateFlow}>
            <div className={styles.gateFlowHeader}><div><span>ОБЯЗАТЕЛЬНАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ</span><strong>Quality gates нельзя пропускать</strong></div><small>Следующий этап открывается только после Pass предыдущего.</small></div>
            <div className={styles.gateSteps}>{qualitySequence.map((type, index) => { const passed = passedTypes.has(type); const unlocked = isTypeUnlocked(type); return <div key={type} className={[styles.gateStep, passed ? styles.gatePassed : unlocked ? styles.gateReady : styles.gateLocked].join(" ")}><span>{passed ? <Check /> : index + 1}</span><strong>{type}</strong><small>{passed ? "Pass" : unlocked ? "Доступен" : "Locked"}</small>{index < qualitySequence.length - 1 && <i />}</div>; })}</div>
            {gateMessage && <p className={styles.gateMessage}><AlertTriangle />{gateMessage}</p>}
          </section>

          <div className={styles.mainGrid}>
            <section className={styles.gridCard}>
              <div className={styles.gridToolbar}>
                <label className={styles.search}><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск инспекции, PO, WO или Batch" /></label>
                <label className={styles.filter}><Filter /><select value={resultFilter} onChange={(event) => setResultFilter(event.target.value as QualityResult | "all")}><option value="all">Все результаты</option>{(Object.keys(resultMeta) as QualityResult[]).map((result) => <option key={result} value={result}>{resultMeta[result].label}</option>)}</select></label>
                <span>{visibleRecords.length} записей</span>
              </div>
              <div className={styles.tableViewport}><table><thead><tr><th>Inspection</th><th>Тип</th><th>PO / WO / Batch</th><th>Объект и операция</th><th>Выборка</th><th>Дефекты</th><th>Инспектор</th><th>Результат</th></tr></thead><tbody>{visibleRecords.map((item) => <tr key={item.id} className={item.id === selected?.id ? styles.selectedRow : ""} onClick={() => setSelectedId(item.id)}><td><strong className={styles.mono}>{item.number}</strong><small>{item.date}</small></td><td><TypeBadge type={item.type} /></td><td><span className={styles.reference}>{item.reference}</span></td><td><strong>{item.object}</strong><small>{item.stage}</small></td><td>{item.sampleSize} ед.</td><td><span className={item.defects ? styles.defects : styles.noDefects}>{item.defects}</span></td><td>{item.inspector}</td><td><ResultBadge result={item.result} /></td></tr>)}</tbody></table>{!visibleRecords.length && <div className={styles.empty}><Search /><strong>Проверки не найдены</strong><span>Измените фильтр или создайте новую инспекцию.</span></div>}</div>
            </section>

            <aside className={styles.inspector}>
              {selected ? <><div className={styles.inspectorHead}><div><TypeBadge type={selected.type} /><strong>{selected.number}</strong><small>{selected.date}</small></div><ResultBadge result={selected.result} /></div><div className={styles.objectCard}><FileCheck2 /><div><span>ОБЪЕКТ КОНТРОЛЯ</span><strong>{selected.object}</strong><small>{selected.stage}</small></div></div><div className={styles.inspectorFields}><div><span>Связь</span><strong>{selected.reference}</strong></div><div><span>Выборка</span><strong>{selected.sampleSize} единиц</strong></div><div><span>Дефекты</span><strong className={selected.defects ? styles.defects : styles.noDefects}>{selected.defects}</strong></div><div><span>Инспектор</span><strong>{selected.inspector}</strong></div></div><div className={styles.criterion}><span>КРИТЕРИЙ ПРИЁМКИ</span><p>{selected.criterion}</p></div>{selectedLocked && <p className={styles.inspectorLock}><AlertTriangle />Сначала завершите: {selectedMissing.join(" → ")}</p>}<div className={styles.decision}><span>РЕШЕНИЕ ИНСПЕКТОРА</span><div><button type="button" className={styles.passButton} disabled={selectedLocked} onClick={() => setResult("pass")}><Check />Pass</button><button type="button" className={styles.holdButton} disabled={selectedLocked} onClick={() => setResult("hold")}><PauseCircle />Hold</button><button type="button" className={styles.rejectButton} disabled={selectedLocked} onClick={() => setResult("reject")}><XCircle />Reject</button></div></div><Link href="/studio" className={styles.productionLink}><Factory />Открыть связанный production flow</Link></> : <div className={styles.noSelection}><ShieldCheck /><strong>Выберите проверку</strong><span>Здесь появятся критерии и решение инспектора.</span></div>}
            </aside>
          </div>
        </section>
      </div>

      {isCreateOpen && <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsCreateOpen(false); }}><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="quality-modal-title"><div className={styles.modalHeader}><div><span>QUALITY INSPECTION</span><h2 id="quality-modal-title">Новая проверка</h2></div><button type="button" onClick={() => setIsCreateOpen(false)} aria-label="Закрыть"><X /></button></div><form onSubmit={createInspection}><p className={styles.gateHelp}>Следующий обязательный gate: <strong>{nextRequiredType}</strong>. Заблокированные типы станут доступны после Pass предыдущих.</p><div className={styles.formRow}><label>Тип контроля<select name="type" required defaultValue={nextRequiredType}>{(Object.keys(typeMeta) as QualityType[]).map((type) => <option key={type} disabled={!isTypeUnlocked(type)}>{type}{!isTypeUnlocked(type) ? " · locked" : ""}</option>)}</select></label><label>Связь PO / WO / Batch<select name="reference" required defaultValue={domain.references[0]}>{domain.references.map((reference) => <option key={reference}>{reference}</option>)}</select></label></div><label>Объект контроля<input name="object" required placeholder={domainId === "battery" ? "Cathode coating / LFP cell / Module" : "Материал или продукция"} /></label><label>Операция / quality gate<select name="stage" required defaultValue={domain.stages[0]}>{domain.stages.map((stage) => <option key={stage}>{stage}</option>)}</select></label><div className={styles.formRow}><label>Размер выборки<input name="sampleSize" type="number" min="1" required defaultValue="10" /></label><label>Инспектор<input name="inspector" placeholder="ФИО или команда" /></label></div><label>Критерий приёмки<textarea name="criterion" required placeholder="Допуск, AQL, стандарт или измеряемый параметр" rows={3} /></label><div className={styles.modalActions}><button type="button" onClick={() => setIsCreateOpen(false)}>Отмена</button><button type="submit"><Plus />Создать инспекцию</button></div></form></section></div>}
    </main>
  );
}

function TypeBadge({ type }: { type: QualityType }) {
  return <span className={`${styles.typeBadge} ${styles[typeMeta[type].tone]}`}>{type}</span>;
}

function ResultBadge({ result }: { result: QualityResult }) {
  const meta = resultMeta[result];
  return <span className={`${styles.resultBadge} ${styles[meta.tone]}`}><i />{meta.label}</span>;
}
