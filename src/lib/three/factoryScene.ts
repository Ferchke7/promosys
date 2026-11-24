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

export const FACTORY_HOTSPOTS: HotspotDef[] = [
	{
		id: 'synthesis-reactor',
		num: '01',
		title: 'Первичный Реактор Синтеза & Катодная Башня',
		category: 'СИНТЕЗ ПРЕКУРСОРОВ & ПОДГОТОВКА СЫРЬЯ',
		subtitle: 'Автоматический термосинтез литиевых соединений с контролем давления и чистоты',
		position: [-4.2, 2.2, 0.8],
		cameraTarget: [-4.2, 1.2, 0.8],
		cameraPos: [-1.8, 3.2, 3.8],
		specs: [
			{ label: 'Чистота синтеза', value: '99.98% LiNiMnCoO2' },
			{ label: 'Давление реактора', value: '4.2 бар N2' },
			{ label: 'Контроль температуры', value: 'PID ± 0.5 °C' },
			{ label: 'Интеграция MES', value: 'PROMSYS Batch Control' }
		],
		description:
			'Главный реактор непрерывного синтеза катодных и анодных прекурсоров. Четыре вспомогательных буферных ресивера подают инертную среду и реактивы. Партии металлов формируются в калиброванные кубы и подаются на конвейер.'
	},
	{
		id: 'transformation-tunnel',
		num: '02',
		title: 'Туннель Лазерной Формовки & Каландрирования',
		category: 'НЕПРЕРЫВНАЯ ОБРАБОТКА & ТРАНСФОРМАЦИЯ',
		subtitle: 'Высокоскоростное спекание и лазерная прецизионная активация ячеек',
		position: [-0.2, 1.4, 0.8],
		cameraTarget: [-0.2, 0.7, 0.8],
		cameraPos: [0.8, 2.2, 3.2],
		specs: [
			{ label: 'Скорость прохода', value: '1.2 м/сек' },
			{ label: 'Тип обработки', value: 'Лазерно-термический отжиг' },
			{ label: 'Статус инспекции', value: '100% Optical In-Line' },
			{ label: 'OEE узла', value: '98.4%' }
		],
		description:
			'Центральная проточная камера. Сырьевые металлические блоки на входе проходят через оптический барьер и высокоэнергетический лазерный контур, трансформируясь в активированные кристаллы/ячейки с заданными электрохимическими свойствами.'
	},
	{
		id: 'assembly-vessel',
		num: '03',
		title: 'Активационный Реактор & Сборка Модулей',
		category: 'ФИНАЛЬНАЯ СБОРКА & ЭНЕРГЕТИЧЕСКИЙ КЕРН',
		subtitle: 'Высоковольтная интеграция ячеек с левитирующим силовым ядром',
		position: [4.6, 2.8, -1.6],
		cameraTarget: [4.6, 1.6, -1.6],
		cameraPos: [2.6, 3.6, 1.4],
		specs: [
			{ label: 'Энергоемкость ядра', value: '84.6 кВт·ч / пак' },
			{ label: 'Напряжение шины', value: '800 В архитектура' },
			{ label: 'Баланс потенциалов', value: 'ΔV < 1.0 мВ' },
			{ label: 'Контроллер BMS', value: 'PROMSYS Edge Dual-Core' }
		],
		description:
			'Финальный сборочный реактор с ребристым цилиндрическим корпусом. На верхней площадке в электромагнитном поле удерживается кристаллический энергомодуль, проходящий цикл калибровки и зарядного тестирования перед упаковкой.'
	},
	{
		id: 'pallet-depot',
		num: '04',
		title: 'WMS-Буфер Паллет & Склад Сырья',
		category: 'АВТОМАТИЗИРОВАННЫЙ СКЛАД & ЛОГИСТИКА',
		subtitle: 'Динамический накопитель калиброванных сырьевых блоков и паллет',
		position: [-1.5, 1.2, -3.0],
		cameraTarget: [-1.5, 0.6, -3.0],
		cameraPos: [0.5, 2.5, -1.0],
		specs: [
			{ label: 'Вместимость буфера', value: '250 ед. / ярус' },
			{ label: 'Точность учета WMS', value: '100% RFID / QR' },
			{ label: 'Время подачи на линию', value: '8.4 сек' },
			{ label: 'Автономность AGV', value: 'Беспилотная доставка' }
		],
		description:
			'Обособленная паллетная платформа с пирамидальным штабелем металлических сырьевых блоков. Модуль WMS PROMSYS отслеживает партии в реальном времени, автоматически вызывая роботизированные тележки для пополнения конвейера.'
	},
	{
		id: 'control-console',
		num: '05',
		title: 'Автономный Контроллер Ячейки & SCADA',
		category: 'УПРАВЛЕНИЕ ЛИНИЕЙ & ТЕЛЕМЕТРИЯ',
		subtitle: 'Периферийный промышленный терминал управления тактом и приводами',
		position: [0.8, 1.0, 2.2],
		cameraTarget: [0.8, 0.4, 2.2],
		cameraPos: [-0.6, 1.8, 4.0],
		specs: [
			{ label: 'Шина передачи данных', value: 'EtherCAT 1 мс' },
			{ label: 'Частота опроса датчиков', value: '1000 Гц' },
			{ label: 'ПЛК', value: 'PROMSYS Industrial RTOS' },
			{ label: 'Безопасность SIL', value: 'SIL-3 / Ple Certified' }
		],
		description:
			'Локальный пульт оператора с физическими тумблерами и датчиками. Обеспечивает аварийный останов, синхронизацию скорости конвейерной петли и прямую передачу телеметрии в облачный дашборд PROMSYS MES.'
	}
];

// Backwards compatibility alias
export const BATTERY_HOTSPOTS = FACTORY_HOTSPOTS;

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
	private scene!: THREE.Scene;
	private camera!: THREE.PerspectiveCamera;
	private renderer!: THREE.WebGLRenderer;
	private controls!: OrbitControls;

	// Diorama Root Groups
	private rootGroup!: THREE.Group;
	private reactorA!: THREE.Group;
	private reactorB!: THREE.Group;
	private tunnelGroup!: THREE.Group;
	private palletGroup!: THREE.Group;
	private consoleGroup!: THREE.Group;
	private conveyorGroup!: THREE.Group;
	private itemsGroup!: THREE.Group;

	// Animated Elements
	private levitatingCrystal!: THREE.Mesh;
	private tunnelLed!: THREE.Mesh;
	private tunnelPointLight!: THREE.PointLight;
	private crystalPointLight!: THREE.PointLight;

	// Conveyor curve & moving items
	private conveyorCurve!: THREE.CatmullRomCurve3;
	private carrierItems: {
		meshCube: THREE.Mesh;
		meshGem: THREE.Mesh;
		group: THREE.Group;
		offset: number;
	}[] = [];

	// Exploded View Elements
	private explodeElements: {
		object: THREE.Object3D;
		basePos: THREE.Vector3;
		targetOffset: THREE.Vector3;
	}[] = [];

	// Materials for X-Ray toggle
	private defaultMaterials: Map<THREE.Mesh, THREE.Material | THREE.Material[]> = new Map();
	private wireframeMaterials: Map<THREE.Mesh, THREE.MeshBasicMaterial> = new Map();

	// Modes & State
	public isInteractiveMode: boolean = false;
	public isKinematicsActive: boolean = true;
	public isExploded: boolean = false;
	public isXRay: boolean = false;
	public isAutoRotate: boolean = false;

	private explodeProgress: number = 0;
	private targetExplode: number = 0;
	private conveyorSpeed: number = 0.055;

	// Isometric Camera Setup
	private defaultCamPos = new THREE.Vector3(18.5, 14.5, 18.5);
	private defaultLookAt = new THREE.Vector3(0, 0.8, 0);
	private currentCamPos = new THREE.Vector3(18.5, 14.5, 18.5);
	private targetCamPos = new THREE.Vector3(18.5, 14.5, 18.5);
	private currentLookAt = new THREE.Vector3(0, 0.8, 0);
	private targetLookAt = new THREE.Vector3(0, 0.8, 0);
	private targetFov = 28;

	// Telemetry
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
	private clock = new THREE.Clock();

	constructor(container: HTMLElement, canvas: HTMLCanvasElement) {
		this.container = container;
		this.canvas = canvas;
		this.initScene();
	}

	private initScene() {
		const width = this.container.clientWidth || window.innerWidth;
		const height = this.container.clientHeight || window.innerHeight;

		// 1. Scene & Studio Clay Color Palette
		this.scene = new THREE.Scene();
		// Studio sage green background matching reference Image 1
		this.scene.background = new THREE.Color(0x2f5249);
		this.scene.fog = new THREE.FogExp2(0x2f5249, 0.016);

		// 2. Camera (Low FOV for Isometric / Axonometric Look)
		this.camera = new THREE.PerspectiveCamera(this.targetFov, width / height, 0.1, 100);
		this.camera.position.copy(this.currentCamPos);
		this.camera.lookAt(this.currentLookAt);

		// 3. WebGL Renderer with Soft PCF Shadows & Studio Tone Mapping
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			powerPreference: 'high-performance',
			alpha: false
		});
		this.renderer.setSize(width, height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 1.15;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		// 4. OrbitControls for Free Pointer Dragging
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.06;
		this.controls.minDistance = 6.0;
		this.controls.maxDistance = 35.0;
		this.controls.maxPolarAngle = Math.PI / 2 - 0.05;
		this.controls.target.copy(this.currentLookAt);
		this.controls.enabled = false; // We drive camera manually via pointer events or OrbitControls on studio activate

		// 5. Lighting Setup
		this.setupLighting();

		// 6. Build Diorama Platform & Environment
		this.rootGroup = new THREE.Group();
		this.scene.add(this.rootGroup);

		this.setupDioramaPlinth();

		// 7. Build Diorama Components (Matching Reference Image 1)
		this.buildPrimarySynthesisReactor();
		this.buildSecondaryAssemblyVessel();
		this.buildTransformationTunnel();
		this.buildConveyorLoop();
		this.buildPalletWarehouseDepot();
		this.buildAutonomousControlConsole();
		this.buildAuxiliaryMiniatures();

		// 8. Event Listeners & Loop
		window.addEventListener('resize', this.onWindowResize);
		this.animate();
	}

	private setupLighting() {
		// Soft ambient / hemisphere bounce (sky pastel + ground shadow)
		const hemiLight = new THREE.HemisphereLight(0xdcf0e8, 0x1e362f, 1.4);
		this.scene.add(hemiLight);

		// Key directional studio light creating soft crisp shadows
		const dirLight = new THREE.DirectionalLight(0xfffef8, 2.2);
		dirLight.position.set(16, 28, 18);
		dirLight.castShadow = true;
		dirLight.shadow.mapSize.width = 2048;
		dirLight.shadow.mapSize.height = 2048;
		dirLight.shadow.camera.near = 5;
		dirLight.shadow.camera.far = 60;
		dirLight.shadow.camera.left = -16;
		dirLight.shadow.camera.right = 16;
		dirLight.shadow.camera.top = 16;
		dirLight.shadow.camera.bottom = -16;
		dirLight.shadow.bias = -0.0004;
		dirLight.shadow.radius = 3.5;
		this.scene.add(dirLight);

		// Fill directional light from opposite side (mint sheen)
		const fillLight = new THREE.DirectionalLight(0x9bd1c4, 0.85);
		fillLight.position.set(-18, 16, -14);
		this.scene.add(fillLight);

		// Rim backlight for silhouette separation
		const rimLight = new THREE.DirectionalLight(0xe0f7f0, 0.6);
		rimLight.position.set(0, 15, -20);
		this.scene.add(rimLight);
	}

	private setupDioramaPlinth() {
		// Sage green floor plane with soft shadow reception
		const groundGeo = new THREE.PlaneGeometry(60, 60);
		const groundMat = new THREE.MeshStandardMaterial({
			color: 0x32564c,
			roughness: 0.62,
			metalness: 0.05
		});
		const ground = new THREE.Mesh(groundGeo, groundMat);
		ground.rotation.x = -Math.PI / 2;
		ground.position.y = 0;
		ground.receiveShadow = true;
		this.rootGroup.add(ground);
		this.registerMaterial(ground, groundMat);

		// Subtle bevel rim / shadow ring under the factory
		const ringGeo = new THREE.RingGeometry(8, 12, 48);
		const ringMat = new THREE.MeshBasicMaterial({
			color: 0x243e37,
			transparent: true,
			opacity: 0.25,
			side: THREE.DoubleSide
		});
		const ring = new THREE.Mesh(ringGeo, ringMat);
		ring.rotation.x = -Math.PI / 2;
		ring.position.y = 0.002;
		this.rootGroup.add(ring);
	}

	// -------------------------------------------------------------
	// 1. PRIMARY SYNTHESIS REACTOR (Station A - Left)
	// -------------------------------------------------------------
	private buildPrimarySynthesisReactor() {
		this.reactorA = new THREE.Group();
		this.reactorA.position.set(-4.2, 0, 0.8);

		const mintMat = new THREE.MeshStandardMaterial({
			color: 0x73a89d,
			roughness: 0.38,
			metalness: 0.12
		});
		const whiteMat = new THREE.MeshStandardMaterial({
			color: 0xf0f4ee,
			roughness: 0.32,
			metalness: 0.08
		});
		const darkMat = new THREE.MeshStandardMaterial({
			color: 0x2d443e,
			roughness: 0.45,
			metalness: 0.2
		});
		const chromeMat = new THREE.MeshStandardMaterial({
			color: 0xdce2e4,
			roughness: 0.22,
			metalness: 0.88
		});

		// Base pedestal: Pill/capsule shaped rounded enclosure
		const baseCylLeft = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 1.5, 32), mintMat);
		baseCylLeft.position.set(-0.8, 0.75, 0);
		baseCylLeft.castShadow = true;
		baseCylLeft.receiveShadow = true;
		this.reactorA.add(baseCylLeft);
		this.registerMaterial(baseCylLeft, mintMat);

		const baseCylRight = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 1.5, 32), mintMat);
		baseCylRight.position.set(0.8, 0.75, 0);
		baseCylRight.castShadow = true;
		baseCylRight.receiveShadow = true;
		this.reactorA.add(baseCylRight);
		this.registerMaterial(baseCylRight, mintMat);

		const baseMidBox = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.5, 2.0), mintMat);
		baseMidBox.position.set(0, 0.75, 0);
		baseMidBox.castShadow = true;
		baseMidBox.receiveShadow = true;
		this.reactorA.add(baseMidBox);
		this.registerMaterial(baseMidBox, mintMat);

		// White trim ring around the base bottom
		const baseTrim = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.1, 32), whiteMat);
		baseTrim.position.set(-0.8, 0.05, 0);
		this.reactorA.add(baseTrim);

		// Stepped Tower & Dome on top of left cylinder
		const towerTier1 = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.88, 0.4, 32), mintMat);
		towerTier1.position.set(-0.8, 1.7, 0);
		towerTier1.castShadow = true;
		this.reactorA.add(towerTier1);
		this.registerMaterial(towerTier1, mintMat);

		const towerCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.12, 32), whiteMat);
		towerCollar.position.set(-0.8, 1.95, 0);
		this.reactorA.add(towerCollar);

		// Rivet studs around collar
		for (let i = 0; i < 12; i++) {
			const angle = (i / 12) * Math.PI * 2;
			const stud = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), whiteMat);
			stud.position.set(-0.8 + Math.cos(angle) * 0.84, 1.95, Math.sin(angle) * 0.84);
			this.reactorA.add(stud);
		}

		// Smooth White Dome on top (Exploded layer)
		const domeGeo = new THREE.SphereGeometry(0.58, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2);
		const domeMesh = new THREE.Mesh(domeGeo, whiteMat);
		domeMesh.position.set(-0.8, 2.0, 0);
		domeMesh.castShadow = true;
		this.reactorA.add(domeMesh);
		this.registerMaterial(domeMesh, whiteMat);

		this.explodeElements.push({
			object: domeMesh,
			basePos: domeMesh.position.clone(),
			targetOffset: new THREE.Vector3(0, 1.6, 0)
		});

		// Dual Portholes on the front of the reactor
		for (let i = 0; i < 2; i++) {
			const xPos = -0.4 + i * 0.8;
			const rim = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.04, 16, 32), whiteMat);
			rim.position.set(xPos, 0.95, 1.02);
			this.reactorA.add(rim);

			const glass = new THREE.Mesh(new THREE.CircleGeometry(0.16, 32), darkMat);
			glass.position.set(xPos, 0.95, 1.03);
			this.reactorA.add(glass);
		}

		// 4 Side Vertical Pressure Canisters (Chemical tanks)
		const tankGroup = new THREE.Group();
		tankGroup.position.set(-0.8, 0.6, -1.25);

		for (let i = 0; i < 4; i++) {
			const tX = -0.75 + i * 0.5;
			const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.9, 16), mintMat);
			tank.position.set(tX, 0, 0);
			tank.castShadow = true;
			tankGroup.add(tank);
			this.registerMaterial(tank, mintMat);

			// Top and bottom rounded caps
			const capTop = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), whiteMat);
			capTop.position.set(tX, 0.45, 0);
			tankGroup.add(capTop);

			const capBtm = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), whiteMat);
			capBtm.position.set(tX, -0.45, 0);
			tankGroup.add(capBtm);

			// Center white belt
			const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.14, 16), whiteMat);
			belt.position.set(tX, 0, 0);
			tankGroup.add(belt);
		}
		this.reactorA.add(tankGroup);

		this.explodeElements.push({
			object: tankGroup,
			basePos: tankGroup.position.clone(),
			targetOffset: new THREE.Vector3(0, 0, -0.8)
		});

		// Twin White L-Shaped Supply Pipes routing out of the top into the ground
		for (let i = 0; i < 2; i++) {
			const pZ = 0.3 + i * 0.35;
			const pipeCurve = new THREE.CurvePath<THREE.Vector3>();
			pipeCurve.add(new THREE.LineCurve3(new THREE.Vector3(0.5, 1.5, pZ), new THREE.Vector3(1.2, 1.5, pZ)));
			pipeCurve.add(new THREE.LineCurve3(new THREE.Vector3(1.2, 1.5, pZ), new THREE.Vector3(1.2, 0.0, pZ)));

			const pipeGeo = new THREE.TubeGeometry(pipeCurve, 20, 0.07, 12, false);
			const pipeMesh = new THREE.Mesh(pipeGeo, whiteMat);
			pipeMesh.castShadow = true;
			this.reactorA.add(pipeMesh);
			this.registerMaterial(pipeMesh, whiteMat);
		}

		this.rootGroup.add(this.reactorA);
	}

	// -------------------------------------------------------------
	// 2. SECONDARY ASSEMBLY & ACTIVATION VESSEL (Station B - Right)
	// -------------------------------------------------------------
	private buildSecondaryAssemblyVessel() {
		this.reactorB = new THREE.Group();
		this.reactorB.position.set(4.6, 0, -1.6);

		const mintMat = new THREE.MeshStandardMaterial({
			color: 0x73a89d,
			roughness: 0.38,
			metalness: 0.12
		});
		const whiteMat = new THREE.MeshStandardMaterial({
			color: 0xf0f4ee,
			roughness: 0.32,
			metalness: 0.08
		});
		const darkMat = new THREE.MeshStandardMaterial({
			color: 0x2d443e,
			roughness: 0.45,
			metalness: 0.2
		});

		// Main Cylindrical Vessel
		const vesselMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 2.2, 36), mintMat);
		vesselMesh.position.y = 1.1;
		vesselMesh.castShadow = true;
		vesselMesh.receiveShadow = true;
		this.reactorB.add(vesselMesh);
		this.registerMaterial(vesselMesh, mintMat);

		// Vertical reinforcement ribs around the cylinder
		for (let i = 0; i < 6; i++) {
			const angle = (i / 6) * Math.PI * 2;
			const rib = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.8, 0.14), whiteMat);
			rib.position.set(Math.cos(angle) * 1.62, 1.1, Math.sin(angle) * 1.62);
			rib.rotation.y = -angle;
			this.reactorB.add(rib);
		}

		// Maintenance Door & Portholes on front
		const door = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.95, 0.08), whiteMat);
		door.position.set(0.6, 0.7, 1.58);
		door.rotation.y = 0.35;
		this.reactorB.add(door);

		for (let i = 0; i < 2; i++) {
			const yPos = 0.9 + i * 0.55;
			const rim = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.04, 16, 32), whiteMat);
			rim.position.set(-0.6, yPos, 1.56);
			rim.rotation.y = -0.35;
			this.reactorB.add(rim);

			const glass = new THREE.Mesh(new THREE.CircleGeometry(0.16, 32), darkMat);
			glass.position.set(-0.6, yPos, 1.57);
			glass.rotation.y = -0.35;
			this.reactorB.add(glass);
		}

		// Conical Top Collar with rivet studs
		const collar = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.65, 0.45, 36), mintMat);
		collar.position.y = 2.42;
		collar.castShadow = true;
		this.reactorB.add(collar);
		this.registerMaterial(collar, mintMat);

		for (let i = 0; i < 14; i++) {
			const angle = (i / 14) * Math.PI * 2;
			const stud = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), whiteMat);
			stud.position.set(Math.cos(angle) * 1.45, 2.3, Math.sin(angle) * 1.45);
			this.reactorB.add(stud);
		}

		// Stepped Pedestal for the Energy Core
		const ped1 = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.18, 32), whiteMat);
		ped1.position.y = 2.72;
		this.reactorB.add(ped1);

		const ped2 = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.14, 32), whiteMat);
		ped2.position.y = 2.86;
		this.reactorB.add(ped2);

		// LEVITATING MULTIFACETED ENERGY CRYSTAL (Signature Visual from Image 1)
		const crystalGeo = new THREE.IcosahedronGeometry(0.55, 0);
		const crystalMat = new THREE.MeshStandardMaterial({
			color: 0xff4d6d,
			roughness: 0.15,
			metalness: 0.1,
			emissive: 0xff2550,
			emissiveIntensity: 0.65
		});
		this.levitatingCrystal = new THREE.Mesh(crystalGeo, crystalMat);
		this.levitatingCrystal.position.set(0, 3.65, 0);
		this.levitatingCrystal.castShadow = true;
		this.reactorB.add(this.levitatingCrystal);
		this.registerMaterial(this.levitatingCrystal, crystalMat);

		// Point light inside crystal giving that soft coral radiance
		this.crystalPointLight = new THREE.PointLight(0xff4d6d, 2.5, 6);
		this.crystalPointLight.position.set(0, 3.65, 0);
		this.reactorB.add(this.crystalPointLight);

		this.explodeElements.push({
			object: this.levitatingCrystal,
			basePos: this.levitatingCrystal.position.clone(),
			targetOffset: new THREE.Vector3(0, 2.2, 0)
		});

		// Curved Rear Exhaust Pipe
		const exhCurve = new THREE.CurvePath<THREE.Vector3>();
		exhCurve.add(new THREE.LineCurve3(new THREE.Vector3(1.6, 1.4, -0.6), new THREE.Vector3(2.5, 1.4, -0.6)));
		exhCurve.add(new THREE.LineCurve3(new THREE.Vector3(2.5, 1.4, -0.6), new THREE.Vector3(2.5, 0.0, -0.6)));

		const exhGeo = new THREE.TubeGeometry(exhCurve, 20, 0.16, 16, false);
		const exhMesh = new THREE.Mesh(exhGeo, whiteMat);
		exhMesh.castShadow = true;
		this.reactorB.add(exhMesh);
		this.registerMaterial(exhMesh, whiteMat);

		this.rootGroup.add(this.reactorB);
	}

	// -------------------------------------------------------------
	// 3. CENTRAL TRANSFORMATION TUNNEL
	// -------------------------------------------------------------
	private buildTransformationTunnel() {
		this.tunnelGroup = new THREE.Group();
		this.tunnelGroup.position.set(-0.2, 0.72, 0.8);

		const mintMat = new THREE.MeshStandardMaterial({
			color: 0x73a89d,
			roughness: 0.38,
			metalness: 0.12
		});
		const whiteMat = new THREE.MeshStandardMaterial({
			color: 0xf0f4ee,
			roughness: 0.32,
			metalness: 0.08
		});
		const darkMat = new THREE.MeshStandardMaterial({
			color: 0x20352f,
			roughness: 0.5,
			metalness: 0.1
		});

		// Main horizontal cylinder body
		// Radius 0.75, length 2.2 along X axis
		const bodyGeo = new THREE.CylinderGeometry(0.75, 0.75, 2.2, 32, 1, true);
		const bodyMesh = new THREE.Mesh(bodyGeo, mintMat);
		bodyMesh.rotation.z = Math.PI / 2;
		bodyMesh.castShadow = true;
		bodyMesh.receiveShadow = true;
		this.tunnelGroup.add(bodyMesh);
		this.registerMaterial(bodyMesh, mintMat);

		// White collar rings at ends and center
		const ringEndL = new THREE.Mesh(new THREE.TorusGeometry(0.77, 0.08, 16, 32), whiteMat);
		ringEndL.rotation.y = Math.PI / 2;
		ringEndL.position.x = -1.1;
		this.tunnelGroup.add(ringEndL);

		const ringEndR = new THREE.Mesh(new THREE.TorusGeometry(0.77, 0.08, 16, 32), whiteMat);
		ringEndR.rotation.y = Math.PI / 2;
		ringEndR.position.x = 1.1;
		this.tunnelGroup.add(ringEndR);

		const ringMid = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.28, 32), whiteMat);
		ringMid.rotation.z = Math.PI / 2;
		this.tunnelGroup.add(ringMid);

		// Support legs holding the cylinder elevated
		for (const xOff of [-0.7, 0.7]) {
			const leg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.72, 1.2), mintMat);
			leg.position.set(xOff, -0.36, 0);
			this.tunnelGroup.add(leg);
		}

		// Top Active Indicator LED (Pulsing Green / Cyan)
		const ledGeo = new THREE.SphereGeometry(0.11, 16, 16);
		const ledMat = new THREE.MeshStandardMaterial({
			color: 0x00ffaa,
			emissive: 0x00ffaa,
			emissiveIntensity: 1.2,
			roughness: 0.2
		});
		this.tunnelLed = new THREE.Mesh(ledGeo, ledMat);
		this.tunnelLed.position.set(0, 0.95, 0);
		this.tunnelGroup.add(this.tunnelLed);

		// Interior Point Light for glowing transformation
		this.tunnelPointLight = new THREE.PointLight(0x00e5ff, 2.0, 3.5);
		this.tunnelPointLight.position.set(0, 0, 0);
		this.tunnelGroup.add(this.tunnelPointLight);

		this.explodeElements.push({
			object: bodyMesh,
			basePos: bodyMesh.position.clone(),
			targetOffset: new THREE.Vector3(0, 1.4, 0)
		});

		this.rootGroup.add(this.tunnelGroup);
	}

	// -------------------------------------------------------------
	// 4. CONTINUOUS LOOPING CONVEYOR BELT & CARRIER ITEMS
	// -------------------------------------------------------------
	private buildConveyorLoop() {
		this.conveyorGroup = new THREE.Group();
		this.itemsGroup = new THREE.Group();

		const whiteMat = new THREE.MeshStandardMaterial({
			color: 0xf2f6f0,
			roughness: 0.3,
			metalness: 0.05
		});
		const legMat = new THREE.MeshStandardMaterial({
			color: 0x73a89d,
			roughness: 0.4,
			metalness: 0.1
		});

		// Smooth closed path looping from Station A -> Tunnel -> U-turn -> Station B -> Return loop
		const curvePoints = [
			new THREE.Vector3(-4.2, 0.45, 0.8), // Exit Station A
			new THREE.Vector3(-2.2, 0.45, 0.8), // Approach tunnel
			new THREE.Vector3(-0.2, 0.45, 0.8), // Inside tunnel
			new THREE.Vector3(1.8, 0.45, 0.8),  // Exit tunnel
			new THREE.Vector3(3.6, 0.45, 0.6),  // Start sweep
			new THREE.Vector3(4.8, 0.45, -0.4), // Outer curve
			new THREE.Vector3(4.2, 0.45, -1.6), // Approach Station B
			new THREE.Vector3(2.4, 0.45, -1.8), // Return curve
			new THREE.Vector3(0.5, 0.45, -1.5), // Mid return path
			new THREE.Vector3(-2.0, 0.45, -1.2), // Upper return
			new THREE.Vector3(-4.0, 0.45, -0.4) // Re-enter Station A
		];

		this.conveyorCurve = new THREE.CatmullRomCurve3(curvePoints, true, 'catmullrom', 0.25);

		// Build the extruded conveyor belt ribbon
		const points = this.conveyorCurve.getSpacedPoints(240);
		const beltShape = new THREE.Shape();
		beltShape.moveTo(-0.28, -0.04);
		beltShape.lineTo(0.28, -0.04);
		beltShape.lineTo(0.28, 0.04);
		beltShape.lineTo(-0.28, 0.04);
		beltShape.closePath();

		const extrudeSettings = {
			steps: 240,
			extrudePath: this.conveyorCurve,
			bevelEnabled: false
		};
		const beltGeo = new THREE.ExtrudeGeometry(beltShape, extrudeSettings);
		const beltMesh = new THREE.Mesh(beltGeo, whiteMat);
		beltMesh.castShadow = true;
		beltMesh.receiveShadow = true;
		this.conveyorGroup.add(beltMesh);
		this.registerMaterial(beltMesh, whiteMat);

		// Add support posts every few meters along the track
		for (let i = 0; i < points.length; i += 20) {
			const pt = points[i];
			// Do not place legs directly inside reactors or tunnel
			if (pt.distanceTo(new THREE.Vector3(-4.2, 0.45, 0.8)) < 1.2) continue;
			if (pt.distanceTo(new THREE.Vector3(4.6, 0.45, -1.6)) < 1.8) continue;
			if (Math.abs(pt.x + 0.2) < 0.8 && Math.abs(pt.z - 0.8) < 0.5) continue;

			const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, pt.y, 12), legMat);
			post.position.set(pt.x, pt.y / 2, pt.z);
			post.castShadow = true;
			this.conveyorGroup.add(post);
		}

		// -------------------------------------------------------------
		// Moving Carrier Items:
		// Metallic Silver Cubes (Raw materials) -> Glowing Coral Gems (Finished Cells)
		// -------------------------------------------------------------
		const cubeGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
		const cubeMat = new THREE.MeshStandardMaterial({
			color: 0xdde3e8,
			roughness: 0.2,
			metalness: 0.92
		});

		const gemGeo = new THREE.IcosahedronGeometry(0.2, 0);
		const gemMat = new THREE.MeshStandardMaterial({
			color: 0xff4d6d,
			roughness: 0.15,
			metalness: 0.1,
			emissive: 0xff2550,
			emissiveIntensity: 0.6
		});

		const itemCount = 18;
		for (let i = 0; i < itemCount; i++) {
			const group = new THREE.Group();

			const meshCube = new THREE.Mesh(cubeGeo, cubeMat);
			meshCube.castShadow = true;
			group.add(meshCube);

			const meshGem = new THREE.Mesh(gemGeo, gemMat);
			meshGem.castShadow = true;
			group.add(meshGem);

			this.carrierItems.push({
				meshCube,
				meshGem,
				group,
				offset: i / itemCount
			});

			this.itemsGroup.add(group);
		}

		this.rootGroup.add(this.conveyorGroup);
		this.rootGroup.add(this.itemsGroup);
	}

	// -------------------------------------------------------------
	// 5. PALLET WAREHOUSE DEPOT (Station C - Top Left)
	// -------------------------------------------------------------
	private buildPalletWarehouseDepot() {
		this.palletGroup = new THREE.Group();
		this.palletGroup.position.set(-1.5, 0, -3.0);

		const mintMat = new THREE.MeshStandardMaterial({
			color: 0x73a89d,
			roughness: 0.38,
			metalness: 0.12
		});
		const whiteMat = new THREE.MeshStandardMaterial({
			color: 0xf0f4ee,
			roughness: 0.32,
			metalness: 0.08
		});
		const cubeMat = new THREE.MeshStandardMaterial({
			color: 0xdde3e8,
			roughness: 0.2,
			metalness: 0.92
		});

		// Elevated rounded square platform
		const plat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 2.4), mintMat);
		plat.position.y = 0.175;
		plat.castShadow = true;
		plat.receiveShadow = true;
		this.palletGroup.add(plat);
		this.registerMaterial(plat, mintMat);

		const platTrim = new THREE.Mesh(new THREE.BoxGeometry(2.48, 0.08, 2.48), whiteMat);
		platTrim.position.y = 0.32;
		this.palletGroup.add(platTrim);

		// Neatly stacked 3D pyramid/grid of silver metallic cubes
		const cubeSize = 0.32;
		const spacing = 0.38;

		// Base layer: 3x3 grid
		for (let r = -1; r <= 1; r++) {
			for (let c = -1; c <= 1; c++) {
				const cube = new THREE.Mesh(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), cubeMat);
				cube.position.set(c * spacing, 0.35 + cubeSize / 2, r * spacing);
				cube.castShadow = true;
				this.palletGroup.add(cube);
			}
		}

		// Layer 2: 2x2 grid
		for (let r = 0; r <= 1; r++) {
			for (let c = 0; c <= 1; c++) {
				const cube = new THREE.Mesh(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), cubeMat);
				cube.position.set((c - 0.5) * spacing, 0.35 + cubeSize * 1.5, (r - 0.5) * spacing);
				cube.castShadow = true;
				this.palletGroup.add(cube);
			}
		}

		// Layer 3: Top single cube
		const topCube = new THREE.Mesh(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), cubeMat);
		topCube.position.set(0, 0.35 + cubeSize * 2.5, 0);
		topCube.castShadow = true;
		this.palletGroup.add(topCube);

		this.explodeElements.push({
			object: this.palletGroup,
			basePos: this.palletGroup.position.clone(),
			targetOffset: new THREE.Vector3(0, 0.9, 0)
		});

		this.rootGroup.add(this.palletGroup);
	}

	// -------------------------------------------------------------
	// 6. AUTONOMOUS CONTROL CONSOLE (Station D - Foreground Center)
	// -------------------------------------------------------------
	private buildAutonomousControlConsole() {
		this.consoleGroup = new THREE.Group();
		this.consoleGroup.position.set(0.8, 0, 2.2);

		const mintMat = new THREE.MeshStandardMaterial({
			color: 0x73a89d,
			roughness: 0.38,
			metalness: 0.12
		});
		const whiteMat = new THREE.MeshStandardMaterial({
			color: 0xf0f4ee,
			roughness: 0.32,
			metalness: 0.08
		});

		// Compact industrial console body with sloped top
		const body = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.65, 0.6), mintMat);
		body.position.y = 0.325;
		body.castShadow = true;
		body.receiveShadow = true;
		this.consoleGroup.add(body);
		this.registerMaterial(body, mintMat);

		// White front service panel
		const panel = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.25, 0.06), whiteMat);
		panel.position.set(0, 0.25, 0.31);
		this.consoleGroup.add(panel);

		// Three miniature control levers/switches
		for (let i = -1; i <= 1; i++) {
			const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.22, 8), whiteMat);
			lever.position.set(i * 0.18, 0.72, 0);
			lever.rotation.x = 0.25;
			lever.castShadow = true;
			this.consoleGroup.add(lever);

			const knob = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), whiteMat);
			knob.position.set(i * 0.18, 0.82, 0.03);
			this.consoleGroup.add(knob);
		}

		this.rootGroup.add(this.consoleGroup);
	}

	// -------------------------------------------------------------
	// 7. AUXILIARY DIORAMA DETAILS (Pipettes, Scattered Cubes)
	// -------------------------------------------------------------
	private buildAuxiliaryMiniatures() {
		const whiteMat = new THREE.MeshStandardMaterial({
			color: 0xf0f4ee,
			roughness: 0.32,
			metalness: 0.08
		});
		const mintMat = new THREE.MeshStandardMaterial({
			color: 0x73a89d,
			roughness: 0.38,
			metalness: 0.12
		});
		const gemMat = new THREE.MeshStandardMaterial({
			color: 0xff4d6d,
			roughness: 0.15,
			metalness: 0.1,
			emissive: 0xff2550,
			emissiveIntensity: 0.5
		});
		const cubeMat = new THREE.MeshStandardMaterial({
			color: 0xdde3e8,
			roughness: 0.2,
			metalness: 0.92
		});

		// Two stylized condenser / pipette units in the foreground right
		for (let i = 0; i < 2; i++) {
			const zOff = 3.1 + i * 0.5;
			const pGroup = new THREE.Group();
			pGroup.position.set(3.4, 0.1, zOff);
			pGroup.rotation.y = -0.65;

			const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 12), whiteMat);
			tube.rotation.z = Math.PI / 2;
			pGroup.add(tube);

			const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), mintMat);
			pGroup.add(bulb);

			// Feet
			const f1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.1, 12), whiteMat);
			f1.position.set(-0.55, -0.05, 0);
			pGroup.add(f1);

			const f2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.1, 12), whiteMat);
			f2.position.set(0.55, -0.05, 0);
			pGroup.add(f2);

			this.rootGroup.add(pGroup);
		}

		// Scattered sample gems and cubes on the floor (like in Image 1)
		const gem1 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18, 0), gemMat);
		gem1.position.set(-3.2, 0.15, -2.4);
		gem1.rotation.set(0.4, 0.6, 0.2);
		this.rootGroup.add(gem1);

		const gem2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18, 0), gemMat);
		gem2.position.set(4.8, 0.15, 1.6);
		gem2.rotation.set(-0.3, 0.2, 0.8);
		this.rootGroup.add(gem2);

		const floorCube = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), cubeMat);
		floorCube.position.set(-0.2, 0.14, 3.4);
		floorCube.rotation.y = 0.45;
		this.rootGroup.add(floorCube);
	}

	// -------------------------------------------------------------
	// Material Management for X-Ray
	// -------------------------------------------------------------
	private registerMaterial(mesh: THREE.Mesh, mat: THREE.Material) {
		this.defaultMaterials.set(mesh, mat);
		const wireMat = new THREE.MeshBasicMaterial({
			color: 0x00e5ff,
			wireframe: true,
			transparent: true,
			opacity: 0.75
		});
		this.wireframeMaterials.set(mesh, wireMat);
	}

	// -------------------------------------------------------------
	// Animation Loop
	// -------------------------------------------------------------
	private animate = () => {
		if (this.isDisposed) return;
		this.reqId = requestAnimationFrame(this.animate);

		const delta = Math.min(this.clock.getDelta(), 0.1);
		const elapsedTime = this.clock.getElapsedTime();

		// 1. Conveyor Movement & Transformation Logic
		if (this.isKinematicsActive && this.conveyorCurve) {
			for (const item of this.carrierItems) {
				item.offset = (item.offset + delta * this.conveyorSpeed) % 1.0;
				const pos = this.conveyorCurve.getPointAt(item.offset);
				const tangent = this.conveyorCurve.getTangentAt(item.offset);

				item.group.position.copy(pos);
				item.group.position.y += 0.2; // elevated slightly above belt

				// Align orientation along tangent
				item.group.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);

				// Transformation condition:
				// If before tunnel (traveling from Station A to tunnel at x = -0.2): raw cube!
				// After tunnel / outbound to Station B: transformed glowing gem!
				// Path travels: -4.2 -> -0.2 (tunnel) -> 1.8 -> 4.8
				const isRaw = item.offset < 0.24 || item.offset > 0.88;

				if (isRaw) {
					item.meshCube.visible = true;
					item.meshGem.visible = false;
				} else {
					item.meshCube.visible = false;
					item.meshGem.visible = true;
					// Rotating gem while traveling
					item.meshGem.rotation.x += delta * 1.5;
					item.meshGem.rotation.y += delta * 2.0;
				}
			}
		}

		// 2. Levitating Crystal Animation (Bobbing and Rotation)
		if (this.levitatingCrystal) {
			this.levitatingCrystal.rotation.x += delta * 0.8;
			this.levitatingCrystal.rotation.y += delta * 1.2;
			this.levitatingCrystal.position.y = 3.65 + Math.sin(elapsedTime * 2.2) * 0.08;
			if (this.crystalPointLight) {
				this.crystalPointLight.position.y = this.levitatingCrystal.position.y;
				this.crystalPointLight.intensity = 2.2 + Math.sin(elapsedTime * 4.0) * 0.6;
			}
		}

		// 3. Tunnel LED Pulsing & Glow
		if (this.tunnelLed) {
			const pulse = (Math.sin(elapsedTime * 3.5) + 1.0) * 0.5;
			(this.tunnelLed.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8 + pulse * 1.2;
			if (this.tunnelPointLight) {
				this.tunnelPointLight.intensity = 1.5 + pulse * 1.0;
			}
		}

		// 4. Smooth Exploded View Interpolation
		this.explodeProgress += (this.targetExplode - this.explodeProgress) * 0.08;
		for (const el of this.explodeElements) {
			el.object.position.lerpVectors(
				el.basePos,
				el.basePos.clone().add(el.targetOffset),
				this.explodeProgress
			);
		}

		// 5. Turntable 360° Auto-Rotate
		if (this.isAutoRotate && !this.isInteractiveMode) {
			this.rootGroup.rotation.y += delta * 0.35;
		} else if (!this.isAutoRotate) {
			this.rootGroup.rotation.y += (0 - this.rootGroup.rotation.y) * 0.08;
		}

		// 6. Camera Position & LookAt Lerp
		if (!this.controls.enabled) {
			this.currentCamPos.lerp(this.targetCamPos, 0.07);
			this.currentLookAt.lerp(this.targetLookAt, 0.07);
			this.camera.position.copy(this.currentCamPos);
			this.camera.lookAt(this.currentLookAt);
		} else {
			this.controls.update();
		}

		// 7. Update Hotspot Screen Coordinates
		this.updateHotspotScreenPositions();

		// 8. FPS & Telemetry
		this.frameCount++;
		const now = performance.now();
		if (now - this.lastFpsUpdate >= 500) {
			this.currentFps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
			this.frameCount = 0;
			this.lastFpsUpdate = now;
			this.emitTelemetry();
		}

		this.renderer.render(this.scene, this.camera);
	};

	// -------------------------------------------------------------
	// Hotspots & Camera Controls
	// -------------------------------------------------------------
	private updateHotspotScreenPositions() {
		if (!this.onHotspotScreenPositions) return;

		const width = this.container.clientWidth;
		const height = this.container.clientHeight;
		if (!width || !height) return;

		const results: { id: string; x: number; y: number; visible: boolean }[] = [];

		for (const spot of FACTORY_HOTSPOTS) {
			const worldPos = new THREE.Vector3(...spot.position);
			// Apply root group rotation
			worldPos.applyEuler(this.rootGroup.rotation);

			const screenPos = worldPos.clone().project(this.camera);
			const isBehindCamera = screenPos.z > 1.0;

			const x = (screenPos.x * 0.5 + 0.5) * width;
			const y = (-screenPos.y * 0.5 + 0.5) * height;

			const visible = !isBehindCamera && x >= 0 && x <= width && y >= 0 && y <= height;

			results.push({ id: spot.id, x, y, visible });
		}

		this.onHotspotScreenPositions(results);
	}

	public focusHotspot(hotspot: HotspotDef) {
		this.isInteractiveMode = true;
		this.controls.enabled = false;

		this.targetLookAt.set(...hotspot.cameraTarget);
		this.targetCamPos.set(...hotspot.cameraPos);
		this.targetFov = 32;
		this.camera.fov = this.targetFov;
		this.camera.updateProjectionMatrix();
	}

	public resetStudioView() {
		this.isInteractiveMode = false;
		this.controls.enabled = false;

		this.targetLookAt.copy(this.defaultLookAt);
		this.targetCamPos.copy(this.defaultCamPos);
		this.targetFov = 28;
		this.camera.fov = this.targetFov;
		this.camera.updateProjectionMatrix();
	}

	// Direct Pointer Dragging & Zoom
	public rotateBy(dx: number, dy: number) {
		this.isInteractiveMode = true;
		this.controls.enabled = false;

		const rotSpeed = 0.006;
		const radius = Math.hypot(
			this.currentCamPos.x - this.currentLookAt.x,
			this.currentCamPos.z - this.currentLookAt.z
		);
		let angle = Math.atan2(
			this.currentCamPos.z - this.currentLookAt.z,
			this.currentCamPos.x - this.currentLookAt.x
		);

		angle -= dx * rotSpeed;

		const targetX = this.currentLookAt.x + Math.cos(angle) * radius;
		const targetZ = this.currentLookAt.z + Math.sin(angle) * radius;
		const targetY = Math.max(1.8, Math.min(26.0, this.currentCamPos.y + dy * 0.03));

		this.targetCamPos.set(targetX, targetY, targetZ);
		this.currentCamPos.set(targetX, targetY, targetZ);
		this.camera.position.set(targetX, targetY, targetZ);
		this.camera.lookAt(this.currentLookAt);
	}

	public zoom(delta: number) {
		this.isInteractiveMode = true;
		const dir = new THREE.Vector3().subVectors(this.currentCamPos, this.currentLookAt).normalize();
		const currentDist = this.currentCamPos.distanceTo(this.currentLookAt);
		const newDist = Math.max(6.0, Math.min(36.0, currentDist + delta * 2.0));

		this.targetCamPos.copy(this.currentLookAt).addScaledVector(dir, newDist);
		this.currentCamPos.copy(this.targetCamPos);
		this.camera.position.copy(this.currentCamPos);
	}

	public setExplode(active: boolean) {
		this.isExploded = active;
		this.targetExplode = active ? 1.0 : 0.0;
		this.emitTelemetry();
	}

	public setXRay(active: boolean) {
		this.isXRay = active;
		this.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				if (active) {
					const wireMat = this.wireframeMaterials.get(child);
					if (wireMat) child.material = wireMat;
				} else {
					const defMat = this.defaultMaterials.get(child);
					if (defMat) child.material = defMat;
				}
			}
		});
		this.emitTelemetry();
	}

	public toggleKinematics() {
		this.isKinematicsActive = !this.isKinematicsActive;
		this.emitTelemetry();
	}

	public toggleAutoRotate() {
		this.isAutoRotate = !this.isAutoRotate;
		this.emitTelemetry();
	}

	public setInteractiveMode(active: boolean) {
		this.isInteractiveMode = active;
	}

	public setScrollProgress(progress: number) {
		if (this.isInteractiveMode) return;
		// Smooth subtle isometric turntable orbit based on page scroll
		const angle = Math.PI / 4 + progress * Math.PI * 0.65;
		const radius = 26.0;
		const camY = 14.5 + Math.sin(progress * Math.PI) * 2.0;

		this.targetCamPos.set(
			Math.cos(angle) * radius,
			camY,
			Math.sin(angle) * radius
		);
		this.targetLookAt.set(0, 0.8, 0);
	}

	private emitTelemetry() {
		if (!this.onTelemetryUpdate) return;

		const azimuth = Math.round(
			((Math.atan2(this.camera.position.z, this.camera.position.x) * 180) / Math.PI + 360) % 360
		);

		let status = 'CONTINUOUS_SYNTHESIS';
		if (this.isExploded) status = 'DIORAMA_EXPLODED_INSPECTION';
		else if (this.isXRay) status = 'WIREFRAME_CAD_ANALYSIS';
		else if (!this.isKinematicsActive) status = 'KINEMATICS_PAUSED';

		this.onTelemetryUpdate({
			camAzimuth: azimuth,
			camFov: Math.round(this.camera.fov),
			camElev: Number(this.camera.position.y.toFixed(2)),
			fps: this.currentFps,
			oee: 97.8,
			activeAxes: 6,
			status
		});
	}

	private onWindowResize = () => {
		const width = this.container.clientWidth;
		const height = this.container.clientHeight;
		if (!width || !height) return;

		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
	};

	public dispose() {
		this.isDisposed = true;
		if (this.reqId) cancelAnimationFrame(this.reqId);
		window.removeEventListener('resize', this.onWindowResize);

		this.controls.dispose();
		this.renderer.dispose();
	}
}
