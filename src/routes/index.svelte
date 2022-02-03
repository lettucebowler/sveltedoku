<script>
	import SudokuGame from '../components/SudokuGame.svelte';
	import PageContentContainer from '../components/PageContentContainer.svelte';
	import '../app.css';
</script>

<PageContentContainer>
	<SudokuGame hints={30} />
</PageContentContainer>
