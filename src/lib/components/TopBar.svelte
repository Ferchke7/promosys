<script lang="ts">
	import { systemState } from '#lib/stores/system.svelte.ts';
	import { cursorHover } from '#lib/actions/cursorHover.ts';

	let stackMenuOpen = $state(false);

	const navItems = [
		{ label: 'Демо-Завод', href: '#demo' },
		{ label: 'Сейчас', href: '#now' },
		{ label: 'Модули', href: '#modules' },
		{ label: 'Конвейер', href: '#pipeline' },
		{ label: 'Симулятор', href: '#architecture' },
		{ label: 'Запуск', href: '#onboarding' },
		{ label: 'FAQ', href: '#faq' }
	] as const;

	const driverCatalog = [
		{ name: 'SIEMENS SINUMERIK', proto: 'OPC-UA / S7', count: '48 стоек' },
		{ name: 'FANUC CNC', proto: 'FOCAS 2', count: '36 стоек' },
		{ name: 'HEIDENHAIN', proto: 'DNC / LSV2', count: '19 стоек' },
		{ name: 'BECKHOFF PLC', proto: 'ADS / MQTT', count: '24 контроллера' },
		{ name: '1C:ERP / SAP', proto: 'REST / KAFKA', count: 'Двусторонний мост' },
		{ name: 'УНИВЕРСАЛЬНЫЕ СТАНКИ', proto: 'MODBUS I/O', count: '15 модулей' }
	] as const;

	function navigate(e: MouseEvent, href: string): void {
		e.preventDefault();
		stackMenuOpen = false;
		systemState.scrollToTarget(href, -56);
	}
</script>

<header
	class="fixed inset-x-0 top-0 z-50 border-b border-[var(--border-hairline)] bg-[var(--bg-primary)]/94 backdrop-blur-sm transition-colors duration-250"
>
	<!-- 2px Signal Progress Hairline -->
	<div class="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]">
		<div
			class="h-full origin-left bg-[var(--accent)] transition-transform duration-75"
			style="transform: scaleX({systemState.scrollProgress});"
		></div>
	</div>

	<div class="mx-auto flex h-14 max-w-[1680px] items-center justify-between px-4 lg:px-8">
		<!-- Left: Pixel Mark + Clean Russian Nav -->
		<div class="flex items-center gap-6 lg:gap-8">
			<a
				href="#hero"
				onclick={(e) => navigate(e, '#hero')}
				use:cursorHover={{ label: '[ НАВЕРХ ]', variant: 'action' }}
				class="font-pixel flex items-start gap-1 text-xl font-bold tracking-[0.04em] uppercase transition-opacity hover:opacity-80"
			>
				<span>PROMSYS</span>
				<span class="font-mono-tech text-[10px] font-bold text-[var(--accent)]">®</span>
			</a>

			<nav aria-label="Основная навигация" class="hidden items-center gap-5 lg:flex">
				<button
					type="button"
					onclick={() => (stackMenuOpen = !stackMenuOpen)}
					aria-expanded={stackMenuOpen}
					use:cursorHover={{ label: '[ ДРАЙВЕРЫ ]', variant: 'inspect' }}
					class="font-mono-tech flex items-center gap-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
				>
					<span>Оборудование</span>
					<span class="text-[var(--accent)] font-bold">{stackMenuOpen ? '×' : '+'}</span>
				</button>

				{#each navItems as item (item.href)}
					<a
						href={item.href}
						onclick={(e) => navigate(e, item.href)}
						use:cursorHover={{ label: `[ ${item.label.toUpperCase()} ]`, variant: 'inspect' }}
						class="font-mono-tech text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>

		<!-- Right: Direct Telegram / Phone + Live OEE + Polarity Toggle + Stepped Cream CTA -->
		<div class="flex items-center gap-3 sm:gap-4">
			<a
				href="https://t.me/promsys_uz"
				target="_blank"
				rel="noreferrer"
				use:cursorHover={{ label: '[ TELEGRAM ]', variant: 'action' }}
				class="font-mono-tech hidden items-center gap-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] xl:flex"
			>
				<span class="text-[var(--accent)]">TG:</span>
				<span>@promsys_uz</span>
			</a>

			<a
				href="tel:+998771176696"
				use:cursorHover={{ label: '[ ПОЗВОНИТЬ ]', variant: 'action' }}
				class="font-mono-tech hidden items-center gap-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] md:flex"
			>
				<span>+998 (77) 117-66-96</span>
			</a>

			<div
				class="font-mono-tech hidden items-center gap-2 text-[11px] tracking-[0.08em] text-[var(--text-secondary)] uppercase sm:flex"
			>
				<span class="signal-pulse inline-block h-2 w-2 bg-[var(--accent)]"></span>
				<span>OEE <strong class="text-[var(--text-primary)]">94.8%</strong></span>
			</div>

			<button
				type="button"
				onclick={() => systemState.toggleTheme()}
				use:cursorHover={{ label: '[ ИНВЕРСИЯ ]', variant: 'action' }}
				aria-label="Переключить светлую и темную тему"
				class="font-mono-tech flex items-center gap-1.5 border border-[var(--border-hairline)] px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
			>
				<span
					class="inline-block h-2 w-2 border border-current"
					class:bg-current={systemState.theme === 'dark'}
				></span>
				<span>{systemState.theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
			</button>

			<button
				type="button"
				onclick={() => {
					stackMenuOpen = false;
					systemState.openDispatchModal();
				}}
				use:cursorHover={{ label: '[ ПИЛОТ ]', variant: 'schedule' }}
				class="btn-stepped font-mono-tech inline-flex items-center gap-1.5 bg-[var(--bg-inverted)] px-4 py-2 text-xs font-bold tracking-[0.04em] text-[var(--text-inverted)] transition-colors hover:bg-[var(--accent)] hover:text-[#F4F2EC]"
			>
				<span>Пилот</span>
				<span aria-hidden="true">↗</span>
			</button>
		</div>
	</div>

	<!-- SLG-inspired Mega-Dropdown: Supported CNC / PLC / ERP Matrix -->
	{#if stackMenuOpen}
		<div
			class="border-t border-[var(--border-hairline)] bg-[var(--bg-deep)]/98 shadow-none backdrop-blur-md"
		>
			<div class="mx-auto max-w-[1680px] px-4 py-6 lg:px-8">
				<div class="mb-4 flex items-center justify-between">
					<div class="font-mono-tech text-[11px] tracking-[0.14em] text-[var(--accent)] uppercase">
						// ПОДКЛЮЧАЕМОЕ ОБОРУДОВАНИЕ И ПРОТОКОЛЫ ИЗ КОРОБКИ
					</div>
					<button
						type="button"
						onclick={() => (stackMenuOpen = false)}
						class="font-mono-tech text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
					>
						[ ЗАКРЫТЬ × ]
					</button>
				</div>
				<div class="grid grid-cols-1 border-t border-l border-[var(--border-hairline)] sm:grid-cols-2 lg:grid-cols-3">
					{#each driverCatalog as drv (drv.name)}
						<button
							type="button"
							onclick={(e) => navigate(e, '#modules')}
							class="group flex items-center justify-between border-r border-b border-[var(--border-hairline)] p-4 text-left transition-colors hover:bg-[var(--bg-elevated)]"
						>
							<div>
								<div class="font-industrial text-base font-bold tracking-[0.02em] group-hover:text-[var(--accent)]">
									{drv.name}
								</div>
								<div class="font-mono-tech mt-1 text-[11px] text-[var(--text-muted)]">{drv.proto}</div>
							</div>
							<span class="font-mono-tech text-xs font-semibold text-[var(--accent)]">
								{drv.count}
							</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</header>
