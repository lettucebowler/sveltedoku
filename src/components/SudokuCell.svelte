<script>
	import { createEventDispatcher } from 'svelte';

	export let number = 0;
	export let row;
	export let col;
	export let selected = false;
	export let peerCell = false;

	let w;
	let h;
	let clicked = false;

	const dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('cellSelection', {
			row,
			col
		});
	};
</script>

<div
	on:click={handleClick}
	bind:clientWidth={w}
	bind:clientHeight={h}
	style="
        font-size: {w * 0.5}px;
    "
	class={`${!!selected ? 'selected' : ''} ${!!peerCell ? 'peerCell' : ''}`}
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
</style>
