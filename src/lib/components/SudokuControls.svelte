<script>
	import SudokuButton from '$lib/components/SudokuButton.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="flexy">
	<div class="grid">
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as move}
			<div class="square">
				<SudokuButton
					buttonText={move === 0 ? 'X' : move}
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
				on:SudokuButtonClick={() => {
					dispatch('newGame');
				}}
			/>
		</div>
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		box-sizing: border-box;
		gap: 8px;
	}

	.flexy {
		display: flex;
		gap: 8px;
		flex-flow: column;
		height: 100%;
		box-sizing: border-box;
	}

	.square {
		display: flex;
		flex: 1 1 auto;
		aspect-ratio: 1.1;
	}

	.wide {
		grid-column: span 5;
		flex: 1 1 auto;
		aspect-ratio: 6;
	}
</style>
