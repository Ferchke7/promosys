<script lang="ts">
	import type { Snippet } from 'svelte';
	import { browser } from '$app/env';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { systemState } from '#lib/stores/system.svelte.ts';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	$effect(() => {
		if (!browser) return;

		gsap.registerPlugin(ScrollTrigger);

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const lenis = new Lenis({
			lerp: prefersReducedMotion ? 1 : 0.075,
			smoothWheel: !prefersReducedMotion,
			wheelMultiplier: 0.95,
			touchMultiplier: 1.5
		});

		systemState.registerLenis(lenis);

		const onScroll = (e: { progress: number; velocity: number }) => {
			ScrollTrigger.update();
			systemState.scrollProgress = e.progress;
			systemState.scrollVelocity = e.velocity;
		};

		lenis.on('scroll', onScroll);

		const tickerCallback = (time: number) => {
			lenis.raf(time * 1000);
		};

		gsap.ticker.add(tickerCallback);
		gsap.ticker.lagSmoothing(0);

		const onResize = () => {
			ScrollTrigger.refresh();
		};
		window.addEventListener('resize', onResize, { passive: true });

		return () => {
			window.removeEventListener('resize', onResize);
			gsap.ticker.remove(tickerCallback);
			lenis.off('scroll', onScroll);
			systemState.registerLenis(null);
			lenis.destroy();
		};
	});
</script>

{@render children()}
