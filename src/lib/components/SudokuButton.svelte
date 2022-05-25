<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let buttonText: string;
	const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('SudokuButtonClick')}>
	{buttonText}
</button>

<style>
	button {
		border-radius: 11px;
		border: none;
		padding: 6px;
		transition: 0.1s ease-in-out;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-family: inherit;
		min-height: 50px;
		height: min(100%, calc((42vh - 32px) / 3));
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
