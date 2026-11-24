import type { Action } from 'svelte/action';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface TextRevealOptions {
	/** 'scroll' triggers via ScrollTrigger; 'manual' waits until `ready` is true */
	mode?: 'scroll' | 'manual';
	/** Used when mode === 'manual' to trigger reveal (e.g. after preloader exits) */
	ready?: boolean;
	/** How to segment text: 'lines' groups by measured visual line; 'words' animates word-by-word */
	splitBy?: 'lines' | 'words';
	stagger?: number;
	duration?: number;
	delay?: number;
	yPercent?: number;
	start?: string;
}

let pluginRegistered = false;

function ensureScrollTrigger(): void {
	if (typeof window === 'undefined' || pluginRegistered) return;
	gsap.registerPlugin(ScrollTrigger);
	pluginRegistered = true;
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/**
 * Splits element text into overflow-hidden masked visual lines or words using pure TypeScript
 * (zero paid GSAP SplitText dependency).
 */
function splitElementIntoMaskedUnits(
	node: HTMLElement,
	originalText: string,
	splitBy: 'lines' | 'words'
): HTMLElement[] {
	const rawLines = originalText
		.split(/\n/)
		.map((line) => line.trim())
		.filter((line) => line.length > 0);

	if (rawLines.length === 0) return [];

	if (splitBy === 'words') {
		const inners: HTMLElement[] = [];
		node.textContent = '';

		rawLines.forEach((rawLine, lineIdx) => {
			const words = rawLine.split(/\s+/).filter(Boolean);
			words.forEach((word, wordIdx) => {
				const mask = document.createElement('span');
				mask.style.display = 'inline-block';
				mask.style.overflow = 'hidden';
				mask.style.verticalAlign = 'bottom';
				mask.style.paddingBottom = '0.06em';
				mask.style.marginBottom = '-0.06em';

				const inner = document.createElement('span');
				inner.style.display = 'inline-block';
				inner.style.willChange = 'transform';
				inner.textContent = word;

				mask.appendChild(inner);
				node.appendChild(mask);
				inners.push(inner);

				if (wordIdx < words.length - 1) {
					node.appendChild(document.createTextNode(' '));
				}
			});

			if (lineIdx < rawLines.length - 1) {
				node.appendChild(document.createElement('br'));
			}
		});

		return inners;
	}

	// Step 1: Temporarily wrap every word in an inline-block span to measure exact visual line breaks
	const measureFragments: string[] = [];
	rawLines.forEach((rawLine, lineIdx) => {
		const words = rawLine.split(/\s+/).filter(Boolean);
		const spans = words
			.map((w) => `<span data-tr-word="1" style="display:inline-block">${escapeHtml(w)}</span>`)
			.join(' ');
		measureFragments.push(spans);
		if (lineIdx < rawLines.length - 1) {
			measureFragments.push('<br data-tr-br="1" />');
		}
	});

	node.innerHTML = measureFragments.join('');

	// Step 2: Bucket words by rendered top offset (tolerance 4px for subpixel rounding)
	const wordEls = Array.from(node.querySelectorAll<HTMLElement>('[data-tr-word="1"]'));
	const visualLines: string[][] = [];
	let currentTop: number | null = null;

	for (const el of wordEls) {
		const rect = el.getBoundingClientRect();
		const top = Math.round(rect.top);
		if (currentTop === null || Math.abs(top - currentTop) > 4) {
			visualLines.push([el.textContent ?? '']);
			currentTop = top;
		} else {
			visualLines[visualLines.length - 1].push(el.textContent ?? '');
		}
	}

	// Step 3: Build final masked DOM lines
	node.textContent = '';
	const lineInners: HTMLElement[] = [];

	for (const words of visualLines) {
		const mask = document.createElement('span');
		mask.className = 'text-reveal-line-mask';

		const inner = document.createElement('span');
		inner.className = 'text-reveal-line-inner';
		inner.textContent = words.join(' ');

		mask.appendChild(inner);
		node.appendChild(mask);
		lineInners.push(inner);
	}

	return lineInners;
}

export const textReveal: Action<HTMLElement, TextRevealOptions | undefined> = (
	node,
	initialOptions = {}
) => {
	if (typeof window === 'undefined') {
		return {};
	}

	ensureScrollTrigger();

	let options: Required<TextRevealOptions> = {
		mode: initialOptions.mode ?? 'scroll',
		ready: initialOptions.ready ?? false,
		splitBy: initialOptions.splitBy ?? 'lines',
		stagger: initialOptions.stagger ?? 0.065,
		duration: initialOptions.duration ?? 0.92,
		delay: initialOptions.delay ?? 0,
		yPercent: initialOptions.yPercent ?? 108,
		start: initialOptions.start ?? 'top 88%'
	};

	const originalText = (node.textContent ?? '').trim();
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	let targets: HTMLElement[] = [];
	let tween: gsap.core.Tween | null = null;
	let trigger: ScrollTrigger | null = null;
	let hasPlayed = false;
	let destroyed = false;

	function cleanupAnimation(): void {
		trigger?.kill();
		trigger = null;
		tween?.kill();
		tween = null;
	}

	function playReveal(): void {
		if (destroyed || hasPlayed || targets.length === 0) return;
		hasPlayed = true;

		if (prefersReducedMotion) {
			gsap.set(targets, { yPercent: 0, opacity: 1 });
			return;
		}

		tween = gsap.to(targets, {
			yPercent: 0,
			opacity: 1,
			duration: options.duration,
			delay: options.delay,
			stagger: options.stagger,
			ease: 'power4.out',
			clearProps: 'willChange'
		});
	}

	function mount(): void {
		if (destroyed || !originalText) return;

		targets = splitElementIntoMaskedUnits(node, originalText, options.splitBy);
		if (targets.length === 0) return;

		if (prefersReducedMotion) {
			gsap.set(targets, { yPercent: 0, opacity: 1 });
			hasPlayed = true;
			return;
		}

		gsap.set(targets, { yPercent: options.yPercent, opacity: 0.001 });

		if (options.mode === 'manual') {
			if (options.ready) {
				playReveal();
			}
			return;
		}

		trigger = ScrollTrigger.create({
			trigger: node,
			start: options.start,
			once: true,
			onEnter: () => playReveal()
		});
	}

	// Wait a frame so webfont / layout width is stabilized before measuring visual line breaks
	const rafId = window.requestAnimationFrame(() => {
		if (!destroyed) {
			mount();
		}
	});

	return {
		update(nextOptions: TextRevealOptions = {}) {
			const wasReady = options.ready;
			options = {
				...options,
				...nextOptions
			};

			if (options.mode === 'manual' && !wasReady && options.ready) {
				if (targets.length > 0) {
					playReveal();
				} else {
					mount();
				}
			}
		},
		destroy() {
			destroyed = true;
			window.cancelAnimationFrame(rafId);
			cleanupAnimation();
			if (originalText) {
				node.textContent = originalText;
			}
		}
	};
};
