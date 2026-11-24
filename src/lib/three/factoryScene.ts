import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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
		id: 'robot-arm-primary',
		num: '01',
		title: '6-Осевой Робот-Манипулятор',
		category: 'КИНЕМАТИКА И СБОРКА',
		subtitle: 'Высокоскоростная прецизионная манипуляция заготовками',
		position: [-2.8, 1.8, -1.2],
		cameraTarget: [-2.8, 1.4, -1.2],
		cameraPos: [-0.5, 2.8, 2.5],
		specs: [
			{ label: 'Оси степеней свободы', value: '6-DOF Articulated' },
			{ label: 'Тактовое время цикла', value: '1.42 сек / операция' },
			{ label: 'Грузоподъёмность', value: '16.0 кг (payload)' },
			{ label: 'Текущий OEE узла', value: '96.4%' }
		],
		description:
			'Сервоприводы с прямым энкодерным считыванием и динамической компенсацией люфта. Синхронизируется с ядром PROMSYS через шину EtherCAT с квантом 1ms.'
	},
	{
		id: 'cnc-workstation',
		num: '02',
		title: 'Шпиндель ЧПУ Обработки',
		category: 'МЕХАНИЧЕСКАЯ ОБРАБОТКА',
		subtitle: '5-осевой фрезерно-токарный обрабатывающий центр',
		position: [2.6, 1.6, -1.5],
		cameraTarget: [2.6, 1.3, -1.5],
		cameraPos: [4.2, 2.4, 1.8],
		specs: [
			{ label: 'Частота вращения', value: '24 000 RPM' },
			{ label: 'Контроль вибрации', value: '0.82 мм/с (ISO 10816)' },
			{ label: 'Термокомпенсация', value: 'Активная (±1.5 мкм)' },
			{ label: 'Стойка управления', value: 'Siemens Sinumerik / Fanuc' }
		],
		description:
			'Интегрированный мониторинг износа инструмента PROMSYS ToolWatch: предиктивная замена пластин до возникновения брака и сколов.'
	},
	{
		id: 'laser-triangulation',
		num: '03',
		title: 'Лазерный Контроль Геометрии',
		category: 'ТЕХНИЧЕСКОЕ ЗРЕНИЕ & QC',
		subtitle: 'Сквозной оптический 3D-контроль деталей в потоке',
		position: [0.0, 1.7, 1.2],
		cameraTarget: [0.0, 1.2, 1.2],
		cameraPos: [1.8, 2.6, 3.8],
		specs: [
			{ label: 'Погрешность замера', value: '±2.0 мкм' },
			{ label: 'Скорость триангуляции', value: '120 кадров/сек' },
			{ label: 'Отбраковка брака', value: '100% inline без остановки' },
			{ label: 'Протокол QC', value: 'PROMSYS Vision Inspector' }
		],
		description:
			'Бесконтактный лазерный профилометр сканирует ключевые базы детали и передаёт параметры геометрии напрямую в паспорт изделия в MES.'
	},
	{
		id: 'conveyor-logistic',
		num: '04',
		title: 'Транспортная Линия & WMS Буфер',
		category: 'ВНУТРИЦЕХОВАЯ ЛОГИСТИКА',
		subtitle: 'Синхронизированная подача паллет по принципу Just-in-Time',
		position: [0.2, 0.6, -3.2],
		cameraTarget: [0.2, 0.4, -3.2],
		cameraPos: [-2.5, 2.2, -0.8],
		specs: [
			{ label: 'Скорость полотна', value: '0.85 м/с регулируемая' },
			{ label: 'Трекинг паллет', value: 'UHF RFID + 2D Matrix' },
			{ label: 'Вместимость буфера', value: '48 технологических мест' },
			{ label: 'Синхронизация такта', value: 'APS динамический буфер' }
		],
		description:
			'Исключает внутрицеховые заторы и простой оборудования. Ядро APS перенаправляет паллеты к альтернативным станкам при задержке операций.'
	},
	{
		id: 'opc-ua-gateway',
		num: '05',
		title: 'Телеметрический Шлюз OPC-UA',
		category: 'ПРОМЫШЛЕННЫЙ IOT & SCADA',
		subtitle: 'Аппаратный шлюз сбора сигналов с датчиков цеха',
		position: [-1.5, 2.2, 0.2],
		cameraTarget: [-1.5, 1.6, 0.2],
		cameraPos: [-3.2, 2.9, 2.2],
		specs: [
			{ label: 'Пропускная способность', value: '250 000 тегов/сек' },
			{ label: 'Задержка до ядра', value: '< 3.5 ms' },
			{ label: 'Поддержка ПЛК', value: 'Siemens, Omron, Beckhoff, 1С' },
			{ label: 'Шифрование данных', value: 'TLS 1.3 / mTLS' }
		],
		description:
			'Обеспечивает непрерывную телеметрию состояния ЧПУ, счетчиков продукции, аварийных остановов и энергопотребления.'
	}
];

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
	private animMixers: THREE.AnimationMixer[] = [];

	// Main root groups
	private factoryRoot: THREE.Group = new THREE.Group();
	private laserScanGroup: THREE.Group = new THREE.Group();
	private particlesGroup: THREE.Group = new THREE.Group();
	private explodedMeshes: { mesh: THREE.Mesh; origPos: THREE.Vector3; dir: THREE.Vector3 }[] = [];
	private defaultMaterials: Map<THREE.Mesh, THREE.Material | THREE.Material[]> = new Map();
	private wireframeMaterials: Map<THREE.Mesh, THREE.MeshBasicMaterial> = new Map();

	// Modes and states
	public isInteractiveMode: boolean = false;
	public isKinematicsActive: boolean = true;
	public isExploded: boolean = false;
	public isXRay: boolean = false;
	public isScanActive: boolean = true;
	public isAutoRotate: boolean = false;

	private explodeProgress: number = 0;
	private targetExplode: number = 0;
	private scanProgress: number = 0;
	private scanMesh!: THREE.Mesh;
	private scanLight!: THREE.PointLight;

	// Camera lerp targets
	private currentCamPos = new THREE.Vector3(0, 4.5, 9.5);
	private targetCamPos = new THREE.Vector3(0, 4.5, 9.5);
	private currentLookAt = new THREE.Vector3(0, 1.2, 0);
	private targetLookAt = new THREE.Vector3(0, 1.2, 0);
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

		// 1. Scene & Fog
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0x070709);
		this.scene.fog = new THREE.FogExp2(0x070709, 0.038);

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
		this.renderer.toneMappingExposure = 1.15;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		// 4. OrbitControls (only enabled during interactive studio mode)
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.06;
		this.controls.minDistance = 2.5;
		this.controls.maxDistance = 24.0;
		this.controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't dip below floor
		this.controls.target.copy(this.currentLookAt);
		this.controls.enabled = false;

		// 5. Lighting
		this.setupLighting();

		// 6. Industrial Floor & Environment Grid
		this.setupFloorGrid();

		// 7. Laser Scan Sheet
		this.setupLaserScan();

		// 8. Ambient Industrial Spark Particles
		this.setupIndustrialParticles();

		// 9. Load Factory 3D Models
		this.scene.add(this.factoryRoot);
		this.loadModels();

		// 10. Window resize listener
		window.addEventListener('resize', this.onWindowResize);

		// 11. Start Animation Loop
		this.animate();
	}

	private setupLighting() {
		// Soft industrial ambient fill
		const ambientLight = new THREE.AmbientLight(0x2a2f3d, 2.2);
		this.scene.add(ambientLight);

		// Main directional overhead sunlight / gantry luminaire
		const dirLight = new THREE.DirectionalLight(0xfff6ea, 4.2);
		dirLight.position.set(6, 14, 8);
		dirLight.castShadow = true;
		dirLight.shadow.mapSize.width = 2048;
		dirLight.shadow.mapSize.height = 2048;
		dirLight.shadow.camera.near = 1;
		dirLight.shadow.camera.far = 40;
		dirLight.shadow.camera.left = -12;
		dirLight.shadow.camera.right = 12;
		dirLight.shadow.camera.top = 12;
		dirLight.shadow.camera.bottom = -12;
		dirLight.shadow.bias = -0.0005;
		this.scene.add(dirLight);

		// Front Key Spotlight directly illuminating the robotic cell
		const frontSpot = new THREE.SpotLight(0xffffff, 5.0, 32, Math.PI / 3, 0.35);
		frontSpot.position.set(0, 9, 12);
		frontSpot.target.position.set(0, 1.2, 0);
		this.scene.add(frontSpot);
		this.scene.add(frontSpot.target);

		// PROMSYS Signature Orange Rim Light
		const orangeRim = new THREE.PointLight(0xff3b00, 4.8, 25, 1.3);
		orangeRim.position.set(-6, 3.5, -4);
		this.scene.add(orangeRim);

		// Tech Cyan Fill Light (OPC-UA / Laser diagnostics vibe)
		const cyanFill = new THREE.PointLight(0x00e5ff, 3.6, 22, 1.4);
		cyanFill.position.set(5, 3.0, -3);
		this.scene.add(cyanFill);

		// Overhead warm industrial light strip
		const stripLight = new THREE.PointLight(0xffaa44, 3.2, 18, 1.5);
		stripLight.position.set(0, 6.5, 0);
		this.scene.add(stripLight);
	}

	private setupFloorGrid() {
		// Dark reflective metallic floor plane
		const floorGeo = new THREE.PlaneGeometry(60, 60);
		const floorMat = new THREE.MeshStandardMaterial({
			color: 0x0c0d11,
			roughness: 0.28,
			metalness: 0.85
		});
		const floor = new THREE.Mesh(floorGeo, floorMat);
		floor.rotation.x = -Math.PI / 2;
		floor.position.y = 0;
		floor.receiveShadow = true;
		this.scene.add(floor);

		// Technical Grid Lines with PROMSYS orange accent lines
		const gridHelper = new THREE.GridHelper(50, 50, 0xff3b00, 0x1f232c);
		gridHelper.position.y = 0.005;
		this.scene.add(gridHelper);

		// Safety perimeter ring around robotic workstation
		const ringGeo = new THREE.RingGeometry(5.8, 5.92, 64);
		const ringMat = new THREE.MeshBasicMaterial({
			color: 0xff3b00,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.6
		});
		const safetyRing = new THREE.Mesh(ringGeo, ringMat);
		safetyRing.rotation.x = -Math.PI / 2;
		safetyRing.position.y = 0.01;
		this.scene.add(safetyRing);

		// Outer boundary dashed perimeter
		const outerRingGeo = new THREE.RingGeometry(8.5, 8.58, 64);
		const outerRingMat = new THREE.MeshBasicMaterial({
			color: 0x00d4ff,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.4
		});
		const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
		outerRing.rotation.x = -Math.PI / 2;
		outerRing.position.y = 0.01;
		this.scene.add(outerRing);
	}

	private setupLaserScan() {
		// A vertical translucent glowing cyan/orange laser sheet that sweeps across the cell
		const scanGeo = new THREE.PlaneGeometry(12, 5.5);
		const scanMat = new THREE.MeshBasicMaterial({
			color: 0x00e5ff,
			transparent: true,
			opacity: 0.22,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending
		});
		this.scanMesh = new THREE.Mesh(scanGeo, scanMat);
		this.scanMesh.position.set(0, 2.7, 0);

		// Bright laser beam edge on the floor
		const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 12, 16);
		const beamMat = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			blending: THREE.AdditiveBlending
		});
		const beam = new THREE.Mesh(beamGeo, beamMat);
		beam.rotation.z = Math.PI / 2;
		beam.position.y = -2.7;
		this.scanMesh.add(beam);

		this.scanLight = new THREE.PointLight(0x00e5ff, 2.0, 6);
		this.scanMesh.add(this.scanLight);

		this.laserScanGroup.add(this.scanMesh);
		this.scene.add(this.laserScanGroup);
	}

	private setupIndustrialParticles() {
		const count = 350;
		const pos = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			pos[i * 3 + 0] = (Math.random() - 0.5) * 25;
			pos[i * 3 + 1] = Math.random() * 8 + 0.2;
			pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
		}
		const pGeo = new THREE.BufferGeometry();
		pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

		const pMat = new THREE.PointsMaterial({
			color: 0xff7733,
			size: 0.06,
			transparent: true,
			opacity: 0.55,
			blending: THREE.AdditiveBlending
		});

		const particles = new THREE.Points(pGeo, pMat);
		this.particlesGroup.add(particles);
		this.scene.add(this.particlesGroup);
	}

	private loadModels() {
		const loader = new GLTFLoader();

		// 1. Load primary robotic factory cell
		loader.load(
			'/models/factory_cell.glb',
			(gltf) => {
				const model = gltf.scene;
				model.scale.set(0.95, 0.95, 0.95);
				model.position.set(0, 0, 0);

				model.traverse((child) => {
					if ((child as THREE.Mesh).isMesh) {
						const mesh = child as THREE.Mesh;
						mesh.castShadow = true;
						mesh.receiveShadow = true;

						// Save original material
						this.defaultMaterials.set(mesh, mesh.material);

						// Create high-tech wireframe hologram material
						this.wireframeMaterials.set(
							mesh,
							new THREE.MeshBasicMaterial({
								color: 0x00e5ff,
								wireframe: true,
								transparent: true,
								opacity: 0.45
							})
						);

						// Save mesh for exploded view calculation
						const pos = mesh.position.clone();
						const dir = new THREE.Vector3(
							pos.x !== 0 ? Math.sign(pos.x) * (0.8 + Math.random() * 0.8) : (Math.random() - 0.5) * 1.5,
							pos.y > 0.8 ? 1.2 + Math.random() * 0.8 : 0.2,
							pos.z !== 0 ? Math.sign(pos.z) * (0.8 + Math.random() * 0.8) : (Math.random() - 0.5) * 1.5
						);
						this.explodedMeshes.push({ mesh, origPos: pos, dir });

						// Enhance materials with industrial metallic sheen
						if (Array.isArray(mesh.material)) {
							mesh.material.forEach((m) => this.enhanceMaterial(m));
						} else {
							this.enhanceMaterial(mesh.material);
						}
					}
				});

				// Start animations (kinematic arm movement)
				if (gltf.animations && gltf.animations.length > 0) {
					const mixer = new THREE.AnimationMixer(model);
					gltf.animations.forEach((clip) => {
						const action = mixer.clipAction(clip);
						action.setDuration(clip.duration * 1.2);
						action.play();
					});
					this.animMixers.push(mixer);
				}

				this.factoryRoot.add(model);
			},
			undefined,
			(err) => {
				console.warn('Failed loading factory_cell.glb, using fallback geometry:', err);
				this.buildProceduralIndustrialCell();
			}
		);

		// 2. Load secondary CNC machine workstation to enrich stage
		loader.load('/models/cnc.glb', (gltf) => {
			const cnc = gltf.scene;
			cnc.scale.set(0.012, 0.012, 0.012);
			cnc.position.set(3.2, 0, -1.8);
			cnc.rotation.y = -Math.PI / 3;
			cnc.traverse((child) => {
				if ((child as THREE.Mesh).isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			this.factoryRoot.add(cnc);
		});

		// 3. Load industrial conveyor line
		loader.load('/models/conveyer.glb', (gltf) => {
			const conveyor = gltf.scene;
			conveyor.scale.set(0.65, 0.65, 0.65);
			conveyor.position.set(-0.2, 0, -3.8);
			conveyor.rotation.y = Math.PI / 2;
			conveyor.traverse((child) => {
				if ((child as THREE.Mesh).isMesh) {
					child.castShadow = true;
					child.receiveShadow = true;
				}
			});
			if (gltf.animations && gltf.animations.length > 0) {
				const mixer = new THREE.AnimationMixer(conveyor);
				gltf.animations.forEach((clip) => {
					mixer.clipAction(clip).play();
				});
				this.animMixers.push(mixer);
			}
			this.factoryRoot.add(conveyor);
		});
	}

	private enhanceMaterial(mat: THREE.Material) {
		if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
			const m = mat as THREE.MeshStandardMaterial;
			m.roughness = Math.min(m.roughness, 0.38);
			m.metalness = Math.max(m.metalness, 0.75);
			m.envMapIntensity = 1.2;
		}
	}

	private buildProceduralIndustrialCell() {
		// Fallback procedural robotic arm & workstations if glb fails
		const group = new THREE.Group();
		const baseGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.6, 32);
		const baseMat = new THREE.MeshStandardMaterial({ color: 0x1c1e24, metalness: 0.8, roughness: 0.3 });
		const base = new THREE.Mesh(baseGeo, baseMat);
		base.position.y = 0.3;
		group.add(base);

		// Arm link 1
		const link1Geo = new THREE.BoxGeometry(0.5, 2.2, 0.5);
		const armMat = new THREE.MeshStandardMaterial({ color: 0xff3b00, metalness: 0.6, roughness: 0.35 });
		const link1 = new THREE.Mesh(link1Geo, armMat);
		link1.position.set(0, 1.6, 0);
		group.add(link1);

		this.factoryRoot.add(group);
	}

	// ----------------------------------------------------
	// Storyboard & Scroll Integration
	// ----------------------------------------------------

	/**
	 * Called on scroll: maps page scroll fraction (0.0 to 1.0) or active section
	 * to camera presets, laser scan sweep, and exploded view.
	 */
	public setScrollProgress(progress: number, sectionName?: string) {
		if (this.isInteractiveMode) return; // Do not override manual studio camera

		// Progress between 0 and 1
		const p = Math.max(0, Math.min(1, progress));

		if (p < 0.18) {
			// Section 01: Hero — Wide cinematic 3/4 view
			const localP = p / 0.18;
			this.targetCamPos.set(-2.5 + localP * 1.5, 4.2 - localP * 0.4, 9.2 - localP * 1.2);
			this.targetLookAt.set(0, 1.2, 0);
			this.targetFov = 38;
			this.targetExplode = 0;
		} else if (p < 0.42) {
			// Section 02: Telemetry / Bento — Focus on Robotic Arm & Laser Scan
			const localP = (p - 0.18) / 0.24;
			this.targetCamPos.set(-3.2 - localP * 0.8, 2.8 - localP * 0.2, 4.2 - localP * 0.8);
			this.targetLookAt.set(-1.8, 1.4, -0.8);
			this.targetFov = 34;
			this.targetExplode = 0;
		} else if (p < 0.68) {
			// Section 03: Modules — Exploded View & Mechanics
			const localP = (p - 0.42) / 0.26;
			this.targetCamPos.set(4.2 + localP * 0.5, 3.4 + localP * 0.6, 5.2 - localP * 0.5);
			this.targetLookAt.set(1.2, 1.5, -0.6);
			this.targetFov = 36;
			this.targetExplode = Math.min(1.0, localP * 1.2);
		} else if (p < 0.88) {
			// Section 04: Process Pipeline — Conveyor tracking view
			const localP = (p - 0.68) / 0.2;
			this.targetCamPos.set(0.0 + localP * 2.0, 3.8, -4.5 + localP * 2.0);
			this.targetLookAt.set(0.0, 0.8, -2.5);
			this.targetFov = 40;
			this.targetExplode = 0.2 * (1 - localP);
		} else {
			// Section 05: Architecture & Footer — Low dramatic elevation
			const localP = (p - 0.88) / 0.12;
			this.targetCamPos.set(-4.5 + localP * 1.5, 1.8 + localP * 0.8, 7.5 - localP * 0.5);
			this.targetLookAt.set(0, 1.0, 0);
			this.targetFov = 42;
			this.targetExplode = 0;
		}
	}

	// ----------------------------------------------------
	// 3D Studio & Hotspot Focus Actions
	// ----------------------------------------------------

	public focusHotspot(hotspot: HotspotDef) {
		this.isInteractiveMode = true;
		this.controls.enabled = true;
		this.targetCamPos.set(...hotspot.cameraPos);
		this.targetLookAt.set(...hotspot.cameraTarget);
		this.controls.target.set(...hotspot.cameraTarget);
	}

	public resetStudioView() {
		this.targetCamPos.set(0, 3.8, 8.2);
		this.targetLookAt.set(0, 1.2, 0);
		this.controls.target.set(0, 1.2, 0);
		this.targetFov = 38;
		this.targetExplode = 0;
	}

	public setExplode(active: boolean) {
		this.isExploded = active;
		this.targetExplode = active ? 1.0 : 0.0;
	}

	public setXRay(active: boolean) {
		this.isXRay = active;
		this.factoryRoot.traverse((child) => {
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

		// 1. Play robotic arm skeletal / node animations
		if (this.isKinematicsActive) {
			this.animMixers.forEach((m) => m.update(delta));
		}

		// 2. Explode interpolation
		this.explodeProgress += (this.targetExplode - this.explodeProgress) * 0.08;
		if (Math.abs(this.targetExplode - this.explodeProgress) > 0.001 || this.explodeProgress > 0) {
			for (const item of this.explodedMeshes) {
				item.mesh.position.copy(item.origPos).addScaledVector(item.dir, this.explodeProgress * 2.2);
			}
		}

		// 3. Laser scan plane sweep
		if (this.isScanActive) {
			this.scanProgress = (Math.sin(time * 1.2) + 1) / 2; // 0 to 1
			const scanZ = -4.5 + this.scanProgress * 9.0;
			this.scanMesh.position.z = scanZ;
			this.scanLight.intensity = 2.0 + Math.sin(time * 8) * 0.4;
		}

		// 4. Subtle rotation / particles drift
		this.particlesGroup.rotation.y = time * 0.02;

		// 5. Camera interpolation
		if (!this.isInteractiveMode) {
			this.currentCamPos.lerp(this.targetCamPos, 0.045);
			this.currentLookAt.lerp(this.targetLookAt, 0.045);
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

		// 7. Calculate and publish Telemetry
		this.updateTelemetry(time);

		// 8. Project 3D Hotspots into 2D screen positions for DOM overlay
		this.updateHotspotScreenCoordinates();
	};

	private updateTelemetry(time: number) {
		this.frameCount++;
		if (time - this.lastFpsUpdate >= 0.5) {
			this.currentFps = Math.round((this.frameCount / (time - this.lastFpsUpdate)));
			this.frameCount = 0;
			this.lastFpsUpdate = time;

			if (this.onTelemetryUpdate) {
				// Calculate azimuth from camera position
				const dx = this.camera.position.x - this.currentLookAt.x;
				const dz = this.camera.position.z - this.currentLookAt.z;
				let azimuth = Math.round((Math.atan2(dx, dz) * 180) / Math.PI);
				if (azimuth < 0) azimuth += 360;

				this.onTelemetryUpdate({
					camAzimuth: azimuth,
					camFov: Math.round(this.camera.fov),
					camElev: Number(this.camera.position.y.toFixed(2)),
					fps: Math.min(60, this.currentFps),
					oee: Number((94.6 + Math.sin(time * 0.5) * 1.8).toFixed(1)),
					activeAxes: 6,
					status: this.isExploded ? 'EXPLODED_INSPECTION' : this.isXRay ? 'XRAY_TELEMETRY' : 'OPTIMAL_CYCLE'
				});
			}
		}
	}

	private updateHotspotScreenCoordinates() {
		if (!this.onHotspotScreenPositions) return;

		const width = this.canvas.clientWidth;
		const height = this.canvas.clientHeight;
		if (width === 0 || height === 0) return;

		const coords = FACTORY_HOTSPOTS.map((h) => {
			const pos3 = new THREE.Vector3(...h.position);
			pos3.project(this.camera);

			// Behind camera check
			const isVisible = pos3.z < 1.0 && pos3.x >= -1.1 && pos3.x <= 1.1 && pos3.y >= -1.1 && pos3.y <= 1.1;

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
