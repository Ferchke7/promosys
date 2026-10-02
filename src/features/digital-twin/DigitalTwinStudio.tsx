"use client";

import {
  Activity,
  ArrowLeft,
  Bot,
  Boxes,
  CircleCheckBig,
  Clock3,
  Cog,
  Database,
  Factory,
  Gauge,
  GripVertical,
  Layers3,
  Maximize2,
  PackageCheck,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
  UserRound,
  Warehouse,
  WandSparkles,
  Zap,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Brand } from "@/src/shared/ui/Brand";
import styles from "./DigitalTwinStudio.module.css";

type NodeKind = "source" | "machine" | "operator" | "quality" | "buffer" | "shipping";
type SimulationStatus = "idle" | "running" | "paused" | "complete";

interface ProcessNode {
  id: string;
  kind: NodeKind;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  duration: number;
  capacity: number;
  defect: number;
}

interface NodeTemplate {
  kind: NodeKind;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  duration: number;
  capacity: number;
  defect: number;
}

const CANVAS_WIDTH = 1240;
const CANVAS_HEIGHT = 620;
const NODE_WIDTH = 178;
const NODE_HEIGHT = 132;
const STORAGE_KEY = "promsys-digital-twin-demo-v1";

const templates: NodeTemplate[] = [
  { kind: "source", title: "Сырьё", subtitle: "Входной материал", icon: Database, duration: 3, capacity: 96, defect: 0.5 },
  { kind: "machine", title: "Станок", subtitle: "Операция обработки", icon: Cog, duration: 12, capacity: 82, defect: 2.1 },
  { kind: "operator", title: "Оператор", subtitle: "Ручная операция", icon: UserRound, duration: 8, capacity: 74, defect: 1.6 },
  { kind: "quality", title: "Контроль ОТК", subtitle: "Проверка качества", icon: ShieldCheck, duration: 5, capacity: 91, defect: 0.3 },
  { kind: "buffer", title: "Буфер / склад", subtitle: "Промежуточный запас", icon: Warehouse, duration: 2, capacity: 88, defect: 0.1 },
  { kind: "shipping", title: "Отгрузка", subtitle: "Готовая продукция", icon: Truck, duration: 4, capacity: 94, defect: 0.2 },
];

const iconByKind: Record<NodeKind, LucideIcon> = {
  source: Database,
  machine: Cog,
  operator: UserRound,
  quality: ShieldCheck,
  buffer: Warehouse,
  shipping: Truck,
};

const initialNodes: ProcessNode[] = [
  { id: "node-source", kind: "source", title: "Листовой металл", subtitle: "Партия М-2409", x: 46, y: 236, duration: 3, capacity: 96, defect: 0.5 },
  { id: "node-laser", kind: "machine", title: "Лазерная резка", subtitle: "TRUMPF 3030", x: 286, y: 236, duration: 11, capacity: 86, defect: 1.4 },
  { id: "node-bend", kind: "operator", title: "Гибка корпуса", subtitle: "Пост №04", x: 526, y: 236, duration: 9, capacity: 78, defect: 1.9 },
  { id: "node-quality", kind: "quality", title: "Контроль ОТК", subtitle: "Геометрия + шов", x: 766, y: 236, duration: 5, capacity: 92, defect: 0.4 },
  { id: "node-stock", kind: "buffer", title: "Готовая продукция", subtitle: "Ячейка A-12", x: 1006, y: 236, duration: 2, capacity: 89, defect: 0.1 },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function cloneInitialNodes() {
  return initialNodes.map((node) => ({ ...node }));
}

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = Math.round(minutes % 60);
  return hours ? `${hours} ч ${rest} мин` : `${rest} мин`;
}

export function DigitalTwinStudio() {
  const [nodes, setNodes] = useState<ProcessNode[]>(cloneInitialNodes);
  const [selectedId, setSelectedId] = useState(initialNodes[1].id);
  const [processName, setProcessName] = useState("Корпус шкафа · Линия 01");
  const [status, setStatus] = useState<SimulationStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [completedCycles, setCompletedCycles] = useState(12);
  const [targetVolume, setTargetVolume] = useState(68);
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [notice, setNotice] = useState("Черновик сохранён");
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const hydratedRef = useRef(false);

  const selectedNode = nodes.find((node) => node.id === selectedId) ?? null;
  const stageIndex = nodes.length ? Math.min(nodes.length - 1, Math.floor(progress / Math.max(1, 100 / nodes.length))) : -1;
  const filteredTemplates = templates.filter((template) => `${template.title} ${template.subtitle}`.toLowerCase().includes(query.trim().toLowerCase()));

  const metrics = useMemo(() => {
    const cycleTime = nodes.reduce((sum, node) => sum + node.duration, 0);
    const availability = nodes.length ? nodes.reduce((sum, node) => sum + node.capacity, 0) / nodes.length : 0;
    const quality = nodes.length ? 100 - nodes.reduce((sum, node) => sum + node.defect, 0) / nodes.length : 0;
    const oee = (availability / 100) * 0.94 * (quality / 100) * 100;
    const forecast = cycleTime ? Math.round((480 / cycleTime) * Math.max(1, nodes.length) * (availability / 100)) : 0;
    return { cycleTime, quality, oee, forecast };
  }, [nodes]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as { nodes?: ProcessNode[]; processName?: string; targetVolume?: number };
          if (Array.isArray(parsed.nodes)) setNodes(parsed.nodes);
          if (parsed.processName) setProcessName(parsed.processName);
          if (parsed.targetVolume) setTargetVolume(parsed.targetVolume);
        }
      } catch {
        setNotice("Локальная копия недоступна");
      } finally {
        hydratedRef.current = true;
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    const timeout = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, processName, targetVolume }));
      setNotice("Все изменения сохранены");
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [nodes, processName, targetVolume]);

  useEffect(() => {
    if (status !== "running") return;
    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = current + 1.4 * speed;
        if (next >= 100) {
          setStatus("complete");
          setCompletedCycles((count) => count + 1);
          setNotice("Цикл завершён без критических отклонений");
          return 100;
        }
        return next;
      });
    }, 180);
    return () => window.clearInterval(timer);
  }, [speed, status]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isEditing = event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement;
      if ((event.key === "Delete" || event.key === "Backspace") && selectedId && !isEditing) {
        setNodes((current) => current.filter((node) => node.id !== selectedId));
        setSelectedId("");
        setStatus("idle");
        setProgress(0);
      }
      if (event.code === "Space" && !isEditing) {
        event.preventDefault();
        setStatus((current) => current === "running" ? "paused" : "running");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  const addNode = useCallback((template: NodeTemplate) => {
    const index = nodes.length;
    const id = `${template.kind}-${Date.now()}`;
    const nextNode: ProcessNode = {
      id,
      kind: template.kind,
      title: template.title,
      subtitle: template.subtitle,
      x: 46 + (index % 5) * 240,
      y: index < 5 ? 236 : 420,
      duration: template.duration,
      capacity: template.capacity,
      defect: template.defect,
    };
    setNodes((current) => [...current, nextNode]);
    setSelectedId(id);
    setStatus("idle");
    setProgress(0);
    setNotice(`${template.title} добавлен в процесс`);
  }, [nodes.length]);

  const updateSelected = useCallback((patch: Partial<ProcessNode>) => {
    if (!selectedId) return;
    setNodes((current) => current.map((node) => node.id === selectedId ? { ...node, ...patch } : node));
  }, [selectedId]);

  const resetSimulation = useCallback(() => {
    setProgress(0);
    setStatus("idle");
    setNotice("Симуляция сброшена");
  }, []);

  const toggleSimulation = useCallback(() => {
    if (!nodes.length) {
      setNotice("Добавьте хотя бы один блок процесса");
      return;
    }
    if (status === "complete") setProgress(0);
    setStatus((current) => current === "running" ? "paused" : "running");
    setNotice(status === "running" ? "Симуляция приостановлена" : "Digital twin запущен");
  }, [nodes.length, status]);

  const autoLayout = useCallback(() => {
    setNodes((current) => current.map((node, index) => ({ ...node, x: 46 + (index % 5) * 240, y: index < 5 ? 236 : 420 })));
    setNotice("Блоки выровнены по сетке");
  }, []);

  const newProcess = useCallback(() => {
    setNodes([]);
    setSelectedId("");
    setProcessName("Новый производственный процесс");
    setStatus("idle");
    setProgress(0);
    setNotice("Пустой процесс создан — добавьте первый блок");
  }, []);

  const restoreExample = useCallback(() => {
    setNodes(cloneInitialNodes());
    setSelectedId(initialNodes[1].id);
    setProcessName("Корпус шкафа · Линия 01");
    setStatus("idle");
    setProgress(0);
    setNotice("Демонстрационный процесс восстановлен");
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent, node: ProcessNode) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedId(node.id);
    setDragging({ id: node.id, offsetX: (event.clientX - rect.left) / zoom - node.x, offsetY: (event.clientY - rect.top) / zoom - node.y });
  }, [zoom]);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rawX = (event.clientX - rect.left) / zoom - dragging.offsetX;
    const rawY = (event.clientY - rect.top) / zoom - dragging.offsetY;
    const x = clamp(Math.round(rawX / 12) * 12, 12, CANVAS_WIDTH - NODE_WIDTH - 12);
    const y = clamp(Math.round(rawY / 12) * 12, 88, CANVAS_HEIGHT - NODE_HEIGHT - 16);
    setNodes((current) => current.map((node) => node.id === dragging.id ? { ...node, x, y } : node));
  }, [dragging, zoom]);

  const handlePointerUp = useCallback(() => setDragging(null), []);

  return (
    <main className={styles.appShell}>
      <header className={styles.topbar}>
        <div className={styles.brandArea}>
          <Link href="/" className={styles.backButton} aria-label="Вернуться на главную"><ArrowLeft /></Link>
          <Link href="/" className={styles.brandLink} aria-label="PROMSYS — главная"><Brand inverted compact /></Link>
          <span className={styles.productDivider} />
          <div><span className={styles.productName}>Digital Twin Studio</span><span className={styles.demoBadge}>DEMO</span></div>
        </div>

        <div className={styles.processTitleWrap}>
          <input className={styles.processTitle} value={processName} onChange={(event) => setProcessName(event.target.value)} aria-label="Название процесса" />
          <span className={styles.saveState}><CircleCheckBig /> {notice}</span>
        </div>

        <div className={styles.topActions}>
          <label className={styles.speedSelect}>
            <Zap />
            <select value={speed} onChange={(event) => setSpeed(Number(event.target.value))} aria-label="Скорость симуляции">
              <option value={1}>1×</option><option value={2}>2×</option><option value={4}>4×</option>
            </select>
          </label>
          <button className={styles.iconAction} type="button" onClick={resetSimulation} aria-label="Сбросить симуляцию"><RotateCcw /></button>
          <button className={styles.runButton} type="button" onClick={toggleSimulation} disabled={!nodes.length}>
            {status === "running" ? <Pause /> : <Play />}
            {status === "running" ? "Пауза" : status === "complete" ? "Запустить снова" : "Запустить twin"}
          </button>
        </div>
      </header>

      <section className={styles.workspace}>
        <aside className={styles.library}>
          <div className={styles.panelHeading}>
            <div><span className={styles.eyebrow}>КОНСТРУКТОР</span><h2>Блоки процесса</h2></div>
            <button type="button" className={styles.miniButton} onClick={newProcess} title="Новый процесс"><Plus /></button>
          </div>
          <label className={styles.searchBox}><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти блок" aria-label="Найти блок процесса" /></label>
          <p className={styles.helperText}>Нажмите на блок, чтобы добавить его на сетку. Затем перетащите в нужное место.</p>

          <div className={styles.templateList}>
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <button key={template.kind} type="button" className={`${styles.templateCard} ${styles[template.kind]}`} onClick={() => addNode(template)}>
                  <span className={styles.templateIcon}><Icon /></span>
                  <span><strong>{template.title}</strong><small>{template.subtitle}</small></span>
                  <Plus className={styles.addIcon} />
                </button>
              );
            })}
          </div>

          <div className={styles.libraryFooter}><WandSparkles /><span><strong>Автоматические связи</strong><small>Блоки соединяются по порядку</small></span></div>
        </aside>

        <section className={styles.canvasSection} aria-label="Схема производственного процесса">
          <div className={styles.canvasToolbar}>
            <div className={styles.breadcrumb}><Layers3 /> Сценарий <span>/</span> Основной поток</div>
            <div className={styles.canvasActions}><button type="button" onClick={autoLayout}><Sparkles /> Выровнять</button><button type="button" onClick={restoreExample}><PackageCheck /> Пример</button></div>
          </div>

          <div className={styles.kpiStrip}>
            <div><span>OEE модели</span><strong>{metrics.oee.toFixed(1)}%</strong><small className={styles.good}>+4.8%</small></div>
            <div><span>Цикл партии</span><strong>{formatTime(metrics.cycleTime)}</strong><small>на {nodes.length} этапов</small></div>
            <div><span>Прогноз / смена</span><strong>{metrics.forecast} шт.</strong><small className={metrics.forecast >= targetVolume ? styles.good : styles.warning}>{metrics.forecast >= targetVolume ? "план выполнен" : `план ${targetVolume}`}</small></div>
            <div><span>Качество</span><strong>{metrics.quality.toFixed(1)}%</strong><small className={styles.good}>в допуске</small></div>
          </div>

          <div className={styles.canvasViewport}>
            <div ref={canvasRef} className={styles.canvas} style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, transform: `scale(${zoom})`, transformOrigin: "top left" }} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} onPointerLeave={handlePointerUp}>
              <div className={styles.flowLabel}><Activity /> Живой поток · {status === "running" ? "идёт симуляция" : status === "paused" ? "пауза" : status === "complete" ? "цикл завершён" : "готов к запуску"}</div>
              <svg className={styles.connections} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} aria-hidden="true">
                <defs><linearGradient id="edge-gradient" x1="0" x2="1"><stop offset="0" stopColor="#2f7cff" /><stop offset="1" stopColor="#22d3ee" /></linearGradient></defs>
                {nodes.slice(0, -1).map((node, index) => {
                  const next = nodes[index + 1];
                  const startX = node.x + NODE_WIDTH;
                  const startY = node.y + NODE_HEIGHT / 2;
                  const endX = next.x;
                  const endY = next.y + NODE_HEIGHT / 2;
                  const bend = Math.max(42, Math.abs(endX - startX) * 0.45);
                  const path = `M ${startX} ${startY} C ${startX + bend} ${startY}, ${endX - bend} ${endY}, ${endX} ${endY}`;
                  const active = status !== "idle" && index < stageIndex;
                  const current = status === "running" && index === Math.max(0, stageIndex - 1);
                  return <g key={`${node.id}-${next.id}`}><path d={path} className={styles.edgeShadow} /><path d={path} className={active ? styles.edgeActive : styles.edge} />{current && <circle r="5" className={styles.flowParticle}><animateMotion dur={`${1.1 / speed}s`} repeatCount="indefinite" path={path} /></circle>}</g>;
                })}
              </svg>

              {nodes.map((node, index) => {
                const Icon = iconByKind[node.kind];
                const isActive = status !== "idle" && index === stageIndex;
                const isDone = status !== "idle" && (index < stageIndex || status === "complete");
                return (
                  <button type="button" key={node.id} className={`${styles.processNode} ${styles[node.kind]} ${selectedId === node.id ? styles.selectedNode : ""} ${isActive ? styles.activeNode : ""}`} style={{ left: node.x, top: node.y, textAlign: "left", fontFamily: "inherit" }} onPointerDown={(event) => handlePointerDown(event, node)} onClick={() => setSelectedId(node.id)} aria-label={`${node.title}. Нажмите для настройки, перетащите для перемещения.`}>
                    <span className={styles.nodeTopline}><span className={styles.nodeIcon}><Icon /></span><span className={styles.nodeIndex}>{String(index + 1).padStart(2, "0")}</span><GripVertical className={styles.grip} /></span>
                    <strong>{node.title}</strong><small>{node.subtitle}</small>
                    <span className={styles.nodeMeta}><span><Clock3 /> {node.duration} мин</span><span className={isDone ? styles.nodeDone : isActive ? styles.nodeRunning : ""}>{isDone ? <CircleCheckBig /> : isActive ? <Bot /> : <Gauge />}{isDone ? "Готово" : isActive ? "В работе" : `${node.capacity}%`}</span></span>
                  </button>
                );
              })}

              {!nodes.length && <div className={styles.emptyCanvas}><span><Boxes /></span><h3>Начните с первого блока</h3><p>Выберите источник сырья или станок в библиотеке слева — связи построятся автоматически.</p><button type="button" onClick={restoreExample}>Загрузить готовый пример</button></div>}
            </div>
          </div>

          <div className={styles.canvasFooter}>
            <span><span className={styles.shortcut}>SPACE</span> запуск / пауза</span><span><span className={styles.shortcut}>DEL</span> удалить блок</span>
            <div className={styles.zoomControls}><button type="button" onClick={() => setZoom((value) => clamp(value - 0.1, 0.7, 1.1))} aria-label="Уменьшить масштаб"><ZoomOut /></button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom((value) => clamp(value + 0.1, 0.7, 1.1))} aria-label="Увеличить масштаб"><ZoomIn /></button><button type="button" onClick={() => setZoom(1)} aria-label="Масштаб 100%"><Maximize2 /></button></div>
          </div>
        </section>

        <aside className={styles.inspector}>
          <div>
            {selectedNode ? (
              <>
                <div className={styles.panelHeading}><div><span className={styles.eyebrow}>ПАРАМЕТРЫ БЛОКА</span><h2>Настройка операции</h2></div><button type="button" className={styles.deleteButton} onClick={() => { setNodes((current) => current.filter((node) => node.id !== selectedNode.id)); setSelectedId(""); }} title="Удалить блок"><Trash2 /></button></div>
                <div className={`${styles.selectedSummary} ${styles[selectedNode.kind]}`}><span className={styles.summaryIcon}>{(() => { const Icon = iconByKind[selectedNode.kind]; return <Icon />; })()}</span><div><strong>{selectedNode.title}</strong><small>{selectedNode.subtitle}</small></div></div>
                <label className={styles.fieldLabel}>Название операции<input value={selectedNode.title} onChange={(event) => updateSelected({ title: event.target.value })} /></label>
                <label className={styles.fieldLabel}>Оборудование / зона<input value={selectedNode.subtitle} onChange={(event) => updateSelected({ subtitle: event.target.value })} /></label>
                <div className={styles.rangeField}><div><label htmlFor="duration">Время цикла</label><strong>{selectedNode.duration} мин</strong></div><input id="duration" type="range" min="1" max="45" value={selectedNode.duration} onChange={(event) => updateSelected({ duration: Number(event.target.value) })} /></div>
                <div className={styles.rangeField}><div><label htmlFor="capacity">Доступность</label><strong>{selectedNode.capacity}%</strong></div><input id="capacity" type="range" min="40" max="100" value={selectedNode.capacity} onChange={(event) => updateSelected({ capacity: Number(event.target.value) })} /></div>
                <div className={styles.rangeField}><div><label htmlFor="defect">Вероятность брака</label><strong>{selectedNode.defect.toFixed(1)}%</strong></div><input id="defect" type="range" min="0" max="10" step="0.1" value={selectedNode.defect} onChange={(event) => updateSelected({ defect: Number(event.target.value) })} /></div>
              </>
            ) : <div className={styles.noSelection}><span><Bot /></span><h2>Выберите блок</h2><p>Нажмите на операцию на сетке, чтобы изменить её время, доступность и риск брака.</p></div>}
          </div>

          <div className={styles.planSection}>
            <div className={styles.divider} />
            <div className={styles.sectionTitle}><span>План симуляции</span><Factory /></div>
            <label className={styles.compactField}>Цель на смену<div><input type="number" min="1" value={targetVolume} onChange={(event) => setTargetVolume(Number(event.target.value))} /><span>шт.</span></div></label>
            <div className={styles.progressCard}><div><span>Текущий цикл</span><strong>{Math.round(progress)}%</strong></div><div className={styles.progressTrack}><i style={{ width: `${progress}%` }} /></div><small>{status === "running" ? `Операция: ${nodes[stageIndex]?.title ?? "—"}` : status === "complete" ? "Все этапы завершены" : "Ожидает запуска"}</small></div>
            <div className={styles.simStats}><div><span>Циклов</span><strong>{completedCycles}</strong></div><div><span>Событий</span><strong>{nodes.length * 4 + completedCycles}</strong></div><div><span>Рисков</span><strong>{nodes.filter((node) => node.capacity < 75 || node.defect > 3).length}</strong></div></div>
          </div>
        </aside>
      </section>
    </main>
  );
}
