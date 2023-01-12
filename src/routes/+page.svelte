<script lang="ts">
	import SudokuGame from '$lib/components/SudokuGame.svelte';
	import { appName } from '$lib/util/store';

	export let data: import('./$types').PageData;
	$: ({ initialBoard, currentBoard, hints } = data);
</script>

<svelte:head>
	<title>{$appName}</title>
	<meta name="description" content="Sudoku game" />
</svelte:head>
<main class="flex w-full flex-auto flex-col justify-between gap-2">
	<SudokuGame {initialBoard} {currentBoard} {hints} />
</main>
