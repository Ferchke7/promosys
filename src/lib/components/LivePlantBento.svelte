<script lang="ts">
	import { browser } from '$app/env';
	import { DEPARTMENT_LOADS, LIVE_HOURLY_OUTPUT } from '#lib/data/platformData.ts';
	import { textReveal } from '#lib/actions/textReveal.ts';
	import { cursorHover } from '#lib/actions/cursorHover.ts';

	let hoveredHour = $state(
		LIVE_HOURLY_OUTPUT.find((h) => h.current) ?? LIVE_HOURLY_OUTPUT[16]
	);
	let secondsAgo = $state(2);
	let scanWave = $state(0);

	// 18x8 = 144 cells -> 142 online machines + 2 in changeover
	const DOT_COLS = 18;
	const DOT_ROWS = 8;
	const dots = Array.from({ length: DOT_COLS * DOT_ROWS }, (_, i) => ({
		idx: i,
		col: i % DOT_COLS,
		row: Math.floor(i / DOT_COLS),
		offline: i === 41 || i === 117
	}));

	$effect(() => {
		if (!browser) return;
		const tick = window.setInterval(() => {
			secondsAgo = secondsAgo >= 12 ? 1 : secondsAgo + 1;
			scanWave = (scanWave + 1) % (DOT_COLS + DOT_ROWS);
		}, 1000);
		return () => window.clearInterval(tick);
	});

	const maxParts = Math.max(...LIVE_HOURLY_OUTPUT.map((h) => h.parts));
</script>

<section id="now" class="relative border-b border-[var(--border-hairline)] py-16 lg:py-24">
	<div class="mx-auto max-w-[1680px] px-4 lg:px-8">
		<!-- SLG-style Section Header: Giant Pixel Title Left + Live Timestamp Right -->
		<div class="mb-10 flex flex-wrap items-end justify-between gap-4">
			<div>
				<div class="font-mono-tech mb-2 text-[11px] tracking-[0.14em] text-[var(--accent)] uppercase">
					[ 01 // ЖИВАЯ ТЕЛЕМЕТРИЯ ЗАВОДА ]
				</div>
				<h2
					use:textReveal={{ mode: 'scroll', stagger: 0.06 }}
					class="font-industrial text-4xl font-extrabold tracking-[-0.01em] uppercase sm:text-6xl"
				>
					СЕЙЧАС В ЦЕХУ
				</h2>
			</div>

			<div class="font-mono-tech flex items-center gap-2.5 text-xs tracking-[0.1em] text-[var(--text-muted)] uppercase">
				<span class="signal-pulse inline-block h-2 w-2 bg-[var(--accent)]"></span>
				<span>ОБНОВЛЕНО {secondsAgo} С НАЗАД · ПОТОК OPC-UA</span>
			</div>
		</div>

		<!-- Asymmetric 2x2 High-Contrast Bento Grid (Direct homage to SLG #now) -->
		<div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
			<!-- CARD 1: Giant Glowing OEE Breakdown (Dark CRT Card) -->
			<div
				class="crt-scanlines flex flex-col justify-between border border-[var(--border-hairline)] bg-[var(--bg-card)] p-6 sm:p-8 lg:col-span-5"
			>
				<div>
					<div class="font-mono-tech text-[11px] tracking-[0.14em] text-[var(--text-muted)] uppercase">
						ТЕКУЩИЙ OEE ЗАВОДА
					</div>
					<div
						class="font-pixel mt-3 font-bold tracking-[-0.02em] text-[var(--text-primary)]"
						style="font-size: clamp(3.6rem, 6.5vw, 5.6rem); line-height: 0.92; text-shadow: 0 0 28px rgba(255, 59, 0, 0.24);"
					>
						94.8<span class="text-[var(--accent)]">%</span>
					</div>
					<p class="mt-3 text-sm text-[var(--text-secondary)]">
						Общая эффективность оборудования по 6 производственным участкам в реальном времени.
					</p>
				</div>

				<div class="mt-8 space-y-3.5">
					{#each [
						{ label: 'Доступность станков', value: '97.1%', pct: 97.1 },
						{ label: 'Темп и производительность', value: '98.2%', pct: 98.2 },
						{ label: 'Выход годного без брака', value: '99.4%', pct: 99.4 }
					] as metric (metric.label)}
						<div>
							<div class="font-mono-tech mb-1.5 flex items-center justify-between text-xs">
								<span class="text-[var(--text-secondary)]">{metric.label}</span>
								<span class="font-bold text-[var(--text-primary)]">{metric.value}</span>
							</div>
							<div class="h-1.5 w-full bg-[var(--border-hairline)]">
								<div class="h-full bg-[var(--accent)]" style="width: {metric.pct}%;"></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- CARD 2: Interactive 24-Hour Shift Output Histogram -->
			<div
				class="flex flex-col justify-between border border-[var(--border-hairline)] bg-[var(--bg-card)] p-6 sm:p-8 lg:col-span-7"
			>
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div>
						<div class="font-mono-tech text-[11px] tracking-[0.14em] text-[var(--text-muted)] uppercase">
							ВЫПУСК ДЕТАЛЕЙ ЗА 24 ЧАСА
						</div>
						<p class="mt-1 text-sm text-[var(--text-secondary)]">
							Наведите на любой час, чтобы увидеть фактическую выработку смены.
						</p>
					</div>

					<div class="font-mono-tech border border-[var(--border-strong)] bg-[var(--bg-primary)] px-3.5 py-2 text-right">
						<div class="text-[10px] text-[var(--text-muted)] uppercase">
							{hoveredHour.hour}:00 — {String((Number(hoveredHour.hour) + 1) % 24).padStart(2, '0')}:00
							{#if hoveredHour.current}
								<span class="text-[var(--accent)]"> · СЕЙЧАС</span>
							{/if}
						</div>
						<div class="text-lg font-bold text-[var(--text-primary)]">
							{hoveredHour.parts} <span class="text-xs font-normal text-[var(--text-secondary)]">дет./час</span>
						</div>
					</div>
				</div>

				<!-- 24 Vertical Bars -->
				<div class="mt-8 flex h-44 items-end gap-1 sm:gap-1.5">
					{#each LIVE_HOURLY_OUTPUT as bar (bar.hour)}
						{@const isSelected = hoveredHour.hour === bar.hour}
						{@const heightPct = Math.round((bar.parts / maxParts) * 100)}
						<button
							type="button"
							onmouseenter={() => (hoveredHour = bar)}
							onclick={() => (hoveredHour = bar)}
							aria-label={`Час ${bar.hour}:00 — ${bar.parts} деталей`}
							use:cursorHover={{ label: `[ ${bar.parts} ДЕТ ]`, variant: 'inspect' }}
							class="group flex h-full flex-1 flex-col items-center justify-end gap-2"
						>
							<div
								class={`w-full transition-all duration-200 ${
									bar.current
										? 'bg-[var(--bg-inverted)]'
										: isSelected
											? 'bg-[#F59E0B]'
											: 'bg-[var(--accent)]/85 group-hover:bg-[var(--accent)]'
								}`}
								style="height: {heightPct}%;"
							></div>
						</button>
					{/each}
				</div>

				<div class="font-mono-tech mt-3 flex justify-between text-[10px] text-[var(--text-muted)]">
					<span>00:00</span>
					<span>06:00</span>
					<span>12:00</span>
					<span class="font-bold text-[var(--text-primary)]">16:00 (ТЕКУЩИЙ ЧАС)</span>
					<span>23:00</span>
				</div>
			</div>

			<!-- CARD 3: Blazing Signal-Orange Dot-Matrix Card (142 Machines Online) -->
			<div
				class="flex flex-col justify-between border border-[#FF3B00] bg-[#FF3B00] p-6 text-[#F4F2EC] sm:p-8 lg:col-span-7"
			>
				<div class="flex flex-wrap items-baseline justify-between gap-2">
					<div>
						<div class="font-mono-tech text-[11px] font-semibold tracking-[0.14em] text-[#F4F2EC]/80 uppercase">
							ПОДКЛЮЧЁННЫЙ ПАРК ОБОРУДОВАНИЯ
						</div>
						<div class="font-industrial mt-1 text-3xl font-extrabold tracking-[0.01em] sm:text-5xl">
							142 СТАНКА В СЕТИ
						</div>
					</div>
					<div class="font-mono-tech text-xs text-[#F4F2EC]/85">
						○ 142 в работе · ● 2 на переналадке
					</div>
				</div>

				<!-- 18x8 Animated Dot Matrix Wave -->
				<div
					class="mt-6 grid gap-2 sm:gap-2.5"
					style="grid-template-columns: repeat(18, minmax(0, 1fr));"
					aria-hidden="true"
				>
					{#each dots as dot (dot.idx)}
						{@const onWave = Math.abs(dot.col + dot.row - scanWave) <= 1}
						<div class="flex items-center justify-center">
							{#if dot.offline}
								<span class="block h-2.5 w-2.5 rounded-full bg-[#0D0E10]/55"></span>
							{:else}
								<span
									class={`block h-2.5 w-2.5 rounded-full border-[1.5px] transition-all duration-300 ${
										onWave
											? 'scale-125 border-[#F4F2EC] bg-[#F4F2EC]'
											: 'border-[#F4F2EC]/85 bg-transparent'
									}`}
								></span>
							{/if}
						</div>
					{/each}
				</div>

				<div class="font-mono-tech mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-[#F4F2EC]/25 pt-4 text-[11px] uppercase">
					<span>ПРОТОКОЛЫ: OPC-UA · FANUC FOCAS · MODBUS TCP</span>
					<span class="font-bold">ПОТЕРЯ ПАКЕТОВ: 0.00%</span>
				</div>
			</div>

			<!-- CARD 4: High-Contrast Cream Paper Card (Department Utilization — SLG Contrast Break!) -->
			<div
				class="flex flex-col justify-between border border-[var(--border-strong)] bg-[#F4F2EC] p-6 text-[#111111] sm:p-8 lg:col-span-5"
			>
				<div>
					<div class="font-mono-tech text-[11px] font-semibold tracking-[0.14em] text-[#111111]/55 uppercase">
						ЗАГРУЗКА ПО УЧАСТКАМ
					</div>
					<div class="font-industrial mt-1 text-3xl font-extrabold uppercase sm:text-4xl">
						ГДЕ УЗКИЕ МЕСТА
					</div>
				</div>

				<div class="mt-6 space-y-3.5">
					{#each DEPARTMENT_LOADS as dept (dept.name)}
						<div>
							<div class="font-mono-tech mb-1 flex items-center justify-between text-xs">
								<span class="font-semibold text-[#111111]">{dept.name}</span>
								<span class="text-[#111111]/70">
									{dept.count} ст. · <strong class="text-[#FF3B00]">{dept.load}%</strong>
								</span>
							</div>
							<div class="h-2 w-full bg-[#111111]/12">
								<div
									class="h-full bg-[#FF3B00] transition-all duration-500"
									style="width: {dept.load}%;"
								></div>
							</div>
						</div>
					{/each}
				</div>

				<div class="font-mono-tech mt-6 border-t border-[#111111]/15 pt-3.5 text-[11px] text-[#111111]/65">
					APS автоматически выравнивает очереди, чтобы ни один участок не стоял пустым.
				</div>
			</div>
		</div>
	</div>
</section>
