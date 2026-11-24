<script lang="ts">
	import { browser } from '$app/env';
	import gsap from 'gsap';
	import { CORE_MODULES, type CoreModule } from '#lib/data/platformData.ts';
	import { textReveal } from '#lib/actions/textReveal.ts';
	import { cursorHover } from '#lib/actions/cursorHover.ts';
	import ModuleSchematicPreview from './ModuleSchematicPreview.svelte';

	let sectionEl = $state<HTMLElement | null>(null);
	let previewEl = $state<HTMLDivElement | null>(null);
	let hoveredModule = $state<CoreModule | null>(null);
	let expandedIndex = $state<string | null>('01');
	let isPointerFine = $state(false);

	let quickX: gsap.QuickToFunc | null = null;
	let quickY: gsap.QuickToFunc | null = null;

	$effect(() => {
		if (!browser) return;

		isPointerFine =
			window.matchMedia('(hover: hover)').matches && window.matchMedia('(pointer: fine)').matches;

		if (!isPointerFine || !previewEl) return;

		gsap.set(previewEl, { xPercent: 10, yPercent: -55, scale: 0.92, autoAlpha: 0 });
		quickX = gsap.quickTo(previewEl, 'x', { duration: 0.38, ease: 'power3.out' });
		quickY = gsap.quickTo(previewEl, 'y', { duration: 0.38, ease: 'power3.out' });

		const el = sectionEl;
		const onMove = (e: PointerEvent) => handlePointerMove(e);
		const onLeave = () => {
			hoveredModule = null;
		};

		el?.addEventListener('pointermove', onMove, { passive: true });
		el?.addEventListener('pointerleave', onLeave);

		return () => {
			el?.removeEventListener('pointermove', onMove);
			el?.removeEventListener('pointerleave', onLeave);
			quickX = null;
			quickY = null;
		};
	});

	$effect(() => {
		if (!browser || !previewEl || !isPointerFine) return;

		if (hoveredModule) {
			gsap.to(previewEl, {
				autoAlpha: 1,
				scale: 1,
				duration: 0.25,
				ease: 'power3.out',
				overwrite: 'auto'
			});
		} else {
			gsap.to(previewEl, {
				autoAlpha: 0,
				scale: 0.94,
				duration: 0.2,
				ease: 'power2.in',
				overwrite: 'auto'
			});
		}
	});

	function handlePointerMove(e: PointerEvent): void {
		if (!isPointerFine || !previewEl) return;
		const vw = window.innerWidth;
		const previewWidth = 356;
		const x = e.clientX + previewWidth + 44 > vw ? e.clientX - previewWidth - 40 : e.clientX;
		quickX?.(x);
		quickY?.(e.clientY);
	}

	function handleRowEnter(mod: CoreModule, e: PointerEvent): void {
		if (isPointerFine && previewEl && !hoveredModule) {
			const vw = window.innerWidth;
			const previewWidth = 356;
			const x = e.clientX + previewWidth + 44 > vw ? e.clientX - previewWidth - 40 : e.clientX;
			gsap.set(previewEl, { x, y: e.clientY });
		}
		hoveredModule = mod;
	}

	function toggleExpand(index: string): void {
		expandedIndex = expandedIndex === index ? null : index;
	}
</script>

<section
	id="modules"
	bind:this={sectionEl}
	class="relative border-b border-[var(--border-hairline)] py-16 lg:py-24"
>
	<div class="mx-auto max-w-[1680px] px-4 lg:px-8">
		<!-- SLG-style Clear Editorial Section Header -->
		<div class="mb-10 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
			<div class="lg:col-span-7">
				<div class="font-mono-tech mb-2 text-[11px] tracking-[0.14em] text-[var(--accent)] uppercase">
					[ 02 // ЯДРО СИСТЕМЫ MES &amp; APS ]
				</div>
				<h2
					use:textReveal={{ mode: 'scroll', stagger: 0.06 }}
					class="font-industrial text-4xl leading-[0.98] font-extrabold tracking-[-0.01em] uppercase sm:text-6xl"
				>
					4 МОДУЛЯ ВМЕСТО ХАОСА
				</h2>
			</div>
			<p class="font-mono-tech text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm lg:col-span-5 lg:text-right">
				Наведите на любую строку, чтобы увидеть живую схему работы. Кликните — раскроется
				подробная карточка «было → стало».
			</p>
		</div>

		<!-- Full-Width 1px-Ruled Interactive Modules Registry with Color-Coded CRT Cards -->
		<div class="border border-[var(--border-hairline)] divide-y divide-[var(--border-hairline)]">
			{#each CORE_MODULES as mod (mod.index)}
				{@const isHovered = hoveredModule?.index === mod.index}
				{@const isExpanded = expandedIndex === mod.index}
				<article
					onpointerenter={(e) => handleRowEnter(mod, e)}
					class="group relative transition-colors duration-250"
					class:bg-[var(--bg-elevated)]={isHovered && !isExpanded}
				>
					<button
						type="button"
						onclick={() => toggleExpand(mod.index)}
						aria-expanded={isExpanded}
						use:cursorHover={{ label: mod.cursorLabel, variant: 'inspect' }}
						class="grid w-full grid-cols-12 items-stretch text-left"
					>
						<!-- Index Box (Inverts starkly on hover/expand with module accent indicator) -->
						<div
							class={`font-mono-tech col-span-2 flex flex-col justify-between border-r border-[var(--border-hairline)] p-4 transition-colors duration-250 sm:col-span-2 md:col-span-1 md:p-6 ${
								isHovered || isExpanded
									? 'bg-[var(--bg-inverted)] text-[var(--text-inverted)]'
									: 'bg-transparent text-[var(--text-primary)]'
							}`}
						>
							<span class="font-pixel text-2xl font-bold md:text-3xl">{mod.index}</span>
							<span
								class="mt-2 text-[10px] font-bold tracking-[0.12em] uppercase"
								style="color: {isHovered || isExpanded ? mod.accentColor : 'var(--text-muted)'};"
							>
								{mod.code}
							</span>
						</div>

						<!-- Title, Plain Russian Value & Protocols (Shifts cleanly right on hover) -->
						<div
							class="col-span-10 flex flex-col justify-center border-r-0 border-[var(--border-hairline)] px-4 py-6 sm:px-6 md:col-span-8 md:border-r lg:py-7"
						>
							<div
								class="transition-transform duration-300 ease-out"
								class:translate-x-4={isHovered}
							>
								<div class="flex flex-wrap items-center gap-2.5">
									<span
										class="font-mono-tech px-2 py-0.5 text-[10px] font-bold text-[#0D0E10] uppercase"
										style="background-color: {mod.accentColor};"
									>
										{mod.channelTag}
									</span>
									<h3 class="text-xl leading-tight font-bold tracking-[-0.025em] sm:text-2xl lg:text-3xl">
										{mod.title}
									</h3>
								</div>

								<p class="mt-2.5 text-sm font-medium text-[var(--text-primary)] sm:text-base">
									{mod.plainBenefitRu}
								</p>
								<p class="font-mono-tech mt-1 text-xs text-[var(--text-muted)]">
									{mod.subtitleRu}
								</p>
							</div>
						</div>

						<!-- Right Metric & Toggle -->
						<div
							class="font-mono-tech col-span-12 flex items-center justify-between border-t border-[var(--border-hairline)] px-4 py-4 md:col-span-3 md:flex-col md:items-end md:justify-between md:border-t-0 md:p-6"
						>
							<div class="text-left md:text-right">
								<div class="text-[10px] tracking-[0.12em] text-[var(--text-muted)] uppercase">
									{mod.slaLabel}
								</div>
								<div
									class="font-pixel mt-0.5 text-2xl font-bold lg:text-3xl"
									style="color: {mod.accentColor};"
								>
									{mod.slaMetric}
								</div>
							</div>

							<div class="flex items-center gap-2 text-[11px] uppercase">
								<span class="text-[var(--text-secondary)]">
									{isExpanded ? 'Свернуть' : 'Подробнее'}
								</span>
								<span
									class="inline-flex h-6 w-6 items-center justify-center border border-[var(--border-strong)] font-bold transition-colors"
									style={isExpanded
										? `background-color: ${mod.accentColor}; border-color: ${mod.accentColor}; color: #0D0E10;`
										: ''}
								>
									{isExpanded ? '×' : '+'}
								</span>
							</div>
						</div>
					</button>

					<!-- Expanded Color-Coded CRT Detail Card (SLG .inside signature look!) -->
					{#if isExpanded}
						<div
							class="crt-scanlines relative grid grid-cols-1 overflow-hidden border-t border-[var(--border-hairline)] lg:grid-cols-12"
							style="background: radial-gradient(circle at 88% 25%, {mod.accentColor}24 0%, transparent 55%), var(--bg-deep);"
						>
							<!-- Decorative Pixel Block Cluster (homage to SLG's inside cards) -->
							<div
								aria-hidden="true"
								class="pointer-events-none absolute top-4 right-4 hidden grid-cols-4 gap-1 opacity-30 lg:grid"
							>
								{#each [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1] as filled, i (i)}
									<span
										class="block h-5 w-5"
										style="background-color: {filled ? mod.accentColor : 'transparent'};"
									></span>
								{/each}
							</div>

							<div
								class="relative z-10 border-b border-[var(--border-hairline)] p-5 sm:p-8 lg:col-span-7 lg:border-r lg:border-b-0"
							>
								<!-- Before -> After Clarity Strip -->
								<div class="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
									<div class="border border-[var(--border-hairline)] bg-[var(--bg-primary)]/75 p-3.5">
										<div class="font-mono-tech text-[10px] tracking-[0.12em] text-[var(--text-muted)] uppercase">
											КАК ОБЫЧНО НА ЗАВОДЕ
										</div>
										<div class="mt-1.5 text-sm text-[var(--text-secondary)]">
											{mod.beforeAfterRu.before}
										</div>
									</div>
									<div
										class="border p-3.5 bg-[var(--bg-primary)]/85"
										style="border-color: {mod.accentColor};"
									>
										<div
											class="font-mono-tech text-[10px] font-bold tracking-[0.12em] uppercase"
											style="color: {mod.accentColor};"
										>
											КАК СТАНОВИТСЯ С PROMSYS
										</div>
										<div class="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">
											{mod.beforeAfterRu.after}
										</div>
									</div>
								</div>

								<p class="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
									{mod.summaryRu}
								</p>

								<!-- 3 SLG-style Feature Pills with Colored Square Markers -->
								<div class="mt-6 space-y-2.5">
									{#each mod.capabilities as cap (cap)}
										<div
											class="flex items-start gap-3 border border-[var(--border-hairline)] bg-[var(--bg-primary)]/70 px-4 py-3 text-sm text-[var(--text-primary)]"
										>
											<span
												class="mt-1.5 inline-block h-2 w-2 shrink-0"
												style="background-color: {mod.accentColor};"
											></span>
											<span>{cap}</span>
										</div>
									{/each}
								</div>

								<div class="mt-5 flex flex-wrap gap-2">
									{#each mod.protocols as proto (proto)}
										<span
											class="font-mono-tech border border-[var(--border-hairline)] px-2.5 py-1 text-[10px] tracking-[0.1em] text-[var(--text-secondary)] uppercase"
										>
											{proto}
										</span>
									{/each}
								</div>
							</div>

							<!-- Embedded Live Schematic -->
							<div class="relative z-10 flex flex-col justify-between p-5 sm:p-8 lg:col-span-5">
								<div class="border" style="border-color: {mod.accentColor};">
									<ModuleSchematicPreview type={mod.previewType} accentColor={mod.accentColor} />
								</div>

								<div class="font-mono-tech mt-5 grid grid-cols-3 border border-[var(--border-hairline)] bg-[var(--bg-primary)]/80 text-[10px]">
									<div class="border-r border-[var(--border-hairline)] p-3">
										<span class="block text-[var(--text-muted)]">НАГРУЗКА</span>
										<span class="mt-0.5 block font-semibold text-[var(--text-primary)]">
											{mod.architectureSpec.throughput}
										</span>
									</div>
									<div class="border-r border-[var(--border-hairline)] p-3">
										<span class="block text-[var(--text-muted)]">ТОЧНОСТЬ</span>
										<span class="mt-0.5 block font-semibold text-[var(--text-primary)]">
											{mod.architectureSpec.determinism}
										</span>
									</div>
									<div class="p-3">
										<span class="block text-[var(--text-muted)]">КОНТУР</span>
										<span class="mt-0.5 block font-semibold text-[var(--text-primary)]">
											{mod.architectureSpec.deployment}
										</span>
									</div>
								</div>
							</div>
						</div>
					{/if}
				</article>
			{/each}
		</div>
	</div>

	<!-- Floating Cursor-Following Live SVG Preview (gsap.quickTo) -->
	{#if isPointerFine}
		<div
			bind:this={previewEl}
			aria-hidden="true"
			class="pointer-events-none fixed left-0 top-0 z-[90] w-[356px] border-2 will-change-transform"
			style="border-color: {hoveredModule?.accentColor ?? '#FF3B00'};"
		>
			{#if hoveredModule}
				<ModuleSchematicPreview
					type={hoveredModule.previewType}
					accentColor={hoveredModule.accentColor}
					compact
				/>
			{/if}
		</div>
	{/if}
</section>
