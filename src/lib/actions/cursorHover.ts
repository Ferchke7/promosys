import type { Action } from 'svelte/action';
import { systemState, type CursorVariant } from '#lib/stores/system.svelte.ts';

export interface CursorHoverParams {
	label: string;
	variant?: CursorVariant;
}

export const cursorHover: Action<HTMLElement, CursorHoverParams | undefined> = (node, params) => {
	let current = params;

	const onEnter = () => {
		if (!current) return;
		systemState.setCursor(current.label, current.variant ?? 'inspect');
	};

	const onLeave = () => {
		systemState.resetCursor();
	};

	node.addEventListener('pointerenter', onEnter);
	node.addEventListener('pointerleave', onLeave);

	return {
		update(nextParams) {
			current = nextParams;
		},
		destroy() {
			node.removeEventListener('pointerenter', onEnter);
			node.removeEventListener('pointerleave', onLeave);
			systemState.resetCursor();
		}
	};
};
