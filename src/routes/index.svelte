<script>
	import SudokuGame from '$lib/components/SudokuGame.svelte';
	import '$lib/styles/app.css';

	export let initialGameList;
</script>

<SudokuGame {initialGameList} />
