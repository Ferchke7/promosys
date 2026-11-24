<script lang="ts">
	import { browser } from '$app/env';
	import gsap from 'gsap';
	import { systemState } from '#lib/stores/system.svelte.ts';
	import { cursorHover } from '#lib/actions/cursorHover.ts';

	let bgCanvas = $state<HTMLCanvasElement | null>(null);
	let artCanvas = $state<HTMLCanvasElement | null>(null);

	let wordmarkEl = $state<HTMLDivElement | null>(null);
	let headline1El = $state<HTMLSpanElement | null>(null);
	let headline2El = $state<HTMLSpanElement | null>(null);
	let headline3El = $state<HTMLSpanElement | null>(null);
	let subcopyEl = $state<HTMLDivElement | null>(null);
	let calloutsEl = $state<HTMLDivElement | null>(null);

	let utcClock = $state('16:15:00 UTC');
	let hasAnimated = false;

	// Live UTC ticker
	$effect(() => {
		if (!browser) return;
		const tick = () => {
			utcClock = `${new Date().toISOString().slice(11, 19)} UTC`;
		};
		tick();
		const id = window.setInterval(tick, 1000);
		return () => window.clearInterval(id);
	});

	// 1. Living SLG-inspired PixelField background canvas
	$effect(() => {
		if (!browser || !bgCanvas) return;
		const ctx = bgCanvas.getContext('2d');
		if (!ctx) return;

		const cols = 26;
		const rows = 15;
		bgCanvas.width = cols;
		bgCanvas.height = rows;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const phases = Array.from({ length: cols * rows }, () => Math.random() * Math.PI * 2);
		const speeds = Array.from({ length: cols * rows }, () => 0.35 + Math.random() * 0.7);

		let rafId = 0;

		const draw = (time: number) => {
			const isDark = systemState.theme === 'dark';
			const t = time * 0.0009;
			ctx.clearRect(0, 0, cols, rows);

			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const idx = y * cols + x;
					const wave = Math.sin(t * speeds[idx] + phases[idx] + x * 0.25 + y * 0.3);
					const intensity = Math.max(0, wave - 0.35) / 0.65;

					if (intensity > 0.02) {
						if (isDark) {
							ctx.fillStyle = `rgba(255, 59, 0, ${(intensity * 0.14).toFixed(3)})`;
						} else {
							ctx.fillStyle = `rgba(255, 59, 0, ${(intensity * 0.09).toFixed(3)})`;
						}
						ctx.fillRect(x, y, 1, 1);
					}
				}
			}

			if (!prefersReducedMotion) {
				rafId = window.requestAnimationFrame(draw);
			}
		};

		rafId = window.requestAnimationFrame(draw);
		return () => window.cancelAnimationFrame(rafId);
	});

	// 2. Procedural 1-bit Bayer-Dithered 3D Rotating CNC Turbine Rotor canvas (homage to SLG's dithered moth!)
	$effect(() => {
		if (!browser || !artCanvas) return;
		const ctx = artCanvas.getContext('2d');
		if (!ctx) return;

		const size = 168;
		artCanvas.width = size;
		artCanvas.height = size;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const bayer4 = [
			[0, 8, 2, 10],
			[12, 4, 14, 6],
			[3, 11, 1, 9],
			[15, 7, 13, 5]
		];

		let targetTiltX = 0;
		let targetTiltY = 0;
		let tiltX = 0;
		let tiltY = 0;

		const onMove = (e: PointerEvent) => {
			targetTiltX = (e.clientX / window.innerWidth - 0.5) * 0.55;
			targetTiltY = (e.clientY / window.innerHeight - 0.5) * 0.55;
		};
		window.addEventListener('pointermove', onMove, { passive: true });

		let rafId = 0;
		const imgData = ctx.createImageData(size, size);

		const render = (time: number) => {
			const isDark = systemState.theme === 'dark';
			const t = prefersReducedMotion ? 0.6 : time * 0.00055;
			tiltX += (targetTiltX - tiltX) * 0.06;
			tiltY += (targetTiltY - tiltY) * 0.06;

			const data = imgData.data;
			const cx = size * 0.5 + tiltX * 12;
			const cy = size * 0.5 + tiltY * 12;

			// Ink colors for 1-bit dither
			const inkR = isDark ? 244 : 17;
			const inkG = isDark ? 242 : 17;
			const inkB = isDark ? 236 : 17;

			for (let py = 0; py < size; py++) {
				for (let px = 0; px < size; px++) {
					const dx = (px - cx) / (size * 0.44);
					const dy = (py - cy) / (size * 0.44);
					const r = Math.sqrt(dx * dx + dy * dy);
					const angle = Math.atan2(dy, dx);

					// Sculpted industrial CNC turbine / gear rotor with 10 milled blades + inner hub + outer precision ring
					let lum = 0;
					let isAccent = false;

					if (r < 0.98) {
						// Outer machined ring with notches
						const outerRing =
							r > 0.78 && r < 0.94 ? 0.62 + 0.35 * Math.cos(angle * 12 + t * 1.4) : 0;

						// Swept turbine blades (rotating smoothly)
						const bladeWave = Math.sin(angle * 7 - r * 3.8 + t * 2.2);
						const blades =
							r >= 0.25 && r <= 0.8
								? Math.max(0, bladeWave) * (0.88 - Math.abs(r - 0.52) * 0.9)
								: 0;

						// Radial machined ribs
						const ribs =
							r > 0.22 && r < 0.78 ? Math.max(0, Math.cos(angle * 14 + t * 2.2) - 0.78) * 3.2 : 0;

						// Central spindle hub with lighting gradient
						const lightDir = (dx * -0.6 + dy * -0.75 + 0.85) * 0.55;
						const hub = r < 0.27 ? 0.95 - r * 1.4 + lightDir * 0.35 : 0;

						// Glowing orange thermal core ring
						if (r > 0.12 && r < 0.19) {
							isAccent = true;
							lum = 0.95;
						} else if (r > 0.86 && r < 0.91 && Math.sin(angle * 4 - t * 3) > 0.72) {
							isAccent = true;
							lum = 0.9;
						} else {
							lum = Math.min(1, Math.max(outerRing, blades, ribs, hub) * (0.72 + lightDir * 0.45));
						}
					}

					// Precision diagonal calibration pin (homage to Grace Hopper's pin!)
					const pinDist = Math.abs((px - (cx + 16)) * 0.7 - (py - (cy - 18)) * 0.7);
					const onPinShaft = pinDist < 1.15 && px > cx + 4 && px < cx + 56 && py < cy - 4;

					const threshold = (bayer4[py & 3][px & 3] + 0.5) / 16;
					const offset = (py * size + px) * 4;

					if (onPinShaft) {
						data[offset] = 245;
						data[offset + 1] = 158;
						data[offset + 2] = 11;
						data[offset + 3] = 255;
					} else if (lum > threshold && lum > 0.08) {
						if (isAccent) {
							data[offset] = 255;
							data[offset + 1] = 59;
							data[offset + 2] = 0;
							data[offset + 3] = 255;
						} else {
							data[offset] = inkR;
							data[offset + 1] = inkG;
							data[offset + 2] = inkB;
							data[offset + 3] = 255;
						}
					} else {
						data[offset + 3] = 0;
					}
				}
			}

			ctx.putImageData(imgData, 0, 0);

			// Pin head (amber-gold industrial rivet)
			ctx.fillStyle = '#F59E0B';
			ctx.fillRect(Math.round(cx + 52), Math.round(cy - 56), 7, 7);
			ctx.fillStyle = '#FF3B00';
			ctx.fillRect(Math.round(cx + 54), Math.round(cy - 54), 3, 3);

			if (!prefersReducedMotion) {
				rafId = window.requestAnimationFrame(render);
			}
		};

		rafId = window.requestAnimationFrame(render);
		return () => {
			window.cancelAnimationFrame(rafId);
			window.removeEventListener('pointermove', onMove);
		};
	});

	// Pre-boot hidden state
	$effect(() => {
		if (!browser || hasAnimated) return;
		const lines = [wordmarkEl, headline1El, headline2El, headline3El].filter(Boolean);
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) return;

		if (!systemState.booted) {
			gsap.set(lines, { yPercent: 108 });
			if (subcopyEl) gsap.set(subcopyEl, { opacity: 0, y: 18 });
			if (calloutsEl) gsap.set(calloutsEl, { opacity: 0, x: 16 });
		}
	});

	// Kinetic entrance immediately after preloader lifts
	$effect(() => {
		if (!browser || !systemState.booted || hasAnimated) return;
		hasAnimated = true;

		const lines = [wordmarkEl, headline1El, headline2El, headline3El].filter(Boolean);
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			gsap.set(lines, { yPercent: 0 });
			if (subcopyEl) gsap.set(subcopyEl, { opacity: 1, y: 0 });
			if (calloutsEl) gsap.set(calloutsEl, { opacity: 1, x: 0 });
			return;
		}

		const tl = gsap.timeline({ delay: 0.08 });

		tl.to(lines, {
			yPercent: 0,
			duration: 1.0,
			stagger: 0.06,
			ease: 'power4.out',
			clearProps: 'willChange'
		});

		if (subcopyEl) {
			tl.to(subcopyEl, { opacity: 1, y: 0, duration: 0.72, ease: 'power3.out' }, 0.32);
		}
		if (calloutsEl) {
			tl.to(calloutsEl, { opacity: 1, x: 0, duration: 0.72, ease: 'power3.out' }, 0.36);
		}

		return () => tl.kill();
	});
</script>

<section
	id="hero"
	class="relative flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-[var(--border-hairline)] pt-14"
>
	<!-- Living PixelField Canvas Backdrop -->
	<canvas
		bind:this={bgCanvas}
		aria-hidden="true"
		class="pointer-events-none absolute inset-0 h-full w-full opacity-95"
		style="image-rendering: pixelated;"
	></canvas>

	<!-- Subtle Vignette for effortless text contrast -->
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-0"
		style="background: radial-gradient(circle at 72% 45%, transparent 15%, var(--bg-primary) 78%);"
	></div>

	<!-- Top Technical Telemetry Strip -->
	<div
		class="font-mono-tech relative z-10 grid grid-cols-1 border-b border-[var(--border-hairline)] text-[10px] tracking-[0.12em] uppercase md:grid-cols-12 md:text-[11px]"
	>
		<div
			class="flex items-center gap-2.5 border-b border-[var(--border-hairline)] px-4 py-3 md:col-span-5 md:border-r md:border-b-0 lg:px-8"
		>
			<span class="signal-pulse inline-block h-2 w-2 shrink-0 bg-[var(--accent)]"></span>
			<span class="font-semibold">
				SYSTEM STATUS: NOMINAL <span class="text-[var(--accent)]">//</span> OEE 94.8%
			</span>
		</div>
		<div
			class="flex items-center justify-between border-b border-[var(--border-hairline)] px-4 py-3 text-[var(--text-secondary)] md:col-span-4 md:border-r md:border-b-0 lg:px-6"
		>
			<span>СМЕНА №2 · {utcClock}</span>
			<span class="text-[var(--accent)]">ТАКТ 18.4 С</span>
		</div>
		<div class="flex items-center justify-between px-4 py-3 text-[var(--text-secondary)] md:col-span-3 lg:px-8">
			<span>41.2995° N / 69.2401° E</span>
			<span class="font-semibold text-[var(--text-primary)]">ТАШКЕНТ · ЦЕХ A-04</span>
		</div>
	</div>

	<!-- Main Asymmetric Hero Canvas (Left: Editorial Punch | Right: Living 1-Bit Rotor + Leader Callouts) -->
	<div class="relative z-10 mx-auto grid w-full max-w-[1680px] flex-1 grid-cols-1 items-center gap-8 px-4 py-10 lg:grid-cols-12 lg:px-8 lg:py-12">
		<!-- Left Column -->
		<div class="lg:col-span-7">
			<!-- Stepped Pixel Wordmark with Hard Offset Shadow -->
			<div class="overflow-hidden pb-3">
				<div
					bind:this={wordmarkEl}
					class="font-pixel pixel-wordmark-shadow inline-flex items-baseline gap-4 font-bold tracking-[-0.02em] text-[var(--text-primary)] uppercase select-none will-change-transform"
					style="font-size: clamp(3.6rem, 8.8vw, 8.8rem); line-height: 0.88;"
				>
					<span>PROMSYS</span>
					<span
						class="font-mono-tech border border-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-bold tracking-[0.14em] text-[var(--accent)] [text-shadow:none] sm:text-sm"
					>
						MES, WMS &amp; APS
					</span>
				</div>
			</div>

			<!-- Crystal-Clear Monumental Russian H1 -->
			<h1
				class="mt-6 font-bold tracking-[-0.035em] uppercase"
				style="font-size: clamp(2.1rem, 4.4vw, 4.35rem); line-height: 0.98;"
			>
				<span class="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
					<span bind:this={headline1El} class="block will-change-transform">
						УМНОЕ УПРАВЛЕНИЕ
					</span>
				</span>
				<span class="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
					<span bind:this={headline2El} class="block will-change-transform">
						ЗАВОДОМ И <span class="text-[var(--accent)]">ТОЧНЫЙ</span>
					</span>
				</span>
				<span class="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
					<span bind:this={headline3El} class="block will-change-transform">
						ГРАФИК СТАНКОВ
					</span>
				</span>
			</h1>

			<!-- Ultra-Clear 2-Line Value Prop + Signature Stepped CTAs -->
			<div bind:this={subcopyEl} class="mt-6 max-w-2xl">
				<p class="font-mono-tech text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
					Алгоритм сам раскладывает заказы по реальным станкам за <strong class="text-[var(--text-primary)]">140 мс</strong>,
					собирает сигналы напрямую с ПЛК и исключает простои — без Excel и бумажных сводок.
				</p>

				<div class="mt-8 flex flex-wrap items-center gap-6">
					<button
						type="button"
						onclick={() => systemState.openDispatchModal()}
						use:cursorHover={{ label: '[ ЗАПУСТИТЬ ]', variant: 'schedule' }}
						class="btn-stepped font-mono-tech inline-flex items-center gap-3 bg-[var(--bg-inverted)] px-7 py-4 text-sm font-bold tracking-[0.04em] text-[var(--text-inverted)] transition-colors hover:bg-[var(--accent)] hover:text-[#F4F2EC]"
					>
						<span>Запустить пилот</span>
						<span aria-hidden="true">↗</span>
					</button>

					<button
						type="button"
						onclick={() => systemState.scrollToTarget('#now', -56)}
						use:cursorHover={{ label: '[ СМОТРЕТЬ ]', variant: 'inspect' }}
						class="font-mono-tech border-b-2 border-[var(--accent)] pb-1 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
					>
						Как это работает ↓
					</button>
				</div>
			</div>
		</div>

		<!-- Right Column: Interactive 1-Bit Dithered CNC Rotor + Leader-Line Telemetry Callouts -->
		<div
			bind:this={calloutsEl}
			class="relative flex min-h-[300px] items-center justify-center sm:min-h-[380px] lg:col-span-5"
		>
			<div class="relative flex items-center justify-center">
				<!-- Centerpiece Dithered Canvas -->
				<canvas
					bind:this={artCanvas}
					aria-label="Живая 1-битная визуализация шпинделя ЧПУ"
					class="h-[240px] w-[240px] sm:h-[310px] sm:w-[310px] lg:h-[340px] lg:w-[340px]"
					style="image-rendering: pixelated;"
				></canvas>

				<!-- Callout 1: Top Left with Leader Line -->
				<div
					class="font-mono-tech absolute -top-2 -left-2 flex items-center gap-2 sm:-left-12 sm:top-4"
				>
					<span
						class="bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] text-[#F4F2EC] uppercase sm:text-xs"
					>
						94.8% OEE
					</span>
					<span class="hidden h-px w-10 bg-[var(--accent)] sm:inline-block"></span>
				</div>

				<!-- Callout 2: Middle Right with Leader Line -->
				<div
					class="font-mono-tech absolute -right-2 top-1/2 flex -translate-y-1/2 items-center gap-2 sm:-right-8"
				>
					<span class="hidden h-px w-10 bg-[var(--accent)] sm:inline-block"></span>
					<span
						class="border border-[var(--accent)] bg-[var(--bg-primary)]/95 px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] text-[var(--text-primary)] uppercase sm:text-xs"
					>
						142 СТАНКА
					</span>
				</div>

				<!-- Callout 3: Bottom Left with Leader Line -->
				<div
					class="font-mono-tech absolute -bottom-2 left-0 flex items-center gap-2 sm:-left-8 sm:bottom-6"
				>
					<span
						class="border border-[var(--border-strong)] bg-[var(--bg-primary)]/95 px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] text-[var(--text-primary)] uppercase sm:text-xs"
					>
						ПЛАН: <span class="text-[var(--accent)]">118 МС</span>
					</span>
					<span class="hidden h-px w-12 bg-[var(--border-strong)] sm:inline-block"></span>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom Hairline Bar (SLG-style clean anchor) -->
	<div
		class="font-mono-tech relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] px-4 py-3.5 text-[11px] tracking-[0.12em] uppercase lg:px-8"
	>
		<div class="flex flex-wrap items-center gap-4 text-[var(--text-muted)]">
			<span>ON-PREMISE · ISA-95</span>
			<span class="text-[var(--accent)]">·</span>
			<span>OPC-UA / MQTT / KAFKA</span>
			<span class="hidden text-[var(--accent)] sm:inline">·</span>
			<span class="hidden sm:inline">БЕЗ ОСТАНОВКИ ЦЕХА</span>
		</div>

		<button
			type="button"
			onclick={() => systemState.scrollToTarget('#statement', -56)}
			use:cursorHover={{ label: '[ ЛИСТАЙ ]', variant: 'action' }}
			class="flex items-center gap-2 font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]"
		>
			<span>ЛИСТАЙ</span>
			<span class="text-[var(--accent)]">↓</span>
		</button>
	</div>
</section>
