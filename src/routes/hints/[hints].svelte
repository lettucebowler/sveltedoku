<script context="module">
	export const prerender = false;
</script>

<script lang="ts">
	import SudokuGame from '$lib/components/SudokuGame.svelte';
	import { appName } from '$lib/util/store';
	export let initialBoard: number[];
	export let hints: number;
</script>

<svelte:head>
	<title>{$appName}</title>
	<meta name="description" content="Sudoku game with custom hint value" />
</svelte:head>
<main>
	<SudokuGame {initialBoard} {hints} />
</main>

<style>
	main {
		display: flex;
		justify-content: space-between;
		gap: 8px;
		flex-direction: column;
		flex: 1 1 auto;
	}
</style>
