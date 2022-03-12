<script>
	import SudokuButton from '$lib/components/SudokuButton.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="grid">
	{#each [1, 2, 3, 4, 5] as move}
		<div class="square">
			<SudokuButton
				buttonText={move}
				type="primary"
				on:SudokuButtonClick={() =>
					dispatch('SudokuMove', {
						num: move
					})}
			/>
		</div>
	{/each}
	{#each [6, 7, 8, 9, 0] as move}
		<div class="square">
			<SudokuButton
				buttonText={move === 0 ? 'X' : move}
				type="primary"
				on:SudokuButtonClick={() =>
					dispatch('SudokuMove', {
						num: move
					})}
			/>
		</div>
	{/each}
	<div class="wide">
		<SudokuButton
			buttonText="New game"
			type="primary"
			square={false}
			fluid
			on:SudokuButtonClick={() => {
				dispatch('newGame');
			}}
		/>
	</div>
</div>

<style>
	.grid {
		margin: 2px 2px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		box-sizing: border-box;
	}

	.square {
		aspect-ratio: 1;
		grid-column: span 1;
		box-sizing: border-box;
		padding: 2px 2px;
	}

	.wide {
		aspect-ratio: 5;
		grid-column: span 5;
		padding: 2px 2px;
		box-sizing: border-box;
	}
</style>
