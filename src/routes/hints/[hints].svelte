<script>
	import SudokuGame from '$lib/components/SudokuGame.svelte';
	import '$lib/styles/app.css';
	import { appName } from '$lib/util/store';
	export let initialBoard;
	export let hints;
</script>

<svelte:head>
	<title>{$appName}</title>
	<meta name="description" content="Sudoku game with custom hint value" />
</svelte:head>
<SudokuGame {initialBoard} {hints} />
