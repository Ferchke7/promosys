<script lang="ts">
	import { browser } from '$app/env';
	import gsap from 'gsap';
	import { systemState } from '#lib/stores/system.svelte.ts';

	let enabled = $state(false);
	let visible = $state(false);
	let dotEl = $state<HTMLDivElement | null>(null);
	let reticleEl = $state<HTMLDivElement | null>(null);

	$effect(() => {
		if (!browser) return;

		const isTouch =
			window.matchMedia('(pointer: coarse)').matches ||
			!window.matchMedia('(hover: hover)').matches ||
			'ontouchstart' in window;

		if (isTouch) {
			enabled = false;
			return;
		}

		enabled = true;
		document.documentElement.classList.add('has-custom-cursor');

		let quickDotX: gsap.QuickToFunc | null = null;
		let quickDotY: gsap.QuickToFunc | null = null;
		let quickReticleX: gsap.QuickToFunc | null = null;
		let quickReticleY: gsap.QuickToFunc | null = null;

		const raf = window.requestAnimationFrame(() => {
			if (dotEl && reticleEl) {
				gsap.set([dotEl, reticleEl], { xPercent: -50, yPercent: -50 });
				quickDotX = gsap.quickTo(dotEl, 'x', { duration: 0.09, ease: 'power3.out' });
				quickDotY = gsap.quickTo(dotEl, 'y', { duration: 0.09, ease: 'power3.out' });
				quickReticleX = gsap.quickTo(reticleEl, 'x', { duration: 0.28, ease: 'power3.out' });
				quickReticleY = gsap.quickTo(reticleEl, 'y', { duration: 0.28, ease: 'power3.out' });
			}
		});

		const onPointerMove = (e: PointerEvent) => {
			if (!visible) {
				visible = true;
				if (dotEl && reticleEl) {
					gsap.set([dotEl, reticleEl], { x: e.clientX, y: e.clientY });
				}
			}
			quickDotX?.(e.clientX);
			quickDotY?.(e.clientY);
			quickReticleX?.(e.clientX);
			quickReticleY?.(e.clientY);
		};

		const onPointerLeave = () => {
			visible = false;
			systemState.resetCursor();
		};

		window.addEventListener('pointermove', onPointerMove, { passive: true });
		document.addEventListener('mouseleave', onPointerLeave);

		return () => {
			window.cancelAnimationFrame(raf);
			window.removeEventListener('pointermove', onPointerMove);
			document.removeEventListener('mouseleave', onPointerLeave);
			document.documentElement.classList.remove('has-custom-cursor');
		};
	});
</script>

{#if enabled}
	<!-- Sharp inner dot -->
	<div
		bind:this={dotEl}
		aria-hidden="true"
		class="pointer-events-none fixed left-0 top-0 z-[200] transition-opacity duration-200"
		class:opacity-0={!visible}
		class:opacity-100={visible}
	>
		<div
			class="h-1.5 w-1.5 transition-transform duration-200"
			class:bg-[var(--accent)]={systemState.cursor.active}
			class:bg-[var(--text-primary)]={!systemState.cursor.active}
			class:scale-0={systemState.cursor.active}
			class:scale-100={!systemState.cursor.active}
		></div>
	</div>

	<!-- Outer technical reticle / micro-label badge -->
	<div
		bind:this={reticleEl}
		aria-hidden="true"
		class="pointer-events-none fixed left-0 top-0 z-[199] transition-opacity duration-200"
		class:opacity-0={!visible}
		class:opacity-100={visible}
	>
		{#if systemState.cursor.active}
			<div
				class="font-mono-tech flex items-center gap-1.5 border border-[var(--accent)] bg-[var(--bg-inverted)] px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[var(--text-inverted)] uppercase whitespace-nowrap"
			>
				<span class="inline-block h-1.5 w-1.5 bg-[var(--accent)]"></span>
				<span>{systemState.cursor.label}</span>
			</div>
		{:else}
			<div class="relative h-6 w-6 border border-[var(--border-strong)]">
				<span class="absolute -left-px -top-px h-1.5 w-1.5 border-l border-t border-[var(--accent)]"></span>
				<span class="absolute -right-px -bottom-px h-1.5 w-1.5 border-r border-b border-[var(--accent)]"></span>
			</div>
		{/if}
	</div>
{/if}
