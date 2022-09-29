<script lang="ts">
	import SudokuButton from '$lib/components/SudokuButton.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="box-border flex flex-col justify-end gap-2 overflow-hidden rounded-2xl">
	<div class="box-border grid grid-cols-5 gap-1">
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
