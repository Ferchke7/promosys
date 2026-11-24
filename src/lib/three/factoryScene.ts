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
		id: 'main-plant',
		num: '01',
		title: 'Главный Производственный Корпус',
		category: 'ЦЕХ СБОРКИ & АВТОМАТИЗАЦИЯ ЧПУ',
		subtitle: 'Двухэтажный промышленный цех с центральной вентиляцией и MES-мониторингом',
		position: [1.5, 3.8, 1.8],
		cameraTarget: [1.5, 2.0, 1.0],
		cameraPos: [7.5, 7.5, 9.5],
		specs: [
			{ label: 'Рабочие станки', value: '142 станка в единой шине' },
			{ label: 'OEE цеха', value: '96.8% непрерывно' },
			{ label: 'Мониторинг климата', value: 'SCADA HVAC / 21 ± 0.5 °C' },
			{ label: 'Протокол ПЛК', value: 'OPC-UA / MQTT 1000 Гц' }
		],
		description:
			'Центральный производственный блок предприятия. Включает линии роботизированной металлообработки, лазерные и сборочные ячейки. Система PROMSYS MES собирает телеметрию напрямую со станков ЧПУ, исключая бумажные отчеты и простои оборудования.'
	},
	{
		id: 'tower-plant',
		num: '02',
		title: 'Технологическая Башня & Бункер',
		category: 'СЫРЬЕВОЙ УЗЕЛ & ВЕРТИКАЛЬНАЯ ЗАГРУЗКА',
		subtitle: '4-этажная башня смешивания компонентов с крытой переходной галереей',
		position: [-6.5, 6.2, 1.2],
		cameraTarget: [-6.5, 3.6, 1.0],
		cameraPos: [-1.5, 9.0, 8.5],
		specs: [
			{ label: 'Высота башни', value: '28.5 метров' },
			{ label: 'Бункерная емкость', value: '450 тонн сырья' },
			{ label: 'Переходная галерея', value: 'Пневмоподача в главный цех' },
			{ label: 'Точность дозирования', value: '± 0.05% рецептуры' }
		],
		description:
			'Вертикальный технологический комплекс предварительной подготовки сырья. Оснащен ступенчатой системой охлаждения и закрытым воздушным переходом (Skybridge) во второй этаж основного цеха для беспылевой транспортировки партий.'
	},
	{
		id: 'silo-park',
		num: '03',
		title: 'Силосный Парк & Хранилище Прекурсоров',
		category: 'СЫРЬЕВОЙ БУФЕР WMS & РЕЗЕРВУАРЫ',
		subtitle: 'Сдвоенные емкости высокой емкости с решетчатой эстакадой',
		position: [-1.2, 5.0, -3.2],
		cameraTarget: [-1.2, 2.6, -3.2],
		cameraPos: [4.2, 7.8, 3.0],
		specs: [
			{ label: 'Общий объем парка', value: '2 × 1200 м³' },
			{ label: 'Контроль уровня WMS', value: 'Ультразвуковые радары 24/7' },
			{ label: 'Среда хранения', value: 'Азотная подушка N2' },
			{ label: 'Скорость выгрузки', value: '60 м³/час' }
		],
		description:
			'Магистральный парк хранения сыпучих и жидких компонентов. Датчики уровня, давления и влажности интегрированы в модуль PROMSYS WMS, автоматически рассчитывая остатки и заказывая партии сырья без участия человека.'
	},
	{
		id: 'logistics-hub',
		num: '04',
		title: 'Логистический Узел & Автопарк',
		category: 'ОТГРУЗКА ГОТОВОЙ ПРОДУКЦИИ & WMS',
		subtitle: 'Кольцевая подъездная трасса, пандусы погрузки и трекинг еврофур',
		position: [7.8, 1.8, 0.5],
		cameraTarget: [6.0, 0.8, 0.5],
		cameraPos: [13.0, 5.2, 6.0],
		specs: [
			{ label: 'Оборот склада', value: '18 автопоездов в сутки' },
			{ label: 'Время погрузки фуры', value: '14.2 минуты' },
			{ label: 'Контроль веса', value: 'Автоматические тензовесы' },
			{ label: 'Маркировка упаковок', value: 'DataMatrix / RFID' }
		],
		description:
			'Транспортно-логистический контур завода с выделенной кольцевой автодорогой. Модуль диспетчеризации PROMSYS управляет тайм-слотами погрузки, связывает данные накладных с MES и синхронизирует движение транспорта.'
	},
	{
		id: 'power-substation',
		num: '05',
		title: 'Трансформаторная Подстанция & Энергоблок',
		category: 'ЭНЕРГОМЕНЕДЖМЕНТ & БЕЗОПАСНОСТЬ',
		subtitle: 'Высоковольтный распределительный пункт 110/10 кВ с кабельными эстакадами',
		position: [-8.2, 2.2, 7.5],
		cameraTarget: [-8.2, 1.0, 7.5],
		cameraPos: [-3.5, 4.5, 13.5],
		specs: [
			{ label: 'Установленная мощность', value: '16.5 МВА' },
			{ label: 'Учет электроэнергии', value: 'АСКУЭ / телеметрия кВт·ч' },
			{ label: 'Время АВР', value: '< 25 мс бесперебойно' },
			{ label: 'Кабельные эстакады', value: 'Питание всех очередей завода' }
		],
		description:
			'Сердце энергоснабжения промышленного комплекса. Модуль энергоменеджмента PROMSYS сопоставляет пиковые нагрузки станков с тарифами, оптимизируя график работы цехов и снижая затраты на электричество до 22%.'
	}
];

// Compatibility alias
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

	// Factory Complex Root Groups
	private rootGroup!: THREE.Group;
	private mainBuildingGroup!: THREE.Group;
	private towerBuildingGroup!: THREE.Group;
	private skybridgeGroup!: THREE.Group;
	private silosGroup!: THREE.Group;
	private substationGroup!: THREE.Group;
	private pipesGroup!: THREE.Group;
	private roadTrafficGroup!: THREE.Group;
	private vegetationGroup!: THREE.Group;

	// Moving Semi-Truck
	private truckGroup!: THREE.Group;
	private truckWheels: THREE.Mesh[] = [];
	private truckCurve!: THREE.CatmullRomCurve3;
	private truckProgress: number = 0;

	// Rotating Roof Turbines
	private roofTurbines: THREE.Mesh[] = [];

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

	// Isometric Camera Setup (Angle matching Reference Image)
	private defaultCamPos = new THREE.Vector3(22.0, 17.5, 22.0);
	private defaultLookAt = new THREE.Vector3(0, 2.2, 0);
	private currentCamPos = new THREE.Vector3(22.0, 17.5, 22.0);
	private targetCamPos = new THREE.Vector3(22.0, 17.5, 22.0);
	private currentLookAt = new THREE.Vector3(0, 2.2, 0);
	private targetLookAt = new THREE.Vector3(0, 2.2, 0);
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

		// 1. Scene & Warm Architectural Environment
		this.scene = new THREE.Scene();
		// Warm studio atmospheric sky matching reference Image
		this.scene.background = new THREE.Color(0xdce7eb);
		this.scene.fog = new THREE.FogExp2(0xdce7eb, 0.012);

		// 2. Camera (Low FOV 28° for Isometric Perspective)
		this.camera = new THREE.PerspectiveCamera(this.targetFov, width / height, 0.1, 150);
		this.camera.position.copy(this.currentCamPos);
		this.camera.lookAt(this.currentLookAt);

		// 3. WebGL Renderer with Soft PCF Shadows
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			powerPreference: 'high-performance',
			alpha: false
		});
		this.renderer.setSize(width, height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 1.18;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		// 4. OrbitControls for Free Pointer Dragging
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.06;
		this.controls.minDistance = 6.0;
		this.controls.maxDistance = 45.0;
		this.controls.maxPolarAngle = Math.PI / 2 - 0.03;
		this.controls.target.copy(this.currentLookAt);
		this.controls.enabled = false;

		// 5. Lighting Setup
		this.setupLighting();

		// 6. Build Factory Complex Elements
		this.rootGroup = new THREE.Group();
		this.scene.add(this.rootGroup);

		this.setupGroundAndRoads();
		this.buildMainFactoryBuilding();
		this.buildTowerBuildingAndSkybridge();
		this.buildSilosAndTanks();
		this.buildElectricalSubstation();
		this.buildPipelineNetwork();
		this.buildTruckAndRoadTraffic();
		this.buildVegetationAndPerimeter();

		// 7. Event Listeners & Loop
		window.addEventListener('resize', this.onWindowResize);
		this.animate();
	}

	private setupLighting() {
		// Soft ambient skylight
		const hemiLight = new THREE.HemisphereLight(0xffffff, 0x9cb0b8, 1.35);
		this.scene.add(hemiLight);

		// Key sun light creating soft architectural shadows
		const sunLight = new THREE.DirectionalLight(0xfffaf0, 2.4);
		sunLight.position.set(24, 38, 22);
		sunLight.castShadow = true;
		sunLight.shadow.mapSize.width = 2048;
		sunLight.shadow.mapSize.height = 2048;
		sunLight.shadow.camera.near = 5;
		sunLight.shadow.camera.far = 80;
		sunLight.shadow.camera.left = -22;
		sunLight.shadow.camera.right = 22;
		sunLight.shadow.camera.top = 22;
		sunLight.shadow.camera.bottom = -22;
		sunLight.shadow.bias = -0.0003;
		sunLight.shadow.radius = 3.2;
		this.scene.add(sunLight);

		// Fill directional light from opposite side
		const fillLight = new THREE.DirectionalLight(0xb4d2de, 0.9);
		fillLight.position.set(-20, 18, -16);
		this.scene.add(fillLight);
	}

	// -------------------------------------------------------------
	// 1. GROUND, ROADS, AND LAWNS
	// -------------------------------------------------------------
	private setupGroundAndRoads() {
		// Base concrete ground
		const groundGeo = new THREE.PlaneGeometry(70, 70);
		const groundMat = new THREE.MeshStandardMaterial({
			color: 0xd8e2e6,
			roughness: 0.7,
			metalness: 0.05
		});
		const ground = new THREE.Mesh(groundGeo, groundMat);
		ground.rotation.x = -Math.PI / 2;
		ground.receiveShadow = true;
		this.rootGroup.add(ground);
		this.registerMaterial(ground, groundMat);

		// Green grass lawns around buildings
		const grassMat = new THREE.MeshStandardMaterial({
			color: 0x4fa858,
			roughness: 0.75,
			metalness: 0.02
		});

		// Front-right lawn
		const lawn1 = new THREE.Mesh(new THREE.BoxGeometry(14, 0.1, 10), grassMat);
		lawn1.position.set(2.0, 0.05, 7.5);
		lawn1.receiveShadow = true;
		this.rootGroup.add(lawn1);
		this.registerMaterial(lawn1, grassMat);

		// Left lawn near tower
		const lawn2 = new THREE.Mesh(new THREE.BoxGeometry(7, 0.1, 12), grassMat);
		lawn2.position.set(-8.5, 0.05, 1.0);
		lawn2.receiveShadow = true;
		this.rootGroup.add(lawn2);
		this.registerMaterial(lawn2, grassMat);

		// Rear lawn around silos
		const lawn3 = new THREE.Mesh(new THREE.BoxGeometry(16, 0.1, 8), grassMat);
		lawn3.position.set(0.0, 0.05, -5.5);
		lawn3.receiveShadow = true;
		this.rootGroup.add(lawn3);
		this.registerMaterial(lawn3, grassMat);

		// Asphalt Roadway curving around the factory complex
		const roadMat = new THREE.MeshStandardMaterial({
			color: 0x474d54,
			roughness: 0.65,
			metalness: 0.12
		});

		// Road segments
		// Main front driveway
		const roadFront = new THREE.Mesh(new THREE.BoxGeometry(26, 0.11, 3.4), roadMat);
		roadFront.position.set(0, 0.055, 3.6);
		roadFront.receiveShadow = true;
		this.rootGroup.add(roadFront);
		this.registerMaterial(roadFront, roadMat);

		// Right side curved bypass road
		const roadRight = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.11, 18), roadMat);
		roadRight.position.set(10.5, 0.055, -2.5);
		roadRight.receiveShadow = true;
		this.rootGroup.add(roadRight);
		this.registerMaterial(roadRight, roadMat);

		// White road lane markings
		const lineMat = new THREE.MeshBasicMaterial({ color: 0xf4f6f8 });
		for (let i = -10; i <= 10; i += 2.5) {
			const stripe = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.18), lineMat);
			stripe.rotation.x = -Math.PI / 2;
			stripe.position.set(i, 0.12, 3.6);
			this.rootGroup.add(stripe);
		}
		for (let i = -9; i <= 4; i += 2.5) {
			const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 1.2), lineMat);
			stripe.rotation.x = -Math.PI / 2;
			stripe.position.set(10.5, 0.12, i);
			this.rootGroup.add(stripe);
		}
	}

	// -------------------------------------------------------------
	// 2. MAIN FACTORY PRODUCTION BUILDING (Front Center)
	// -------------------------------------------------------------
	private buildMainFactoryBuilding() {
		this.mainBuildingGroup = new THREE.Group();
		this.mainBuildingGroup.position.set(2.0, 0, 0.2);

		const yellowMat = new THREE.MeshStandardMaterial({
			color: 0xf5b324,
			roughness: 0.35,
			metalness: 0.1
		});
		const blueMat = new THREE.MeshStandardMaterial({
			color: 0x1f8eed,
			roughness: 0.32,
			metalness: 0.12
		});
		const roofMat = new THREE.MeshStandardMaterial({
			color: 0x4a535c,
			roughness: 0.55,
			metalness: 0.15
		});
		const whiteMat = new THREE.MeshStandardMaterial({
			color: 0xeef2f5,
			roughness: 0.3,
			metalness: 0.08
		});
		const glassMat = new THREE.MeshStandardMaterial({
			color: 0x6ca5be,
			roughness: 0.18,
			metalness: 0.65
		});

		// Main Hall Structure (11.5m wide, 3.8m high, 5.8m deep)
		const mainBody = new THREE.Mesh(new THREE.BoxGeometry(11.5, 3.8, 5.8), yellowMat);
		mainBody.position.y = 1.9;
		mainBody.castShadow = true;
		mainBody.receiveShadow = true;
		this.mainBuildingGroup.add(mainBody);
		this.registerMaterial(mainBody, yellowMat);

		// Blue Base Skirt Plinth
		const baseSkirt = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.35, 5.9), blueMat);
		baseSkirt.position.y = 0.175;
		this.mainBuildingGroup.add(baseSkirt);
		this.registerMaterial(baseSkirt, blueMat);

		// Blue Top Roof Cornice
		const topCornice = new THREE.Mesh(new THREE.BoxGeometry(11.65, 0.35, 5.95), blueMat);
		topCornice.position.y = 3.8;
		this.mainBuildingGroup.add(topCornice);
		this.registerMaterial(topCornice, blueMat);

		// Multi-pane Window Grids on Front Facade (5 large industrial window bays)
		for (let i = 0; i < 5; i++) {
			const xPos = -4.2 + i * 2.1;
			// Blue window frame surround
			const frame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.6, 0.08), blueMat);
			frame.position.set(xPos, 1.8, 2.92);
			this.mainBuildingGroup.add(frame);

			// Glass pane
			const glass = new THREE.Mesh(new THREE.BoxGeometry(1.42, 2.42, 0.04), glassMat);
			glass.position.set(xPos, 1.8, 2.95);
			this.mainBuildingGroup.add(glass);

			// White window mullions (3 horizontal, 2 vertical bars)
			for (let h = -0.8; h <= 0.8; h += 0.55) {
				const bar = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.04, 0.06), whiteMat);
				bar.position.set(xPos, 1.8 + h, 2.96);
				this.mainBuildingGroup.add(bar);
			}
			for (const v of [-0.35, 0.35]) {
				const bar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.42, 0.06), whiteMat);
				bar.position.set(xPos + v, 1.8, 2.96);
				this.mainBuildingGroup.add(bar);
			}
		}

		// -------------------------------------------------------------
		// Roof Structure & Mechanical Systems (Exploded Layer)
		// -------------------------------------------------------------
		const roofGroup = new THREE.Group();
		roofGroup.position.set(0, 3.8, 0);

		// Flat Roof Slab with Parapet Wall
		const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(11.4, 0.25, 5.7), roofMat);
		roofSlab.position.y = 0.125;
		roofSlab.castShadow = true;
		roofGroup.add(roofSlab);
		this.registerMaterial(roofSlab, roofMat);

		// Central Raised Monitor Roof with Ventilation Louvers
		const monitorRoof = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.6, 2.2), yellowMat);
		monitorRoof.position.set(-1.2, 0.55, 0);
		monitorRoof.castShadow = true;
		roofGroup.add(monitorRoof);
		this.registerMaterial(monitorRoof, yellowMat);

		// Louver cooling slats on monitor roof
		for (let i = -1.8; i <= 1.8; i += 0.25) {
			const slat = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.15, 2.3), whiteMat);
			slat.position.set(-1.2 + i, 0.9, 0);
			roofGroup.add(slat);
		}

		// Roof Ventilation Cowls (Curved white ducts along the roof front)
		for (let i = 0; i < 4; i++) {
			const xPos = -3.2 + i * 2.1;
			const ductCurve = new THREE.CurvePath<THREE.Vector3>();
			ductCurve.add(new THREE.LineCurve3(new THREE.Vector3(xPos, 0.2, 1.6), new THREE.Vector3(xPos, 0.9, 1.6)));
			ductCurve.add(new THREE.LineCurve3(new THREE.Vector3(xPos, 0.9, 1.6), new THREE.Vector3(xPos, 0.9, 2.2)));

			const ductGeo = new THREE.TubeGeometry(ductCurve, 16, 0.18, 12, false);
			const duct = new THREE.Mesh(ductGeo, whiteMat);
			duct.castShadow = true;
			roofGroup.add(duct);
			this.registerMaterial(duct, whiteMat);

			// Exhaust hood flange
			const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 0.15, 16), whiteMat);
			flange.rotation.x = Math.PI / 2;
			flange.position.set(xPos, 0.9, 2.25);
			roofGroup.add(flange);
		}

		// Circular Roof Turbine Ventilators
		for (const zPos of [-1.2, 0.8]) {
			for (const xPos of [2.2, 3.8]) {
				const turbBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.35, 16), whiteMat);
				turbBase.position.set(xPos, 0.35, zPos);
				turbBase.castShadow = true;
				roofGroup.add(turbBase);

				const turbCap = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.22, 0.2, 16), roofMat);
				turbCap.position.set(xPos, 0.6, zPos);
				roofGroup.add(turbCap);
				this.roofTurbines.push(turbCap);
			}
		}

		this.mainBuildingGroup.add(roofGroup);

		this.explodeElements.push({
			object: roofGroup,
			basePos: roofGroup.position.clone(),
			targetOffset: new THREE.Vector3(0, 2.4, 0)
		});

		this.rootGroup.add(this.mainBuildingGroup);
	}

	// -------------------------------------------------------------
	// 3. TALL TOWER BUILDING & SKYBRIDGE CORRIDOR (Left)
	// -------------------------------------------------------------
	private buildTowerBuildingAndSkybridge() {
		this.towerBuildingGroup = new THREE.Group();
		this.towerBuildingGroup.position.set(-6.2, 0, 0.2);

		const yellowMat = new THREE.MeshStandardMaterial({
			color: 0xf5b324,
			roughness: 0.35,
			metalness: 0.1
		});
		const blueMat = new THREE.MeshStandardMaterial({
			color: 0x1f8eed,
			roughness: 0.32,
			metalness: 0.12
		});
		const whiteMat = new THREE.MeshStandardMaterial({
			color: 0xeef2f5,
			roughness: 0.3,
			metalness: 0.08
		});
		const glassMat = new THREE.MeshStandardMaterial({
			color: 0x6ca5be,
			roughness: 0.18,
			metalness: 0.65
		});

		// Tower Main Body (3.8m wide, 7.2m high, 4.4m deep)
		const towerBody = new THREE.Mesh(new THREE.BoxGeometry(3.8, 7.2, 4.4), yellowMat);
		towerBody.position.y = 3.6;
		towerBody.castShadow = true;
		towerBody.receiveShadow = true;
		this.towerBuildingGroup.add(towerBody);
		this.registerMaterial(towerBody, yellowMat);

		// Blue base & middle horizontal bands
		const tBase = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.4, 4.5), blueMat);
		tBase.position.y = 0.2;
		this.towerBuildingGroup.add(tBase);

		const tMidBand = new THREE.Mesh(new THREE.BoxGeometry(3.9, 0.25, 4.5), blueMat);
		tMidBand.position.y = 3.6;
		this.towerBuildingGroup.add(tMidBand);

		// Vertical tall multi-pane window bay on front facade
		for (const xOff of [-0.9, 0.9]) {
			const frame = new THREE.Mesh(new THREE.BoxGeometry(1.1, 5.2, 0.08), blueMat);
			frame.position.set(xOff, 3.8, 2.22);
			this.towerBuildingGroup.add(frame);

			const glass = new THREE.Mesh(new THREE.BoxGeometry(0.95, 5.0, 0.04), glassMat);
			glass.position.set(xOff, 3.8, 2.25);
			this.towerBuildingGroup.add(glass);

			// Horizontal window divisions
			for (let h = -2.2; h <= 2.2; h += 0.8) {
				const bar = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.05, 0.06), whiteMat);
				bar.position.set(xOff, 3.8 + h, 2.26);
				this.towerBuildingGroup.add(bar);
			}
		}

		// Tower Stepped Top Structure with Louvers (Exploded Layer)
		const towerTopGroup = new THREE.Group();
		towerTopGroup.position.set(0, 7.2, 0);

		const towerRoof = new THREE.Mesh(new THREE.BoxGeometry(3.85, 0.35, 4.45), blueMat);
		towerRoof.position.y = 0.175;
		towerTopGroup.add(towerRoof);

		// Stepped cooling fin crowns
		for (let i = 0; i < 4; i++) {
			const w = 3.4 - i * 0.4;
			const step = new THREE.Mesh(new THREE.BoxGeometry(w, 0.22, 3.8), yellowMat);
			step.position.y = 0.45 + i * 0.22;
			step.castShadow = true;
			towerTopGroup.add(step);
		}

		this.towerBuildingGroup.add(towerTopGroup);

		this.explodeElements.push({
			object: towerTopGroup,
			basePos: towerTopGroup.position.clone(),
			targetOffset: new THREE.Vector3(0, 2.8, 0)
		});

		this.rootGroup.add(this.towerBuildingGroup);

		// -------------------------------------------------------------
		// Enclosed Skybridge (Connecting Tower to Main Building)
		// -------------------------------------------------------------
		this.skybridgeGroup = new THREE.Group();
		this.skybridgeGroup.position.set(-4.0, 3.0, 0.2);

		const bridgeBody = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 1.8), yellowMat);
		bridgeBody.castShadow = true;
		bridgeBody.receiveShadow = true;
		this.skybridgeGroup.add(bridgeBody);
		this.registerMaterial(bridgeBody, yellowMat);

		// Blue trim borders
		const bridgeRoof = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.2, 1.85), blueMat);
		bridgeRoof.position.y = 0.95;
		this.skybridgeGroup.add(bridgeRoof);

		const bridgeFloor = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.2, 1.85), blueMat);
		bridgeFloor.position.y = -0.95;
		this.skybridgeGroup.add(bridgeFloor);

		// Horizontal ribbon window
		const bGlass = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.65, 0.04), glassMat);
		bGlass.position.set(0, 0, 0.92);
		this.skybridgeGroup.add(bGlass);

		this.rootGroup.add(this.skybridgeGroup);
	}

	// -------------------------------------------------------------
	// 4. STORAGE SILOS & INDUSTRIAL HOPPERS (Rear)
	// -------------------------------------------------------------
	private buildSilosAndTanks() {
		this.silosGroup = new THREE.Group();

		const siloMat = new THREE.MeshStandardMaterial({
			color: 0xdde4eb,
			roughness: 0.35,
			metalness: 0.25
		});
		const siloSkirtMat = new THREE.MeshStandardMaterial({
			color: 0x545d66,
			roughness: 0.5,
			metalness: 0.2
		});
		const siloCapMat = new THREE.MeshStandardMaterial({
			color: 0x7a848e,
			roughness: 0.45,
			metalness: 0.2
		});
		const whiteMat = new THREE.MeshStandardMaterial({
			color: 0xeef2f5,
			roughness: 0.3,
			metalness: 0.08
		});
		const steelMat = new THREE.MeshStandardMaterial({
			color: 0x485058,
			roughness: 0.4,
			metalness: 0.85
		});

		// Twin Cylindrical Silos
		const siloPositions = [
			new THREE.Vector3(-2.8, 0, -2.4),
			new THREE.Vector3(0.6, 0, -2.4)
		];

		for (const pos of siloPositions) {
			const sGroup = new THREE.Group();
			sGroup.position.copy(pos);

			// Lower dark skirt
			const skirt = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.55, 1.6, 32), siloSkirtMat);
			skirt.position.y = 0.8;
			skirt.castShadow = true;
			skirt.receiveShadow = true;
			sGroup.add(skirt);
			this.registerMaterial(skirt, siloSkirtMat);

			// Upper white cylinder body
			const body = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 3.6, 32), siloMat);
			body.position.y = 3.4;
			body.castShadow = true;
			body.receiveShadow = true;
			sGroup.add(body);
			this.registerMaterial(body, siloMat);

			// Conical roof cap with top inspection hatch
			const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 1.55, 0.6, 32), siloCapMat);
			cap.position.y = 5.5;
			cap.castShadow = true;
			sGroup.add(cap);
			this.registerMaterial(cap, siloCapMat);

			const hatch = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.2, 32), whiteMat);
			hatch.position.y = 5.9;
			sGroup.add(hatch);

			this.silosGroup.add(sGroup);

			this.explodeElements.push({
				object: cap,
				basePos: cap.position.clone(),
				targetOffset: new THREE.Vector3(0, 1.8, 0)
			});
		}

		// Steel Framework Truss Tower with Bulk Storage Hopper (Behind Silo 2)
		const trussGroup = new THREE.Group();
		trussGroup.position.set(4.0, 0, -3.2);

		// 4 steel lattice corner pillars
		for (const xOff of [-0.9, 0.9]) {
			for (const zOff of [-0.9, 0.9]) {
				const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.8, 12), steelMat);
				leg.position.set(xOff, 1.9, zOff);
				leg.castShadow = true;
				trussGroup.add(leg);
			}
		}

		// Cross bracings
		for (let y = 1.0; y <= 3.2; y += 1.1) {
			const ring = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.08, 1.85), steelMat);
			ring.position.y = y;
			trussGroup.add(ring);
		}

		// Elevated hopper bin on top
		const hopperBin = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.6, 1.8), whiteMat);
		hopperBin.position.y = 4.6;
		hopperBin.castShadow = true;
		trussGroup.add(hopperBin);
		this.registerMaterial(hopperBin, whiteMat);

		this.silosGroup.add(trussGroup);

		// Vertical Chemical Reactor Tank with Yellow Piping (Far Left)
		const reactorGroup = new THREE.Group();
		reactorGroup.position.set(-9.4, 0, 2.8);

		const rBody = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 2.6, 24), whiteMat);
		rBody.position.y = 1.6;
		rBody.castShadow = true;
		reactorGroup.add(rBody);
		this.registerMaterial(rBody, whiteMat);

		const rDomeTop = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), whiteMat);
		rDomeTop.position.y = 2.9;
		reactorGroup.add(rDomeTop);

		// Yellow pipe coils around the reactor
		const yellowPipeMat = new THREE.MeshStandardMaterial({ color: 0xf5b324, roughness: 0.3 });
		for (let y = 0.8; y <= 2.2; y += 0.5) {
			const coil = new THREE.Mesh(new THREE.TorusGeometry(0.94, 0.05, 12, 24), yellowPipeMat);
			coil.rotation.x = Math.PI / 2;
			coil.position.y = y;
			reactorGroup.add(coil);
		}

		this.silosGroup.add(reactorGroup);
		this.rootGroup.add(this.silosGroup);
	}

	// -------------------------------------------------------------
	// 5. ELECTRICAL SUBSTATION & TRANSMISSION PYLONS (Foreground Left)
	// -------------------------------------------------------------
	private buildElectricalSubstation() {
		this.substationGroup = new THREE.Group();
		this.substationGroup.position.set(-8.2, 0, 7.2);

		const steelMat = new THREE.MeshStandardMaterial({
			color: 0x5a636e,
			roughness: 0.38,
			metalness: 0.85
		});
		const insulMat = new THREE.MeshStandardMaterial({
			color: 0x4aa3df,
			roughness: 0.2,
			metalness: 0.3
		});
		const cableMat = new THREE.MeshBasicMaterial({ color: 0x222629 });

		// Two Lattice Transmission Pylons
		for (const xOff of [-1.8, 1.8]) {
			const pylon = new THREE.Group();
			pylon.position.set(xOff, 0, 0);

			// Tapered lattice tower
			const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.35, 4.2, 4), steelMat);
			tower.position.y = 2.1;
			tower.rotation.y = Math.PI / 4;
			tower.castShadow = true;
			pylon.add(tower);

			// Crossarm beam
			const crossarm = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 0.1), steelMat);
			crossarm.position.y = 3.6;
			pylon.add(crossarm);

			// Blue ceramic insulator bells hanging from crossarms
			for (const cX of [-0.65, 0.65]) {
				const insul = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.3, 12), insulMat);
				insul.position.set(cX, 3.35, 0);
				pylon.add(insul);
			}

			this.substationGroup.add(pylon);
		}

		// Power transmission lines strung between pylons
		for (const cX of [-0.65, 0.65]) {
			const lineGeo = new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3(-1.8 + cX, 3.2, 0),
				new THREE.Vector3(cX, 3.05, 0),
				new THREE.Vector3(1.8 + cX, 3.2, 0)
			]);
			const line = new THREE.Line(lineGeo, cableMat);
			this.substationGroup.add(line);
		}

		// Transformer Units & Heavy Cable Reels on Ground
		const transBox = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 1.0), steelMat);
		transBox.position.set(0, 0.55, 0.5);
		transBox.castShadow = true;
		this.substationGroup.add(transBox);

		// Cable reels
		for (let i = 0; i < 2; i++) {
			const reel = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.4, 16), steelMat);
			reel.rotation.z = Math.PI / 2;
			reel.position.set(-0.6 + i * 0.7, 0.35, 1.5);
			reel.castShadow = true;
			this.substationGroup.add(reel);
		}

		this.rootGroup.add(this.substationGroup);
	}

	// -------------------------------------------------------------
	// 6. INDUSTRIAL PIPELINE NETWORK
	// -------------------------------------------------------------
	private buildPipelineNetwork() {
		this.pipesGroup = new THREE.Group();

		const whiteMat = new THREE.MeshStandardMaterial({
			color: 0xeef2f5,
			roughness: 0.3,
			metalness: 0.12
		});
		const concreteMat = new THREE.MeshStandardMaterial({
			color: 0xa4aeb5,
			roughness: 0.6,
			metalness: 0.05
		});

		// Elevated pipeline running along the fence and crossing over the driveway into Main Building
		const pipeCurve = new THREE.CurvePath<THREE.Vector3>();
		pipeCurve.add(new THREE.LineCurve3(new THREE.Vector3(-8.8, 0.6, 4.2), new THREE.Vector3(-3.2, 0.6, 4.2)));
		pipeCurve.add(new THREE.LineCurve3(new THREE.Vector3(-3.2, 0.6, 4.2), new THREE.Vector3(-3.2, 2.2, 4.2)));
		pipeCurve.add(new THREE.LineCurve3(new THREE.Vector3(-3.2, 2.2, 4.2), new THREE.Vector3(-3.2, 2.2, 2.4)));

		const pipeGeo = new THREE.TubeGeometry(pipeCurve, 32, 0.18, 16, false);
		const pipeMesh = new THREE.Mesh(pipeGeo, whiteMat);
		pipeMesh.castShadow = true;
		this.pipesGroup.add(pipeMesh);
		this.registerMaterial(pipeMesh, whiteMat);

		// Concrete support piers under pipeline
		for (const x of [-7.5, -5.5]) {
			const pier = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.4), concreteMat);
			pier.position.set(x, 0.3, 4.2);
			pier.castShadow = true;
			this.pipesGroup.add(pier);
		}

		// Perimeter pipeline along front border
		const frontPipeGeo = new THREE.CylinderGeometry(0.14, 0.14, 14, 16);
		const frontPipe = new THREE.Mesh(frontPipeGeo, whiteMat);
		frontPipe.rotation.z = Math.PI / 2;
		frontPipe.position.set(2.5, 0.45, 6.2);
		frontPipe.castShadow = true;
		this.pipesGroup.add(frontPipe);

		this.rootGroup.add(this.pipesGroup);
	}

	// -------------------------------------------------------------
	// 7. SEMI-TRUCK & ROADWAY TRAFFIC
	// -------------------------------------------------------------
	private buildTruckAndRoadTraffic() {
		this.roadTrafficGroup = new THREE.Group();

		// Closed loop path for the semi-truck driving around the plant
		const pathPoints = [
			new THREE.Vector3(-8.5, 0.15, 3.6),
			new THREE.Vector3(-1.0, 0.15, 3.6),
			new THREE.Vector3(5.5, 0.15, 3.6),
			new THREE.Vector3(9.2, 0.15, 2.5),
			new THREE.Vector3(10.5, 0.15, -0.5),
			new THREE.Vector3(10.5, 0.15, -6.5),
			new THREE.Vector3(7.5, 0.15, -8.0),
			new THREE.Vector3(-3.5, 0.15, -7.5),
			new THREE.Vector3(-9.5, 0.15, -4.5),
			new THREE.Vector3(-9.5, 0.15, 0.5)
		];
		this.truckCurve = new THREE.CatmullRomCurve3(pathPoints, true, 'catmullrom', 0.2);

		// Build Detailed Semi-Truck (Red Cabin + Blue Container Trailer)
		this.truckGroup = new THREE.Group();

		const redCabMat = new THREE.MeshStandardMaterial({
			color: 0xde3528,
			roughness: 0.25,
			metalness: 0.15
		});
		const blueTrailerMat = new THREE.MeshStandardMaterial({
			color: 0x185da8,
			roughness: 0.35,
			metalness: 0.1
		});
		const blackChassisMat = new THREE.MeshStandardMaterial({
			color: 0x22262b,
			roughness: 0.6,
			metalness: 0.3
		});
		const wheelMat = new THREE.MeshStandardMaterial({
			color: 0x181a1c,
			roughness: 0.8,
			metalness: 0.1
		});
		const windMat = new THREE.MeshStandardMaterial({
			color: 0x689cb0,
			roughness: 0.1,
			metalness: 0.8
		});

		// 1. Red Truck Tractor (Cabin)
		const cab = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.25, 0.95), redCabMat);
		cab.position.set(2.4, 0.95, 0);
		cab.castShadow = true;
		this.truckGroup.add(cab);

		// Windshield and side windows
		const wind = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.85), windMat);
		wind.position.set(3.06, 1.15, 0);
		this.truckGroup.add(wind);

		// 2. Blue Cargo Container Trailer
		const trailer = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.45, 0.96), blueTrailerMat);
		trailer.position.set(-0.25, 1.15, 0);
		trailer.castShadow = true;
		this.truckGroup.add(trailer);

		// Ribbed corrugation lines along trailer sides
		for (let i = -1.6; i <= 1.4; i += 0.25) {
			const rib = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.35, 0.98), blueTrailerMat);
			rib.position.set(i, 1.15, 0);
			this.truckGroup.add(rib);
		}

		// 3. Chassis and Wheels
		const chassis = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.2, 0.75), blackChassisMat);
		chassis.position.set(0.65, 0.38, 0);
		this.truckGroup.add(chassis);

		const wheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 16);
		const wheelPositions = [
			[-1.6, 0.24, 0.44], [-1.6, 0.24, -0.44],
			[-1.0, 0.24, 0.44], [-1.0, 0.24, -0.44],
			[1.6, 0.24, 0.44], [1.6, 0.24, -0.44],
			[2.5, 0.24, 0.44], [2.5, 0.24, -0.44]
		];

		for (const [wX, wY, wZ] of wheelPositions) {
			const w = new THREE.Mesh(wheelGeo, wheelMat);
			w.rotation.x = Math.PI / 2;
			w.position.set(wX, wY, wZ);
			w.castShadow = true;
			this.truckGroup.add(w);
			this.truckWheels.push(w);
		}

		this.roadTrafficGroup.add(this.truckGroup);
		this.rootGroup.add(this.roadTrafficGroup);
	}

	// -------------------------------------------------------------
	// 8. VEGETATION (PINE TREES) & PERIMETER FENCING
	// -------------------------------------------------------------
	private buildVegetationAndPerimeter() {
		this.vegetationGroup = new THREE.Group();

		const pineMat = new THREE.MeshStandardMaterial({
			color: 0x2e7d32,
			roughness: 0.55,
			metalness: 0.05
		});
		const trunkMat = new THREE.MeshStandardMaterial({
			color: 0x5c4033,
			roughness: 0.7
		});
		const fenceMat = new THREE.MeshStandardMaterial({
			color: 0xa4aeb5,
			roughness: 0.5,
			metalness: 0.2
		});

		// Helper to create a stylish geometric tiered pine tree
		const createPineTree = (x: number, z: number, scale = 1.0) => {
			const tree = new THREE.Group();
			tree.position.set(x, 0, z);
			tree.scale.set(scale, scale, scale);

			// Trunk
			const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.8, 8), trunkMat);
			trunk.position.y = 0.4;
			trunk.castShadow = true;
			tree.add(trunk);

			// 3 Tiered Cones
			const tierHeights = [0.85, 1.45, 1.95];
			const tierSizes = [
				{ r: 0.9, h: 0.9 },
				{ r: 0.7, h: 0.8 },
				{ r: 0.5, h: 0.7 }
			];

			for (let i = 0; i < 3; i++) {
				const cone = new THREE.Mesh(new THREE.ConeGeometry(tierSizes[i].r, tierSizes[i].h, 8), pineMat);
				cone.position.y = tierHeights[i];
				cone.castShadow = true;
				tree.add(cone);
			}

			return tree;
		};

		// Plant pine trees along fence lines and verges (matching Image)
		const treeLocations = [
			// Front-right border
			[3.2, 5.8, 1.1],
			[4.6, 5.8, 1.25],
			[6.0, 5.8, 1.05],
			[7.4, 5.8, 1.2],
			// Right perimeter
			[9.2, 4.2, 1.1],
			[9.8, 2.2, 1.2],
			[10.2, 0.0, 1.0],
			// Left side near substation
			[-6.8, 4.8, 1.15],
			[-7.6, 3.2, 1.3],
			[-8.2, 1.6, 1.05],
			[-8.8, 0.2, 1.25]
		];

		for (const [tX, tZ, s] of treeLocations) {
			const tree = createPineTree(tX, tZ, s);
			this.vegetationGroup.add(tree);
		}

		// Perimeter Fence with Concrete Posts
		for (let x = -9; x <= 9; x += 1.8) {
			const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8), fenceMat);
			post.position.set(x, 0.6, 6.8);
			post.castShadow = true;
			this.vegetationGroup.add(post);
		}

		this.rootGroup.add(this.vegetationGroup);
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

		// 1. Semi-Truck Road Traffic Kinematics
		if (this.isKinematicsActive && this.truckCurve && this.truckGroup) {
			this.truckProgress = (this.truckProgress + delta * 0.038) % 1.0;
			const pos = this.truckCurve.getPointAt(this.truckProgress);
			const tangent = this.truckCurve.getTangentAt(this.truckProgress);

			this.truckGroup.position.copy(pos);
			this.truckGroup.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);

			// Rotate wheels
			for (const wheel of this.truckWheels) {
				wheel.rotation.z -= delta * 12.0;
			}
		}

		// 2. Rotate Roof Turbines
		if (this.isKinematicsActive) {
			for (const turb of this.roofTurbines) {
				turb.rotation.y += delta * 2.5;
			}
		}

		// 3. Smooth Exploded View Interpolation
		this.explodeProgress += (this.targetExplode - this.explodeProgress) * 0.08;
		for (const el of this.explodeElements) {
			el.object.position.lerpVectors(
				el.basePos,
				el.basePos.clone().add(el.targetOffset),
				this.explodeProgress
			);
		}

		// 4. Turntable 360° Auto-Rotate
		if (this.isAutoRotate && !this.isInteractiveMode) {
			this.rootGroup.rotation.y += delta * 0.32;
		} else if (!this.isAutoRotate) {
			this.rootGroup.rotation.y += (0 - this.rootGroup.rotation.y) * 0.08;
		}

		// 5. Camera Position & LookAt Lerp
		if (!this.controls.enabled) {
			this.currentCamPos.lerp(this.targetCamPos, 0.07);
			this.currentLookAt.lerp(this.targetLookAt, 0.07);
			this.camera.position.copy(this.currentCamPos);
			this.camera.lookAt(this.currentLookAt);
		} else {
			this.controls.update();
		}

		// 6. Update Hotspot Screen Coordinates
		this.updateHotspotScreenPositions();

		// 7. FPS & Telemetry
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

		const rotSpeed = 0.0055;
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
		const targetY = Math.max(2.5, Math.min(30.0, this.currentCamPos.y + dy * 0.035));

		this.targetCamPos.set(targetX, targetY, targetZ);
		this.currentCamPos.set(targetX, targetY, targetZ);
		this.camera.position.set(targetX, targetY, targetZ);
		this.camera.lookAt(this.currentLookAt);
	}

	public zoom(delta: number) {
		this.isInteractiveMode = true;
		const dir = new THREE.Vector3().subVectors(this.currentCamPos, this.currentLookAt).normalize();
		const currentDist = this.currentCamPos.distanceTo(this.currentLookAt);
		const newDist = Math.max(8.0, Math.min(45.0, currentDist + delta * 2.5));

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
		const angle = Math.PI / 4 + progress * Math.PI * 0.55;
		const radius = 32.0;
		const camY = 17.5 + Math.sin(progress * Math.PI) * 2.5;

		this.targetCamPos.set(
			Math.cos(angle) * radius,
			camY,
			Math.sin(angle) * radius
		);
		this.targetLookAt.set(0, 2.2, 0);
	}

	private emitTelemetry() {
		if (!this.onTelemetryUpdate) return;

		const azimuth = Math.round(
			((Math.atan2(this.camera.position.z, this.camera.position.x) * 180) / Math.PI + 360) % 360
		);

		let status = 'PLANT_ACTIVE_PRODUCTION';
		if (this.isExploded) status = 'BUILDING_EXPLODED_INSPECTION';
		else if (this.isXRay) status = 'CAD_WIREFRAME_SURVEY';
		else if (!this.isKinematicsActive) status = 'LOGISTICS_PAUSED';

		this.onTelemetryUpdate({
			camAzimuth: azimuth,
			camFov: Math.round(this.camera.fov),
			camElev: Number(this.camera.position.y.toFixed(2)),
			fps: this.currentFps,
			oee: 96.8,
			activeAxes: 12,
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
