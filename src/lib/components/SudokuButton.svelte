<script>
	import { createEventDispatcher } from 'svelte';
	export let buttonText;
	export let square = true;
	export let fluid = false;
	const dispatch = createEventDispatcher();
	export let type;
</script>

<button
	class={`${type} ${square ? 'square' : ''} ${fluid ? 'fluid' : ''}`}
	on:click={() => dispatch('SudokuButtonClick')}
>
	{buttonText}
</button>

<style>
	button {
		border-radius: 6px;
		border: none;
		transition: 0.1s ease-in-out;
		cursor: pointer;
		display: inline;
		align-items: center;
		justify-content: center;
		font-family: inherit;
		min-height: 50px;
		height: calc(100%);
		width: calc(100%);
		font-size: 2.5rem;
	}

	.primary {
		background: var(--nord-3);
		color: var(--nord-6);
	}

	.primary:hover {
		background: var(--nord-2);
	}

	.primary:active {
		background: var(--nord-1);
	}
</style>
