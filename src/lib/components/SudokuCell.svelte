<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let number = 0;
	export let row: number;
	export let col: number;
	export let selected = false;
	export let peerCell = false;
	export let peerDigit = false;
	export let valid = true;
	export let initial = false;
	export let success = false;

	const getClass = (
		selected: boolean,
		peerCell: boolean,
		peerDigit: boolean,
		initial: boolean,
		valid: boolean,
		success: boolean,
		number: number
	) => {
		const classes = [];
		initial && classes.push('initial');
		number || classes.push('hidden');
		selected && !success && classes.push('selected');
		peerCell && classes.push('peerCell');
		peerDigit && classes.push('peerDigit');
		valid && classes.push('valid');
		!valid && classes.push('invalid');
		success && classes.push('success');

		return classes.join(' ');
	};

	$: classString = getClass(selected, peerCell, peerDigit, initial, valid, success, number);

	const dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('cellSelection', {
			row,
			col
		});
	};
</script>

<div on:click={handleClick} class={classString}>
	{number}
</div>

<style>
	div {
		display: grid;
		place-items: center;
		font-weight: 700;
		font-size: 175%;
		background-color: var(--background-color);
		color: var(--nord-10);
		text-align: center;
		cursor: pointer;
		-webkit-user-select: none; /* Safari */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
	}

	div:hover {
		background-color: var(--nord-13);
	}

	.peerCell {
		background-color: var(--nord-8);
	}

	.peerDigit {
		background-color: var(--nord-9);
	}

	.initial {
		color: var(--nord-2) !important;
	}

	.hidden {
		color: transparent;
	}

	.invalid {
		color: var(--nord-11);
	}

	.peerDigit.initial.invalid {
		background-color: var(--nord-15);
	}

	.peerDigit.invalid {
		background-color: var(--nord-15);
	}

	.success {
		background-color: var(--nord-14);
	}

	.selected {
		background-color: var(--nord-13) !important;
	}

	.inputselect {
		caret-color: transparent;
	}

	.success:hover {
		background-color: var(--nord-14);
	}
</style>
