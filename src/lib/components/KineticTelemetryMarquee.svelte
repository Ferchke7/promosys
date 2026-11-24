<script lang="ts">
	import { browser } from '$app/env';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { MARQUEE_TIER_ONE, MARQUEE_TIER_TWO } from '#lib/data/platformData.ts';

	let containerEl = $state<HTMLElement | null>(null);
	let trackTopEl = $state<HTMLDivElement | null>(null);
	let trackBottomEl = $state<HTMLDivElement | null>(null);

	$effect(() => {
		if (!browser || !containerEl || !trackTopEl || !trackBottomEl) return;

		gsap.registerPlugin(ScrollTrigger);
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		let xTop = 0;
		let xBottom = -50;
		let direction = 1;
		let velocityBoost = 0;

		const st = ScrollTrigger.create({
			trigger: containerEl,
			start: 'top bottom',
			end: 'bottom top',
			onUpdate: (self) => {
				const vel = self.getVelocity();
				if (Math.abs(vel) > 15) {
					direction = vel > 0 ? 1 : -1;
				}
				const clamped = gsap.utils.clamp(-14, 14, Math.abs(vel) / 220);
				velocityBoost = Math.max(velocityBoost, clamped);
			}
		});

		const baseSpeedTop = 0.032; // % of track width per frame at 60fps
		const baseSpeedBottom = 0.026;

		const tick = (_time: number, deltaTime: number) => {
			const dt = Math.min(deltaTime, 50) / 16.6667;
			// Smoothly decay velocity boost back to cruising speed
			velocityBoost = gsap.utils.interpolate(velocityBoost, 0, 0.06 * dt);
			const factor = 1 + velocityBoost;

			// Top tier moves in scroll direction; bottom tier runs opposite
			xTop -= baseSpeedTop * factor * direction * dt;
			xBottom += baseSpeedBottom * factor * direction * dt;

			// Seamless wrap within [-50%, 0%] because content is duplicated twice
			if (xTop <= -50) xTop += 50;
			if (xTop > 0) xTop -= 50;

			if (xBottom >= 0) xBottom -= 50;
			if (xBottom < -50) xBottom += 50;

			if (trackTopEl) {
				trackTopEl.style.transform = `translate3d(${xTop}%, 0, 0)`;
			}
			if (trackBottomEl) {
				trackBottomEl.style.transform = `translate3d(${xBottom}%, 0, 0)`;
			}
		};

		gsap.ticker.add(tick);

		return () => {
			gsap.ticker.remove(tick);
			st.kill();
		};
	});
</script>

<section
	bind:this={containerEl}
	aria-label="Телеметрия и промышленные протоколы"
	class="relative overflow-hidden border-b border-[var(--border-hairline)] select-none"
>
	<!-- Tier 1: High-contrast Inverted Protocol Stream -->
	<div class="overflow-hidden border-b border-[var(--border-hairline)] bg-[var(--bg-inverted)] py-3.5 text-[var(--text-inverted)]">
		<div bind:this={trackTopEl} class="flex w-max will-change-transform">
			{#each [0, 1] as copy (copy)}
				<div class="flex shrink-0 items-center" aria-hidden={copy === 1}>
					{#each MARQUEE_TIER_ONE as item, idx (`t1-${copy}-${idx}`)}
						<span class="font-mono-tech mx-5 text-xs font-semibold tracking-[0.16em] uppercase md:text-sm">
							{item}
						</span>
						<span class="font-mono-tech text-xs text-[var(--accent)]">//</span>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<!-- Tier 2: Crisp Technical Telemetry Stream (Opposite Direction) -->
	<div class="overflow-hidden bg-[var(--bg-elevated)] py-3 text-[var(--text-primary)]">
		<div bind:this={trackBottomEl} class="flex w-max will-change-transform">
			{#each [0, 1] as copy (copy)}
				<div class="flex shrink-0 items-center" aria-hidden={copy === 1}>
					{#each MARQUEE_TIER_TWO as item, idx (`t2-${copy}-${idx}`)}
						<span class="font-mono-tech mx-5 text-[11px] font-medium tracking-[0.14em] text-[var(--text-secondary)] uppercase md:text-xs">
							{item}
						</span>
						<span class="inline-block h-1.5 w-1.5 bg-[var(--accent)]"></span>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>
