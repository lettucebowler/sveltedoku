<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let buttonText: string;
	const dispatch = createEventDispatcher();
</script>

<button
	class="rounded-lg border-none p-1.5 duration-[0.1s] cursor-pointer text-snow-300 grid place-items-center text-2xl bg-polar-400 w-full min-h-[3rem] hover:bg-polar-300 transition ease-in-out duration-150 active:bg-polar-200"
	on:click={() => dispatch('SudokuButtonClick')}
>
	{buttonText}
</button>
