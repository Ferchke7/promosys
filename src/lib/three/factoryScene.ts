import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface HotspotDef {
	id: string;
	num: string;
	title: string;
	category: string;
	subtitle: string;
	position: [number, number, number];
	cameraTarget: [number, number, number];
	cameraPos: [number, number, number];
	specs: { label: string; value: string }[];
	description: string;
}

export const BATTERY_HOTSPOTS: HotspotDef[] = [
	{
		id: 'laser-busbar-welding',
		num: '01',
		title: 'Лазерная Сварка Шин (Busbars)',
		category: 'ПРЕЦИЗИОННАЯ СВАРКА КЛЕММ',
		subtitle: 'Высокоскоростное волоконное соединение медных шин с ячейками 21700',
		position: [0.0, 1.45, 0.0],
		cameraTarget: [0.0, 0.9, 0.0],
		cameraPos: [1.8, 2.2, 2.8],
		specs: [
			{ label: 'Мощность лазера', value: '4.0 кВт IPG Fiber' },
			{ label: 'Скорость импульса', value: '120 сварных точек/сек' },
			{ label: 'Глубина провара', value: '0.45 ± 0.03 мм' },
			{ label: 'Контроль пула расплава', value: 'PROMSYS Optical OCT (100%)' }
		],
		description:
			'Бесконтактная лазерная микросварка соединяет медные токопроводящие шины с никелевыми выводами ячеек. Система PROMSYS контролирует температуру ванны расплава в реальном времени, исключая перегрев лития.'
	},
	{
		id: 'robotic-cell-stacking',
		num: '02',
		title: 'Робот-Укладчик Ячеек в Матрицу',
		category: 'КИНЕМАТИКА & СБОРКА МОДУЛЕЙ',
		subtitle: 'Автоматизированная вакуумная посадка Li-ion элементов в сотовый холдер',
		position: [-3.8, 1.7, 0.0],
		cameraTarget: [-3.8, 1.1, 0.0],
		cameraPos: [-2.2, 2.5, 3.2],
		specs: [
			{ label: 'Тактовое время укладки', value: '0.24 сек / элемент' },
			{ label: 'Степени свободы робота', value: '6-DOF Articulated Arm' },
			{ label: 'Проверка полярности', value: 'Машинное зрение 2D Matrix' },
			{ label: 'Точность позиционирования', value: '± 0.02 мм' }
		],
		description:
			'Многопозиционный вакуумный захват берет партию протестированных элементов питания и укладывает их в огнестойкий композитный холдер с автоматической перепроверкой ориентации полюсов +/-.'
	},
	{
		id: 'inline-eol-testing',
		num: '03',
		title: '100% Inline-Тестирование OCV & Импеданса',
		category: 'ВЫХОДНОЙ КОНТРОЛЬ КАЧЕСТВА (EOL)',
		subtitle: 'Автоматический замер напряжения разомкнутой цепи и внутреннего сопротивления',
		position: [3.8, 1.35, 0.0],
		cameraTarget: [3.8, 0.85, 0.0],
		cameraPos: [2.5, 2.1, 2.9],
		specs: [
			{ label: 'Схема измерений', value: '4-проводная Кельвина (mΩ)' },
			{ label: 'Погрешность OCV', value: '± 0.1 мВ' },
			{ label: 'Дельта баланса ячеек', value: 'ΔV < 1.5 мВ допуск' },
			{ label: 'Прослеживаемость MES', value: 'Цифровой паспорт каждого модуля' }
		],
		description:
			'Многоконтактный диагностический гребешок опускается на шины собранного модуля, измеряя импеданс каждого последовательного сегмента. Модули с отклонением выше 0.5% мгновенно отбраковываются на рецикл.'
	},
	{
		id: 'bms-integration-station',
		num: '04',
		title: 'Монтаж Платы Управления BMS',
		category: 'ЭЛЕКТРОНИКА И БЕЗОПАСНОСТЬ',
		subtitle: 'Установка контроллера балансировки, термодатчиков NTC и силовой коммутации',
		position: [0.0, 1.6, -1.8],
		cameraTarget: [0.0, 1.0, -1.8],
		cameraPos: [-1.8, 2.6, 0.8],
		specs: [
			{ label: 'Архитектура BMS', value: 'Active Balancing 16S / 800V' },
			{ label: 'Точки термомониторинга', value: '16 датчиков на модуль' },
			{ label: 'Протокол обмена', value: 'CANopen / Industrial Ethernet' },
			{ label: 'Защита от терморазгона', value: 'Алгоритм PROMSYS SafeBattery' }
		],
		description:
			'Интеграция интеллектуальной платы управления батареей (Battery Management System). Платформа PROMSYS калибрует датчики тока и прошивает индивидуальный профиль деградации ячеек.'
	},
	{
		id: 'gigafactory-conveyor-wms',
		num: '05',
		title: 'Конвейерная Линия Gigafactory & WMS',
		category: 'ЛОГИСТИКА И ПРОСЛЕЖИВАЕМОСТЬ',
		subtitle: 'Прецизионная подача паллет с RFID-трекингом и синхронизацией такта',
		position: [-0.2, 0.65, 0.0],
		cameraTarget: [-0.2, 0.45, 0.0],
		cameraPos: [0.0, 3.4, 4.6],
		specs: [
			{ label: 'Скорость перемещения', value: '0.6 - 1.2 м/с регулируемая' },
			{ label: 'Идентификация паллет', value: 'UHF RFID + лазерный дальномер' },
			{ label: 'Синхронизация такта', value: 'APS динамический балансир' },
			{ label: 'Стандарт безопасности', value: 'ISO 26262 ASIL-D' }
		],
		description:
			'Двухниточный автоматизированный транспортер с антистатическим покрытием (ESD-safe). Подает тяжелые аккумуляторные блоки между роботизированными станциями без рывков и вибраций.'
	}
];

export const FACTORY_HOTSPOTS = BATTERY_HOTSPOTS;

export interface SceneTelemetry {
	camAzimuth: number;
	camFov: number;
	camElev: number;
	fps: number;
	oee: number;
	activeAxes: number;
	status: string;
}

export class FactorySceneManager {
	private container: HTMLElement;
	private canvas: HTMLCanvasElement;
	private renderer!: THREE.WebGLRenderer;
	private scene!: THREE.Scene;
	private camera!: THREE.PerspectiveCamera;
	private controls!: OrbitControls;
	private clock: THREE.Clock = new THREE.Clock();

	// Groups
	private lineRoot: THREE.Group = new THREE.Group();
	private conveyorGroup: THREE.Group = new THREE.Group();
	private workstationsGroup: THREE.Group = new THREE.Group();
	private movingPacksGroup: THREE.Group = new THREE.Group();
	private featuredBatteryPack: THREE.Group = new THREE.Group();
	private laserBeamMesh!: THREE.Mesh;
	private laserLight!: THREE.PointLight;
	private weldingSparks!: THREE.Points;
	private sparkPositions!: Float32Array;
	private sparkVelocities!: Float32Array;

	// Exploded layers of the featured battery pack
	private explodeLayers: {
		topCover: THREE.Mesh;
		bmsBoard: THREE.Group;
		busbars: THREE.Group;
		holderUpper: THREE.Mesh;
		cellsMatrix: THREE.Group;
		coolingPlate: THREE.Mesh;
		bottomTray: THREE.Mesh;
	} = {} as any;

	// Materials for X-Ray toggle
	private defaultMaterials: Map<THREE.Mesh, THREE.Material | THREE.Material[]> = new Map();
	private wireframeMaterials: Map<THREE.Mesh, THREE.MeshBasicMaterial> = new Map();

	// States & Modes
	public isInteractiveMode: boolean = false;
	public isKinematicsActive: boolean = true;
	public isExploded: boolean = false;
	public isXRay: boolean = false;
	public isAutoRotate: boolean = false;

	private explodeProgress: number = 0;
	private targetExplode: number = 0;
	private conveyorSpeed: number = 0.85;

	// Camera Lerp
	private currentCamPos = new THREE.Vector3(0, 3.8, 7.8);
	private targetCamPos = new THREE.Vector3(0, 3.8, 7.8);
	private currentLookAt = new THREE.Vector3(0, 1.0, 0);
	private targetLookAt = new THREE.Vector3(0, 1.0, 0);
	private targetFov = 38;

	// Telemetry metrics
	private frameCount = 0;
	private lastFpsUpdate = 0;
	private currentFps = 60;

	// Callbacks
	public onTelemetryUpdate?: (telemetry: SceneTelemetry) => void;
	public onHotspotScreenPositions?: (
		positions: { id: string; x: number; y: number; visible: boolean }[]
	) => void;

	private isDisposed = false;
	private reqId: number | null = null;

	constructor(container: HTMLElement, canvas: HTMLCanvasElement) {
		this.container = container;
		this.canvas = canvas;
		this.initScene();
	}

	private initScene() {
		const width = this.container.clientWidth || window.innerWidth;
		const height = this.container.clientHeight || window.innerHeight;

		// 1. Scene & Cleanroom Atmosphere
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0x08090d);
		this.scene.fog = new THREE.FogExp2(0x08090d, 0.032);

		// 2. Camera
		this.camera = new THREE.PerspectiveCamera(this.targetFov, width / height, 0.1, 150);
		this.camera.position.copy(this.currentCamPos);
		this.camera.lookAt(this.currentLookAt);

		// 3. Renderer
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			powerPreference: 'high-performance',
			alpha: false
		});
		this.renderer.setSize(width, height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 1.25;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		// 4. OrbitControls
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.06;
		this.controls.minDistance = 2.0;
		this.controls.maxDistance = 22.0;
		this.controls.maxPolarAngle = Math.PI / 2 - 0.02;
		this.controls.target.copy(this.currentLookAt);
		this.controls.enabled = false;

		// 5. High-Precision Lighting
		this.setupLighting();

		// 6. Cleanroom ESD Floor & Boundary Grid
		this.setupCleanroomFloor();

		// 7. Build Full Battery Production Line
		this.buildBatteryProductionLine();

		// 8. Welding Sparks System
		this.setupWeldingSparks();

		// 9. Resize & Loop
		window.addEventListener('resize', this.onWindowResize);
		this.animate();
	}

	private setupLighting() {
		// Clean ambient light
		const ambientLight = new THREE.AmbientLight(0x1e2430, 2.4);
		this.scene.add(ambientLight);

		// Overhead high-bay industrial luminaires
		const keySun = new THREE.DirectionalLight(0xf4f6fb, 4.2);
		keySun.position.set(5, 14, 8);
		keySun.castShadow = true;
		keySun.shadow.mapSize.width = 2048;
		keySun.shadow.mapSize.height = 2048;
		keySun.shadow.bias = -0.0004;
		this.scene.add(keySun);

		// Front Key Spotlight directly illuminating the central welding workstation
		const spotWelder = new THREE.SpotLight(0xffffff, 5.5, 30, Math.PI / 3.5, 0.4);
		spotWelder.position.set(0, 8.5, 6);
		spotWelder.target.position.set(0, 1.0, 0);
		this.scene.add(spotWelder);
		this.scene.add(spotWelder.target);

		// PROMSYS Signature Orange Accent Light (Industrial safety indicator)
		const orangeAccent = new THREE.PointLight(0xff3b00, 4.5, 20, 1.4);
		orangeAccent.position.set(-6, 3.2, 2);
		this.scene.add(orangeAccent);

		// Cyan Gigafactory High-Tech Telemetry Light
		const cyanAccent = new THREE.PointLight(0x00d4ff, 4.0, 20, 1.4);
		cyanAccent.position.set(6, 3.2, 2);
		this.scene.add(cyanAccent);

		// Laser welding bright point light
		this.laserLight = new THREE.PointLight(0x00f0ff, 4.0, 6, 1.2);
		this.laserLight.position.set(0, 1.35, 0);
		this.scene.add(this.laserLight);
	}

	private setupCleanroomFloor() {
		// Reflective dark anti-static cleanroom epoxy floor
		const floorGeo = new THREE.PlaneGeometry(60, 60);
		const floorMat = new THREE.MeshStandardMaterial({
			color: 0x090a0e,
			roughness: 0.18,
			metalness: 0.92
		});
		const floor = new THREE.Mesh(floorGeo, floorMat);
		floor.rotation.x = -Math.PI / 2;
		floor.position.y = 0;
		floor.receiveShadow = true;
		this.scene.add(floor);

		// Clean technical laser lines on floor
		const grid = new THREE.GridHelper(50, 50, 0xff3b00, 0x181c24);
		grid.position.y = 0.005;
		this.scene.add(grid);

		// Safety area perimeter around battery line
		const perimeterGeo = new THREE.RingGeometry(8.2, 8.35, 64);
		const perimeterMat = new THREE.MeshBasicMaterial({
			color: 0xff3b00,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.55
		});
		const perimeter = new THREE.Mesh(perimeterGeo, perimeterMat);
		perimeter.rotation.x = -Math.PI / 2;
		perimeter.position.y = 0.01;
		this.scene.add(perimeter);
	}

	private buildBatteryProductionLine() {
		this.lineRoot.position.set(0, 0, 0);

		// ==========================================
		// 1. CONVEYOR TRANSPORTER
		// ==========================================
		const conveyorLength = 16.0;
		const conveyorWidth = 1.4;
		const conveyorHeight = 0.75;

		// Side rails (Anodized aluminum with yellow/black hazard trim)
		const railGeo = new THREE.BoxGeometry(conveyorLength, 0.16, 0.08);
		const railMat = new THREE.MeshStandardMaterial({
			color: 0x242832,
			metalness: 0.85,
			roughness: 0.25
		});

		const leftRail = new THREE.Mesh(railGeo, railMat);
		leftRail.position.set(0, conveyorHeight, conveyorWidth / 2);
		leftRail.castShadow = true;
		this.conveyorGroup.add(leftRail);

		const rightRail = new THREE.Mesh(railGeo, railMat);
		rightRail.position.set(0, conveyorHeight, -conveyorWidth / 2);
		rightRail.castShadow = true;
		this.conveyorGroup.add(rightRail);

		// Conveyor belt bed
		const bedGeo = new THREE.BoxGeometry(conveyorLength - 0.2, 0.08, conveyorWidth - 0.12);
		const bedMat = new THREE.MeshStandardMaterial({
			color: 0x111317,
			metalness: 0.4,
			roughness: 0.6
		});
		const bed = new THREE.Mesh(bedGeo, bedMat);
		bed.position.set(0, conveyorHeight - 0.04, 0);
		bed.receiveShadow = true;
		this.conveyorGroup.add(bed);

		// Stainless steel rollers
		const rollerGeo = new THREE.CylinderGeometry(0.045, 0.045, conveyorWidth - 0.14, 16);
		const rollerMat = new THREE.MeshStandardMaterial({
			color: 0x8a92a0,
			metalness: 0.95,
			roughness: 0.15
		});
		const numRollers = 32;
		for (let i = 0; i < numRollers; i++) {
			const roller = new THREE.Mesh(rollerGeo, rollerMat);
			const x = -conveyorLength / 2 + 0.4 + (i * (conveyorLength - 0.8)) / (numRollers - 1);
			roller.position.set(x, conveyorHeight + 0.015, 0);
			roller.rotation.x = Math.PI / 2;
			this.conveyorGroup.add(roller);
		}

		// Support legs
		const legGeo = new THREE.BoxGeometry(0.12, conveyorHeight, 0.12);
		const legMat = new THREE.MeshStandardMaterial({ color: 0x181a20, metalness: 0.8, roughness: 0.4 });
		const legPositionsX = [-6.8, -3.4, 0.0, 3.4, 6.8];
		for (const lx of legPositionsX) {
			const leg1 = new THREE.Mesh(legGeo, legMat);
			leg1.position.set(lx, conveyorHeight / 2, conveyorWidth / 2 - 0.06);
			leg1.castShadow = true;
			this.conveyorGroup.add(leg1);

			const leg2 = new THREE.Mesh(legGeo, legMat);
			leg2.position.set(lx, conveyorHeight / 2, -conveyorWidth / 2 + 0.06);
			leg2.castShadow = true;
			this.conveyorGroup.add(leg2);
		}

		this.lineRoot.add(this.conveyorGroup);

		// ==========================================
		// 2. CENTRAL STATION: LASER BUSBAR WELDING GANTRY
		// ==========================================
		const gantryGroup = new THREE.Group();
		gantryGroup.position.set(0, 0, 0);

		// Upright pillars
		const pillarGeo = new THREE.BoxGeometry(0.25, 3.2, 0.25);
		const pillarMat = new THREE.MeshStandardMaterial({ color: 0x1a1d24, metalness: 0.8, roughness: 0.3 });

		const p1 = new THREE.Mesh(pillarGeo, pillarMat);
		p1.position.set(-0.8, 1.6, 1.4);
		p1.castShadow = true;
		gantryGroup.add(p1);

		const p2 = new THREE.Mesh(pillarGeo, pillarMat);
		p2.position.set(0.8, 1.6, 1.4);
		p2.castShadow = true;
		gantryGroup.add(p2);

		const p3 = new THREE.Mesh(pillarGeo, pillarMat);
		p3.position.set(-0.8, 1.6, -1.4);
		p3.castShadow = true;
		gantryGroup.add(p3);

		const p4 = new THREE.Mesh(pillarGeo, pillarMat);
		p4.position.set(0.8, 1.6, -1.4);
		p4.castShadow = true;
		gantryGroup.add(p4);

		// Crossbeam
		const beamGeo = new THREE.BoxGeometry(2.0, 0.3, 3.1);
		const beam = new THREE.Mesh(beamGeo, pillarMat);
		beam.position.set(0, 3.05, 0);
		beam.castShadow = true;
		gantryGroup.add(beam);

		// Optical Laser Welding Head with IPG fiber optical collimator
		const laserHeadGroup = new THREE.Group();
		laserHeadGroup.position.set(0, 2.3, 0);

		const headBodyGeo = new THREE.CylinderGeometry(0.18, 0.12, 0.7, 24);
		const headBodyMat = new THREE.MeshStandardMaterial({
			color: 0x2a2f3a,
			metalness: 0.9,
			roughness: 0.2
		});
		const headBody = new THREE.Mesh(headBodyGeo, headBodyMat);
		laserHeadGroup.add(headBody);

		// Laser nozzle
		const nozzleGeo = new THREE.CylinderGeometry(0.06, 0.02, 0.25, 24);
		const nozzleMat = new THREE.MeshStandardMaterial({
			color: 0xd4a017, // Brass / gold optics ring
			metalness: 0.95,
			roughness: 0.15
		});
		const nozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
		nozzle.position.y = -0.42;
		laserHeadGroup.add(nozzle);

		// Optical Fiber Cable leading upwards
		const cableGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.2, 16);
		const cableMat = new THREE.MeshStandardMaterial({ color: 0xff3b00, metalness: 0.2, roughness: 0.6 });
		const cable = new THREE.Mesh(cableGeo, cableMat);
		cable.position.set(0.1, 0.65, 0);
		cable.rotation.z = 0.25;
		laserHeadGroup.add(cable);

		gantryGroup.add(laserHeadGroup);

		// Vertical pulsating blue/cyan laser beam
		const beamLength = 1.25;
		const laserBeamGeo = new THREE.CylinderGeometry(0.015, 0.035, beamLength, 16);
		const laserBeamMat = new THREE.MeshBasicMaterial({
			color: 0x00f0ff,
			transparent: true,
			opacity: 0.85,
			blending: THREE.AdditiveBlending
		});
		this.laserBeamMesh = new THREE.Mesh(laserBeamGeo, laserBeamMat);
		this.laserBeamMesh.position.set(0, 1.45, 0);
		gantryGroup.add(this.laserBeamMesh);

		this.workstationsGroup.add(gantryGroup);

		// ==========================================
		// 3. LEFT STATION: ROBOTIC CELL PICK & PLACE
		// ==========================================
		const robotStation = new THREE.Group();
		robotStation.position.set(-3.8, 0, 0);

		// Heavy pedestal
		const pedGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.75, 32);
		const pedMat = new THREE.MeshStandardMaterial({ color: 0x1b1e24, metalness: 0.8, roughness: 0.3 });
		const pedestal = new THREE.Mesh(pedGeo, pedMat);
		pedestal.position.y = 0.375;
		pedestal.castShadow = true;
		robotStation.add(pedestal);

		// Articulated robot arm base (KUKA/Fanuc style in PROMSYS Orange)
		const armBaseGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.4, 24);
		const armOrangeMat = new THREE.MeshStandardMaterial({
			color: 0xff3b00,
			metalness: 0.65,
			roughness: 0.3
		});
		const armBase = new THREE.Mesh(armBaseGeo, armOrangeMat);
		armBase.position.y = 0.95;
		robotStation.add(armBase);

		// Arm Link 1
		const armLink1Geo = new THREE.BoxGeometry(0.24, 1.3, 0.24);
		const armLink1 = new THREE.Mesh(armLink1Geo, armOrangeMat);
		armLink1.position.set(0.15, 1.6, 0);
		armLink1.rotation.z = -0.45;
		armLink1.castShadow = true;
		robotStation.add(armLink1);

		// Arm Link 2
		const armLink2Geo = new THREE.BoxGeometry(0.18, 1.1, 0.18);
		const armLink2 = new THREE.Mesh(armLink2Geo, armOrangeMat);
		armLink2.position.set(0.65, 2.15, 0);
		armLink2.rotation.z = 0.85;
		armLink2.castShadow = true;
		robotStation.add(armLink2);

		// Vacuum Gripper Head with matrix suction pads
		const gripperBaseGeo = new THREE.BoxGeometry(0.8, 0.08, 0.5);
		const gripperMat = new THREE.MeshStandardMaterial({ color: 0x2e3440, metalness: 0.9, roughness: 0.2 });
		const gripper = new THREE.Mesh(gripperBaseGeo, gripperMat);
		gripper.position.set(0.85, 1.45, 0);
		robotStation.add(gripper);

		// Mini suction cups
		const cupGeo = new THREE.CylinderGeometry(0.04, 0.03, 0.08, 12);
		const cupMat = new THREE.MeshStandardMaterial({ color: 0x00d4ff, metalness: 0.2, roughness: 0.4 });
		for (let cx = -0.3; cx <= 0.3; cx += 0.2) {
			for (let cz = -0.15; cz <= 0.15; cz += 0.15) {
				const cup = new THREE.Mesh(cupGeo, cupMat);
				cup.position.set(0.85 + cx, 1.38, cz);
				robotStation.add(cup);
			}
		}

		this.workstationsGroup.add(robotStation);

		// ==========================================
		// 4. RIGHT STATION: 100% INLINE EOL TESTING GANTRY
		// ==========================================
		const eolStation = new THREE.Group();
		eolStation.position.set(3.8, 0, 0);

		// Arch frame
		const archGeo = new THREE.BoxGeometry(0.2, 2.8, 0.2);
		const archP1 = new THREE.Mesh(archGeo, pillarMat);
		archP1.position.set(0, 1.4, 1.2);
		eolStation.add(archP1);

		const archP2 = new THREE.Mesh(archGeo, pillarMat);
		archP2.position.set(0, 1.4, -1.2);
		eolStation.add(archP2);

		const archTopGeo = new THREE.BoxGeometry(0.25, 0.25, 2.6);
		const archTop = new THREE.Mesh(archTopGeo, pillarMat);
		archTop.position.set(0, 2.75, 0);
		eolStation.add(archTop);

		// Automated Kelvin Diagnostic Head
		const testerHeadGeo = new THREE.BoxGeometry(0.9, 0.35, 0.65);
		const testerMat = new THREE.MeshStandardMaterial({
			color: 0x1d212a,
			metalness: 0.85,
			roughness: 0.25
		});
		const testerHead = new THREE.Mesh(testerHeadGeo, testerMat);
		testerHead.position.set(0, 1.6, 0);
		eolStation.add(testerHead);

		// Gold contact test pins array
		const pinGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.15, 12);
		const pinMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.98, roughness: 0.1 });
		for (let px = -0.35; px <= 0.35; px += 0.12) {
			for (let pz = -0.22; pz <= 0.22; pz += 0.11) {
				const pin = new THREE.Mesh(pinGeo, pinMat);
				pin.position.set(px, 1.35, pz);
				eolStation.add(pin);
			}
		}

		// Status Indicator light (Green = PASS)
		const statusLightGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
		const statusLightMat = new THREE.MeshBasicMaterial({ color: 0x00ff66 });
		const statusLight = new THREE.Mesh(statusLightGeo, statusLightMat);
		statusLight.position.set(0, 1.8, 0.33);
		statusLight.rotation.x = Math.PI / 2;
		eolStation.add(statusLight);

		this.workstationsGroup.add(eolStation);
		this.lineRoot.add(this.workstationsGroup);

		// ==========================================
		// 5. FEATURED CENTRAL HIGH-DETAIL BATTERY PACK
		// ==========================================
		this.buildFeaturedBatteryPack();
		this.lineRoot.add(this.featuredBatteryPack);

		// ==========================================
		// 6. MULTIPLE MOVING PACKS ON CONVEYOR
		// ==========================================
		this.setupMovingPacks();
		this.lineRoot.add(this.movingPacksGroup);

		this.scene.add(this.lineRoot);
	}

	/**
	 * Builds the central high-detail battery pack with distinct physical layers
	 * that separate cleanly during Exploded View (Взрыв-схема).
	 */
	private buildFeaturedBatteryPack() {
		this.featuredBatteryPack.position.set(0, 0.82, 0);

		const packWidth = 1.15;
		const packLength = 1.65;

		// 1. Bottom Aluminum Tray / Structural Enclosure
		const trayGeo = new THREE.BoxGeometry(packWidth, 0.08, packLength);
		const trayMat = new THREE.MeshStandardMaterial({
			color: 0x181a20,
			metalness: 0.9,
			roughness: 0.2
		});
		const bottomTray = new THREE.Mesh(trayGeo, trayMat);
		bottomTray.position.set(0, 0, 0);
		bottomTray.castShadow = true;
		bottomTray.receiveShadow = true;
		this.featuredBatteryPack.add(bottomTray);
		this.explodeLayers.bottomTray = bottomTray;

		// 2. Liquid Cooling Plate with serpentine channels
		const coolGeo = new THREE.BoxGeometry(packWidth - 0.04, 0.03, packLength - 0.04);
		const coolMat = new THREE.MeshStandardMaterial({
			color: 0x00d4ff,
			metalness: 0.8,
			roughness: 0.25
		});
		const coolingPlate = new THREE.Mesh(coolGeo, coolMat);
		coolingPlate.position.set(0, 0.055, 0);
		this.featuredBatteryPack.add(coolingPlate);
		this.explodeLayers.coolingPlate = coolingPlate;

		// 3. Lower Insulating Cell Matrix Holder
		const holderMat = new THREE.MeshStandardMaterial({
			color: 0x14161b,
			roughness: 0.5,
			metalness: 0.3
		});

		// 4. Matrix of 48 Li-ion 21700 Cylindrical Cells
		const cellsMatrixGroup = new THREE.Group();
		cellsMatrixGroup.position.set(0, 0.22, 0);

		const cellHeight = 0.32;
		const cellRadius = 0.048;
		const cellGeo = new THREE.CylinderGeometry(cellRadius, cellRadius, cellHeight, 20);

		// Emerald Li-ion sleeve with metallic silver end-caps
		const cellBodyMat = new THREE.MeshStandardMaterial({
			color: 0x00b06f, // Emerald Green Li-ion energy look
			metalness: 0.7,
			roughness: 0.28
		});
		const capGeo = new THREE.CylinderGeometry(cellRadius * 0.7, cellRadius * 0.7, 0.015, 16);
		const capMat = new THREE.MeshStandardMaterial({
			color: 0xd8dce2,
			metalness: 0.98,
			roughness: 0.1
		});

		const rows = 4;
		const cols = 12;
		const startX = -((rows - 1) * (cellRadius * 2 + 0.045)) / 2;
		const startZ = -((cols - 1) * (cellRadius * 2 + 0.035)) / 2;

		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = startX + r * (cellRadius * 2 + 0.045);
				const z = startZ + c * (cellRadius * 2 + 0.035);

				const cell = new THREE.Mesh(cellGeo, cellBodyMat);
				cell.position.set(x, 0, z);
				cell.castShadow = true;
				cellsMatrixGroup.add(cell);

				// Top terminal cap
				const cap = new THREE.Mesh(capGeo, capMat);
				cap.position.set(x, cellHeight / 2 + 0.008, z);
				cellsMatrixGroup.add(cap);
			}
		}
		this.featuredBatteryPack.add(cellsMatrixGroup);
		this.explodeLayers.cellsMatrix = cellsMatrixGroup;

		// 5. Upper Cell Retention Spacer
		const holderUpperGeo = new THREE.BoxGeometry(packWidth - 0.06, 0.04, packLength - 0.06);
		const holderUpper = new THREE.Mesh(holderUpperGeo, holderMat);
		holderUpper.position.set(0, 0.4, 0);
		this.featuredBatteryPack.add(holderUpper);
		this.explodeLayers.holderUpper = holderUpper;

		// 6. Pure Copper Laser-Welded Busbars
		const busbarsGroup = new THREE.Group();
		busbarsGroup.position.set(0, 0.44, 0);

		const busbarMat = new THREE.MeshStandardMaterial({
			color: 0xc87533, // Pure Polished Copper
			metalness: 0.95,
			roughness: 0.18
		});

		// 6 parallel busbar strips bridging the terminals
		for (let r = 0; r < rows; r++) {
			const x = startX + r * (cellRadius * 2 + 0.045);
			const stripGeo = new THREE.BoxGeometry(0.065, 0.012, packLength - 0.12);
			const strip = new THREE.Mesh(stripGeo, busbarMat);
			strip.position.set(x, 0, 0);
			strip.castShadow = true;
			busbarsGroup.add(strip);
		}
		this.featuredBatteryPack.add(busbarsGroup);
		this.explodeLayers.busbars = busbarsGroup;

		// 7. BMS Electronic Board with Chips & Connectors
		const bmsGroup = new THREE.Group();
		bmsGroup.position.set(0, 0.52, 0);

		const pcbGeo = new THREE.BoxGeometry(packWidth - 0.14, 0.018, 0.45);
		const pcbMat = new THREE.MeshStandardMaterial({
			color: 0x0a2f1d, // Dark green FR4 PCB
			metalness: 0.3,
			roughness: 0.4
		});
		const pcb = new THREE.Mesh(pcbGeo, pcbMat);
		pcb.position.set(0, 0, -0.4);
		bmsGroup.add(pcb);

		// Microcontroller ICs on BMS
		const icGeo = new THREE.BoxGeometry(0.09, 0.02, 0.09);
		const icMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.2 });
		for (let i = 0; i < 4; i++) {
			const ic = new THREE.Mesh(icGeo, icMat);
			ic.position.set(-0.3 + i * 0.2, 0.015, -0.4);
			bmsGroup.add(ic);
		}

		// Heavy Duty Orange High-Voltage Battery Connector (Amphenol/TE style)
		const connGeo = new THREE.BoxGeometry(0.16, 0.14, 0.14);
		const connMat = new THREE.MeshStandardMaterial({ color: 0xff5500, metalness: 0.4, roughness: 0.4 });
		const conn = new THREE.Mesh(connGeo, connMat);
		conn.position.set(0.35, 0.06, -0.4);
		bmsGroup.add(conn);

		this.featuredBatteryPack.add(bmsGroup);
		this.explodeLayers.bmsBoard = bmsGroup;

		// 8. Top Extruded Aluminum Enclosure Cover with Laser Weld Rim
		const coverGeo = new THREE.BoxGeometry(packWidth, 0.06, packLength);
		const coverMat = new THREE.MeshStandardMaterial({
			color: 0x22262f, // Brushed aerospace aluminum
			metalness: 0.92,
			roughness: 0.22
		});
		const topCover = new THREE.Mesh(coverGeo, coverMat);
		topCover.position.set(0, 0.62, 0);
		topCover.castShadow = true;
		this.featuredBatteryPack.add(topCover);
		this.explodeLayers.topCover = topCover;

		// Store mesh materials for X-Ray toggle
		this.featuredBatteryPack.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				const mesh = child as THREE.Mesh;
				this.defaultMaterials.set(mesh, mesh.material);
				this.wireframeMaterials.set(
					mesh,
					new THREE.MeshBasicMaterial({
						color: 0x00e5ff,
						wireframe: true,
						transparent: true,
						opacity: 0.5
					})
				);
			}
		});
	}

	private setupMovingPacks() {
		// Spawn 3 background battery packs traveling along conveyor
		const packOffsets = [-5.2, 4.8, -10.0];
		for (let i = 0; i < packOffsets.length; i++) {
			const pack = new THREE.Group();
			pack.position.set(packOffsets[i], 0.82, 0);

			// Lightweight enclosure
			const boxGeo = new THREE.BoxGeometry(1.15, 0.45, 1.65);
			const boxMat = new THREE.MeshStandardMaterial({
				color: 0x1e222b,
				metalness: 0.85,
				roughness: 0.25
			});
			const box = new THREE.Mesh(boxGeo, boxMat);
			box.castShadow = true;
			pack.add(box);

			// Top cover strip
			const stripGeo = new THREE.BoxGeometry(0.3, 0.02, 1.4);
			const stripMat = new THREE.MeshStandardMaterial({ color: 0x00d4ff, metalness: 0.9, roughness: 0.2 });
			const strip = new THREE.Mesh(stripGeo, stripMat);
			strip.position.y = 0.23;
			pack.add(strip);

			this.movingPacksGroup.add(pack);
		}
	}

	private setupWeldingSparks() {
		const sparkCount = 120;
		this.sparkPositions = new Float32Array(sparkCount * 3);
		this.sparkVelocities = new Float32Array(sparkCount * 3);

		for (let i = 0; i < sparkCount; i++) {
			this.resetSpark(i);
		}

		const sparkGeo = new THREE.BufferGeometry();
		sparkGeo.setAttribute('position', new THREE.BufferAttribute(this.sparkPositions, 3));

		const sparkMat = new THREE.PointsMaterial({
			color: 0x00ffff,
			size: 0.08,
			transparent: true,
			opacity: 0.95,
			blending: THREE.AdditiveBlending
		});

		this.weldingSparks = new THREE.Points(sparkGeo, sparkMat);
		this.scene.add(this.weldingSparks);
	}

	private resetSpark(i: number) {
		// Emit from the laser welding focal point
		this.sparkPositions[i * 3 + 0] = (Math.random() - 0.5) * 0.12;
		this.sparkPositions[i * 3 + 1] = 1.32;
		this.sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.12;

		const angle = Math.random() * Math.PI * 2;
		const speed = 0.8 + Math.random() * 2.2;
		this.sparkVelocities[i * 3 + 0] = Math.cos(angle) * speed;
		this.sparkVelocities[i * 3 + 1] = 1.2 + Math.random() * 2.5; // fly upwards
		this.sparkVelocities[i * 3 + 2] = Math.sin(angle) * speed;
	}

	// ----------------------------------------------------
	// Storyboard & Scroll Integration
	// ----------------------------------------------------

	public setScrollProgress(progress: number, sectionName?: string) {
		if (this.isInteractiveMode) return;

		const p = Math.max(0, Math.min(1, progress));

		if (p < 0.2) {
			// Hero: Wide overview of battery production line
			const localP = p / 0.2;
			this.targetCamPos.set(-2.0 + localP * 1.5, 3.8 - localP * 0.4, 7.8 - localP * 1.2);
			this.targetLookAt.set(0, 1.0, 0);
			this.targetFov = 38;
			this.targetExplode = 0;
		} else if (p < 0.45) {
			// Section 02: Telemetry / Busbar Laser Welding Station
			const localP = (p - 0.2) / 0.25;
			this.targetCamPos.set(1.8 - localP * 0.4, 2.2 - localP * 0.2, 2.8 - localP * 0.5);
			this.targetLookAt.set(0, 1.2, 0);
			this.targetFov = 34;
			this.targetExplode = 0;
		} else if (p < 0.72) {
			// Section 03: Modules / Exploded View of Battery Pack
			const localP = (p - 0.45) / 0.27;
			this.targetCamPos.set(2.8 + localP * 0.6, 2.6 + localP * 0.8, 3.8);
			this.targetLookAt.set(0, 1.4, 0);
			this.targetFov = 36;
			this.targetExplode = Math.min(1.0, localP * 1.3);
		} else if (p < 0.9) {
			// Section 04: Process Pipeline / EOL Testing
			const localP = (p - 0.72) / 0.18;
			this.targetCamPos.set(3.8 - localP * 1.5, 2.2, 3.2 - localP * 0.6);
			this.targetLookAt.set(3.8, 1.1, 0);
			this.targetFov = 38;
			this.targetExplode = 0.2 * (1 - localP);
		} else {
			// Section 05: Cleanroom Architecture & Footer
			const localP = (p - 0.9) / 0.1;
			this.targetCamPos.set(0.0, 4.2 + localP * 0.6, 8.5);
			this.targetLookAt.set(0, 1.0, 0);
			this.targetFov = 40;
			this.targetExplode = 0;
		}
	}

	// ----------------------------------------------------
	// 3D Studio & Hotspot Actions
	// ----------------------------------------------------

	public focusHotspot(hotspot: HotspotDef) {
		this.isInteractiveMode = true;
		this.controls.enabled = true;
		this.targetCamPos.set(...hotspot.cameraPos);
		this.targetLookAt.set(...hotspot.cameraTarget);
		this.controls.target.set(...hotspot.cameraTarget);
	}

	public resetStudioView() {
		this.targetCamPos.set(0, 3.2, 6.8);
		this.targetLookAt.set(0, 1.0, 0);
		this.controls.target.set(0, 1.0, 0);
		this.targetFov = 38;
		this.targetExplode = 0;
	}

	public setExplode(active: boolean) {
		this.isExploded = active;
		this.targetExplode = active ? 1.0 : 0.0;
	}

	public setXRay(active: boolean) {
		this.isXRay = active;
		this.featuredBatteryPack.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				const mesh = child as THREE.Mesh;
				if (active) {
					const wireMat = this.wireframeMaterials.get(mesh);
					if (wireMat) mesh.material = wireMat;
				} else {
					const defMat = this.defaultMaterials.get(mesh);
					if (defMat) mesh.material = defMat;
				}
			}
		});
	}

	public toggleKinematics() {
		this.isKinematicsActive = !this.isKinematicsActive;
	}

	public toggleAutoRotate() {
		this.isAutoRotate = !this.isAutoRotate;
		this.controls.autoRotate = this.isAutoRotate;
		this.controls.autoRotateSpeed = 1.4;
	}

	public zoom(delta: number) {
		const dir = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
		this.camera.position.addScaledVector(dir, delta);
	}

	public rotateBy(dx: number, dy: number) {
		const rotSpeed = 0.0055;
		const target = this.controls?.target || this.currentLookAt;
		const offset = new THREE.Vector3().subVectors(this.camera.position, target);
		let radius = offset.length();
		let theta = Math.atan2(offset.x, offset.z);
		let phi = Math.acos(Math.max(-1, Math.min(1, offset.y / radius)));

		theta -= dx * rotSpeed;
		phi = Math.max(0.12, Math.min(Math.PI / 2 - 0.04, phi - dy * rotSpeed));

		offset.x = radius * Math.sin(phi) * Math.sin(theta);
		offset.y = radius * Math.cos(phi);
		offset.z = radius * Math.sin(phi) * Math.cos(theta);

		this.camera.position.copy(target).add(offset);
		this.camera.lookAt(target);
		this.currentCamPos.copy(this.camera.position);
		this.targetCamPos.copy(this.camera.position);
	}

	// ----------------------------------------------------
	// Animation Loop
	// ----------------------------------------------------

	private animate = () => {
		if (this.isDisposed) return;
		this.reqId = requestAnimationFrame(this.animate);

		const delta = this.clock.getDelta();
		const time = this.clock.getElapsedTime();

		// 1. Conveyor transport movement
		if (this.isKinematicsActive) {
			this.movingPacksGroup.children.forEach((pack) => {
				pack.position.x += delta * this.conveyorSpeed;
				if (pack.position.x > 8.0) {
					pack.position.x = -8.0;
				}
			});
		}

		// 2. Battery Pack Exploded View Smooth Layer Separation
		this.explodeProgress += (this.targetExplode - this.explodeProgress) * 0.08;
		if (this.explodeLayers.topCover) {
			const e = this.explodeProgress;
			// Top cover lifts high
			this.explodeLayers.topCover.position.y = 0.62 + e * 1.8;
			// BMS board lifts
			this.explodeLayers.bmsBoard.position.y = 0.52 + e * 1.35;
			// Busbars lift
			this.explodeLayers.busbars.position.y = 0.44 + e * 0.95;
			// Upper holder lifts
			this.explodeLayers.holderUpper.position.y = 0.4 + e * 0.6;
			// Cooling plate lowers
			this.explodeLayers.coolingPlate.position.y = 0.055 - e * 0.35;
			// Bottom tray lowers
			this.explodeLayers.bottomTray.position.y = 0.0 - e * 0.7;
		}

		// 3. Laser Welding Beam Pulse & Glow
		if (this.laserBeamMesh) {
			const pulse = (Math.sin(time * 18.0) + 1) / 2;
			(this.laserBeamMesh.material as THREE.MeshBasicMaterial).opacity = 0.65 + pulse * 0.35;
			this.laserLight.intensity = 3.5 + pulse * 2.5;

			// Move laser welding spot along busbars
			const weldZ = Math.sin(time * 2.5) * 0.6;
			this.laserBeamMesh.position.z = weldZ;
			this.laserLight.position.z = weldZ;
		}

		// 4. Welding Sparks Physics
		if (this.weldingSparks && this.isKinematicsActive) {
			const count = this.sparkPositions.length / 3;
			for (let i = 0; i < count; i++) {
				this.sparkPositions[i * 3 + 0] += this.sparkVelocities[i * 3 + 0] * delta;
				this.sparkPositions[i * 3 + 1] += this.sparkVelocities[i * 3 + 1] * delta;
				this.sparkPositions[i * 3 + 2] += this.sparkVelocities[i * 3 + 2] * delta;

				// Gravity pull
				this.sparkVelocities[i * 3 + 1] -= 9.8 * delta;

				// Reset if below tray
				if (this.sparkPositions[i * 3 + 1] < 0.85) {
					this.resetSpark(i);
				}
			}
			this.weldingSparks.geometry.attributes.position.needsUpdate = true;
		}

		// 5. Camera Lerp
		if (!this.isInteractiveMode) {
			this.currentCamPos.lerp(this.targetCamPos, 0.048);
			this.currentLookAt.lerp(this.targetLookAt, 0.048);
			this.camera.position.copy(this.currentCamPos);
			this.camera.lookAt(this.currentLookAt);

			if (Math.abs(this.camera.fov - this.targetFov) > 0.1) {
				this.camera.fov += (this.targetFov - this.camera.fov) * 0.05;
				this.camera.updateProjectionMatrix();
			}
		} else {
			this.controls.update();
		}

		// 6. Render
		this.renderer.render(this.scene, this.camera);

		// 7. Telemetry & Hotspots
		this.updateTelemetry(time);
		this.updateHotspotScreenCoordinates();
	};

	private updateTelemetry(time: number) {
		this.frameCount++;
		if (time - this.lastFpsUpdate >= 0.5) {
			this.currentFps = Math.round(this.frameCount / (time - this.lastFpsUpdate));
			this.frameCount = 0;
			this.lastFpsUpdate = time;

			if (this.onTelemetryUpdate) {
				const dx = this.camera.position.x - this.currentLookAt.x;
				const dz = this.camera.position.z - this.currentLookAt.z;
				let azimuth = Math.round((Math.atan2(dx, dz) * 180) / Math.PI);
				if (azimuth < 0) azimuth += 360;

				this.onTelemetryUpdate({
					camAzimuth: azimuth,
					camFov: Math.round(this.camera.fov),
					camElev: Number(this.camera.position.y.toFixed(2)),
					fps: Math.min(60, this.currentFps),
					oee: Number((97.2 + Math.sin(time * 0.6) * 1.4).toFixed(1)),
					activeAxes: 12,
					status: this.isExploded
						? 'BATTERY_EXPLODED_INSPECTION'
						: this.isXRay
							? 'LITHIUM_XRAY_TELEMETRY'
							: 'WELDING_CYCLE_NOMINAL'
				});
			}
		}
	}

	private updateHotspotScreenCoordinates() {
		if (!this.onHotspotScreenPositions) return;

		const width = this.canvas.clientWidth;
		const height = this.canvas.clientHeight;
		if (width === 0 || height === 0) return;

		const coords = BATTERY_HOTSPOTS.map((h) => {
			const pos3 = new THREE.Vector3(...h.position);
			pos3.project(this.camera);

			const isVisible =
				pos3.z < 1.0 && pos3.x >= -1.1 && pos3.x <= 1.1 && pos3.y >= -1.1 && pos3.y <= 1.1;

			const screenX = ((pos3.x + 1) * width) / 2;
			const screenY = ((-pos3.y + 1) * height) / 2;

			return {
				id: h.id,
				x: Math.round(screenX),
				y: Math.round(screenY),
				visible: isVisible
			};
		});

		this.onHotspotScreenPositions(coords);
	}

	private onWindowResize = () => {
		if (!this.container || !this.renderer || !this.camera) return;
		const width = this.container.clientWidth || window.innerWidth;
		const height = this.container.clientHeight || window.innerHeight;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
	};

	public setInteractiveMode(enabled: boolean) {
		this.isInteractiveMode = enabled;
		this.controls.enabled = enabled;
		if (enabled) {
			this.controls.target.copy(this.currentLookAt);
		}
	}

	public dispose() {
		this.isDisposed = true;
		if (this.reqId !== null) {
			cancelAnimationFrame(this.reqId);
		}
		window.removeEventListener('resize', this.onWindowResize);

		this.controls?.dispose();
		this.renderer?.dispose();

		this.scene?.traverse((obj) => {
			if ((obj as THREE.Mesh).isMesh) {
				const mesh = obj as THREE.Mesh;
				mesh.geometry?.dispose();
				if (Array.isArray(mesh.material)) {
					mesh.material.forEach((m) => m.dispose());
				} else {
					mesh.material?.dispose();
				}
			}
		});
	}
}
