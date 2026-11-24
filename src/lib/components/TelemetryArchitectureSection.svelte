<script lang="ts">
	import {
		FAQ_ITEMS,
		ONBOARDING_STEPS,
		REDACTED_PAIN_POINTS,
		SIMULATION_SCENARIOS
	} from '#lib/data/platformData.ts';
	import { systemState } from '#lib/stores/system.svelte.ts';
	import { textReveal } from '#lib/actions/textReveal.ts';
	import { cursorHover } from '#lib/actions/cursorHover.ts';

	let activeScenarioId = $state(SIMULATION_SCENARIOS[0].id);
	let hoveredRedaction = $state<number | null>(null);
	let pinnedRedactions = $state<Record<number, boolean>>({});
	let openFaqIdx = $state<string | null>('01');

	const activeScenario = $derived(
		SIMULATION_SCENARIOS.find((s) => s.id === activeScenarioId) ?? SIMULATION_SCENARIOS[0]
	);

	const activeRedactionInfo = $derived.by(() => {
		if (hoveredRedaction !== null) return REDACTED_PAIN_POINTS[hoveredRedaction];
		const pinnedIdx = Object.keys(pinnedRedactions).find((k) => pinnedRedactions[Number(k)]);
		return pinnedIdx !== undefined ? REDACTED_PAIN_POINTS[Number(pinnedIdx)] : null;
	});

	function toggleRedaction(idx: number): void {
		pinnedRedactions = { ...pinnedRedactions, [idx]: !pinnedRedactions[idx] };
	}

	function toggleFaq(idx: string): void {
		openFaqIdx = openFaqIdx === idx ? null : idx;
	}
</script>

<!-- 1. SLG-inspired Interactive Redacted Statement (ПРОИЗВОДСТВО БЕЗ ХАОСА) -->
<section class="relative border-b border-[var(--border-hairline)] bg-[var(--bg-deep)] py-16 lg:py-24">
	<div class="mx-auto max-w-[1680px] px-4 lg:px-8">
		<div class="font-mono-tech mb-4 text-[11px] tracking-[0.14em] text-[var(--accent)] uppercase">
			[ 04 // ПРИНЦИП РАБОТЫ · НАВЕДИТЕ НА ЗАЧЁРКНУТЫЕ БЛОКИ ]
		</div>

		<h2
			use:textReveal={{ mode: 'scroll', stagger: 0.06 }}
			class="font-industrial text-4xl font-extrabold tracking-[-0.01em] uppercase sm:text-6xl"
		>
			ПРОИЗВОДСТВО БЕЗ ХАОСА
		</h2>

		<p class="mt-8 max-w-5xl text-xl leading-[1.65] font-medium text-[var(--text-primary)] sm:text-3xl sm:leading-[1.6]">
			Завод работает на полную, когда в цеху больше нет
			{#each REDACTED_PAIN_POINTS as item, idx (item.hidden)}
				{@const isShown = hoveredRedaction === idx || (pinnedRedactions[idx] ?? false)}
				<button
					type="button"
					onmouseenter={() => (hoveredRedaction = idx)}
					onmouseleave={() => {
						if (hoveredRedaction === idx) hoveredRedaction = null;
					}}
					onclick={() => toggleRedaction(idx)}
					aria-pressed={pinnedRedactions[idx] ?? false}
					class={`font-mono-tech mx-1 inline-block px-2.5 py-0.5 align-baseline text-base font-bold transition-colors duration-200 sm:text-2xl ${
						isShown
							? 'bg-[#FF3B00] text-[#F4F2EC]'
							: 'bg-[var(--bg-inverted)] text-transparent select-none hover:bg-[#FF3B00] hover:text-[#F4F2EC]'
					}`}
				>
					{item.hidden}
				</button>{idx < REDACTED_PAIN_POINTS.length - 2 ? ',' : idx === REDACTED_PAIN_POINTS.length - 2 ? ' и' : '.'}
			{/each}
			Вся логика работает локально в контуре предприятия — без зависимости от интернета и облаков.
		</p>

		<!-- Live Zero-Shift Replacement Readout Bar -->
		<div
			class="font-mono-tech mt-6 inline-flex min-h-[42px] items-center gap-3 border border-[var(--border-hairline)] bg-[var(--bg-primary)] px-4 py-2 text-xs uppercase"
		>
			<span class="inline-block h-2 w-2 bg-[var(--accent)]"></span>
			{#if activeRedactionInfo}
				<span class="text-[var(--text-muted)] line-through">{activeRedactionInfo.hidden}</span>
				<span class="text-[var(--accent)] font-bold">→</span>
				<span class="font-bold text-[var(--text-primary)]">ЗАМЕНЯЕТСЯ НА: {activeRedactionInfo.reveal}</span>
			{:else}
				<span class="text-[var(--text-muted)]">НАВЕДИТЕ ИЛИ КЛИКНИТЕ НА БЕЛЫЕ ПОЛОСЫ, ЧТОБЫ РАСКРЫТЬ</span>
			{/if}
		</div>
	</div>
</section>

<!-- 2. Interactive Live APS Contingency Simulator -->
<section id="architecture" class="relative border-b border-[var(--border-hairline)] py-16 lg:py-24">
	<div class="mx-auto max-w-[1680px] px-4 lg:px-8">
		<div class="mb-10 grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
			<div class="lg:col-span-7">
				<div class="font-mono-tech mb-2 text-[11px] tracking-[0.14em] text-[var(--accent)] uppercase">
					[ 05 // ИНТЕРАКТИВНЫЙ СТРЕСС-ТЕСТ APS ]
				</div>
				<h2
					use:textReveal={{ mode: 'scroll', stagger: 0.06 }}
					class="font-industrial text-4xl leading-[0.98] font-extrabold tracking-[-0.01em] uppercase sm:text-6xl"
				>
					ЧТО БУДЕТ ПРИ СБОЕ
				</h2>
			</div>
			<p class="font-mono-tech text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm lg:col-span-5 lg:text-right">
				Нажмите на сценарий аварии или срочного заказа — посмотрите, как решатель за доли секунды
				перераспределяет загрузку по станкам.
			</p>
		</div>

		<div class="grid grid-cols-1 border border-[var(--border-hairline)] lg:grid-cols-12">
			<!-- Scenario Switchers -->
			<div
				class="flex flex-col justify-between border-b border-[var(--border-hairline)] bg-[var(--bg-card)] p-5 sm:p-8 lg:col-span-4 lg:border-r lg:border-b-0"
			>
				<div>
					<div class="font-mono-tech mb-4 text-[10px] tracking-[0.14em] text-[var(--text-muted)] uppercase">
						ВЫБЕРИТЕ СИТУАЦИЮ В ЦЕХУ:
					</div>

					<div class="space-y-2.5">
						{#each SIMULATION_SCENARIOS as scenario (scenario.id)}
							{@const isSelected = activeScenarioId === scenario.id}
							<button
								type="button"
								onclick={() => (activeScenarioId = scenario.id)}
								use:cursorHover={{ label: '[ ТЕСТ ]', variant: 'schedule' }}
								class={`flex w-full items-center justify-between border px-4 py-4 text-left transition-colors ${
									isSelected
										? 'border-[var(--accent)] bg-[var(--bg-inverted)] text-[var(--text-inverted)]'
										: 'border-[var(--border-hairline)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
								}`}
							>
								<div>
									<div class="text-sm font-bold">{scenario.label}</div>
									<div
										class={`font-mono-tech mt-0.5 text-[11px] ${
											isSelected ? 'opacity-70' : 'text-[var(--text-muted)]'
										}`}
									>
										{scenario.shortRu}
									</div>
								</div>
								<span
									class={`font-pixel text-xl font-bold ${
										isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
									}`}
								>
									{scenario.code}
								</span>
							</button>
						{/each}
					</div>
				</div>

				<div class="font-mono-tech mt-8 border-t border-[var(--border-hairline)] pt-4 text-xs text-[var(--text-secondary)]">
					Диспетчеру не нужно обзванивать мастеров — новый план уже на экранах цеха.
				</div>
			</div>

			<!-- Live Rebalancing Readout -->
			<div class="flex flex-col justify-between p-5 sm:p-8 lg:col-span-8">
				<div class="border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-4 sm:p-5">
					<div class="font-mono-tech text-[10px] font-bold tracking-[0.14em] text-[var(--accent)] uppercase">
						// СОБЫТИЕ: {activeScenario.label}
					</div>
					<p class="mt-2 text-sm font-semibold text-[var(--text-primary)] sm:text-base">
						{activeScenario.eventRu}
					</p>
					<p class="mt-2 text-xs text-[var(--text-secondary)] sm:text-sm">
						<span class="font-mono-tech font-bold text-[var(--accent)]">РЕШЕНИЕ APS:</span>
						{activeScenario.actionTakenRu}
					</p>
				</div>

				<!-- 3 Reaction KPIs -->
				<div class="font-mono-tech mt-4 grid grid-cols-1 border border-[var(--border-hairline)] sm:grid-cols-3">
					<div class="border-b border-[var(--border-hairline)] p-4 sm:border-r sm:border-b-0">
						<div class="text-[10px] text-[var(--text-muted)] uppercase">ВРЕМЯ ПЕРЕСЧЁТА</div>
						<div class="font-pixel mt-1 text-3xl font-bold text-[var(--accent)]">
							{activeScenario.solveTimeMs}
						</div>
					</div>
					<div class="border-b border-[var(--border-hairline)] p-4 sm:border-r sm:border-b-0">
						<div class="text-[10px] text-[var(--text-muted)] uppercase">ПРОГНОЗ OEE</div>
						<div class="font-pixel mt-1 text-3xl font-bold text-[var(--text-primary)]">
							{activeScenario.oeeProjected}
						</div>
					</div>
					<div class="p-4">
						<div class="text-[10px] text-[var(--text-muted)] uppercase">СДВИГ ОТГРУЗКИ</div>
						<div class="font-pixel mt-1 text-3xl font-bold text-[var(--text-primary)]">
							{activeScenario.scheduleImpact}
						</div>
					</div>
				</div>

				<!-- Animated Line Rebalance Bars -->
				<div class="mt-6 space-y-3.5">
					{#each activeScenario.lines as line (line.id)}
						<div class="grid grid-cols-12 items-center gap-3">
							<div class="font-mono-tech col-span-5 flex items-center gap-2 text-xs sm:col-span-4">
								<span class="font-bold text-[var(--text-primary)]">{line.id}</span>
								<span class="truncate text-[var(--text-secondary)]">{line.name}</span>
							</div>

							<div class="col-span-4 h-3.5 border border-[var(--border-hairline)] bg-[var(--bg-elevated)] sm:col-span-5">
								<div
									class="h-full transition-all duration-500 ease-out"
									class:bg-[var(--accent)]={line.status === 'ПЕРЕБРОШЕН' || line.status === 'АВАРИЯ'}
									class:bg-[var(--text-primary)]={line.status === 'В РАБОТЕ'}
									style="width: {line.load}%;"
								></div>
							</div>

							<div class="font-mono-tech col-span-3 flex items-center justify-end gap-2 text-[11px]">
								<span class="font-bold">{line.load}%</span>
								<span
									class={`hidden px-1.5 py-0.5 text-[9px] font-bold uppercase md:inline-block ${
										line.status === 'АВАРИЯ' || line.status === 'ПЕРЕБРОШЕН'
											? 'bg-[var(--accent)] text-[#F4F2EC]'
											: 'border border-[var(--border-hairline)] text-[var(--text-muted)]'
									}`}
								>
									{line.status}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- 3. SLG-style 3-Step Launch Grid (КАК ЗАПУСТИТЬ ЗА 6 НЕДЕЛЬ) -->
<section id="onboarding" class="relative border-b border-[var(--border-hairline)] py-16 lg:py-24">
	<div class="mx-auto max-w-[1680px] px-4 lg:px-8">
		<div class="mb-10 flex flex-wrap items-end justify-between gap-4">
			<div>
				<div class="font-mono-tech mb-2 text-[11px] tracking-[0.14em] text-[var(--accent)] uppercase">
					[ 06 // ВНЕДРЕНИЕ БЕЗ ОСТАНОВКИ ЦЕХА ]
				</div>
				<h2
					use:textReveal={{ mode: 'scroll', stagger: 0.06 }}
					class="font-industrial text-4xl font-extrabold tracking-[-0.01em] uppercase sm:text-6xl"
				>
					КАК ЗАПУСТИТЬ ПИЛОТ
				</h2>
			</div>

			<button
				type="button"
				onclick={() => systemState.openDispatchModal()}
				use:cursorHover={{ label: '[ ПИЛОТ ]', variant: 'schedule' }}
				class="btn-stepped font-mono-tech inline-flex items-center gap-2.5 bg-[var(--bg-inverted)] px-6 py-3.5 text-xs font-bold tracking-[0.06em] text-[var(--text-inverted)] uppercase transition-colors hover:bg-[var(--accent)] hover:text-[#F4F2EC]"
			>
				<span>Обсудить пилот</span>
				<span>↗</span>
			</button>
		</div>

		<div class="grid grid-cols-1 border-t border-l border-[var(--border-hairline)] md:grid-cols-3">
			{#each ONBOARDING_STEPS as step (step.num)}
				<div class="flex flex-col justify-between border-r border-b border-[var(--border-hairline)] p-6 sm:p-8">
					<div class="font-pixel text-6xl font-bold text-[var(--accent)] sm:text-7xl">
						{step.num}
					</div>
					<div class="mt-8">
						<h3 class="font-industrial text-xl font-bold tracking-[0.01em] uppercase sm:text-2xl">
							{step.title}
						</h3>
						<p class="font-mono-tech mt-3 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
							{step.detail}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- 4. SLG-style Minimal FAQ with Amber-Gold Active Highlight -->
<section id="faq" class="relative border-b border-[var(--border-hairline)] py-16 lg:py-24">
	<div class="mx-auto max-w-[1160px] px-4 lg:px-8">
		<div class="mb-10">
			<div class="font-mono-tech mb-2 text-[11px] tracking-[0.14em] text-[var(--accent)] uppercase">
				[ 07 // ОТВЕТЫ БЕЗ МАРКЕТИНГА ]
			</div>
			<h2
				use:textReveal={{ mode: 'scroll', stagger: 0.06 }}
				class="font-industrial text-4xl font-extrabold tracking-[-0.01em] uppercase sm:text-6xl"
			>
				ЧАСТЫЕ ВОПРОСЫ
			</h2>
		</div>

		<div class="border-t border-[var(--border-hairline)] divide-y divide-[var(--border-hairline)]">
			{#each FAQ_ITEMS as item (item.index)}
				{@const isOpen = openFaqIdx === item.index}
				<div>
					<button
						type="button"
						onclick={() => toggleFaq(item.index)}
						aria-expanded={isOpen}
						use:cursorHover={{ label: isOpen ? '[ СВЕРНУТЬ ]' : '[ ОТВЕТ ]', variant: 'inspect' }}
						class="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors"
					>
						<div class="flex items-baseline gap-4 sm:gap-6">
							<span class="font-mono-tech text-xs text-[var(--text-muted)]">{item.index}</span>
							<span
								class="text-base font-semibold transition-colors sm:text-xl"
								style={isOpen ? 'color: var(--accent-amber);' : ''}
							>
								{item.question}
							</span>
						</div>
						<span class="font-mono-tech text-xl font-bold text-[var(--accent)]">
							{isOpen ? '×' : '+'}
						</span>
					</button>

					{#if isOpen}
						<div class="pb-6 pl-8 pr-4 sm:pl-12">
							<p class="font-mono-tech max-w-3xl text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
								{item.answer}
							</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
