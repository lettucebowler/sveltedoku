<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let buttonText: string;
	const dispatch = createEventDispatcher();
</script>

<button
	class="grid min-h-[3rem] w-full cursor-pointer place-items-center rounded-lg border-none bg-charade-600 p-1.5 text-2xl text-snow-300 transition duration-[0.1s] duration-150 ease-in-out hover:bg-charade-700 active:bg-charade-800"
	on:click={() => dispatch('SudokuButtonClick')}
>
	{buttonText}
</button>
