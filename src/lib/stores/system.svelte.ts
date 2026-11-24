import type Lenis from 'lenis';

export type ThemePolarity = 'light' | 'dark';
export type CursorVariant = 'default' | 'inspect' | 'schedule' | 'action' | 'drag';

export interface CursorState {
	active: boolean;
	label: string;
	variant: CursorVariant;
}

class SystemStore {
	theme = $state<ThemePolarity>('dark');
	booted = $state(false);
	preloaderDone = $state(false);
	dispatchModalOpen = $state(false);
	scrollProgress = $state(0);
	scrollVelocity = $state(0);
	cursor = $state<CursorState>({
		active: false,
		label: '',
		variant: 'default'
	});

	private lenis: Lenis | null = null;

	initTheme(): void {
		if (typeof document === 'undefined') return;
		const attr = document.documentElement.dataset.theme;
		if (attr === 'dark' || attr === 'light') {
			this.theme = attr;
		}
	}

	toggleTheme(): void {
		const next: ThemePolarity = this.theme === 'dark' ? 'light' : 'dark';
		this.theme = next;
		if (typeof document !== 'undefined') {
			document.documentElement.dataset.theme = next;
			try {
				localStorage.setItem('promsys-theme', next);
			} catch {
				// Ignore storage access errors in restricted frames
			}
		}
	}

	markBooted(): void {
		this.booted = true;
	}

	markPreloaderDone(): void {
		this.preloaderDone = true;
		this.booted = true;
		this.lenis?.start();
	}

	registerLenis(instance: Lenis | null): void {
		this.lenis = instance;
		if (instance && !this.preloaderDone) {
			instance.stop();
		}
	}

	scrollToTarget(target: string | HTMLElement | number, offset = -56): void {
		if (this.lenis) {
			this.lenis.scrollTo(target, {
				offset,
				duration: 1.15,
				easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
			});
			return;
		}

		if (typeof document !== 'undefined' && typeof target === 'string') {
			const el = document.querySelector(target);
			el?.scrollIntoView({ behavior: 'smooth' });
		}
	}

	setCursor(label: string, variant: CursorVariant = 'inspect'): void {
		this.cursor = { active: true, label, variant };
	}

	resetCursor(): void {
		this.cursor = { active: false, label: '', variant: 'default' };
	}

	openDispatchModal(): void {
		this.dispatchModalOpen = true;
		this.lenis?.stop();
	}

	closeDispatchModal(): void {
		this.dispatchModalOpen = false;
		if (this.preloaderDone) {
			this.lenis?.start();
		}
	}
}

export const systemState = new SystemStore();
