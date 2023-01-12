<script lang="ts">
	import type { Cell } from '$lib/types/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let board: Cell[] = Array(81).fill({
		number: 0,
		initial: true,
		valid: true,
		selected: false,
		peerCell: false,
		peerDigit: false,
		succes: false
	});

	const chunk = (arr: Cell[], size: number) =>
		Array.from({ length: Math.ceil(arr.length / size) }, (_v, i) =>
			arr.slice(i * size, i * size + size)
		);

	const handleClick = (row: number, col: number) => {
		dispatch('cellSelection', {
			row,
			col
		});
	};
</script>

<table
	class="m-auto grid aspect-square w-full grid-rows-[repeat(9,_1fr)] overflow-hidden rounded-2xl"
>
	{#each chunk(board, 27) as lane, i (i)}
		{#each chunk(lane, 9) as row, j (`${i}-${j}`)}
			<tr class="grid w-full grid-cols-[repeat(9,_1fr)]">
				{#each row as cell, k (`${i}-${j}-${k}`)}
					<td class="p-0">
						<button
							on:click={() => handleClick(cell.row, cell.col)}
							class="grid aspect-square w-full select-none place-items-center border-charade-900 text-xl font-medium font-bold hover:bg-aurora-300"
							class:text-frost-400={cell.legal && !cell.initial && cell.number !== 0}
							class:bg-snow-100={!cell.selected && !cell.peerCell}
							class:bg-frost-200={cell.peerCell && !cell.selected && !cell.peerDigit}
							class:text-aurora-100={!cell.legal && !cell.initial && cell.number !== 0}
							class:bg-aurora-500={cell.peerDigit &&
								cell.peerCell &&
								!cell.selected &&
								!cell.legal &&
								!cell.selected}
							class:bg-aurora-300={cell.selected}
							class:text-charade-900={cell.initial}
							class:bg-aurora-400={cell.success}
							class:text-transparent={cell.number === 0}
							class:border-r-[3px]={k % 3 === 2 && k < 8}
							class:border-r-[1px]={k % 3 !== 2}
							class:border-b-[3px]={j % 3 === 2 && i < 2}
							class:border-b-[1px]={j % 3 !== 2}>{cell.number || ' '}</button
						>
					</td>
				{/each}
			</tr>
		{/each}
	{/each}
</table>
