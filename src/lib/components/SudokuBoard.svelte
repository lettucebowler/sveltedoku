<script lang="ts">
	import type { Cell } from '$lib/types/types';
	import classnames from 'classnames';
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

	const chunk = (arr: any[], size: number) =>
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
	class="w-full aspect-square m-auto rounded-2xl overflow-hidden grid grid-rows-[repeat(9,_1fr)]"
>
	{#each chunk(board, 27) as lane, i (i)}
		{#each chunk(lane, 9) as row, j (`${i}-${j}`)}
			<tr class="w-full grid grid-cols-[repeat(9,_1fr)]">
				{#each row as cell, k (`${i}-${j}-${k}`)}
					<td
						on:click={() => handleClick(cell.row, cell.col)}
						class={classnames(
							'grid place-items-center select-none font-medium hover:bg-aurora-300 font-bold text-lg w-full border-polar-100 aspect-square transition ease-in-out duration-150',
							{
								'bg-snow-100': !cell.selected && !cell.peerCell && !cell.peerDigit,
								'bg-frost-200': cell.peerCell && !cell.selected && !cell.peerDigit,
								'bg-frost-300': cell.peerDigit && !cell.selected,
								'text-aurora-100': !cell.valid && !cell.initial && cell.number !== 0,
								'bg-aurora-500':
									cell.peerDigit &&
									cell.peerCell &&
									!cell.selected &&
									!cell.valid &&
									!cell.selected,
								'bg-aurora-300': cell.selected,
								'text-polar-100': cell.initial,
								'bg-aurora-400': cell.success,
								'text-transparent': cell.number === 0,
								'border-r-[3px]': k % 3 === 2 && k < 8,
								'border-r-[1px]': k % 3 !== 2,
								'border-b-[3px]': j % 3 === 2 && i < 2,
								'border-b-[1px]': j % 3 !== 2
							}
						)}
					>
						{cell.number || ' '}
					</td>
				{/each}
			</tr>
		{/each}
	{/each}
</table>
