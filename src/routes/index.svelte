<script context="module">
	export const prerender = false;
</script>

<script>
	import SudokuGame from '$lib/components/SudokuGame.svelte';
	import { appName } from '$lib/util/store';
	export let initialBoard;
	export let currentBoard;
	export let hints;
</script>

<svelte:head>
	<title>{$appName}</title>
	<meta name="description" content="Sudoku game" />
</svelte:head>
<main>
	<SudokuGame {initialBoard} {currentBoard} {hints} />
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
