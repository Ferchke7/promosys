<script lang="ts">
	import { browser } from '$app/env';
	import { systemState } from '#lib/stores/system.svelte.ts';
	import { cursorHover } from '#lib/actions/cursorHover.ts';

	let footerCanvas = $state<HTMLCanvasElement | null>(null);

	// Living industrial beacon + swarming CNC spark particles (homage to SLG's lightbulb & moths footer!)
	$effect(() => {
		if (!browser || !footerCanvas) return;
		const ctx = footerCanvas.getContext('2d');
		if (!ctx) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let width = 0;
		let height = 0;

		const resize = () => {
			if (!footerCanvas) return;
			const rect = footerCanvas.getBoundingClientRect();
			width = Math.max(320, Math.floor(rect.width));
			height = Math.max(360, Math.floor(rect.height));
			footerCanvas.width = width;
			footerCanvas.height = height;
		};

		resize();
		window.addEventListener('resize', resize, { passive: true });

		// Orbiting 1-bit pixel telemetry drones / industrial sparks drawn toward the glowing beacon
		const sparks = Array.from({ length: 24 }, (_, i) => ({
			angle: (i / 24) * Math.PI * 2 + Math.random(),
			radius: 36 + Math.random() * 145,
			speed: (0.4 + Math.random() * 0.9) * (i % 2 === 0 ? 1 : -1),
			size: Math.random() > 0.55 ? 5 : 3,
			wobble: Math.random() * Math.PI * 2
		}));

		let rafId = 0;

		const render = (time: number) => {
			const t = prefersReducedMotion ? 1.2 : time * 0.001;
			const isDark = systemState.theme === 'dark';

			ctx.clearRect(0, 0, width, height);

			// Subtle background dot-grid
			const step = 28;
			ctx.fillStyle = isDark ? 'rgba(255, 59, 0, 0.14)' : 'rgba(255, 59, 0, 0.16)';
			for (let y = 14; y < height; y += step) {
				for (let x = 14; x < width; x += step) {
					ctx.fillRect(x, y, 2, 2);
				}
			}

			// Suspended industrial signal beacon (top-right)
			const bx = width > 768 ? width * 0.78 : width * 0.8;
			const by = 112;

			// Ambient radial glow around beacon
			const glow = ctx.createRadialGradient(bx, by, 6, bx, by, 210);
			glow.addColorStop(0, 'rgba(255, 59, 0, 0.42)');
			glow.addColorStop(0.45, 'rgba(245, 158, 11, 0.14)');
			glow.addColorStop(1, 'rgba(255, 59, 0, 0)');
			ctx.fillStyle = glow;
			ctx.fillRect(bx - 220, 0, 440, 340);

			// Vertical cable from top edge to beacon
			ctx.fillStyle = isDark ? 'rgba(244, 242, 236, 0.45)' : 'rgba(17, 17, 17, 0.45)';
			ctx.fillRect(Math.round(bx) - 1, 0, 2, by - 22);

			// Stepped pixel industrial lamp housing + glowing filament
			ctx.fillStyle = isDark ? '#F4F2EC' : '#111111';
			ctx.fillRect(Math.round(bx) - 12, by - 24, 24, 10);
			ctx.fillStyle = '#FF3B00';
			ctx.fillRect(Math.round(bx) - 16, by - 14, 32, 26);
			ctx.fillStyle = '#FEF3C7';
			ctx.fillRect(Math.round(bx) - 8, by - 6, 16, 12);

			// Swarming stepped-pixel sparks/signals orbiting the beacon
			for (const s of sparks) {
				const a = s.angle + t * s.speed;
				const r = s.radius + Math.sin(t * 2.1 + s.wobble) * 16;
				const sx = Math.round(bx + Math.cos(a) * r * 1.18);
				const sy = Math.round(by + Math.sin(a) * r * 0.68);
				const flicker = Math.sin(t * 9 + s.wobble) > 0;

				ctx.fillStyle = flicker
					? '#FF3B00'
					: isDark
						? 'rgba(244, 242, 236, 0.85)'
						: 'rgba(17, 17, 17, 0.78)';
				ctx.fillRect(sx, sy, s.size, s.size);
				// Tiny wing pixels for kinetic trail
				ctx.fillRect(sx - s.size, sy - 2, 2, 2);
				ctx.fillRect(sx + s.size, sy + 2, 2, 2);
			}

			if (!prefersReducedMotion) {
				rafId = window.requestAnimationFrame(render);
			}
		};

		rafId = window.requestAnimationFrame(render);
		return () => {
			window.cancelAnimationFrame(rafId);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<footer id="footer" class="relative overflow-hidden bg-[var(--bg-deep)] pt-16 pb-10 lg:pt-24">
	<!-- Living Industrial Beacon & Sparks Canvas -->
	<canvas
		bind:this={footerCanvas}
		aria-hidden="true"
		class="pointer-events-none absolute inset-0 h-full w-full"
		style="image-rendering: pixelated;"
	></canvas>

	<div class="relative z-10 mx-auto flex min-h-[420px] max-w-[1680px] flex-col justify-between px-4 lg:px-8">
		<!-- Top Action Callout -->
		<div class="max-w-3xl">
			<div class="font-mono-tech text-xs tracking-[0.14em] text-[var(--accent)] uppercase">
				PROMSYS.OS // ON-PREMISE MES, WMS &amp; APS
			</div>

			<button
				type="button"
				onclick={() => systemState.openDispatchModal()}
				use:cursorHover={{ label: '[ ПИЛОТ ]', variant: 'schedule' }}
				class="font-industrial group mt-5 inline-flex items-baseline gap-4 text-left font-extrabold tracking-[-0.01em] text-[var(--text-primary)] uppercase transition-colors hover:text-[var(--accent)]"
				style="font-size: clamp(2.5rem, 6.4vw, 6.2rem); line-height: 0.94;"
			>
				<span>ЗАПУСТИТЬ ПИЛОТ</span>
				<span class="text-[var(--accent)] transition-transform duration-200 group-hover:translate-x-2 group-hover:-translate-y-2">
					↗
				</span>
			</button>

			<p class="font-mono-tech mt-5 max-w-xl text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
				Покажем живой расчёт расписания на реальных данных вашего цеха и оценим потенциал роста OEE за одну встречу.
			</p>

			<!-- Direct Contacts Row -->
			<div class="font-mono-tech mt-8 grid grid-cols-1 gap-4 border-t border-[var(--border-hairline)] pt-6 sm:grid-cols-3 text-xs">
				<div>
					<div class="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.12em]">Телефон</div>
					<a href="tel:+998771176696" class="mt-1 block font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]">
						+998 (77) 117-66-96
					</a>
				</div>
				<div>
					<div class="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.12em]">Telegram</div>
					<a href="https://t.me/promsys_uz" target="_blank" rel="noreferrer" class="mt-1 block font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]">
						@promsys_uz ↗
					</a>
				</div>
				<div>
					<div class="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.12em]">Email &amp; Локация</div>
					<a href="mailto:ferchke@yandex.ru" class="mt-1 block font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]">
						ferchke@yandex.ru
					</a>
					<div class="mt-0.5 text-[11px] text-[var(--text-secondary)]">г. Ташкент, Узбекистан</div>
				</div>
			</div>
		</div>

		<!-- Bottom Navigation & Controls Bar -->
		<div
			class="font-mono-tech mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-6 text-[11px] tracking-[0.12em] uppercase"
		>
			<div class="flex flex-wrap items-center gap-5 text-[var(--text-muted)]">
				<span class="font-bold text-[var(--text-primary)]">PROMSYS // OS © 2026</span>
				<button
					type="button"
					onclick={() => systemState.scrollToTarget('#now', -56)}
					class="hover:text-[var(--accent)]"
				>
					Сейчас
				</button>
				<button
					type="button"
					onclick={() => systemState.scrollToTarget('#modules', -56)}
					class="hover:text-[var(--accent)]"
				>
					Модули
				</button>
				<button
					type="button"
					onclick={() => systemState.scrollToTarget('#pipeline', -56)}
					class="hover:text-[var(--accent)]"
				>
					Конвейер
				</button>
				<button
					type="button"
					onclick={() => systemState.scrollToTarget('#faq', -56)}
					class="hover:text-[var(--accent)]"
				>
					FAQ
				</button>
			</div>

			<div class="flex items-center gap-3">
				<button
					type="button"
					onclick={() => systemState.toggleTheme()}
					use:cursorHover={{ label: '[ ИНВЕРСИЯ ]', variant: 'action' }}
					class="border border-[var(--border-hairline)] bg-[var(--bg-primary)]/90 px-3 py-2 text-[10px] font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)]"
				>
					ТЕМА: {systemState.theme === 'dark' ? 'ГРАФИТ' : 'СВЕТЛАЯ'}
				</button>

				<button
					type="button"
					onclick={() => systemState.scrollToTarget(0, 0)}
					use:cursorHover={{ label: '[ НАВЕРХ ]', variant: 'action' }}
					class="btn-stepped bg-[var(--bg-inverted)] px-4 py-2 text-[11px] font-bold text-[var(--text-inverted)] transition-colors hover:bg-[var(--accent)] hover:text-[#F4F2EC]"
				>
					Наверх ↑
				</button>
			</div>
		</div>
	</div>

	<!-- Giant Outlined Pixel Watermark Bleeding Off Bottom Edge (SLG signature!) -->
	<div
		aria-hidden="true"
		class="font-pixel pointer-events-none select-none overflow-hidden text-center font-bold tracking-[0.06em] uppercase opacity-[0.08]"
		style="font-size: clamp(7rem, 22vw, 21rem); line-height: 0.72; -webkit-text-stroke: 2px var(--text-primary); color: transparent; margin-bottom: -0.18em;"
	>
		PROMSYS
	</div>
</footer>
