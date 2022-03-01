<script>
	import SudokuGame from '$lib/components/SudokuGame.svelte';
	import PageContentContainer from '$lib/components/PageContentContainer.svelte';
	import '$lib/styles/app.css';

	export let initialGameList;
</script>

<PageContentContainer>
	<SudokuGame {initialGameList} />
</PageContentContainer>
