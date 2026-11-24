export interface BootLogEntry {
	id: string;
	tag: string;
	module: string;
	detail: string;
	latency: string;
}

export type ModulePreviewType = 'aps-gantt' | 'mes-shopfloor' | 'iiot-telemetry' | 'bom-twin';

export interface CoreModule {
	index: string;
	code: string;
	accentColor: string;
	channelTag: string;
	title: string;
	subtitleRu: string;
	plainBenefitRu: string;
	beforeAfterRu: { before: string; after: string };
	summaryRu: string;
	previewType: ModulePreviewType;
	cursorLabel: string;
	slaMetric: string;
	slaLabel: string;
	protocols: string[];
	capabilities: string[];
	architectureSpec: {
		throughput: string;
		determinism: string;
		deployment: string;
	};
}

export interface PipelineStage {
	index: string;
	code: string;
	shortName: string;
	title: string;
	subtitleRu: string;
	plainStoryRu: string;
	orderStatus: string;
	kpiLabel: string;
	kpiValue: string;
	delta: string;
	tags: string[];
}

export interface SimulationScenario {
	id: string;
	code: string;
	label: string;
	shortRu: string;
	eventRu: string;
	solveTimeMs: string;
	oeeProjected: string;
	scheduleImpact: string;
	actionTakenRu: string;
	lines: { id: string; name: string; load: number; status: 'В РАБОТЕ' | 'ПЕРЕБРОШЕН' | 'АВАРИЯ' }[];
}

export interface HourlyOutputPoint {
	hour: string;
	parts: number;
	current?: boolean;
}

export interface FaqEntry {
	index: string;
	question: string;
	answer: string;
}

export const BOOT_SEQUENCE: BootLogEntry[] = [
	{
		id: 'boot-1',
		tag: '[OK]',
		module: 'APS_SOLVER_ENGINE',
		detail: 'Математический планировщик конечных мощностей готов',
		latency: '034ms'
	},
	{
		id: 'boot-2',
		tag: '[OK]',
		module: 'KAFKA_TELEMETRY_STREAM',
		detail: 'Потоковый приём данных с датчиков (250K тегов/с)',
		latency: '058ms'
	},
	{
		id: 'boot-3',
		tag: '[OK]',
		module: 'OPC_UA_PLC_BRIDGE',
		detail: '142 станка Siemens / Fanuc / Heidenhain в сети',
		latency: '084ms'
	},
	{
		id: 'boot-4',
		tag: '[OK]',
		module: 'SHOPFLOOR_SYNC',
		detail: 'Синхронизация цеха завершена · OEE 94.8%',
		latency: '112ms'
	}
];

export const LIVE_HOURLY_OUTPUT: HourlyOutputPoint[] = [
	{ hour: '00', parts: 210 },
	{ hour: '01', parts: 195 },
	{ hour: '02', parts: 205 },
	{ hour: '03', parts: 220 },
	{ hour: '04', parts: 215 },
	{ hour: '05', parts: 230 },
	{ hour: '06', parts: 265 },
	{ hour: '07', parts: 310 },
	{ hour: '08', parts: 365 },
	{ hour: '09', parts: 390 },
	{ hour: '10', parts: 412 },
	{ hour: '11', parts: 428 },
	{ hour: '12', parts: 350 },
	{ hour: '13', parts: 405 },
	{ hour: '14', parts: 438 },
	{ hour: '15', parts: 452 },
	{ hour: '16', parts: 420, current: true },
	{ hour: '17', parts: 396 },
	{ hour: '18', parts: 374 },
	{ hour: '19', parts: 342 },
	{ hour: '20', parts: 318 },
	{ hour: '21', parts: 290 },
	{ hour: '22', parts: 264 },
	{ hour: '23', parts: 240 }
];

export const DEPARTMENT_LOADS = [
	{ name: 'ЧПУ 5-осевые', count: 38, load: 96 },
	{ name: 'Токарный цех', count: 32, load: 91 },
	{ name: 'Шлифовка и доводка', count: 24, load: 94 },
	{ name: 'Роботизированная сварка', count: 22, load: 88 },
	{ name: 'Контроль ОТК / КИМ', count: 16, load: 84 },
	{ name: 'Термообработка', count: 10, load: 79 }
] as const;

export const CORE_MODULES: CoreModule[] = [
	{
		index: '01',
		code: 'APS',
		accentColor: '#FF3B00',
		channelTag: '#aps-планирование',
		title: 'APS — Finite Capacity Scheduling',
		subtitleRu: 'Алгоритмическое планирование загрузки линий',
		plainBenefitRu: 'Сам составляет реальный график цеха за секунды вместо ручных таблиц на полдня.',
		beforeAfterRu: {
			before: 'План устаревает через час после начала смены',
			after: 'Полный пересчёт 50 000 операций за 140 мс'
		},
		summaryRu:
			'Решатель учитывает реальную мощность каждого станка, время переналадок, наличие оснастки, смены операторов и жёсткие даты отгрузки заказчикам.',
		previewType: 'aps-gantt',
		cursorLabel: '[ SCHEDULE ]',
		slaMetric: '< 140 мс',
		slaLabel: 'ПЕРЕСЧЁТ ПЛАНА',
		protocols: ['CP-SAT', 'Конечная мощность', 'Матрица переналадок', '1C / SAP'],
		capabilities: [
			'Группирует похожие детали подряд — сокращает переналадки станков на 41%',
			'Мгновенно перестраивает расписание, если сломался станок или пришёл срочный заказ',
			'Показывает точную дату отгрузки ещё на этапе приёма заказа в отделе продаж'
		],
		architectureSpec: {
			throughput: '50 000 операций / цикл',
			determinism: '100% воспроизводимый план',
			deployment: 'На серверах завода'
		}
	},
	{
		index: '02',
		code: 'MES',
		accentColor: '#3B82F6',
		channelTag: '#mes-диспетчер',
		title: 'MES — Real-Time Shopfloor Execution',
		subtitleRu: 'Диспетчеризация и пооперационный контроль',
		plainBenefitRu: 'Оператор видит на экране ровно одну следующую деталь, а начальник цеха — всю картину вживую.',
		beforeAfterRu: {
			before: 'Бумажные маршрутные листы и сводки в конце недели',
			after: 'Живой статус каждой операции и блокировка брака сразу'
		},
		summaryRu:
			'Безбумажная выдача сменно-суточных заданий на цеховые терминалы, электронный Andon при простое, контроль качества на каждой операции и честный учёт выработки.',
		previewType: 'mes-shopfloor',
		cursorLabel: '[ INSPECT ]',
		slaMetric: '99.98%',
		slaLabel: 'ДОСТУПНОСТЬ ЦЕХА',
		protocols: ['HMI-терминалы', 'e-Andon', 'Штрихкод / RFID', 'Контроль ОТК'],
		capabilities: [
			'Простой интерфейс у станка: одна кнопка «Начать», одна кнопка «Готово» или «Причина простоя»',
			'Автоматический вызов наладчика или ремонтной службы при остановке линии',
			'Блокировка передачи партии дальше, если не пройдены допуски ОТК'
		],
		architectureSpec: {
			throughput: '12 000+ заданий / смену',
			determinism: 'Отклик экрана < 50 мс',
			deployment: 'Цеховой кластер Edge'
		}
	},
	{
		index: '03',
		code: 'IIoT',
		accentColor: '#10B981',
		channelTag: '#iiot-станки',
		title: 'IIoT — Edge & PLC Telemetry Ingestion',
		subtitleRu: 'Потоковый сбор данных с оборудования',
		plainBenefitRu: 'Система сама читает правду напрямую со станков — без ручного ввода и «приписок» в журнал.',
		beforeAfterRu: {
			before: 'Причины простоев записывают по памяти в конце смены',
			after: 'Секундная телеметрия шпинделя и нагрузок прямо с ПЛК'
		},
		summaryRu:
			'Прямое подключение к стойкам ЧПУ и промышленным контроллерам по OPC-UA, MQTT и Modbus. Локальный буфер на шлюзе сохраняет 100% данных даже при обрыве заводской сети.',
		previewType: 'iiot-telemetry',
		cursorLabel: '[ TELEMETRY ]',
		slaMetric: '250K/с',
		slaLabel: 'СИГНАЛОВ В СЕК',
		protocols: ['OPC-UA', 'MQTT 5.0', 'Modbus TCP', 'Apache Kafka'],
		capabilities: [
			'Готовые драйверы для Siemens Sinumerik, Fanuc, Heidenhain, Haas и Beckhoff',
			'Ловит скрытые микроостановы и работу вхолостую, которые не видны в отчётах',
			'Предупреждает об износе инструмента по росту вибрации и тока шпинделя'
		],
		architectureSpec: {
			throughput: '250 000 тегов / сек',
			determinism: 'Задержка 1.8 мс',
			deployment: 'Промышленный Edge ARM/x86'
		}
	},
	{
		index: '04',
		code: 'BOM',
		accentColor: '#F59E0B',
		channelTag: '#цифровой-двойник',
		title: 'BOM & Traceability — Digital Twin',
		subtitleRu: 'Генеалогия партий и цифровой двойник',
		plainBenefitRu: 'По серийному номеру за 2 секунды видно: из какого металла, на каком станке и кем сделана деталь.',
		beforeAfterRu: {
			before: 'При рекламации неделями ищут виновную партию по папкам',
			after: 'Мгновенный цифровой паспорт каждого изделия и партии'
		},
		summaryRu:
			'Сквозная прослеживаемость от сертификата плавки сырья до отгруженного узла, объединённая с цифровой моделью цеха для проверки узких мест до запуска серии.',
		previewType: 'bom-twin',
		cursorLabel: '[ INSPECT ]',
		slaMetric: '100%',
		slaLabel: 'ГЕНЕАЛОГИЯ ПАРТИЙ',
		protocols: ['DataMatrix / GS1', 'As-Built BOM', 'PLM-мост', 'Цифровой паспорт'],
		capabilities: [
			'Мгновенный поиск всех изделий из бракованной плавки сырья или партии комплектующих',
			'Автоматическая сборка цифрового паспорта качества с протоколами замеров',
			'Прогон нового заказа на цифровом двойнике до того, как заготовка попадёт в цех'
		],
		architectureSpec: {
			throughput: '10M+ узлов графа',
			determinism: 'Неизменяемый аудит-лог',
			deployment: 'Реплицируемый контур'
		}
	}
];

export const PIPELINE_STAGES: PipelineStage[] = [
	{
		index: '01',
		code: '01 // ERP → СПРОС',
		shortName: 'ЗАКАЗ',
		title: 'Поступает заказ из ERP',
		subtitleRu: 'Приём заказа и проверка сырья',
		plainStoryRu:
			'Отдел продаж завёл заказ в 1C или SAP на 420 валов. PROMSYS сам забирает спецификацию, проверяет остатки металла на складе и выставляет приоритет отгрузки.',
		orderStatus: 'ПРИНЯТ · 420 ШТ · ПРИОРИТЕТ P0',
		kpiLabel: 'РАЗБОР СОСТАВА',
		kpiValue: '12.4 мс',
		delta: 'БЕЗ РУЧНОГО ПЕРЕНОСА',
		tags: ['1C:ERP', 'SAP S/4HANA', 'ПРОВЕРКА СКЛАДА', 'СОСТАВ BOM']
	},
	{
		index: '02',
		code: '02 // APS → ПЛАН',
		shortName: 'АЛГОРИТМ',
		title: 'APS строит реальный график',
		subtitleRu: 'Расчёт загрузки по станкам',
		plainStoryRu:
			'Математический решатель раскладывает все операции по реальным станкам с учётом смен, оснастки и минимальных переналадок — без очередей и срыва сроков.',
		orderStatus: 'РАСПЛАНИРОВАН · ЛИНИИ L-01 → L-05',
		kpiLabel: 'ПЕРЕНАЛАДКИ',
		kpiValue: '-41.2%',
		delta: '0 СРЫВОВ СРОКОВ',
		tags: ['CP-SAT РЕШАТЕЛЬ', 'КОНЕЧНЫЕ МОЩНОСТИ', 'ОСНАСТКА', 'СРОК ОТГРУЗКИ']
	},
	{
		index: '03',
		code: '03 // MES → ЦЕХ',
		shortName: 'СТАНКИ',
		title: 'Станки выполняют операции',
		subtitleRu: 'Живое исполнение в цеху',
		plainStoryRu:
			'Задания сами прилетают на экраны операторов и контроллеры ЧПУ. Система видит реальные обороты шпинделя, фиксирует каждую деталь и не пропустит брак.',
		orderStatus: 'В РАБОТЕ · ОПЕРАЦИЯ 040 · 14 200 ОБ/МИН',
		kpiLabel: 'ЗАДЕРЖКА ПЛК',
		kpiValue: '1.8 мс',
		delta: 'ПРЯМОЙ OPC-UA',
		tags: ['OPC-UA / MQTT', 'ЭКРАН ОПЕРАТОРА', 'КОНТРОЛЬ ОТК', 'e-ANDON']
	},
	{
		index: '04',
		code: '04 // OEE → ЦИКЛ',
		shortName: 'OEE',
		title: 'OEE сразу корректирует план',
		subtitleRu: 'Аналитика и обратная связь',
		plainStoryRu:
			'Если станок замедлился или ушёл в простой, факт мгновенно возвращается в APS-планировщик — расписание перестраивается само, а заказ отгружается точно в срок.',
		orderStatus: 'ГОТОВО · ВЫХОД ГОДНОГО 99.4%',
		kpiLabel: 'ИТОГОВЫЙ OEE',
		kpiValue: '94.8%',
		delta: '+18.6% К БАЗЕ',
		tags: ['ДОСТУПНОСТЬ 97.1%', 'ТЕМП 98.2%', 'КАЧЕСТВО 99.4%', 'АВТОПЕРЕСЧЁТ']
	}
];

export const MARQUEE_TIER_ONE = [
	'OPC-UA',
	'MQTT',
	'APACHE KAFKA',
	'ZERO DOWNTIME',
	'DETERMINISTIC SCHEDULING',
	'ПЛАНИРОВАНИЕ ЗА 140 МС',
	'ISA-95 NATIVE',
	'CP-SAT SOLVER'
];

export const MARQUEE_TIER_TWO = [
	'OEE 94.8%',
	'ПЕРЕНАЛАДКИ -41%',
	'НЕЗАВЕРШЁНКА -38.4%',
	'ОТГРУЗКА В СРОК 99.2%',
	'250 000 ТЕГОВ / СЕК',
	'142 СТАНКА В СЕТИ',
	'ЦИФРОВОЙ ДВОЙНИК',
	'ON-PREMISE БЕЗ ОБЛАКА'
];

export const REDACTED_PAIN_POINTS = [
	{
		hidden: 'Excel-таблиц',
		reveal: 'АВТОПЛАН APS'
	},
	{
		hidden: 'скрытых простоев',
		reveal: 'IIoT OPC-UA'
	},
	{
		hidden: 'потерь партий',
		reveal: 'ЦИФРОВОЙ ПАСПОРТ'
	},
	{
		hidden: 'срывов сроков',
		reveal: '99.2% В СРОК'
	}
] as const;

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
	{
		id: 'nominal',
		code: '01',
		label: 'Штатная смена',
		shortRu: 'Всё идёт по такту',
		eventRu: 'Все 6 производственных линий работают в плановом ритме, запасы НЗП на минимуме.',
		solveTimeMs: '84 мс',
		oeeProjected: '94.8%',
		scheduleImpact: '0 мин задержки',
		actionTakenRu: 'План стабилен. Отгрузка всех 18 партий смены подтверждена точно в срок.',
		lines: [
			{ id: 'L-01', name: 'ЧПУ 5-осевой', load: 96, status: 'В РАБОТЕ' },
			{ id: 'L-02', name: 'Токарный центр', load: 91, status: 'В РАБОТЕ' },
			{ id: 'L-03', name: 'Сварочный робот', load: 88, status: 'В РАБОТЕ' },
			{ id: 'L-04', name: 'Термопечь', load: 79, status: 'В РАБОТЕ' },
			{ id: 'L-05', name: 'Шлифовка', load: 94, status: 'В РАБОТЕ' },
			{ id: 'L-06', name: 'ОТК КИМ', load: 84, status: 'В РАБОТЕ' }
		]
	},
	{
		id: 'fault',
		code: '02',
		label: 'Поломка станка L-03',
		shortRu: 'Авария сервопривода',
		eventRu: 'OPC-UA поймал аварийный останов сварочного робота L-03 (перегрев сервопривода #409).',
		solveTimeMs: '118 мс',
		oeeProjected: '92.1%',
		scheduleImpact: '0 мин опоздания',
		actionTakenRu:
			'За 0.12 сек APS перекинул 14 срочных операций на резерв L-01 и L-05 и отправил заявку ремонтникам.',
		lines: [
			{ id: 'L-01', name: 'ЧПУ 5-осевой', load: 99, status: 'ПЕРЕБРОШЕН' },
			{ id: 'L-02', name: 'Токарный центр', load: 93, status: 'В РАБОТЕ' },
			{ id: 'L-03', name: 'Сварочный робот', load: 0, status: 'АВАРИЯ' },
			{ id: 'L-04', name: 'Термопечь', load: 82, status: 'В РАБОТЕ' },
			{ id: 'L-05', name: 'Шлифовка', load: 98, status: 'ПЕРЕБРОШЕН' },
			{ id: 'L-06', name: 'ОТК КИМ', load: 89, status: 'В РАБОТЕ' }
		]
	},
	{
		id: 'rush',
		code: '03',
		label: 'Срочный заказ +40%',
		shortRu: 'Вброс VIP-партии',
		eventRu: 'Ключевой клиент добавил срочный заказ P0: +40% объёма в текущем окне 48 часов.',
		solveTimeMs: '136 мс',
		oeeProjected: '96.2%',
		scheduleImpact: '+12 мин запас',
		actionTakenRu:
			'Алгоритм склеил однотипные переналадки на L-02 и L-04 и высвободил 6.4 машино-часа без сверхурочных.',
		lines: [
			{ id: 'L-01', name: 'ЧПУ 5-осевой', load: 98, status: 'ПЕРЕБРОШЕН' },
			{ id: 'L-02', name: 'Токарный центр', load: 97, status: 'ПЕРЕБРОШЕН' },
			{ id: 'L-03', name: 'Сварочный робот', load: 95, status: 'В РАБОТЕ' },
			{ id: 'L-04', name: 'Термопечь', load: 94, status: 'ПЕРЕБРОШЕН' },
			{ id: 'L-05', name: 'Шлифовка', load: 96, status: 'В РАБОТЕ' },
			{ id: 'L-06', name: 'ОТК КИМ', load: 92, status: 'В РАБОТЕ' }
		]
	}
];

export const ONBOARDING_STEPS = [
	{
		num: '1',
		title: 'АУДИТ ОДНОГО ЦЕХА',
		detail: 'За 5 дней снимаем маршруты, узкие места и список стоек ЧПУ/ПЛК без остановки производства.'
	},
	{
		num: '2',
		title: 'ПОДКЛЮЧЕНИЕ СТАНКОВ',
		detail: 'Ставим Edge-шлюз в локальную сеть завода, подключаем OPC-UA и интегрируемся с 1C или SAP.'
	},
	{
		num: '3',
		title: 'ЖИВОЙ ПЛАН ЗА 6 НЕДЕЛЬ',
		detail: 'Запускаем APS-решатель и цеховые терминалы. Первый измеримый рост OEE виден уже в первый месяц.'
	}
] as const;

export const FAQ_ITEMS: FaqEntry[] = [
	{
		index: '01',
		question: 'Нужно ли останавливать завод для внедрения?',
		answer:
			'Нет. Подключение Edge-шлюза к ЧПУ и ПЛК идёт в режиме чтения в межсменные окна или на работающем оборудовании. На время пилота система работает параллельно текущему процессу.'
	},
	{
		index: '02',
		question: 'Можно ли развернуть полностью локально, без облака?',
		answer:
			'Да, это базовый режим PROMSYS // OS. Вся платформа разворачивается в вашем закрытом контуре (On-Premise / Air-Gapped Kubernetes или Bare Metal) — ни один байт технологических карт не покидает периметр завода.'
	},
	{
		index: '03',
		question: 'Как быть со старыми станками без ЧПУ и OPC-UA?',
		answer:
			'Для универсальных и старых станков подключаются недорогие промышленные модули ввода-вывода (токовые клещи + концевики) и компактный сенсорный терминал оператора. Они дают ту же картину по простоям и циклам.'
	},
	{
		index: '04',
		question: 'Чем APS отличается от планирования в 1C:ERP?',
		answer:
			'ERP планирует объёмами в «бесконечных» мощностях и не знает, что на станке прямо сейчас сломался шпиндель или не хватает оснастки. APS решает точную математическую задачу до минуты с учётом переналадок и живых данных MES.'
	},
	{
		index: '05',
		question: 'Справятся ли операторы цеха с интерфейсом?',
		answer:
			'Цеховой терминал проектировался под работу в перчатках на 12-часовой смене: крупный контрастный шрифт, минимум кликов и сканер штрихкода. Обучение оператора занимает 15 минут.'
	}
];
