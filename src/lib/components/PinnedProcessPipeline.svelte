<script lang="ts">
	import { browser } from '$app/env';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { PIPELINE_STAGES } from '#lib/data/platformData.ts';
	import { systemState } from '#lib/stores/system.svelte.ts';
	import { cursorHover } from '#lib/actions/cursorHover.ts';

	let sectionEl = $state<HTMLElement | null>(null);
	let path1El = $state<SVGPathElement | null>(null);
	let path2El = $state<SVGPathElement | null>(null);
	let path3El = $state<SVGPathElement | null>(null);
	let feedbackPathEl = $state<SVGPathElement | null>(null);
	let pulseDotEl = $state<SVGCircleElement | null>(null);

	let activeStageIdx = $state(0);
	let progressPct = $state(0);
	let scrollTriggerRef: ScrollTrigger | null = null;

	const currentStage = $derived(PIPELINE_STAGES[activeStageIdx] ?? PIPELINE_STAGES[0]);

	function jumpToStage(idx: number): void {
		if (!scrollTriggerRef) {
			activeStageIdx = idx;
			return;
		}
		const targetProgress = idx === 0 ? 0.02 : idx === 3 ? 0.96 : idx / 3;
		const targetY =
			scrollTriggerRef.start + (scrollTriggerRef.end - scrollTriggerRef.start) * targetProgress;
		systemState.scrollToTarget(targetY, 0);
	}

	$effect(() => {
		if (!browser || !sectionEl) return;

		gsap.registerPlugin(ScrollTrigger);

		const paths = [path1El, path2El, path3El, feedbackPathEl].filter(
			(p): p is SVGPathElement => p !== null
		);

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			paths.forEach((p) => {
				p.style.strokeDasharray = 'none';
				p.style.strokeDashoffset = '0';
			});
			activeStageIdx = 3;
			progressPct = 100;
			return;
		}

		const lengths = paths.map((p) => p.getTotalLength());
		paths.forEach((p, i) => {
			p.style.strokeDasharray = `${lengths[i]}`;
			p.style.strokeDashoffset = `${lengths[i]}`;
		});

		const mm = gsap.matchMedia();

		mm.add(
			{
				isDesktop: '(min-width: 1024px)',
				isMobile: '(max-width: 1023px)'
			},
			(context) => {
				const isDesktop = context.conditions?.isDesktop ?? false;

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionEl,
						start: isDesktop ? 'top top+=56' : 'top 78%',
						end: isDesktop ? '+=230%' : 'bottom 45%',
						pin: isDesktop,
						scrub: 1,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						onUpdate: (self) => {
							const p = self.progress;
							progressPct = Math.round(p * 100);
							if (p < 0.26) activeStageIdx = 0;
							else if (p < 0.56) activeStageIdx = 1;
							else if (p < 0.84) activeStageIdx = 2;
							else activeStageIdx = 3;
						}
					}
				});

				scrollTriggerRef = tl.scrollTrigger ?? null;

				if (path1El) {
					tl.to(path1El, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 0.08);
				}
				if (pulseDotEl) {
					tl.to(pulseDotEl, { attr: { cx: 368 }, duration: 1, ease: 'none' }, 0.08);
				}

				if (path2El) {
					tl.to(path2El, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 1.15);
				}
				if (pulseDotEl) {
					tl.to(pulseDotEl, { attr: { cx: 632 }, duration: 1, ease: 'none' }, 1.15);
				}

				if (path3El) {
					tl.to(path3El, { strokeDashoffset: 0, duration: 1, ease: 'none' }, 2.22);
				}
				if (pulseDotEl) {
					tl.to(pulseDotEl, { attr: { cx: 896 }, duration: 1, ease: 'none' }, 2.22);
				}

				if (feedbackPathEl) {
					tl.to(feedbackPathEl, { strokeDashoffset: 0, duration: 0.9, ease: 'none' }, 3.15);
				}

				return () => {
					scrollTriggerRef = null;
					tl.kill();
				};
			}
		);

		return () => {
			scrollTriggerRef = null;
			mm.revert();
		};
	});
</script>

<section
	id="pipeline"
	bind:this={sectionEl}
	class="relative flex min-h-[calc(100svh-56px)] flex-col justify-between border-b border-[var(--border-hairline)] bg-[var(--bg-primary)] lg:h-[calc(100svh-56px)]"
>
	<!-- Top Pinned Pipeline HUD -->
	<div class="grid grid-cols-1 border-b border-[var(--border-hairline)] lg:grid-cols-12">
		<div
			class="flex flex-col justify-between border-b border-[var(--border-hairline)] p-4 sm:p-5 lg:col-span-5 lg:border-r lg:border-b-0 lg:px-8 lg:py-4"
		>
			<div class="font-mono-tech flex items-center justify-between text-[10px] tracking-[0.14em] uppercase md:text-[11px]">
				<span class="text-[var(--accent)]">[ 03 // КАК ПРОХОДИТ ЗАКАЗ ]</span>
				<span class="text-[var(--text-muted)]">ШАГ {currentStage.index} ИЗ 04 · {progressPct}%</span>
			</div>
			<h2 class="font-industrial mt-2 text-2xl leading-[1.04] font-extrabold tracking-[0.01em] uppercase lg:text-3xl">
				ERP → APS → MES → OEE
			</h2>
		</div>

		<!-- Live Order Telemetry Readout -->
		<div class="grid grid-cols-1 sm:grid-cols-3 lg:col-span-7">
			<div class="font-mono-tech border-b border-[var(--border-hairline)] p-4 sm:border-r sm:border-b-0 lg:px-5 lg:py-4">
				<div class="text-[10px] tracking-[0.12em] text-[var(--text-muted)] uppercase">ТЕКУЩИЙ ЗАКАЗ</div>
				<div class="mt-1 text-sm font-bold text-[var(--text-primary)]">ЗАКАЗ #8841 · ВАЛ ТУРБИНЫ</div>
				<div class="mt-0.5 text-[10px] font-semibold text-[var(--accent)]">{currentStage.orderStatus}</div>
			</div>

			<div class="font-mono-tech border-b border-[var(--border-hairline)] p-4 sm:border-r sm:border-b-0 lg:px-5 lg:py-4">
				<div class="text-[10px] tracking-[0.12em] text-[var(--text-muted)] uppercase">
					{currentStage.kpiLabel}
				</div>
				<div class="font-pixel mt-0.5 text-2xl font-bold text-[var(--text-primary)]">
					{currentStage.kpiValue}
				</div>
				<div class="mt-0.5 text-[10px] text-[var(--text-secondary)]">{currentStage.delta}</div>
			</div>

			<div class="font-mono-tech flex flex-col justify-between p-4 lg:px-5 lg:py-4">
				<div class="flex items-center justify-between text-[10px] tracking-[0.12em] uppercase">
					<span class="text-[var(--text-muted)]">ПРОГРЕСС ЦИКЛА</span>
					<span class="font-bold text-[var(--accent)]">{currentStage.shortName}</span>
				</div>
				<div class="mt-2.5 h-1.5 w-full bg-[var(--border-hairline)]">
					<div
						class="h-full bg-[var(--accent)] transition-all duration-150"
						style="width: {Math.max(8, progressPct)}%;"
					></div>
				</div>
				<div class="mt-1.5 text-[10px] text-[var(--text-muted)] uppercase">
					ЛИСТАЙТЕ ВНИЗ ДЛЯ ПЕРЕХОДА
				</div>
			</div>
		</div>
	</div>

	<!-- Center Architectural SVG Conduit Canvas -->
	<div class="tech-blueprint-grid relative flex flex-1 flex-col justify-center px-4 py-5 lg:px-8 lg:py-3">
		<div class="mx-auto w-full max-w-[1440px]">
			<div class="crt-scanlines border border-[var(--border-hairline)] bg-[var(--bg-primary)]/95 p-3 sm:px-5 sm:py-4">
				<svg
					viewBox="0 0 1000 224"
					class="mx-auto h-auto max-h-[33vh] w-full overflow-visible"
					role="img"
					aria-label="Схема прохождения производственного заказа: ERP, APS, MES, OEE"
				>
					<!-- Static Faint Rail Guides -->
					<path d="M 190 78 L 284 78" fill="none" stroke="var(--border-hairline)" stroke-width="2" />
					<path d="M 454 78 L 548 78" fill="none" stroke="var(--border-hairline)" stroke-width="2" />
					<path d="M 718 78 L 812 78" fill="none" stroke="var(--border-hairline)" stroke-width="2" />
					<path
						d="M 896 138 L 896 196 L 369 196 L 369 138"
						fill="none"
						stroke="var(--border-hairline)"
						stroke-width="1.5"
						stroke-dasharray="5 5"
					/>

					<!-- Animated strokeDashoffset Conduits -->
					<path bind:this={path1El} d="M 190 78 L 284 78" fill="none" stroke="#FF3B00" stroke-width="2.5" />
					<path bind:this={path2El} d="M 454 78 L 548 78" fill="none" stroke="#FF3B00" stroke-width="2.5" />
					<path bind:this={path3El} d="M 718 78 L 812 78" fill="none" stroke="#FF3B00" stroke-width="2.5" />
					<path
						bind:this={feedbackPathEl}
						d="M 896 138 L 896 196 L 369 196 L 369 138"
						fill="none"
						stroke="#FF3B00"
						stroke-width="2"
					/>

					<!-- Feedback Caption -->
					<g font-family="JetBrains Mono, monospace" font-size="10">
						<rect
							x="498"
							y="183"
							width="272"
							height="24"
							fill="var(--bg-primary)"
							stroke={activeStageIdx === 3 ? '#FF3B00' : 'var(--border-hairline)'}
						/>
						<text
							x="634"
							y="199"
							text-anchor="middle"
							fill={activeStageIdx === 3 ? '#FF3B00' : 'var(--text-secondary)'}
							font-weight="600"
						>
							← АВТОКОРРЕКТИРОВКА ПЛАНА ПО ФАКТУ OEE
						</text>
					</g>

					<!-- Glowing Travelling Signal Packet -->
					<circle bind:this={pulseDotEl} cx="105" cy="78" r="5.5" fill="#FF3B00" />

					<!-- 4 Stage Nodes -->
					{#each [
						{ x: 20, idx: 0, code: '01 // ERP', name: 'ЗАКАЗ', metric: '420 ШТ' },
						{ x: 284, idx: 1, code: '02 // APS', name: 'ГРАФИК', metric: '140 МС' },
						{ x: 548, idx: 2, code: '03 // MES', name: 'СТАНКИ', metric: 'OPC-UA' },
						{ x: 812, idx: 3, code: '04 // OEE', name: 'ИТОГ', metric: '94.8%' }
					] as node (node.idx)}
						{@const isActive = activeStageIdx === node.idx}
						{@const isReached = activeStageIdx >= node.idx}
						<g
							class="cursor-pointer"
							onclick={() => jumpToStage(node.idx)}
							onkeydown={(e) => e.key === 'Enter' && jumpToStage(node.idx)}
							role="button"
							tabindex="0"
							aria-label={`Перейти к этапу ${node.code}`}
						>
							<rect
								x={node.x}
								y="18"
								width="170"
								height="120"
								fill={isActive ? 'var(--bg-inverted)' : 'var(--bg-elevated)'}
								stroke={isActive ? '#FF3B00' : isReached ? 'var(--border-strong)' : 'var(--border-hairline)'}
								stroke-width={isActive ? '2' : '1'}
							/>
							<rect
								x={node.x}
								y="18"
								width="170"
								height="4"
								fill={isReached ? '#FF3B00' : 'var(--border-hairline)'}
							/>

							<text
								x={node.x + 14}
								y="42"
								font-family="JetBrains Mono, monospace"
								font-size="10"
								font-weight="600"
								fill={isActive ? '#FF3B00' : 'var(--text-muted)'}
							>
								{node.code}
							</text>

							<text
								x={node.x + 14}
								y="76"
								font-family="Tektur, Space Grotesk, sans-serif"
								font-size="22"
								font-weight="700"
								fill={isActive ? 'var(--text-inverted)' : 'var(--text-primary)'}
							>
								{node.name}
							</text>

							<line
								x1={node.x + 14}
								y1="93"
								x2={node.x + 156}
								y2="93"
								stroke={isActive ? 'var(--text-inverted)' : 'var(--border-hairline)'}
								stroke-opacity={isActive ? '0.22' : '1'}
							/>

							<text
								x={node.x + 14}
								y="118"
								font-family="JetBrains Mono, monospace"
								font-size="11"
								font-weight="700"
								fill={isActive ? 'var(--text-inverted)' : isReached ? '#FF3B00' : 'var(--text-secondary)'}
							>
								{node.metric}
							</text>
							<circle
								cx={node.x + 148}
								cy="114"
								r="4"
								fill={isActive ? '#FF3B00' : isReached ? 'var(--text-primary)' : 'var(--border-hairline)'}
							/>
						</g>
					{/each}
				</svg>
			</div>

			<!-- Crystal-Clear Human Russian Story Card for Active Stage -->
			<div class="mt-3 grid grid-cols-1 border border-[var(--border-hairline)] bg-[var(--bg-primary)] lg:grid-cols-12">
				<div class="border-b border-[var(--border-hairline)] p-4 sm:px-6 sm:py-4 lg:col-span-8 lg:border-r lg:border-b-0">
					<div class="flex flex-wrap items-center gap-3">
						<span class="font-mono-tech bg-[var(--accent)] px-2 py-0.5 text-[11px] font-bold text-[#F4F2EC] uppercase">
							ЭТАП {currentStage.index}
						</span>
						<h3 class="text-base font-bold text-[var(--text-primary)] sm:text-lg">
							{currentStage.title}
						</h3>
					</div>
					<p class="mt-2 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
						{currentStage.plainStoryRu}
					</p>
				</div>

				<div class="flex flex-col justify-between p-4 sm:px-5 sm:py-4 lg:col-span-4">
					<div class="font-mono-tech text-[10px] tracking-[0.12em] text-[var(--text-muted)] uppercase">
						ЧТО ЗАДЕЙСТВОВАНО НА ЭТАПЕ
					</div>
					<div class="mt-2.5 flex flex-wrap gap-1.5">
						{#each currentStage.tags as tag (tag)}
							<span
								class="font-mono-tech border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-2.5 py-1 text-[10px] font-medium uppercase"
							>
								{tag}
							</span>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom 4-Stage Interactive Selector Bar -->
	<div class="grid grid-cols-2 border-t border-[var(--border-hairline)] lg:grid-cols-4">
		{#each PIPELINE_STAGES as stage, idx (stage.index)}
			{@const isActive = activeStageIdx === idx}
			<button
				type="button"
				onclick={() => jumpToStage(idx)}
				use:cursorHover={{ label: `[ ЭТАП ${stage.index} ]`, variant: 'inspect' }}
				class={`font-mono-tech flex flex-col justify-between border-r border-b border-[var(--border-hairline)] px-4 py-3 text-left last:border-r-0 lg:border-b-0 lg:px-6 lg:py-3.5 ${
					isActive
						? 'bg-[var(--bg-inverted)] text-[var(--text-inverted)]'
						: 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
				}`}
			>
				<div class="flex items-center justify-between text-[10px] tracking-[0.12em] uppercase">
					<span class={isActive ? 'font-bold text-[var(--accent)]' : 'text-[var(--text-muted)]'}>
						{stage.code}
					</span>
					<span
						class={`h-1.5 w-1.5 ${isActive ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'}`}
					></span>
				</div>
				<div class="mt-1 font-sans text-xs font-bold tracking-[-0.015em] sm:text-sm">
					{stage.subtitleRu}
				</div>
			</button>
		{/each}
	</div>
</section>
