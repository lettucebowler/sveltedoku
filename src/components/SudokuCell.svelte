<script>
	import { createEventDispatcher } from 'svelte';

	export let number = 0;
	export let row;
	export let col;
	export let selected = false;
	export let peerCell = false;
	export let peerDigit = false;
	export let valid = true;
	export let order = 3;
	export let initial = false;
	export let success = false;

	let w;
	let h;
	let clicked = false;

	const top = row === 0;
	const bottom = row === order * order - 1;
	const left = col === 0;
	const right = col === order * order - 1;

	const dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('cellSelection', {
			row,
			col
		});
	};

	const getValidity = (initial, valid) => {
		if (initial) {
			return true;
		}
		return valid;
	};
</script>

<div
	on:click={handleClick}
	bind:clientWidth={w}
	bind:clientHeight={h}
	style="
        font-size: {w * 0.5}px;
    "
	class={`
		${!!selected ? 'selected' : ''}
		${!!peerCell ? 'peerCell' : ''}
		${!!peerDigit ? 'peerDigit' : ''}
		${top && right ? 'topRight' : ''}
		${top && left ? 'topLeft' : ''}
		${bottom && right ? 'bottomRight' : ''}
		${bottom && left ? 'bottomLeft' : ''}
		${getValidity(initial, valid) ? 'valid' : 'invalid'}
		${initial ? 'initial' : ''}
		${success ? 'success' : ''}
	`}
>
	{number !== 0 ? number : ''}
</div>

<style>
	div {
		display: grid;
		aspect-ratio: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--background-color);
		color: var(--text-color);
		text-align: center;
		cursor: pointer;
	}

	div:hover {
		background-color: var(--nord-13);
	}

	.selected {
		background-color: var(--nord-13);
	}

	.peerCell {
		background-color: var(--nord-8);
	}

	.peerDigit {
		background-color: var(--nord-9);
	}

	.peerDigit.peerCell.invalid {
		background-color: var(--nord-15);
	}

	.valid {
		color: var(--nord-10);
	}

	.invalid {
		color: var(--nord-11);
	}

	.topLeft {
		border-radius: 6px 0 0 0;
	}

	.topRight {
		border-radius: 0 6px 0 0;
	}

	.bottomLeft {
		border-radius: 0 0 0 6px;
	}

	.bottomRight {
		border-radius: 0 0 6px 0;
	}

	.initial {
		color: var(--nord-2);
	}

	.success {
		background-color: var(--nord-14);
	}
</style>
