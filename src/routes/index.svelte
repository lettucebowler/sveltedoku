<script>
	import SudokuGame from '$lib/components/SudokuGame.svelte';
	import '$lib/styles/app.css';
	import {appName} from '$lib/util/store';
	export let initialGameList;
</script>

<svelte:head>
	<title>{$appName}</title>
</svelte:head>
<SudokuGame {initialGameList} />
