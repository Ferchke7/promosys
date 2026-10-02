"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Cpu,
  Layers,
  Pause,
  Play,
  RotateCcw,
  ScanLine,
  Warehouse,
  Zap,
} from "lucide-react";
import type { HeroFactoryContent } from "./content";
import styles from "./Factory3D.module.css";

interface Factory3DCanvasProps {
  content?: HeroFactoryContent;
  activeModule?: "all" | "mes" | "wms" | "aps" | "qa";
  onSelectModule?: (module: "all" | "mes" | "wms" | "aps" | "qa") => void;
}

interface StationInfo {
  id: "wms" | "mes" | "qa" | "agv";
  title: string;
  tag: string;
  metric: string;
  status: string;
  color: string;
}

const STATIONS: StationInfo[] = [
  {
    id: "wms",
    title: "WMS · Склад сырья",
    tag: "АВТО-СКЛАД",
    metric: "98.4% зап.",
    status: "В норме",
    color: "#f59e0b",
  },
  {
    id: "mes",
    title: "MES · Робо-цех",
    tag: "CNC & РОБОТ-СВАРКА",
    metric: "99.2% OEE",
    status: "Работает",
    color: "#38bdf8",
  },
  {
    id: "qa",
    title: "ОТК · Лазерный контроль",
    tag: "3D СКАНЕР",
    metric: "0.1% брак",
    status: "Контроль",
    color: "#4ade80",
  },
];

export function Factory3DCanvas({
  activeModule = "all",
  onSelectModule,
}: Factory3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [selectedStation, setSelectedStation] = useState<StationInfo | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "mes" | "wms" | "aps" | "qa">(activeModule);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x061527, 0.045);

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(10.5, 8.5, 11.5);
    camera.lookAt(0, 0.8, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x1a365d, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(8, 14, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 3.5, 14);
    cyanLight.position.set(-1, 3.5, 2);
    scene.add(cyanLight);

    const orangeLight = new THREE.PointLight(0xff7700, 3.0, 12);
    orangeLight.position.set(-3.5, 2.5, -2);
    scene.add(orangeLight);

    const greenLight = new THREE.PointLight(0x00ff88, 3.0, 10);
    greenLight.position.set(3.5, 2.5, 1);
    scene.add(greenLight);

    // --- Root Factory Group ---
    const factoryGroup = new THREE.Group();
    scene.add(factoryGroup);

    // --- 1. Cybernetic Floor & Base ---
    const baseGeo = new THREE.BoxGeometry(11.2, 0.4, 7.6);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x091c33,
      roughness: 0.4,
      metalness: 0.85,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.2;
    baseMesh.receiveShadow = true;
    factoryGroup.add(baseMesh);

    // Grid on Floor
    const gridHelper = new THREE.GridHelper(10.8, 22, 0x00d9ff, 0x0f3459);
    gridHelper.position.y = 0.01;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.65;
    factoryGroup.add(gridHelper);

    // Outer Glow Platform Edge
    const edgeGeo = new THREE.BoxGeometry(11.3, 0.08, 7.7);
    const edgeMat = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
    edgeMesh.position.y = -0.02;
    factoryGroup.add(edgeMesh);

    // --- 2. Station WMS: High-Bay Warehouse Rack ---
    const wmsGroup = new THREE.Group();
    wmsGroup.position.set(-3.8, 0, -1.2);
    factoryGroup.add(wmsGroup);

    const rackFrameMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.3,
    });
    const palletColors = [0xf59e0b, 0x0284c7, 0x10b981, 0xec4899, 0x6366f1];

    for (let c = 0; c < 3; c++) {
      const colX = (c - 1) * 0.95;
      const colGeo = new THREE.BoxGeometry(0.08, 2.8, 0.08);
      const col1 = new THREE.Mesh(colGeo, rackFrameMat);
      col1.position.set(colX, 1.4, -0.6);
      const col2 = col1.clone();
      col2.position.set(colX, 1.4, 0.6);
      wmsGroup.add(col1, col2);
    }

    for (let level = 0; level < 3; level++) {
      const shelfY = 0.4 + level * 0.85;
      const shelfGeo = new THREE.BoxGeometry(2.1, 0.05, 1.3);
      const shelf = new THREE.Mesh(shelfGeo, rackFrameMat);
      shelf.position.set(0, shelfY, 0);
      wmsGroup.add(shelf);

      for (let bx = 0; bx < 2; bx++) {
        const crateX = (bx - 0.5) * 0.9;
        const colorIdx = (level * 2 + bx) % palletColors.length;
        const crateGeo = new THREE.BoxGeometry(0.65, 0.55, 0.7);
        const crateMat = new THREE.MeshStandardMaterial({
          color: palletColors[colorIdx],
          roughness: 0.3,
          metalness: 0.4,
        });
        const crate = new THREE.Mesh(crateGeo, crateMat);
        crate.position.set(crateX, shelfY + 0.3, 0);
        crate.castShadow = true;
        crate.receiveShadow = true;
        wmsGroup.add(crate);

        const badgeGeo = new THREE.PlaneGeometry(0.3, 0.15);
        const badgeMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        });
        const badge = new THREE.Mesh(badgeGeo, badgeMat);
        badge.position.set(crateX, shelfY + 0.3, 0.36);
        wmsGroup.add(badge);
      }
    }

    const liftTower = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 3.0, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.4 })
    );
    liftTower.position.set(1.15, 1.5, 0);
    wmsGroup.add(liftTower);

    const liftCarriage = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.15, 0.7),
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.2, metalness: 0.8 })
    );
    liftCarriage.position.set(1.15, 1.2, 0);
    wmsGroup.add(liftCarriage);

    // --- 3. Station MES: Robotic Arm & CNC Milling Center ---
    const mesGroup = new THREE.Group();
    mesGroup.position.set(-0.2, 0, -0.4);
    factoryGroup.add(mesGroup);

    const cncBaseGeo = new THREE.BoxGeometry(2.4, 1.6, 1.8);
    const cncMat = new THREE.MeshStandardMaterial({
      color: 0x0f2744,
      metalness: 0.8,
      roughness: 0.2,
    });
    const cncBase = new THREE.Mesh(cncBaseGeo, cncMat);
    cncBase.position.set(-0.6, 0.8, -0.8);
    cncBase.castShadow = true;
    mesGroup.add(cncBase);

    const glassGeo = new THREE.BoxGeometry(1.6, 0.9, 0.1);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(-0.6, 0.95, 0.11);
    mesGroup.add(glass);

    const stackPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x64748b })
    );
    stackPole.position.set(-1.6, 1.9, -0.8);
    const stackGreen = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.12),
      new THREE.MeshBasicMaterial({ color: 0x22c55e })
    );
    stackGreen.position.set(-1.6, 2.15, -0.8);
    mesGroup.add(stackPole, stackGreen);

    const robotArmGroup = new THREE.Group();
    robotArmGroup.position.set(0.9, 0, 0.4);
    mesGroup.add(robotArmGroup);

    const robotBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.45, 0.35, 24),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.9, roughness: 0.2 })
    );
    robotBase.position.y = 0.175;
    robotArmGroup.add(robotBase);

    const joint1 = new THREE.Group();
    joint1.position.y = 0.35;
    robotArmGroup.add(joint1);

    const shoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x0369a1, metalness: 0.8, roughness: 0.3 })
    );
    joint1.add(shoulder);

    const arm1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 1.1, 0.22),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.7, roughness: 0.25 })
    );
    arm1.position.set(0, 0.55, 0);
    joint1.add(arm1);

    const joint2 = new THREE.Group();
    joint2.position.set(0, 1.1, 0);
    joint1.add(joint2);

    const elbow = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x0284c7 })
    );
    joint2.add(elbow);

    const arm2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.95, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.8, roughness: 0.3 })
    );
    arm2.position.set(0, 0.48, 0);
    joint2.add(arm2);

    const joint3 = new THREE.Group();
    joint3.position.set(0, 0.95, 0);
    joint2.add(joint3);

    const toolHead = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.35, 16),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.95, roughness: 0.1 })
    );
    toolHead.rotation.x = Math.PI;
    toolHead.position.y = 0.15;
    joint3.add(toolHead);

    const sparkGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const sparkMesh = new THREE.Mesh(sparkGeo, sparkMat);
    sparkMesh.position.set(0, 0.35, 0);
    joint3.add(sparkMesh);

    const sparkParticlesCount = 18;
    const sparkPos = new Float32Array(sparkParticlesCount * 3);
    for (let i = 0; i < sparkParticlesCount * 3; i++) {
      sparkPos[i] = (Math.random() - 0.5) * 0.4;
    }
    const sparkParticleGeo = new THREE.BufferGeometry();
    sparkParticleGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
    const sparkParticleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
    });
    const sparkSystem = new THREE.Points(sparkParticleGeo, sparkParticleMat);
    sparkSystem.position.set(0, 0.35, 0);
    joint3.add(sparkSystem);

    // --- 4. Station QA: Optical 3D Laser Inspection Tunnel ---
    const qaGroup = new THREE.Group();
    qaGroup.position.set(3.4, 0, 0.4);
    factoryGroup.add(qaGroup);

    const archMat = new THREE.MeshStandardMaterial({
      color: 0x0f2e4d,
      metalness: 0.85,
      roughness: 0.25,
    });
    const archLeft = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.8, 0.3), archMat);
    archLeft.position.set(-0.7, 0.9, 0);
    const archRight = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.8, 0.3), archMat);
    archRight.position.set(0.7, 0.9, 0);
    const archTop = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.22, 0.3), archMat);
    archTop.position.set(0, 1.8, 0);
    qaGroup.add(archLeft, archRight, archTop);

    const laserPlaneGeo = new THREE.PlaneGeometry(1.2, 1.6);
    const laserPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const laserPlane = new THREE.Mesh(laserPlaneGeo, laserPlaneMat);
    laserPlane.position.set(0, 0.9, 0);
    qaGroup.add(laserPlane);

    for (let e = 0; e < 4; e++) {
      const emX = (e - 1.5) * 0.35;
      const emitter = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.06),
        new THREE.MeshBasicMaterial({ color: 0x4ade80 })
      );
      emitter.position.set(emX, 1.69, 0);
      qaGroup.add(emitter);
    }

    // --- 5. Motorized Conveyor Belt Across Factory ---
    const conveyorGroup = new THREE.Group();
    conveyorGroup.position.set(0, 0.3, 0.4);
    factoryGroup.add(conveyorGroup);

    const conveyorTrack = new THREE.Mesh(
      new THREE.BoxGeometry(8.8, 0.18, 0.7),
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.8,
        roughness: 0.4,
      })
    );
    conveyorTrack.castShadow = true;
    conveyorTrack.receiveShadow = true;
    conveyorGroup.add(conveyorTrack);

    for (let r = 0; r < 18; r++) {
      const rX = -4.1 + r * 0.48;
      const roller = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.65, 8),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9 })
      );
      roller.rotation.z = Math.PI / 2;
      roller.position.set(rX, 0.1, 0);
      conveyorGroup.add(roller);
    }

    const workpieces: THREE.Mesh[] = [];
    const wpColors = [0x0ea5e9, 0x38bdf8, 0x22c55e, 0xf59e0b, 0x6366f1];
    for (let i = 0; i < 5; i++) {
      const wp = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.28, 0.42),
        new THREE.MeshStandardMaterial({
          color: wpColors[i % wpColors.length],
          metalness: 0.6,
          roughness: 0.2,
        })
      );
      wp.castShadow = true;
      wp.position.set(-3.8 + i * 1.8, 0.28, 0);
      conveyorGroup.add(wp);
      workpieces.push(wp);
    }

    // --- 6. Autonomous Guided Vehicle (AGV) on Floor ---
    const agvGroup = new THREE.Group();
    agvGroup.position.set(-1.8, 0.1, 2.2);
    factoryGroup.add(agvGroup);

    const agvChassis = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.2, 0.65),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7, roughness: 0.3 })
    );
    agvGroup.add(agvChassis);

    const agvBeacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    agvBeacon.position.set(0, 0.2, 0);
    agvGroup.add(agvBeacon);

    const agvCrate = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.4, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.5, roughness: 0.3 })
    );
    agvCrate.position.set(0, 0.3, 0);
    agvGroup.add(agvCrate);

    // --- 7. Floating Data Packets Conduit ---
    const conduitCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.8, 2.2, -1.2),
      new THREE.Vector3(-1.8, 3.2, -0.4),
      new THREE.Vector3(0.5, 2.8, 0.2),
      new THREE.Vector3(3.4, 2.4, 0.4),
    ]);
    const conduitGeo = new THREE.TubeGeometry(conduitCurve, 40, 0.025, 8, false);
    const conduitMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
    });
    const conduitMesh = new THREE.Mesh(conduitGeo, conduitMat);
    factoryGroup.add(conduitMesh);

    const packetGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const packet1 = new THREE.Mesh(packetGeo, packetMat);
    const packet2 = new THREE.Mesh(packetGeo, packetMat);
    factoryGroup.add(packet1, packet2);

    // --- Interaction & Mouse Orbit ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -0.35;
    let targetRotationX = 0.18;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      setIsRotating(false);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.007;
      targetRotationX = Math.max(-0.25, Math.min(0.55, targetRotationX + deltaY * 0.005));
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta() * speed;
      const time = clock.getElapsedTime() * speed;

      if (isPlaying) {
        if (isRotating && !isDragging) {
          targetRotationY += 0.0035;
        }

        factoryGroup.rotation.y += (targetRotationY - factoryGroup.rotation.y) * 0.08;
        factoryGroup.rotation.x += (targetRotationX - factoryGroup.rotation.x) * 0.08;

        joint1.rotation.y = Math.sin(time * 1.8) * 0.65;
        joint1.rotation.z = Math.cos(time * 1.4) * 0.25 - 0.2;
        joint2.rotation.z = Math.sin(time * 2.2) * 0.45 + 0.3;
        joint3.rotation.z = Math.sin(time * 3.0) * 0.3;

        sparkMesh.scale.setScalar(0.8 + Math.sin(time * 18) * 0.5);
        sparkSystem.rotation.y += 0.2;

        laserPlane.position.z = Math.sin(time * 2.5) * 0.35;

        for (let i = 0; i < workpieces.length; i++) {
          const wp = workpieces[i];
          wp.position.x += delta * 1.2;
          if (wp.position.x > 4.2) {
            wp.position.x = -4.2;
          }
        }

        agvGroup.position.x = Math.sin(time * 0.8) * 2.6;
        agvGroup.rotation.y = Math.cos(time * 0.8) > 0 ? 0 : Math.PI;
        agvBeacon.scale.setScalar(0.7 + Math.sin(time * 10) * 0.4);

        liftCarriage.position.y = 0.6 + Math.abs(Math.sin(time * 0.9)) * 1.8;

        const t1 = (time * 0.35) % 1;
        const t2 = (time * 0.35 + 0.5) % 1;
        const p1 = conduitCurve.getPoint(t1);
        const p2 = conduitCurve.getPoint(t2);
        packet1.position.copy(p1);
        packet2.position.copy(p2);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      resizeObserver.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isPlaying, speed, isRotating]);

  return (
    <div className={styles.canvasWrapper}>
      {/* Top 3D Control Strip */}
      <div className={styles.canvasHeader}>
        <div className={styles.statusBadge}>
          <span className={styles.liveIndicator} />
          <span>PROMSYS DIGITAL TWIN 3D</span>
          <span className={styles.engineBadge}>WEBGL · REALTIME</span>
        </div>

        <div className={styles.viewTabs}>
          {(["all", "mes", "wms", "qa"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ""}`}
              onClick={() => {
                setActiveTab(tab);
                onSelectModule?.(tab);
              }}
            >
              {tab === "all" && <Layers className="size-3.5" />}
              {tab === "mes" && <Cpu className="size-3.5" />}
              {tab === "wms" && <Warehouse className="size-3.5" />}
              {tab === "qa" && <ScanLine className="size-3.5" />}
              <span>{tab.toUpperCase()}</span>
            </button>
          ))}
        </div>

        <div className={styles.playbackControls}>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={() => setIsPlaying((p) => !p)}
            title={isPlaying ? "Приостановить симуляцию" : "Запустить симуляцию"}
          >
            {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </button>
          <button
            type="button"
            className={`${styles.controlBtn} ${speed === 2 ? styles.controlBtnActive : ""}`}
            onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1))}
            title="Скорость симуляции"
          >
            <Zap className="size-3.5" />
            <span>{speed}×</span>
          </button>
          <button
            type="button"
            className={`${styles.controlBtn} ${isRotating ? styles.controlBtnActive : ""}`}
            onClick={() => setIsRotating((r) => !r)}
            title="Авто-вращение камеры"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Render Target */}
      <div
        ref={containerRef}
        className={styles.threeCanvas}
        title="Потяните мышь для свободного 3D-вращения завода"
      />

      {/* Live Interactive 3D Station Badges */}
      <div className={styles.stationsOverlay}>
        {STATIONS.map((station) => (
          <button
            key={station.id}
            type="button"
            className={`${styles.stationCard} ${selectedStation?.id === station.id ? styles.stationActive : ""}`}
            onClick={() => setSelectedStation(station)}
          >
            <div className={styles.stationTop}>
              <span className={styles.stationDot} style={{ background: station.color }} />
              <strong>{station.title}</strong>
            </div>
            <div className={styles.stationDetails}>
              <span className={styles.stationMetric}>{station.metric}</span>
              <span className={styles.stationStatus}>{station.status}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Telemetry HUD */}
      <div className={styles.canvasFooter}>
        <div className={styles.telemetryItem}>
          <span className={styles.telemetryLabel}>OEE ЛИНИИ</span>
          <strong className={styles.telemetryValue}>94.8%</strong>
        </div>
        <div className={styles.telemetryItem}>
          <span className={styles.telemetryLabel}>ТАКТ ЦИКЛА</span>
          <strong className={styles.telemetryValue}>3.2 сек</strong>
        </div>
        <div className={styles.telemetryItem}>
          <span className={styles.telemetryLabel}>БРАК OTK</span>
          <strong className={`${styles.telemetryValue} ${styles.textSuccess}`}>0.1%</strong>
        </div>
        <div className={styles.telemetryHint}>
          <span>💡 3D-модель интерактивна — зажмите мышь для вращения</span>
        </div>
      </div>
    </div>
  );
}
