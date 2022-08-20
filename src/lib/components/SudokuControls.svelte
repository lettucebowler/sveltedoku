<script lang="ts">
	import SudokuButton from '$lib/components/SudokuButton.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="flex gap-2 flex-col justify-end box-border rounded-2xl overflow-hidden">
	<div class="grid grid-cols-5 box-border gap-1">
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
		<div class="col-span-5">
			<SudokuButton
				buttonText="New game"
				on:SudokuButtonClick={() => {
					dispatch('newGame');
				}}
			/>
		</div>
	</div>
</div>
