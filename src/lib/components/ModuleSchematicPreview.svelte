<script lang="ts">
	import type { ModulePreviewType } from '#lib/data/platformData.ts';

	interface Props {
		type: ModulePreviewType;
		accentColor?: string;
		compact?: boolean;
	}

	let { type, accentColor = '#FF3B00', compact = false }: Props = $props();
</script>

<div class="relative h-full w-full overflow-hidden bg-[var(--preview-bg)] text-[var(--preview-ink)]">
	<!-- Top schematic header -->
	<div
		class="font-mono-tech flex items-center justify-between border-b border-[var(--preview-line)] px-3 py-1.5 text-[9px] tracking-[0.14em] uppercase"
	>
		<span class="flex items-center gap-1.5">
			<span class="signal-pulse inline-block h-1.5 w-1.5" style="background-color: {accentColor};"></span>
			{#if type === 'aps-gantt'}
				LIVE GANTT // РАСПИСАНИЕ APS
			{:else if type === 'mes-shopfloor'}
				LIVE MES // ЗАГРУЗКА СТАНКОВ
			{:else if type === 'iiot-telemetry'}
				LIVE IIoT // ПОТОК ПЛК
			{:else}
				LIVE TWIN // ГЕНЕАЛОГИЯ BOM
			{/if}
		</span>
		<span class="opacity-60">{compact ? '60HZ' : 'REAL-TIME'}</span>
	</div>

	<div class="p-3">
		{#if type === 'aps-gantt'}
			<svg viewBox="0 0 320 155" class="h-auto w-full" aria-hidden="true">
				{#each [64, 112, 160, 208, 256, 304] as gx (gx)}
					<line x1={gx} y1="12" x2={gx} y2="136" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />
				{/each}
				<g fill="currentColor" fill-opacity="0.52" font-family="JetBrains Mono, monospace" font-size="7">
					<text x="64" y="8">08:00</text>
					<text x="112" y="8">10:00</text>
					<text x="160" y="8">12:00</text>
					<text x="208" y="8">14:00</text>
					<text x="256" y="8">16:00</text>
				</g>
				<g fill="currentColor" fill-opacity="0.75" font-family="JetBrains Mono, monospace" font-size="8">
					<text x="4" y="34">ЧПУ-01</text>
					<text x="4" y="64">ЧПУ-02</text>
					<text x="4" y="94">СВАРКА</text>
					<text x="4" y="124">ОТК-01</text>
				</g>
				{#each [44, 74, 104, 134] as gy (gy)}
					<line x1="0" y1={gy} x2="316" y2={gy} stroke="currentColor" stroke-opacity="0.14" stroke-width="1" />
				{/each}

				<rect x="64" y="21" width="66" height="16" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.45" />
				<rect x="130" y="21" width="12" height="16" fill={accentColor} fill-opacity="0.35" />
				<rect x="142" y="21" width="88" height="16" fill={accentColor} />
				<rect x="234" y="21" width="64" height="16" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.45" />

				<rect x="74" y="51" width="84" height="16" fill="currentColor" fill-opacity="0.22" stroke="currentColor" stroke-opacity="0.55" />
				<rect x="166" y="51" width="76" height="16" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-opacity="0.45" />
				<rect x="248" y="51" width="54" height="16" fill={accentColor} fill-opacity="0.85" />

				<rect x="96" y="81" width="54" height="16" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-opacity="0.45" />
				<rect x="156" y="81" width="98" height="16" fill="currentColor" fill-opacity="0.24" stroke="currentColor" stroke-opacity="0.6" />

				<rect x="150" y="111" width="46" height="16" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-opacity="0.45" />
				<rect x="232" y="111" width="70" height="16" fill={accentColor} />

				<path d="M 186 37 L 186 45 L 204 45 L 204 81" fill="none" stroke={accentColor} stroke-width="1.2" class="animate-dash-flow" />
				<path d="M 230 97 L 230 119 L 232 119" fill="none" stroke={accentColor} stroke-width="1.2" />

				<!-- Animated Live Sweep Needle -->
				<g class="animate-svg-sweep">
					<line x1="148" y1="12" x2="148" y2="146" stroke={accentColor} stroke-width="1.4" />
					<rect x="137" y="140" width="22" height="10" fill={accentColor} />
					<text x="140" y="148" fill="#F4F2EC" font-family="JetBrains Mono, monospace" font-size="7" font-weight="700">NOW</text>
				</g>
			</svg>
		{:else if type === 'mes-shopfloor'}
			<svg viewBox="0 0 320 155" class="h-auto w-full" aria-hidden="true">
				{#each [
					{ x: 6, y: 8, id: 'СТ-01', load: 96, active: true, op: 'ОП-10' },
					{ x: 112, y: 8, id: 'СТ-02', load: 91, active: false, op: 'ОП-20' },
					{ x: 218, y: 8, id: 'СТ-03', load: 88, active: false, op: 'ОП-30' },
					{ x: 6, y: 80, id: 'СТ-04', load: 94, active: false, op: 'ОП-40' },
					{ x: 112, y: 80, id: 'СТ-05', load: 98, active: true, op: 'ОП-50' },
					{ x: 218, y: 80, id: 'ОТК', load: 84, active: false, op: 'ДОПУСК' }
				] as st (st.id)}
					<rect
						x={st.x}
						y={st.y}
						width="94"
						height="58"
						fill={st.active ? accentColor : 'currentColor'}
						fill-opacity={st.active ? '0.18' : '0.05'}
						stroke={st.active ? accentColor : 'currentColor'}
						stroke-opacity={st.active ? '0.95' : '0.28'}
					/>
					<text x={st.x + 8} y={st.y + 16} fill="currentColor" font-family="JetBrains Mono, monospace" font-size="8" font-weight="700">
						{st.id}
					</text>
					<text
						x={st.x + 54}
						y={st.y + 16}
						fill={st.active ? accentColor : 'currentColor'}
						fill-opacity={st.active ? '1' : '0.55'}
						font-family="JetBrains Mono, monospace"
						font-size="7"
					>
						{st.op}
					</text>
					<text x={st.x + 8} y={st.y + 38} fill="currentColor" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700">
						{st.load}%
					</text>
					<rect x={st.x + 8} y={st.y + 46} width="78" height="4" fill="currentColor" fill-opacity="0.16" />
					<rect x={st.x + 8} y={st.y + 46} width={(78 * st.load) / 100} height="4" fill={st.active ? accentColor : 'currentColor'} />
				{/each}
				<path
					d="M 100 37 L 112 37 M 206 37 L 218 37 M 265 66 L 265 73 L 53 73 L 53 80 M 100 109 L 112 109 M 206 109 L 218 109"
					fill="none"
					stroke={accentColor}
					stroke-width="1.4"
					class="animate-dash-flow"
				/>
				<text x="6" y="151" fill="currentColor" fill-opacity="0.6" font-family="JetBrains Mono, monospace" font-size="7">
					ЗАКАЗ #8841 // ТАКТ 18.4 С // КОНТРОЛЬ ОТК АКТИВЕН
				</text>
			</svg>
		{:else if type === 'iiot-telemetry'}
			<svg viewBox="0 0 320 155" class="h-auto w-full" aria-hidden="true">
				{#each [24, 52, 80, 108] as gy (gy)}
					<line x1="6" y1={gy} x2="314" y2={gy} stroke="currentColor" stroke-opacity="0.12" />
				{/each}
				<line x1="6" y1="34" x2="314" y2="34" stroke={accentColor} stroke-width="1" stroke-dasharray="4 3" />
				<text x="218" y="30" fill={accentColor} font-family="JetBrains Mono, monospace" font-size="7">ПОРОГ ВИБРАЦИИ 92%</text>

				<polyline
					fill="none"
					stroke={accentColor}
					stroke-width="1.7"
					points="6,74 22,70 36,78 52,58 68,66 84,52 98,64 114,42 128,59 144,48 160,62 176,36 192,58 208,52 224,64 240,46 256,57 272,49 288,61 314,54"
				/>
				<polyline
					fill="none"
					stroke="currentColor"
					stroke-opacity="0.65"
					stroke-width="1.2"
					points="6,96 28,94 50,90 72,95 94,86 116,88 138,82 160,85 182,78 204,84 226,82 248,79 270,83 292,80 314,82"
				/>

				{#each [14, 24, 18, 29, 26, 22, 31, 28, 25, 32, 20, 27, 30, 24, 29, 26, 22, 30, 27, 25] as h, i (i)}
					<rect
						x={10 + i * 15}
						y={142 - h * 0.75}
						width="9"
						height={h * 0.75}
						fill={h >= 30 ? accentColor : 'currentColor'}
						fill-opacity={h >= 30 ? '0.95' : '0.32'}
					/>
				{/each}
				<text x="6" y="153" fill="currentColor" fill-opacity="0.6" font-family="JetBrains Mono, monospace" font-size="7">
					OPC-UA // 250 410 ТЕГОВ/С // KAFKA LAG: 0
				</text>
			</svg>
		{:else}
			<svg viewBox="0 0 320 155" class="h-auto w-full" aria-hidden="true">
				<path d="M 76 32 L 122 32 L 122 64 L 146 64" fill="none" stroke={accentColor} stroke-width="1.6" class="animate-dash-flow" />
				<path d="M 76 80 L 146 80" fill="none" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.1" />
				<path d="M 76 126 L 122 126 L 122 92 L 146 92" fill="none" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.1" />
				<path d="M 218 76 L 246 76" fill="none" stroke={accentColor} stroke-width="1.8" class="animate-dash-flow" />

				<rect x="6" y="16" width="70" height="30" fill={accentColor} fill-opacity="0.16" stroke={accentColor} />
				<text x="12" y="29" fill="currentColor" font-family="JetBrains Mono, monospace" font-size="7" font-weight="700">ПЛАВКА-904</text>
				<text x="12" y="40" fill="currentColor" fill-opacity="0.6" font-family="JetBrains Mono, monospace" font-size="6.5">ТИТАН ВТ6</text>

				<rect x="6" y="64" width="70" height="30" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.35" />
				<text x="12" y="77" fill="currentColor" font-family="JetBrains Mono, monospace" font-size="7">ПОДШИПНИК</text>
				<text x="12" y="88" fill="currentColor" fill-opacity="0.55" font-family="JetBrains Mono, monospace" font-size="6.5">ПАРТИЯ #412</text>

				<rect x="6" y="110" width="70" height="30" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.35" />
				<text x="12" y="123" fill="currentColor" font-family="JetBrains Mono, monospace" font-size="7">УПЛОТНЕНИЕ</text>
				<text x="12" y="134" fill="currentColor" fill-opacity="0.55" font-family="JetBrains Mono, monospace" font-size="6.5">СЕРТИФИКАТ</text>

				<rect x="146" y="50" width="72" height="52" fill="currentColor" fill-opacity="0.1" stroke={accentColor} stroke-width="1.3" />
				<text x="153" y="67" fill={accentColor} font-family="JetBrains Mono, monospace" font-size="7" font-weight="700">УЗЕЛ</text>
				<text x="153" y="80" fill="currentColor" font-family="JetBrains Mono, monospace" font-size="8" font-weight="700">РОТОР-04</text>
				<text x="153" y="94" fill="currentColor" fill-opacity="0.6" font-family="JetBrains Mono, monospace" font-size="6.5">КИМ ±0.002</text>

				<rect x="246" y="42" width="68" height="68" fill={accentColor} />
				<text x="252" y="62" fill="#0D0E10" font-family="JetBrains Mono, monospace" font-size="7" font-weight="700">SN-884109</text>
				<text x="252" y="77" fill="#0D0E10" font-family="JetBrains Mono, monospace" font-size="7" font-weight="700">ПАСПОРТ</text>
				<text x="252" y="88" fill="#0D0E10" font-family="JetBrains Mono, monospace" font-size="7" font-weight="700">ИЗДЕЛИЯ</text>
				<text x="252" y="102" fill="#0D0E10" fill-opacity="0.8" font-family="JetBrains Mono, monospace" font-size="6.5">ПРОВЕРЕНО</text>

				<text x="6" y="153" fill="currentColor" fill-opacity="0.6" font-family="JetBrains Mono, monospace" font-size="7">
					ПОЛНАЯ ПРОСЛЕЖИВАЕМОСТЬ ОТ СЫРЬЯ ДО ОТГРУЗКИ
				</text>
			</svg>
		{/if}
	</div>
</div>
