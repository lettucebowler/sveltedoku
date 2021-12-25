<script>
	import SudokuBoard from '../components/SudokuBoard.svelte';
	import PageContentContainer from '../components/PageContentContainer.svelte';
	console.log(
		[
			[2, 3, 7, 8, 4, 1, 5, 6, 9],
			[1, 8, 6, 7, 9, 5, 2, 4, 3],
			[5, 9, 4, 3, 2, 6, 7, 1, 8],
			[3, 1, 5, 6, 7, 4, 8, 9, 2],
			[4, 6, 9, 5, 8, 2, 1, 3, 7],
			[7, 2, 8, 1, 3, 9, 4, 5, 6],
			[6, 4, 2, 9, 1, 8, 3, 7, 5],
			[8, 5, 3, 4, 6, 7, 9, 2, 1],
			[9, 7, 1, 2, 5, 3, 6, 8, 4]
		]
			.flat()
			.join('')
	);
</script>

<PageContentContainer>
	<SudokuBoard />
</PageContentContainer>

<style>
	:global(:root) {
		--nord-0: #2e3440;
		--nord-1: #3b4252;
		--nord-2: #434c5e;
		--nord-3: #4c566a;
		--nord-4: #d8dee9;
		--nord-5: #e5e9f0;
		--nord-6: #eceff4;
		--nord-7: #8fbcbb;
		--nord-8: #88c0d0;
		--nord-9: #81a1c1;
		--nord-10: #5e81ac;
		--nord-11: #bf616a;
		--nord-12: #d08770;
		--nord-13: #ebcb8b;
		--nord-14: #a3be8c;
		--nord-15: #b48ead;

		--text-color: var(--nord-2);
		--background-color: var(--nord-6);

		font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}

	body {
		margin: 0 0;
		padding: 0 0;
		overflow-x: hidden;
		background: var(--nord6);
	}
</style>
