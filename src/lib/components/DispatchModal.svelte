<script lang="ts">
	import { browser } from '$app/env';
	import { systemState } from '#lib/stores/system.svelte.ts';

	let plantScale = $state('6—20 LINES');
	let erpStack = $state('1C:ERP');
	let contactEmail = $state('');
	let contactPhone = $state('+998 ');
	let plantName = $state('');
	let ticketId = $state<string | null>(null);

	const scales = ['1—5 LINES', '6—20 LINES', '20+ ENTERPRISE'] as const;
	const erps = ['SAP S/4HANA', '1C:ERP', 'ORACLE / INFOR', 'CUSTOM API'] as const;

	function getTelegramUrl(): string {
		const text = `PROMSYS: Запрос аудита MES/APS\nПредприятие: ${plantName || 'Не указано'}\nМасштаб: ${plantScale}\nERP: ${erpStack}\nEmail: ${contactEmail || 'Не указан'}\nТелефон: ${contactPhone || 'Не указан'}`;
		return `https://t.me/promsys_uz?text=${encodeURIComponent(text)}`;
	}

	function handleSubmit(e: SubmitEvent): void {
		e.preventDefault();
		if (!contactEmail.trim() && !contactPhone.trim()) return;
		const code = Math.floor(1000 + Math.random() * 9000);
		ticketId = `PS-${code}`;
	}

	function handleClose(): void {
		ticketId = null;
		systemState.closeDispatchModal();
	}

	$effect(() => {
		if (!browser || !systemState.dispatchModalOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});
</script>

{#if systemState.dispatchModalOpen}
	<div
		class="fixed inset-0 z-[150] flex justify-end bg-black/60 backdrop-blur-[2px]"
		role="dialog"
		aria-modal="true"
		aria-labelledby="dispatch-modal-title"
	>
		<!-- Backdrop click target -->
		<button
			type="button"
			aria-label="Закрыть окно запроса"
			onclick={handleClose}
			class="flex-1 cursor-default bg-transparent"
		></button>

		<!-- Brutalist Right Terminal Drawer -->
		<div
			data-lenis-prevent
			class="flex h-full w-full max-w-xl flex-col justify-between overflow-y-auto border-l border-[var(--border-strong)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
		>
			<div>
				<!-- Drawer Header -->
				<div
					class="font-mono-tech flex items-center justify-between border-b border-[var(--border-hairline)] px-6 py-4 text-[11px] tracking-[0.14em] uppercase"
				>
					<span class="flex items-center gap-2 font-semibold">
						<span class="inline-block h-2 w-2 bg-[var(--accent)]"></span>
						<span>DISPATCH // PILOT CONFIGURATION</span>
					</span>
					<button
						type="button"
						onclick={handleClose}
						class="border border-[var(--border-hairline)] px-2.5 py-1 text-[10px] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#F4F4F2]"
					>
						[ CLOSE // ESC ]
					</button>
				</div>

				<div class="p-6 sm:p-8">
					<h3
						id="dispatch-modal-title"
						class="text-2xl font-bold tracking-[-0.03em] uppercase sm:text-3xl"
					>
						PROMSYS // Запрос аудита цеха
					</h3>
					<p class="mt-2 text-sm text-[var(--text-secondary)]">
						Укажите масштаб парка оборудования и контур ERP — инженерная команда в Ташкенте подготовит расчет
						архитектуры и демонстрацию решателя на ваших данных.
					</p>

					<!-- Direct Emergency / Telegram Fast Bar -->
					<div class="mt-4 flex flex-wrap items-center gap-3 border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-3 text-[11px]">
						<span class="text-[var(--text-muted)]">Прямая связь:</span>
						<a
							href="https://t.me/promsys_uz"
							target="_blank"
							rel="noreferrer"
							class="font-mono-tech font-bold text-[var(--accent)] hover:underline"
						>
							Telegram @promsys_uz ↗
						</a>
						<span class="text-[var(--text-muted)]">·</span>
						<a
							href="tel:+998771176696"
							class="font-mono-tech font-bold text-[var(--text-primary)] hover:underline"
						>
							+998 (77) 117-66-96
						</a>
					</div>

					{#if ticketId}
						<div class="mt-6 border border-[var(--accent)] bg-[var(--bg-elevated)] p-6">
							<div class="font-mono-tech text-xs font-bold text-[var(--accent)] uppercase">
								[OK] DISPATCH_TICKET #{ticketId} REGISTERED
							</div>
							<p class="mt-3 text-sm leading-relaxed text-[var(--text-primary)]">
								Заявка зафиксирована в диспетчерском журнале PROMSYS. Архитектор внедрения свяжется с вами в течение 4 рабочих часов.
							</p>
							<div
								class="font-mono-tech mt-4 space-y-1 border-t border-[var(--border-hairline)] pt-3 text-[11px] text-[var(--text-secondary)] uppercase"
							>
								<div>SCALE: {plantScale}</div>
								<div>ERP BRIDGE: {erpStack}</div>
								{#if plantName}
									<div>FACILITY: {plantName}</div>
								{/if}
								{#if contactPhone}
									<div>PHONE: {contactPhone}</div>
								{/if}
								{#if contactEmail}
									<div>EMAIL: {contactEmail}</div>
								{/if}
							</div>

							<a
								href={getTelegramUrl()}
								target="_blank"
								rel="noreferrer"
								class="font-mono-tech mt-6 flex w-full items-center justify-center gap-2 bg-[#229ED9] py-3.5 text-xs font-bold tracking-[0.14em] text-white uppercase hover:brightness-110"
							>
								<span>ОТПРАВИТЬ СРАЗУ В TELEGRAM</span>
								<span>↗</span>
							</a>

							<button
								type="button"
								onclick={handleClose}
								class="font-mono-tech mt-3 w-full bg-[var(--bg-inverted)] py-3 text-xs font-bold tracking-[0.14em] text-[var(--text-inverted)] uppercase hover:bg-[var(--accent)] hover:text-[#F4F4F2]"
							>
								ВЕРНУТЬСЯ К ПЛАТФОРМЕ
							</button>
						</div>
					{:else}
						<form onsubmit={handleSubmit} class="mt-6 space-y-5">
							<!-- Scale Selector -->
							<div>
								<div class="font-mono-tech mb-2 text-[10px] tracking-[0.14em] text-[var(--text-muted)] uppercase">
									01 / МАСШТАБ ПРОИЗВОДСТВА
								</div>
								<div class="grid grid-cols-3 gap-2">
									{#each scales as scale (scale)}
										<button
											type="button"
											onclick={() => (plantScale = scale)}
											class="font-mono-tech border py-2.5 text-[10px] font-semibold tracking-[0.1em] uppercase transition-colors"
											class:border-[var(--accent)]={plantScale === scale}
											class:bg-[var(--bg-inverted)]={plantScale === scale}
											class:text-[var(--text-inverted)]={plantScale === scale}
											class:border-[var(--border-hairline)]={plantScale !== scale}
										>
											{scale}
										</button>
									{/each}
								</div>
							</div>

							<!-- ERP Selector -->
							<div>
								<div class="font-mono-tech mb-2 text-[10px] tracking-[0.14em] text-[var(--text-muted)] uppercase">
									02 / ИНТЕГРАЦИЯ С ERP
								</div>
								<div class="grid grid-cols-2 gap-2">
									{#each erps as erp (erp)}
										<button
											type="button"
											onclick={() => (erpStack = erp)}
											class="font-mono-tech border py-2.5 text-[10px] font-semibold tracking-[0.1em] uppercase transition-colors"
											class:border-[var(--accent)]={erpStack === erp}
											class:bg-[var(--bg-inverted)]={erpStack === erp}
											class:text-[var(--text-inverted)]={erpStack === erp}
											class:border-[var(--border-hairline)]={erpStack !== erp}
										>
											{erp}
										</button>
									{/each}
								</div>
							</div>

							<!-- Facility Name -->
							<div>
								<label
									for="plant-name"
									class="font-mono-tech mb-2 block text-[10px] tracking-[0.14em] text-[var(--text-muted)] uppercase"
								>
									03 / ПРЕДПРИЯТИЕ / ПЛОЩАДКА
								</label>
								<input
									id="plant-name"
									type="text"
									bind:value={plantName}
									placeholder="Например: Завод точного машиностроения (Ташкент)"
									class="font-mono-tech w-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
								/>
							</div>

							<!-- Work Phone -->
							<div>
								<label
									for="contact-phone"
									class="font-mono-tech mb-2 block text-[10px] tracking-[0.14em] text-[var(--text-muted)] uppercase"
								>
									04 / ТЕЛЕФОН (УЗБЕКИСТАН) *
								</label>
								<input
									id="contact-phone"
									type="tel"
									required
									bind:value={contactPhone}
									placeholder="+998 (90) 123-45-67"
									class="font-mono-tech w-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
								/>
							</div>

							<!-- Work Email -->
							<div>
								<label
									for="contact-email"
									class="font-mono-tech mb-2 block text-[10px] tracking-[0.14em] text-[var(--text-muted)] uppercase"
								>
									05 / КОРПОРАТИВНЫЙ EMAIL
								</label>
								<input
									id="contact-email"
									type="email"
									bind:value={contactEmail}
									placeholder="chief.engineer@factory.uz"
									class="font-mono-tech w-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
								/>
							</div>

							<div class="flex flex-col gap-2 pt-2">
								<button
									type="submit"
									class="font-mono-tech flex w-full items-center justify-between border border-[var(--bg-inverted)] bg-[var(--bg-inverted)] px-6 py-4 text-xs font-bold tracking-[0.14em] text-[var(--text-inverted)] uppercase transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#F4F4F2]"
								>
									<span>ОТПРАВИТЬ В ДИСПЕТЧЕРСКУЮ PROMSYS</span>
									<span>→</span>
								</button>

								<a
									href={getTelegramUrl()}
									target="_blank"
									rel="noreferrer"
									class="font-mono-tech flex w-full items-center justify-center gap-2 border border-[#229ED9] bg-[#229ED9]/10 px-6 py-3 text-xs font-bold tracking-[0.12em] text-[#229ED9] uppercase transition-colors hover:bg-[#229ED9] hover:text-white"
								>
									<span>ИЛИ НАПИСАТЬ В TELEGRAM @PROMSYS_UZ</span>
									<span>↗</span>
								</a>
							</div>
						</form>
					{/if}
				</div>
			</div>

			<div
				class="font-mono-tech border-t border-[var(--border-hairline)] px-6 py-3.5 text-[10px] tracking-[0.12em] text-[var(--text-muted)] uppercase"
			>
				NDA READY // ON-PREMISE DEPLOYMENT // ZERO CLOUD LOCK-IN
			</div>
		</div>
	</div>
{/if}
