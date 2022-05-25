<script lang="ts">
	import SudokuButton from '$lib/components/SudokuButton.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="flexy">
	<div class="grid">
		{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as move}
			<div class="square">
				<SudokuButton
					buttonText={move === 0 ? 'X' : move.toString()}
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
		gap: 4px;
	}

	.flexy {
		display: flex;
		gap: 8px;
		flex-flow: column;
		justify-content: flex-end;
		height: min(100%, calc(42vh - 16px));
		box-sizing: border-box;
		border-radius: 21px;
		overflow: hidden;
	}

	.square {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
	}

	.wide {
		grid-column: span 5;
		flex: 1 1 auto;
	}
</style>
