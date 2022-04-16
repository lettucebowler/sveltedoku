<script>
	import { createEventDispatcher } from 'svelte';
	export let buttonText;
	const dispatch = createEventDispatcher();
</script>

<button
	on:click={() => dispatch('SudokuButtonClick')}
>
	{buttonText}
</button>

<style>
	button {
		border-radius: 12px;
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
		background: var(--nord-3);
		color: var(--nord-6);
	}

	button:hover {
		background: var(--nord-2);
	}

	button:active {
		background: var(--nord-1);
	}
</style>
