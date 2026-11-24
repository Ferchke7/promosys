<script lang="ts">
	import { browser } from '$app/env';
	import gsap from 'gsap';
	import { BOOT_SEQUENCE } from '#lib/data/platformData.ts';
	import { systemState } from '#lib/stores/system.svelte.ts';

	let overlayEl = $state<HTMLDivElement | null>(null);
	let barEl = $state<HTMLDivElement | null>(null);
	let counterText = $state('000');
	let visibleLogCount = $state(0);
	let dismissed = $state(false);
	let activeTl: gsap.core.Timeline | null = null;

	function finishImmediately(): void {
		if (dismissed) return;
		activeTl?.kill();
		systemState.markBooted();
		if (overlayEl) {
			gsap.to(overlayEl, {
				yPercent: -100,
				duration: 0.5,
				ease: 'power4.inOut',
				onComplete: () => {
					dismissed = true;
					systemState.markPreloaderDone();
				}
			});
		} else {
			dismissed = true;
			systemState.markPreloaderDone();
		}
	}

	$effect(() => {
		if (!browser || dismissed || !overlayEl) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			counterText = '100';
			visibleLogCount = BOOT_SEQUENCE.length;
			dismissed = true;
			systemState.markPreloaderDone();
			return;
		}

		const progressObj = { value: 0 };
		const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
		activeTl = tl;

		tl.to(progressObj, {
			value: 100,
			duration: 1.45,
			ease: 'power2.inOut',
			onUpdate: () => {
				const v = Math.round(progressObj.value);
				counterText = String(v).padStart(3, '0');
				const stepCount = Math.min(
					BOOT_SEQUENCE.length,
					Math.floor((progressObj.value / 100) * (BOOT_SEQUENCE.length + 0.55))
				);
				if (stepCount !== visibleLogCount) {
					visibleLogCount = stepCount;
				}
				if (barEl) {
					gsap.set(barEl, { scaleX: progressObj.value / 100 });
				}
			}
		});

		tl.to({}, { duration: 0.18 });

		tl.add(() => {
			systemState.markBooted();
		});

		tl.to(overlayEl, {
			yPercent: -100,
			duration: 0.85,
			ease: 'power4.inOut',
			onComplete: () => {
				dismissed = true;
				systemState.markPreloaderDone();
			}
		});

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') finishImmediately();
		};
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('keydown', onKeyDown);
			tl.kill();
		};
	});
</script>

{#if !dismissed}
	<div
		bind:this={overlayEl}
		role="status"
		aria-live="polite"
		aria-label="Запуск диспетчерского ядра PROMSYS OS"
		class="crt-scanlines fixed inset-0 z-[120] flex flex-col justify-between bg-[#070709] text-[#F4F2EC] will-change-transform select-none"
	>
		<!-- Top Boot Bar -->
		<div
			class="font-mono-tech flex items-center justify-between border-b border-[rgba(244,242,236,0.14)] px-4 py-3.5 text-[11px] tracking-[0.12em] uppercase md:px-8"
		>
			<div class="flex items-center gap-2.5">
				<span class="signal-pulse inline-block h-2 w-2 bg-[#FF3B00]"></span>
				<span class="font-pixel text-base font-bold tracking-[0.04em]">PROMSYS // KERNEL</span>
			</div>
			<button
				type="button"
				onclick={finishImmediately}
				class="border border-[rgba(244,242,236,0.24)] px-3 py-1 text-[10px] tracking-[0.12em] text-[rgba(244,242,236,0.75)] transition-colors hover:border-[#FF3B00] hover:bg-[#FF3B00] hover:text-[#F4F2EC]"
			>
				[ ПРОПУСТИТЬ · ESC ]
			</button>
		</div>

		<!-- Middle PLC Init Stream + Giant Pixel Counter -->
		<div class="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 items-end px-4 py-10 md:grid-cols-12 md:px-8">
			<div class="md:col-span-7 md:pr-8">
				<div class="font-mono-tech mb-4 text-[11px] tracking-[0.14em] text-[rgba(244,242,236,0.48)] uppercase">
					// ИНИЦИАЛИЗАЦИЯ ДИСПЕТЧЕРСКОГО ЯДРА И ОПРОС ПЛК
				</div>
				<div class="border border-[rgba(244,242,236,0.14)] bg-[rgba(255,255,255,0.02)]">
					{#each BOOT_SEQUENCE as entry, idx (entry.id)}
						<div
							class="font-mono-tech flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(244,242,236,0.1)] px-4 py-3 text-xs last:border-b-0 transition-opacity duration-200"
							class:opacity-100={idx < visibleLogCount}
							class:opacity-20={idx >= visibleLogCount}
						>
							<div class="flex items-center gap-3">
								<span
									class="font-bold"
									class:text-[#FF3B00]={idx < visibleLogCount}
									class:text-[rgba(244,242,236,0.35)]={idx >= visibleLogCount}
								>
									{idx < visibleLogCount ? entry.tag : '[..]'}
								</span>
								<span class="font-bold text-[#F4F2EC]">{entry.module}</span>
							</div>
							<div class="flex items-center gap-4 text-[rgba(244,242,236,0.62)]">
								<span class="hidden sm:inline">{entry.detail}</span>
								<span class="text-[#FF3B00] font-semibold">{entry.latency}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="mt-8 flex flex-col items-start justify-end md:col-span-5 md:mt-0 md:items-end">
				<div class="font-mono-tech mb-2 text-[11px] tracking-[0.14em] text-[rgba(244,242,236,0.5)] uppercase">
					СИНХРОНИЗАЦИЯ ЦЕХОВ
				</div>
				<div class="flex items-baseline gap-2 leading-none">
					<span
						class="font-pixel pixel-wordmark-shadow font-bold text-[#F4F2EC]"
						style="font-size: clamp(4.8rem, 13vw, 10.5rem); line-height: 0.85;"
					>
						{counterText}
					</span>
					<span class="font-pixel text-2xl font-bold text-[#FF3B00] md:text-4xl">%</span>
				</div>
			</div>
		</div>

		<!-- Bottom Signal Progress Bar -->
		<div class="border-t border-[rgba(244,242,236,0.14)]">
			<div class="relative h-[3px] w-full bg-[rgba(244,242,236,0.1)]">
				<div
					bind:this={barEl}
					class="h-full w-full origin-left bg-[#FF3B00] will-change-transform"
					style="transform: scaleX(0);"
				></div>
			</div>
			<div
				class="font-mono-tech flex items-center justify-between px-4 py-3 text-[10px] tracking-[0.14em] text-[rgba(244,242,236,0.45)] uppercase md:px-8"
			>
				<span>PROMSYS // MES, WMS &amp; APS</span>
				<span>ZERO DOWNTIME ARCHITECTURE</span>
			</div>
		</div>
	</div>
{/if}
