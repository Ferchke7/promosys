<script lang="ts">
	import '../app.css';
	import { browser } from '$app/env';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import favicon from '#lib/assets/favicon.svg';
	import { systemState } from '#lib/stores/system.svelte.ts';
	import SmoothScroll from '#lib/components/SmoothScroll.svelte';
	import SystemBootPreloader from '#lib/components/SystemBootPreloader.svelte';
	import CustomCursor from '#lib/components/CustomCursor.svelte';
	import TopBar from '#lib/components/TopBar.svelte';
	import DispatchModal from '#lib/components/DispatchModal.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	$effect(() => {
		if (!browser) return;
		systemState.initTheme();
		gsap.registerPlugin(ScrollTrigger);

		let cancelled = false;
		document.fonts?.ready.then(() => {
			if (!cancelled) {
				ScrollTrigger.refresh();
			}
		});

		return () => {
			cancelled = true;
			ScrollTrigger.getAll().forEach((st) => st.kill());
		};
	});

	beforeNavigate(() => {
		if (!browser) return;
		systemState.resetCursor();
		ScrollTrigger.getAll().forEach((st) => st.kill());
	});

	afterNavigate(() => {
		if (!browser) return;
		window.requestAnimationFrame(() => {
			ScrollTrigger.refresh();
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SystemBootPreloader />
<CustomCursor />

<SmoothScroll>
	<!-- Persistent Swiss Architectural Guide Rails -->
	<div
		aria-hidden="true"
		class="pointer-events-none fixed inset-0 z-0 hidden grid-cols-4 lg:grid"
	>
		<div class="border-r border-[var(--grid-rail)]"></div>
		<div class="border-r border-[var(--grid-rail)]"></div>
		<div class="border-r border-[var(--grid-rail)]"></div>
		<div></div>
	</div>

	<TopBar />

	<main class="relative z-10 min-h-screen">
		{@render children()}
	</main>

	<DispatchModal />
</SmoothScroll>
