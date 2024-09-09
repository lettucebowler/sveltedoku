import type { Action } from 'svelte/action';

export const focus: Action<HTMLElement, boolean> = (node, value) => {
	let stop: () => void;
	const destroy = () => {
		stop && stop();
	};
	const update = (value: boolean) => {
		destroy();
		if (value) {
			node.focus();
		} else {
			node.blur();
		}
	};
	update(value as boolean);
	return {
		update,
		destroy
	};
};
