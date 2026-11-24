<script lang="ts">
	import { factory3d } from '#lib/stores/factory3d.svelte.ts';
	import { FACTORY_HOTSPOTS } from '#lib/three/factoryScene.js';
	import { systemState } from '#lib/stores/system.svelte.ts';

	let isDragging = $state(false);
	let startX = 0;
	let startY = 0;

	function onPointerDown(e: PointerEvent) {
		isDragging = true;
		startX = e.clientX;
		startY = e.clientY;
		factory3d.setStudioMode(true);
		try {
			(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		} catch {}
	}

	function onPointerMove(e: PointerEvent) {
		if (!isDragging || !factory3d.manager) return;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		startX = e.clientX;
		startY = e.clientY;
		factory3d.manager.rotateBy(dx, dy);
	}

	function onPointerUp(e: PointerEvent) {
		isDragging = false;
		try {
			(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
		} catch {}
	}

	function onWheel(e: WheelEvent) {
		e.preventDefault();
		factory3d.zoom(e.deltaY * 0.004);
	}
</script>

<section
	id="factory-3d"
	class="relative z-10 min-h-screen border-t border-[var(--border-hairline)] bg-transparent py-20 lg:py-28"
>
	<div class="mx-auto max-w-[1680px] px-4 lg:px-8">
		<!-- Section Header -->
		<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border-hairline)] pb-8">
			<div>
				<div class="font-mono-tech flex items-center gap-3 text-xs tracking-[0.16em] text-[var(--accent)] uppercase">
					<span class="signal-pulse inline-block h-2 w-2 rounded-full bg-[var(--accent)]"></span>
					<span>05 // ЦИФРОВОЙ ДВОЙНИК · ЛИНИЯ СБОРКИ БАТАРЕЙ</span>
				</div>
				<h2
					class="font-industrial mt-3 text-3xl font-extrabold uppercase tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
				>
					ИНТЕРАКТИВНАЯ ЛИНИЯ СБОРКИ LI-ION БАТАРЕЙ
				</h2>
			</div>
			<div class="font-mono-tech max-w-md text-xs leading-relaxed text-[var(--text-secondary)]">
				Управляйте цифровым двойником линии: зажимайте <span class="text-[var(--text-primary)] font-semibold">ЛКМ для 3D-вращения</span>, <span class="text-[var(--text-primary)] font-semibold">колесо мыши для зума</span>. Включайте <span class="text-[var(--text-primary)] font-semibold">Взрыв-схему</span> для послойного контроля ячеек 21700, шин и BMS.
			</div>
		</div>

		<!-- 3D Interactive Stage Area -->
		<div
			class="relative mt-8 min-h-[580px] sm:min-h-[720px] w-full overflow-hidden border border-[rgba(244,242,236,0.22)] bg-transparent shadow-2xl cursor-grab active:cursor-grabbing select-none"
			role="region"
			aria-label="Интерактивная 3D модель линии производства аккумуляторов"
			onpointerdown={onPointerDown}
			onpointermove={onPointerMove}
			onpointerup={onPointerUp}
			onpointercancel={onPointerUp}
			onwheel={onWheel}
		>
			<!-- Grid Overlay Guidelines -->
			<div
				aria-hidden="true"
				class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
			></div>

			<!-- Soft vignette along edges to ensure UI text readability -->
			<div
				aria-hidden="true"
				class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(7,7,9,0.5)_100%)]"
			></div>

			<!-- Top Status Bar inside Stage -->
			<div
				class="pointer-events-none absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono tracking-[0.12em] text-[rgba(244,242,236,0.65)] uppercase"
			>
				<div class="flex items-center gap-3 bg-[#070709]/80 px-3 py-1.5 border border-[rgba(244,242,236,0.1)]">
					<span class="inline-block h-2 w-2 rounded-full bg-[#00e5ff] animate-ping"></span>
					<span class="text-[#F4F2EC] font-bold">GIGAFACTORY PROMSYS // 48 ЯЧЕЕК 21700 НА МОДУЛЬ</span>
				</div>
				<div class="hidden sm:flex items-center gap-4 bg-[#070709]/80 px-3 py-1.5 border border-[rgba(244,242,236,0.1)]">
					<span>ТАКТ СВАРКИ: <b class="text-[#FF3B00]">0.85s</b></span>
					<span>ВЫХОД ГОДНЫХ: <b class="text-[#F4F2EC]">99.8%</b></span>
					<span>OEE: <b class="text-[#00e5ff]">97.4%</b></span>
				</div>
			</div>

			<!-- Interactive 3D Hotspot Badges floating in stage -->
			<div class="pointer-events-none absolute inset-0 z-20">
				{#each FACTORY_HOTSPOTS as hotspot}
					{@const coords = factory3d.hotspotScreenCoords[hotspot.id]}
					{#if coords && coords.visible}
						<div
							style="left: {coords.x}px; top: {coords.y}px;"
							class="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-110"
						>
							<button
								type="button"
								onclick={() => factory3d.selectHotspot(hotspot)}
								class="group flex items-center gap-2 rounded-full border border-[rgba(244,242,236,0.25)] bg-[#070709]/90 px-2.5 py-1 text-[11px] font-mono font-bold text-[#F4F2EC] shadow-lg backdrop-blur-md transition-all hover:border-[#FF3B00] hover:bg-[#FF3B00]"
								class:border-[#FF3B00]={factory3d.selectedHotspot?.id === hotspot.id}
								class:bg-[#FF3B00]={factory3d.selectedHotspot?.id === hotspot.id}
							>
								<span
									class="inline-block h-2 w-2 rounded-full bg-[#FF3B00] group-hover:bg-[#F4F2EC]"
									class:bg-[#F4F2EC]={factory3d.selectedHotspot?.id === hotspot.id}
								></span>
								<span>{hotspot.num}</span>
								<span class="hidden md:inline font-normal text-[10px] text-[rgba(244,242,236,0.8)] group-hover:text-[#F4F2EC]">
									{hotspot.title.split(' ')[0]}
								</span>
							</button>
						</div>
					{/if}
				{/each}
			</div>

			<!-- Selected Hotspot Detail Card (High-tech overlay) -->
			{#if factory3d.selectedHotspot}
				{@const spot = factory3d.selectedHotspot}
				<div
					class="absolute top-16 right-4 z-30 w-[92%] max-w-sm border border-[rgba(244,242,236,0.18)] bg-[#070709]/95 p-6 shadow-2xl backdrop-blur-xl sm:top-16 sm:right-6 animate-in fade-in slide-in-from-right-4 duration-300"
				>
					<div class="flex items-start justify-between gap-4 border-b border-[rgba(244,242,236,0.1)] pb-4">
						<div>
							<div class="font-mono text-[10px] tracking-[0.16em] text-[#FF3B00] uppercase">
								{spot.num} // {spot.category}
							</div>
							<h3 class="font-industrial mt-1 text-xl font-bold uppercase text-[#F4F2EC]">
								{spot.title}
							</h3>
							<p class="font-mono mt-1 text-[11px] text-[rgba(244,242,236,0.6)]">
								{spot.subtitle}
							</p>
						</div>
						<button
							type="button"
							onclick={() => factory3d.selectHotspot(null)}
							class="text-[rgba(244,242,236,0.5)] hover:text-[#FF3B00] font-mono text-base font-bold p-1"
							aria-label="Закрыть карточку"
						>
							✕
						</button>
					</div>

					<p class="mt-4 text-xs leading-relaxed text-[rgba(244,242,236,0.75)]">
						{spot.description}
					</p>

					<!-- Specs grid -->
					<div class="mt-4 grid grid-cols-2 gap-2 border-t border-[rgba(244,242,236,0.1)] pt-3 font-mono text-[10px]">
						{#each spot.specs as spec}
							<div class="bg-[rgba(255,255,255,0.03)] p-2 border border-[rgba(244,242,236,0.06)]">
								<div class="text-[rgba(244,242,236,0.45)] uppercase">{spec.label}</div>
								<div class="mt-0.5 font-bold text-[#F4F2EC]">{spec.value}</div>
							</div>
						{/each}
					</div>

					<div class="mt-5 flex gap-2">
						<button
							type="button"
							onclick={() => systemState.openDispatchModal()}
							class="w-full bg-[#FF3B00] px-4 py-2 text-center text-xs font-bold tracking-[0.08em] text-[#F4F2EC] uppercase transition-colors hover:bg-[#e03400]"
						>
							Заказать пилот для узла ↗
						</button>
						<button
							type="button"
							onclick={() => factory3d.resetView()}
							class="border border-[rgba(244,242,236,0.2)] px-3 py-2 text-xs font-mono text-[rgba(244,242,236,0.7)] hover:text-[#F4F2EC] hover:border-[#F4F2EC]"
							title="Сброс вида"
						>
							↺
						</button>
					</div>
				</div>
			{/if}

			<!-- Bottom Dock: Control Mode Buttons -->
			<div
				class="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 font-mono text-xs"
			>
				<!-- Mode Toggles -->
				<div class="flex flex-wrap items-center gap-2">
					<button
						type="button"
						onclick={() => factory3d.toggleKinematics()}
						class="flex items-center gap-2 border px-3 py-1.5 tracking-[0.08em] uppercase transition-all backdrop-blur-md {factory3d.isKinematics ? 'border-[#FF3B00] bg-[#FF3B00]/25 text-[#F4F2EC]' : 'border-[rgba(244,242,236,0.18)] bg-[#070709]/85 text-[rgba(244,242,236,0.7)]'}"
					>
						<span>{factory3d.isKinematics ? '▶' : '⏸'}</span>
						<span>Кинематика {factory3d.isKinematics ? 'ВКЛ' : 'ПАУЗА'}</span>
					</button>

					<button
						type="button"
						onclick={() => factory3d.toggleExplode()}
						class="flex items-center gap-2 border px-3 py-1.5 tracking-[0.08em] uppercase transition-all backdrop-blur-md {factory3d.isExploded ? 'border-[#00e5ff] bg-[#00e5ff]/25 text-[#F4F2EC]' : 'border-[rgba(244,242,236,0.18)] bg-[#070709]/85 text-[rgba(244,242,236,0.7)]'}"
					>
						<span>⤢</span>
						<span>Взрыв-схема</span>
					</button>

					<button
						type="button"
						onclick={() => factory3d.toggleXRay()}
						class="flex items-center gap-2 border px-3 py-1.5 tracking-[0.08em] uppercase transition-all backdrop-blur-md {factory3d.isXRay ? 'border-[#00e5ff] bg-[#00e5ff]/25 text-[#00e5ff]' : 'border-[rgba(244,242,236,0.18)] bg-[#070709]/85 text-[rgba(244,242,236,0.7)]'}"
					>
						<span>⬡</span>
						<span>Рентген / Wireframe</span>
					</button>

					<button
						type="button"
						onclick={() => factory3d.toggleAutoRotate()}
						class="hidden sm:flex items-center gap-2 border px-3 py-1.5 tracking-[0.08em] uppercase transition-all backdrop-blur-md {factory3d.isAutoRotate ? 'border-[#FF3B00] bg-[#FF3B00]/25 text-[#F4F2EC]' : 'border-[rgba(244,242,236,0.18)] bg-[#070709]/85 text-[rgba(244,242,236,0.7)]'}"
					>
						<span>↻</span>
						<span>Обзор 360°</span>
					</button>
				</div>

				<!-- Zoom and Reset Buttons -->
				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={() => factory3d.zoom(-1.2)}
						class="border border-[rgba(244,242,236,0.18)] bg-[#070709]/85 px-3 py-1.5 font-bold text-[#F4F2EC] hover:border-[#FF3B00] hover:text-[#FF3B00]"
						aria-label="Приблизить"
					>
						+
					</button>
					<button
						type="button"
						onclick={() => factory3d.zoom(1.2)}
						class="border border-[rgba(244,242,236,0.18)] bg-[#070709]/85 px-3 py-1.5 font-bold text-[#F4F2EC] hover:border-[#FF3B00] hover:text-[#FF3B00]"
						aria-label="Отдалить"
					>
						−
					</button>
					<button
						type="button"
						onclick={() => factory3d.resetView()}
						class="border border-[rgba(244,242,236,0.18)] bg-[#070709]/85 px-3 py-1.5 tracking-[0.08em] uppercase text-[rgba(244,242,236,0.7)] hover:border-[#FF3B00] hover:text-[#F4F2EC]"
					>
						Сброс вида ↺
					</button>
				</div>
			</div>
		</div>

		<!-- Hotspot Quick Selector Pills -->
		<div class="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs">
			<span class="text-[var(--text-muted)] text-[10px] tracking-[0.12em] uppercase mr-2">Узлы линии аккумуляторов:</span>
			{#each FACTORY_HOTSPOTS as spot}
				<button
					type="button"
					onclick={() => factory3d.selectHotspot(spot)}
					class="flex items-center gap-2 border px-3 py-1.5 transition-colors"
					class:border-[var(--accent)]={factory3d.selectedHotspot?.id === spot.id}
					class:text-[var(--accent)]={factory3d.selectedHotspot?.id === spot.id}
					class:border-[var(--border-hairline)]={factory3d.selectedHotspot?.id !== spot.id}
					class:text-[var(--text-secondary)]={factory3d.selectedHotspot?.id !== spot.id}
				>
					<span class="font-bold text-[10px] text-[var(--accent)]">{spot.num}</span>
					<span>{spot.title}</span>
				</button>
			{/each}
		</div>
	</div>
</section>
