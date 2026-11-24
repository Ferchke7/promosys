<script lang="ts">
	import { browser } from '$app/env';
	import { onMount, onDestroy } from 'svelte';
	import { FactorySceneManager } from '#lib/three/factoryScene.js';
	import { factory3d } from '#lib/stores/factory3d.svelte.ts';

	let containerEl: HTMLDivElement | null = $state(null);
	let canvasEl: HTMLCanvasElement | null = $state(null);

	let scrollHandler: (() => void) | null = null;

	onMount(() => {
		if (!browser || !containerEl || !canvasEl) return;

		const mgr = new FactorySceneManager(containerEl, canvasEl);
		factory3d.setManager(mgr);

		// Scroll listener for smooth camera choreography
		scrollHandler = () => {
			const scrollY = window.scrollY || document.documentElement.scrollTop;
			const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
			const fraction = scrollY / maxScroll;
			mgr.setScrollProgress(fraction);
		};

		window.addEventListener('scroll', scrollHandler, { passive: true });
		// Initial trigger
		scrollHandler();
	});

	onDestroy(() => {
		if (scrollHandler) {
			window.removeEventListener('scroll', scrollHandler);
		}
		factory3d.manager?.dispose();
		factory3d.manager = null;
	});
</script>

<!-- Fixed Background 3D WebGL Canvas -->
<div
	bind:this={containerEl}
	class="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#2f5249]"
	aria-hidden="true"
>
	<canvas bind:this={canvasEl} class="block h-full w-full"></canvas>

	<!-- Subtle industrial vignette & CRT scanline layer -->
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_65%,rgba(15,30,26,0.5)_100%)] opacity-30"
	></div>

	<!-- Technical HUD Overlay (Bottom-left & right rails) -->
	<aside
		class="pointer-events-none absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-4 rounded-none border border-[rgba(244,242,236,0.12)] bg-[#070709]/85 px-4 py-2 text-[10px] font-mono tracking-[0.14em] uppercase text-[rgba(244,242,236,0.7)] backdrop-blur-md"
	>
		<div class="flex items-center gap-2">
			<span class="signal-pulse inline-block h-2 w-2 rounded-full bg-[#FF3B00]"></span>
			<span class="text-[#F4F2EC] font-bold">3D-ЦЕХ // LIVE</span>
		</div>
		<span class="text-[rgba(244,242,236,0.25)]">|</span>
		<div>
			CAM <b class="text-[#F4F2EC]">{factory3d.telemetry.camAzimuth}°</b>
		</div>
		<div>
			FOV <b class="text-[#F4F2EC]">{factory3d.telemetry.camFov}</b>
		</div>
		<div>
			ВЫСОТА <b class="text-[#F4F2EC]">{factory3d.telemetry.camElev}м</b>
		</div>
		<div>
			OEE <b class="text-[#00e5ff] font-semibold">{factory3d.telemetry.oee}%</b>
		</div>
		<div>
			FPS <b class="text-[#FF3B00] font-semibold">{factory3d.telemetry.fps}</b>
		</div>
		<span class="text-[rgba(244,242,236,0.25)]">|</span>
		<div class="text-[9px] text-[rgba(244,242,236,0.5)]">
			РЕЖИМ: <span class="text-[#F4F2EC] font-semibold">{factory3d.telemetry.status}</span>
		</div>
	</aside>

	<!-- Corner ticks for high-tech aesthetic -->
	<div class="pointer-events-none absolute top-20 left-4 text-[9px] font-mono text-[rgba(244,242,236,0.3)] uppercase tracking-[0.2em]">
		+ [PROMSYS_BATTERY_GIGA_01] // TASHKENT_PLANT
	</div>
	<div class="pointer-events-none absolute top-20 right-4 text-[9px] font-mono text-[rgba(244,242,236,0.3)] uppercase tracking-[0.2em]">
		ETHERCAT_1MS · 6-AXIS · PBR
	</div>
</div>
