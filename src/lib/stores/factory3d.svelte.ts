import type { FactorySceneManager, HotspotDef, SceneTelemetry } from '#lib/three/factoryScene.js';
import { FACTORY_HOTSPOTS } from '#lib/three/factoryScene.js';

class Factory3DStore {
	manager: FactorySceneManager | null = $state(null);
	telemetry: SceneTelemetry = $state({
		camAzimuth: 224,
		camFov: 38,
		camElev: 4.5,
		fps: 60,
		oee: 96.2,
		activeAxes: 6,
		status: 'OPTIMAL_CYCLE'
	});
	hotspotScreenCoords: Record<string, { x: number; y: number; visible: boolean }> = $state({});
	selectedHotspot: HotspotDef | null = $state(null);
	isStudioActive: boolean = $state(false);
	isExploded: boolean = $state(false);
	isXRay: boolean = $state(false);
	isKinematics: boolean = $state(true);
	isAutoRotate: boolean = $state(false);

	setManager(mgr: FactorySceneManager) {
		this.manager = mgr;
		mgr.onTelemetryUpdate = (t) => {
			this.telemetry = t;
		};
		mgr.onHotspotScreenPositions = (positions) => {
			const map: Record<string, { x: number; y: number; visible: boolean }> = {};
			for (const p of positions) {
				map[p.id] = { x: p.x, y: p.y, visible: p.visible };
			}
			this.hotspotScreenCoords = map;
		};
	}

	selectHotspot(hotspot: HotspotDef | null) {
		this.selectedHotspot = hotspot;
		if (hotspot && this.manager) {
			this.manager.focusHotspot(hotspot);
		}
	}

	toggleExplode() {
		this.isExploded = !this.isExploded;
		this.manager?.setExplode(this.isExploded);
	}

	toggleXRay() {
		this.isXRay = !this.isXRay;
		this.manager?.setXRay(this.isXRay);
	}

	toggleKinematics() {
		this.isKinematics = !this.isKinematics;
		this.manager?.toggleKinematics();
	}

	toggleAutoRotate() {
		this.isAutoRotate = !this.isAutoRotate;
		this.manager?.toggleAutoRotate();
	}

	resetView() {
		this.selectedHotspot = null;
		this.manager?.resetStudioView();
	}

	zoom(delta: number) {
		this.manager?.zoom(delta);
	}

	setStudioMode(active: boolean) {
		this.isStudioActive = active;
		this.manager?.setInteractiveMode(active);
	}
}

export const factory3d = new Factory3DStore();
