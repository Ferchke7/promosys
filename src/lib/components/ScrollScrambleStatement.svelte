<script lang="ts">
	import { browser } from '$app/env';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	const TARGET_LINES = ['ЗАВОД', 'РАБОТАЕТ', 'КАК ЧАСЫ.'] as const;
	const GLYPHS = '#0123456789ABCDEF/\\[]ЖДФЯΣΩ';

	let sectionEl = $state<HTMLElement | null>(null);
	let progress = $state(0);

	// Deterministic scramble glyph picker based on character index + scroll bucket
	function getCharState(
		lineIdx: number,
		charIdx: number,
		char: string,
		globalIdx: number,
		totalChars: number
	): { display: string; phase: 'scrambled' | 'outline' | 'resolved' } {
		if (char === ' ') return { display: ' ', phase: 'resolved' };

		// Map scroll progress [0.05..0.85] smoothly across all characters
		const charStart = 0.04 + (globalIdx / totalChars) * 0.68;
		const charMid = charStart + 0.1;
		const charEnd = charStart + 0.18;

		if (progress >= charEnd) {
			return { display: char, phase: 'resolved' };
		}

		if (progress >= charMid) {
			return { display: char, phase: 'outline' };
		}

		const tickBucket = Math.floor(progress * 42) + lineIdx * 7 + charIdx * 13;
		const glyph = GLYPHS[Math.abs(tickBucket) % GLYPHS.length];
		return { display: glyph, phase: 'scrambled' };
	}

	const totalChars = TARGET_LINES.reduce((acc, l) => acc + l.length, 0);

	const renderedLines = $derived.by(() => {
		let running = 0;
		return TARGET_LINES.map((line, lineIdx) => {
			const chars = Array.from(line).map((ch, charIdx) => {
				const st = getCharState(lineIdx, charIdx, ch, running, totalChars);
				running += 1;
				return { key: `${lineIdx}-${charIdx}`, ...st };
			});
			return { lineIdx, chars };
		});
	});

	const captionVisible = $derived(progress > 0.78);

	$effect(() => {
		if (!browser || !sectionEl) return;

		gsap.registerPlugin(ScrollTrigger);
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			progress = 1;
			return;
		}

		const mm = gsap.matchMedia();

		mm.add(
			{
				isDesktop: '(min-width: 1024px)',
				isMobile: '(max-width: 1023px)'
			},
			(context) => {
				const isDesktop = context.conditions?.isDesktop ?? false;

				const st = ScrollTrigger.create({
					trigger: sectionEl,
					start: isDesktop ? 'top top+=56' : 'top 80%',
					end: isDesktop ? '+=155%' : 'bottom 40%',
					pin: isDesktop,
					scrub: 0.6,
					anticipatePin: 1,
					onUpdate: (self) => {
						progress = self.progress;
					}
				});

				return () => st.kill();
			}
		);

		return () => mm.revert();
	});
</script>

<section
	id="statement"
	bind:this={sectionEl}
	class="relative flex min-h-[75svh] flex-col items-center justify-center overflow-hidden border-b border-[var(--border-hairline)] bg-[var(--bg-deep)] px-4 py-20 lg:h-[calc(100svh-56px)]"
>
	<!-- Top Decode Telemetry Indicator -->
	<div
		class="font-mono-tech absolute top-6 left-4 right-4 mx-auto flex max-w-[1680px] items-center justify-between text-[10px] tracking-[0.15em] text-[var(--text-muted)] uppercase lg:px-4"
	>
		<span>// РАСШИФРОВКА ПРИНЦИПА PROMSYS</span>
		<span>DECODE: <strong class="text-[var(--accent)]">{Math.round(progress * 100)}%</strong></span>
	</div>

	<!-- Giant Decoded Pixel Statement -->
	<div class="mx-auto flex w-full max-w-[1440px] flex-col items-center text-center select-none">
		{#each renderedLines as row (row.lineIdx)}
			<div
				class="font-industrial flex flex-wrap justify-center font-extrabold tracking-[0.01em] uppercase"
				style="font-size: clamp(3rem, 8.6vw, 8.8rem); line-height: 0.96;"
			>
				{#each row.chars as cell (cell.key)}
					{#if cell.display === ' '}
						<span class="inline-block w-[0.35em]">&nbsp;</span>
					{:else if cell.phase === 'scrambled'}
						<span
							class="inline-block min-w-[0.68em] text-[var(--accent)]"
							style="text-shadow: 0 0 18px rgba(255, 59, 0, 0.55);"
						>
							{cell.display}
						</span>
					{:else if cell.phase === 'outline'}
						<span
							class="inline-block min-w-[0.68em] opacity-40"
							style="-webkit-text-stroke: 1.5px var(--text-primary); color: transparent;"
						>
							{cell.display}
						</span>
					{:else}
						<span
							class="inline-block min-w-[0.68em] text-[var(--text-primary)]"
							style="text-shadow: 0 0 24px rgba(244, 242, 236, 0.14);"
						>
							{cell.display}
						</span>
					{/if}
				{/each}
			</div>
		{/each}

		<!-- Clear Plain-Russian Subcaption Revealed Upon Decode -->
		<p
			class="font-mono-tech mt-10 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] transition-all duration-500 sm:text-base"
			class:opacity-100={captionVisible}
			class:translate-y-0={captionVisible}
			class:opacity-0={!captionVisible}
			class:translate-y-4={!captionVisible}
		>
			Без Excel-таблиц, ночных простоев и ручной диспетчеризации —
			<span class="text-[var(--text-primary)] font-semibold">каждый станок знает следующую деталь.</span>
		</p>
	</div>

	<!-- Bottom Scrub Rail -->
	<div class="absolute bottom-6 left-4 right-4 mx-auto max-w-[1680px] lg:px-4">
		<div class="h-px w-full bg-[var(--border-hairline)]">
			<div
				class="h-full origin-left bg-[var(--accent)] transition-transform duration-75"
				style="transform: scaleX({progress});"
			></div>
		</div>
	</div>
</section>
