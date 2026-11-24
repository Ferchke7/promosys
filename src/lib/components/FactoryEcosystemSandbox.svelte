<script lang="ts">
	import { browser } from '$app/env';
	import { systemState } from '#lib/stores/system.svelte.ts';
	import { cursorHover } from '#lib/actions/cursorHover.ts';

	// Simulation Speed: 1x, 2x, 5x
	let speedMultiplier = $state<number>(1);
	let isSimulating = $state(false);
	let activeNodeId = $state<string>('mes');
	let lastEventTime = $state<string>('СЕЙЧАС');

	// Live Metrics that react to user interactions
	let activeOrdersCount = $state(14);
	let partsProducedToday = $state(18420);
	let currentOEE = $state(96.8);
	let rerouteLatencyMs = $state(118);
	let machineFailureSimulated = $state(false);
	let scrapRate = $state(0.18);
	let trucksEnRoute = $state(6);
	let wmsCapacityPct = $state(76);

	// Event log stream
	interface EventLog {
		id: number;
		time: string;
		system: 'MES' | 'WMS' | 'APS' | 'SCADA' | 'EOL';
		text: string;
		type: 'info' | 'success' | 'warning' | 'alert';
	}

	let eventLogs = $state<EventLog[]>([
		{
			id: 1,
			time: '17:42:01',
			system: 'APS',
			text: 'Автоматический расчет сменного плана на 142 станка выполнен за 118 мс.',
			type: 'success'
		},
		{
			id: 2,
			time: '17:42:05',
			system: 'WMS',
			text: 'Погрузчик AGV-04 доставил партию прекурсора #884 к ячейке ЧПУ-02.',
			type: 'info'
		},
		{
			id: 3,
			time: '17:42:10',
			system: 'MES',
			text: 'Роботизированная сварка шины завершена: такт 1.42с, отклонение геометрии 0.01 мм.',
			type: 'info'
		},
		{
			id: 4,
			time: '17:42:14',
			system: 'EOL',
			text: '100% входной контроль OCV пройден: годных 99.82%, 0 брака в партии.',
			type: 'success'
		}
	]);

	// Ecosystem Nodes Definition (Homage to User's Ecosystem Reference Map)
	interface EcosystemNode {
		id: string;
		num: string;
		title: string;
		tag: string;
		system: string;
		status: string;
		badgeColor: string;
		description: string;
		stats: { label: string; value: string }[];
		features: string[];
	}

	const ECOSYSTEM_NODES = $derived<EcosystemNode[]>([
		{
			id: 'raw-chem',
			num: '01',
			title: 'Сырьевой Комплекс & Резервуары',
			tag: 'ПРИЕМ СЫРЬЯ & ДОЗИРОВАНИЕ',
			system: 'WMS Raw Material Gate',
			status: 'ПОДАЧА НОРМА',
			badgeColor: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
			description:
				'Магистральные резервуары жидких и сыпучих прекурсоров с контролем уровня, давления азотной подушки и весовыми дозаторами.',
			stats: [
				{ label: 'Запас в танках', value: '88.4 тонны' },
				{ label: 'Давление ресиверов', value: '4.2 бар N2' },
				{ label: 'Точность взвешивания', value: '± 0.02 кг' },
				{ label: 'Температура сырья', value: '20.4 °C' }
			],
			features: ['Ультразвуковые радары уровня', 'Пневматическая подача в цех', 'RFID маркировка партий']
		},
		{
			id: 'heavy-proc',
			num: '02',
			title: 'Тяжелый Передел & Металлопрокат',
			tag: 'ПЕРВИЧНАЯ МЕХАНИКА & РУЛОНЫ',
			system: 'MES Primary Processing',
			status: 'КРАН В РАБОТЕ',
			badgeColor: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
			description:
				'Участок раскроя металла, штамповки корпусов и волочения медных токоведущих шин с мостовым краном и автоматической размоткой.',
			stats: [
				{ label: 'Скорость реза', value: '45 м/мин' },
				{ label: 'Раскрой металла', value: '98.8% КИМ' },
				{ label: 'Отходы в стружку', value: '1.2% (рецикл)' },
				{ label: 'Нагрузка пресса', value: '120 т усилие' }
			],
			features: ['Лазерный раскрой ЧПУ', 'Мониторинг износа матриц', 'Интеграция с весовым постом']
		},
		{
			id: 'mes',
			num: '03',
			title: 'Роботизированная Сборка & ЧПУ',
			tag: 'СЕРДЦЕ ПРОИЗВОДСТВА',
			system: 'PROMSYS MES Core',
			status: machineFailureSimulated ? 'СБОЙ ЧПУ-04 // АВТООБХОД' : 'ОНЛАЙН // 142 СТАНКА',
			badgeColor: machineFailureSimulated
				? 'border-amber-500 text-amber-400 bg-amber-500/15 animate-pulse'
				: 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/15',
			description:
				'Линия высокоскоростной сборки, лазерной сварки шин и многоосевой фрезеровки с прямым опросом ЧПУ-контроллеров по OPC-UA и MQTT.',
			stats: [
				{ label: 'Текущий OEE', value: `${currentOEE}%` },
				{ label: 'Тактовое время', value: '1.42 сек' },
				{ label: 'Станков в шине', value: machineFailureSimulated ? '141 + 1 обход' : '142 ед.' },
				{ label: 'Быстрота переналадки', value: `${rerouteLatencyMs} мс` }
			],
			features: ['Прямой сбор сигналов ПЛК', 'Безбумажный учет нарядов', 'Мгновенный пересчет расписания']
		},
		{
			id: 'eol-lab',
			num: '04',
			title: 'Лаборатория & EOL Контроль',
			tag: '100% ВЫХОДНОЕ ТЕСТИРОВАНИЕ',
			system: 'Quality Assurance & Traceability',
			status: '0 БРАКА В ПАРТИИ',
			badgeColor: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
			description:
				'Автоматический стенд замера Кельвина, спектрометрический контроль геометрии швов и цифровой паспорт каждого изделия.',
			stats: [
				{ label: 'Выход годного', value: '99.82%' },
				{ label: 'Погрешность OCV', value: '± 0.1 мВ' },
				{ label: 'Импеданс ячеек', value: '0.45 мОм' },
				{ label: 'Время теста изделия', value: '0.8 сек' }
			],
			features: ['Автоотбраковка брака', 'QR/DataMatrix маркировка', 'Полный архив измерений 5 лет']
		},
		{
			id: 'wms-hub',
			num: '05',
			title: 'Центральный WMS-Хаб & Склад',
			tag: 'СКЛАДСКАЯ ЛОГИСТИКА & AGV',
			system: 'PROMSYS WMS Terminal',
			status: 'ДОКИ 1-4 АКТИВНЫ',
			badgeColor: 'border-amber-500 text-amber-400 bg-amber-500/10',
			description:
				'Высокостеллажный автоматизированный распределительный склад готовой продукции и компонентов с навигацией погрузчиков и адресным хранением.',
			stats: [
				{ label: 'Загрузка емкости', value: `${wmsCapacityPct}%` },
				{ label: 'Паллетомест', value: '1,420 ед.' },
				{ label: 'Погрузчиков онлайн', value: '4 AGV / 2 кары' },
				{ label: 'Время подбора паллеты', value: '42 сек' }
			],
			features: ['Адресное ячеистое хранение', 'FIFO / FEFO ротация', 'Синхронизация с 1C и ERP']
		},
		{
			id: 'aps-dispatch',
			num: '06',
			title: 'Логистика Отгрузок & Автопарк',
			tag: 'ДИСПЕТЧЕРИЗАЦИЯ & ТРЕКИНГ',
			system: 'PROMSYS APS Dispatcher',
			status: `${trucksEnRoute} ФУР В РЕЙСЕ`,
			badgeColor: 'border-blue-500 text-blue-400 bg-blue-500/10',
			description:
				'Управление окнами погрузки еврофур, интеграция с GPS-трекингом перевозчиков, автоматическое формирование ТТН и счетов.',
			stats: [
				{ label: 'Фур в рейсе', value: `${trucksEnRoute} автопоездов` },
				{ label: 'Среднее время погрузки', value: '14.2 мин' },
				{ label: 'Точность доставки ETA', value: '99.4%' },
				{ label: 'Электронные ТТН', value: '100% ЭДО' }
			],
			features: ['Динамическое окно погрузки', 'Контроль весового контроля', 'Интеграция с покупателем']
		}
	]);

	// Action 1: Trigger Simulated Urgent Production Order
	function triggerSimulatedOrder() {
		isSimulating = true;
		activeOrdersCount += 1;
		partsProducedToday += 2500;
		wmsCapacityPct = Math.min(95, wmsCapacityPct + 4);

		const now = new Date().toTimeString().slice(0, 8);
		lastEventTime = now;

		eventLogs = [
			{
				id: Date.now(),
				time: now,
				system: 'APS',
				text: `Срочный заказ #9240 на 2,500 изделий: решатель APS пересчитал сетку станков за ${rerouteLatencyMs} мс.`,
				type: 'success'
			},
			{
				id: Date.now() + 1,
				time: now,
				system: 'WMS',
				text: 'Зарезервировано 8 паллет сырья на ярусе B-04. AGV-02 назначен на подачу.',
				type: 'info'
			},
			...eventLogs.slice(0, 5)
		];

		setTimeout(() => {
			isSimulating = false;
		}, 600);
	}

	// Action 2: Trigger Simulated Machine Breakdown & Automatic Reroute
	function triggerMachineFailureSimulation() {
		machineFailureSimulated = true;
		const now = new Date().toTimeString().slice(0, 8);
		lastEventTime = now;

		eventLogs = [
			{
				id: Date.now(),
				time: now,
				system: 'MES',
				text: 'Аварийный датчик вибрации: станок ЧПУ-04 остановлен на автодиагностику.',
				type: 'warning'
			},
			{
				id: Date.now() + 1,
				time: now,
				system: 'SCADA',
				text: `PROMSYS мгновенно перенаправил поток деталей на резервный станок ЧПУ-09. Задержка: ${rerouteLatencyMs} мс. Потери: 0 мин.`,
				type: 'alert'
			},
			...eventLogs.slice(0, 5)
		];

		setTimeout(() => {
			machineFailureSimulated = false;
			currentOEE = 97.2;
		}, 3500);
	}

	// Action 3: Dispatch Truck
	function triggerDispatchTruck() {
		trucksEnRoute += 1;
		wmsCapacityPct = Math.max(40, wmsCapacityPct - 6);
		const now = new Date().toTimeString().slice(0, 8);
		lastEventTime = now;

		eventLogs = [
			{
				id: Date.now(),
				time: now,
				system: 'APS',
				text: 'Фура MAN (номер 01 774 AAB) опломбирована на Доке №2. Сформирована электронная накладная.',
				type: 'success'
			},
			{
				id: Date.now() + 1,
				time: now,
				system: 'WMS',
				text: 'Партия #8491 списана со склада готовой продукции. Освобождено 24 паллетоместа.',
				type: 'info'
			},
			...eventLogs.slice(0, 5)
		];
	}

	// Action 4: Reset Demo
	function resetDemo() {
		activeOrdersCount = 14;
		partsProducedToday = 18420;
		currentOEE = 96.8;
		wmsCapacityPct = 76;
		trucksEnRoute = 6;
		machineFailureSimulated = false;
		activeNodeId = 'mes';
	}
</script>

<section id="demo" class="relative z-10 border-b border-[var(--border-hairline)] bg-[var(--bg-primary)] py-16 lg:py-24">
	<div class="mx-auto max-w-[1680px] px-4 lg:px-8">
		<!-- Section Header -->
		<div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border-hairline)] pb-8">
			<div>
				<div class="font-mono-tech flex items-center gap-3 text-xs tracking-[0.16em] text-[var(--accent)] uppercase">
					<span class="signal-pulse inline-block h-2 w-2 rounded-full bg-[var(--accent)]"></span>
					<span>02 // ИНТЕРАКТИВНАЯ ДЕМО-ПЕСОЧНИЦА · ТЕСТОВЫЙ ЗАПУСК</span>
				</div>
				<h2
					class="font-industrial mt-3 text-3xl font-extrabold uppercase tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
				>
					РАБОЧЕЕ ДЕМО ЭКОСИСТЕМЫ ЗАВОДА
				</h2>
			</div>
			<div class="font-mono-tech max-w-md text-xs leading-relaxed text-[var(--text-secondary)]">
				Потрогайте систему в действии: переключайте узлы цепочки поставок, симулируйте аварии станков и тестируйте мгновенный перерасчет расписания PROMSYS в реальном времени.
			</div>
		</div>

		<!-- Live Simulation Control Deck -->
		<div class="mb-8 flex flex-wrap items-center justify-between gap-4 border border-[var(--border-hairline)] bg-[var(--bg-card)] p-4 sm:p-5">
			<div class="flex flex-wrap items-center gap-3">
				<div class="flex items-center gap-2 border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-mono font-bold text-emerald-400">
					<span class="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
					<span>СИМУЛЯТОР АКТИВЕН // 142 СТАНКА</span>
				</div>

				<div class="hidden sm:flex items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
					<span>СМЕНА: <b class="text-[var(--text-primary)]">№2 (ДНЕВНАЯ)</b></span>
					<span>ПАРТИЙ В РАБОТЕ: <b class="text-[var(--accent)]">{activeOrdersCount}</b></span>
					<span>ВЫПУСК: <b class="text-[var(--text-primary)]">{partsProducedToday.toLocaleString()} шт</b></span>
				</div>
			</div>

			<!-- Interactive Action Triggers -->
			<div class="flex flex-wrap items-center gap-2">
				<button
					type="button"
					onclick={triggerSimulatedOrder}
					use:cursorHover={{ label: '[ ЗАКАЗ + ]', variant: 'action' }}
					class="flex items-center gap-2 bg-[var(--accent)] px-3.5 py-2 text-xs font-mono font-bold text-[#F4F2EC] uppercase transition-all hover:bg-[#e03400] active:scale-95 shadow-md"
				>
					<span>⚡</span>
					<span>Запустить партию (+2500)</span>
				</button>

				<button
					type="button"
					onclick={triggerMachineFailureSimulation}
					use:cursorHover={{ label: '[ СБОЙ ЧПУ ]', variant: 'action' }}
					class="flex items-center gap-2 border border-amber-500/50 bg-amber-500/15 px-3 py-2 text-xs font-mono font-bold text-amber-300 uppercase transition-all hover:bg-amber-500 hover:text-black active:scale-95"
				>
					<span>⚠</span>
					<span>Смоделировать сбой станка</span>
				</button>

				<button
					type="button"
					onclick={triggerDispatchTruck}
					use:cursorHover={{ label: '[ ОТГРУЗКА ]', variant: 'action' }}
					class="flex items-center gap-2 border border-blue-500/50 bg-blue-500/15 px-3 py-2 text-xs font-mono font-bold text-blue-300 uppercase transition-all hover:bg-blue-500 hover:text-[#F4F2EC] active:scale-95"
				>
					<span>🚛</span>
					<span>Отгрузить фуру WMS</span>
				</button>

				<button
					type="button"
					onclick={resetDemo}
					class="border border-[var(--border-hairline)] bg-[var(--bg-secondary)] px-2.5 py-2 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]"
					title="Сброс показателей"
				>
					↺
				</button>
			</div>
		</div>

		<!-- Interactive Factory Ecosystem Map Grid (6 Connected Modules) -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each ECOSYSTEM_NODES as node}
				{@const isSelected = activeNodeId === node.id}
				<div
					onclick={() => (activeNodeId = node.id)}
					role="button"
					tabindex="0"
					onkeydown={(e) => e.key === 'Enter' && (activeNodeId = node.id)}
					class="group relative flex flex-col justify-between border p-5 sm:p-6 transition-all duration-200 cursor-pointer select-none {isSelected ? 'border-[var(--accent)] bg-[var(--bg-card)] shadow-xl ring-1 ring-[var(--accent)]' : 'border-[var(--border-hairline)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'}"
				>
					<div>
						<!-- Top Card Header -->
						<div class="flex items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-3">
							<div class="flex items-center gap-2.5">
								<span class="font-mono text-xs font-bold text-[var(--accent)]">{node.num}</span>
								<span class="font-mono text-[10px] tracking-[0.12em] text-[var(--text-muted)] uppercase">
									{node.tag}
								</span>
							</div>
							<span class="border px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider {node.badgeColor}">
								{node.status}
							</span>
						</div>

						<!-- Node Title -->
						<h3 class="font-industrial mt-3 text-lg sm:text-xl font-bold uppercase text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
							{node.title}
						</h3>
						<div class="font-mono mt-0.5 text-[11px] text-[var(--text-secondary)]">
							{node.system}
						</div>

						<p class="mt-3 text-xs leading-relaxed text-[var(--text-secondary)]">
							{node.description}
						</p>
					</div>

					<!-- Real-time Stats Sub-Grid -->
					<div class="mt-5 border-t border-[var(--border-hairline)] pt-3.5">
						<div class="grid grid-cols-2 gap-2 text-xs font-mono">
							{#each node.stats as stat}
								<div class="border border-[var(--border-hairline)] bg-[var(--bg-primary)]/60 p-2">
									<div class="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</div>
									<div class="mt-0.5 font-bold text-[var(--text-primary)]">{stat.value}</div>
								</div>
							{/each}
						</div>

						<div class="mt-3 flex items-center justify-between text-[11px] font-mono">
							<span class="text-[var(--accent)] font-semibold">
								{isSelected ? '● УЗЕЛ ВЫБРАН' : 'Кликните для деталей →'}
							</span>
							<span class="text-[var(--text-muted)] text-[10px]">PROMSYS // LIVE</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Detail Deep Dive for the Active Selected Node -->
		{#if activeNodeId}
			{@const sel = ECOSYSTEM_NODES.find((n) => n.id === activeNodeId)}
			{#if sel}
				<div class="mt-8 border border-[var(--accent)]/40 bg-[var(--bg-card)] p-6 sm:p-8 shadow-2xl animate-in fade-in duration-300">
					<div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[var(--border-hairline)] pb-6">
						<div>
							<div class="font-mono text-xs tracking-[0.14em] text-[var(--accent)] uppercase">
								{sel.num} // ПОДРОБНАЯ ТЕЛЕМЕТРИЯ УЗЛА
							</div>
							<h3 class="font-industrial mt-1 text-2xl sm:text-3xl font-extrabold uppercase text-[var(--text-primary)]">
								{sel.title}
							</h3>
							<p class="font-mono mt-1 text-xs text-[var(--text-secondary)]">
								Архитектура: {sel.system} · Прямая шина данных без задержек
							</p>
						</div>

						<div class="flex flex-wrap items-center gap-3">
							<button
								type="button"
								onclick={() => systemState.openDispatchModal()}
								class="bg-[var(--accent)] px-5 py-2.5 text-xs font-mono font-bold tracking-[0.08em] text-[#F4F2EC] uppercase transition-colors hover:bg-[#e03400]"
							>
								Заказать пилот для узла ↗
							</button>
						</div>
					</div>

					<!-- Deep Dive Content -->
					<div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
						<!-- Column 1: Live Specs -->
						<div class="space-y-3">
							<div class="font-mono text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">
								Параметры реального времени
							</div>
							{#each sel.stats as st}
								<div class="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2 text-xs font-mono">
									<span class="text-[var(--text-secondary)]">{st.label}:</span>
									<span class="font-bold text-[var(--text-primary)]">{st.value}</span>
								</div>
							{/each}
						</div>

						<!-- Column 2: Key Capabilities -->
						<div class="space-y-3">
							<div class="font-mono text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">
								Функционал PROMSYS на узле
							</div>
							<ul class="space-y-2 text-xs text-[var(--text-secondary)] font-mono">
								{#each sel.features as feat}
									<li class="flex items-center gap-2">
										<span class="text-[var(--accent)] font-bold">✔</span>
										<span>{feat}</span>
									</li>
								{/each}
							</ul>
						</div>

						<!-- Column 3: Live Event Stream for this node -->
						<div class="border border-[var(--border-hairline)] bg-[var(--bg-primary)] p-4 font-mono text-[11px]">
							<div class="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2 mb-3 text-[10px] text-[var(--text-muted)] uppercase">
								<span>ПОТОК СОБЫТИЙ SCADA</span>
								<span class="text-emerald-400">● ОНЛАЙН</span>
							</div>
							<div class="space-y-2 max-h-36 overflow-y-auto">
								{#each eventLogs as log (log.id)}
									<div class="leading-relaxed">
										<span class="text-[var(--text-muted)]">[{log.time}]</span>
										<b class="text-[var(--accent)]"> {log.system}:</b>
										<span class="text-[var(--text-secondary)]"> {log.text}</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/if}
		{/if}

		<!-- Value Comparison Banner (Without PROMSYS vs With PROMSYS) -->
		<div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
			<div class="border border-red-500/25 bg-red-500/5 p-5">
				<div class="text-[10px] font-bold uppercase tracking-wider text-red-400">
					ТРАДИЦИОННОЕ УПРАВЛЕНИЕ (EXCEL И БУМАГА)
				</div>
				<div class="mt-2 space-y-1.5 text-[var(--text-secondary)]">
					<div>• Перепланирование при поломке станка: <b>40–90 минут</b></div>
					<div>• Потери сменной выработки: <b>до 18% рабочего времени</b></div>
					<div>• Отсутствие прозрачности: сводки составляются постфактум раз в сутки</div>
				</div>
			</div>

			<div class="border border-emerald-500/30 bg-emerald-500/5 p-5">
				<div class="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
					С ПЛАТФОРМОЙ PROMSYS (MES, WMS & APS)
				</div>
				<div class="mt-2 space-y-1.5 text-[var(--text-secondary)]">
					<div>• Перепланирование расписания ЧПУ: <b class="text-emerald-400">118–140 мс</b></div>
					<div>• Общая эффективность OEE: <b class="text-emerald-400">рост до 96.8%</b></div>
					<div>• 100% цифровой след каждого изделия от закупки сырья до отгрузки фуры</div>
				</div>
			</div>
		</div>
	</div>
</section>
