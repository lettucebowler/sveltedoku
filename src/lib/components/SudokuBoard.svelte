<script lang="ts">
	import SudokuCell from '$lib/components/SudokuCell.svelte';
	import SudokuBlock from '$lib/components/SudokuBlock.svelte';
	import type { Cell } from '$lib/types/types';

	export let order = 3;
	export let board: Cell[];

	$: chunks = board ? getChunks(board) : [];

	const getChunk = (row: number, col: number, order: number) => {
		const trunk = Math.floor(row / order);
		const lane = Math.floor(col / order);
		const chunk = trunk * order + lane;
		return chunk;
	};

	const getChunks = (board: Cell[]) => {
		const b =
			board &&
			board.reduce((all, one) => {
				const ch = getChunk(one.row, one.col, order);
				all[ch] = [].concat(all[ch] || [], one);
				return all;
			}, []);
		return b;
	};
</script>

{#if !!board && board.length !== 16 && board.length !== 81}
	<div>Board is not correct length.</div>
{:else if board?.length}
	<div class="container">
		<SudokuBlock board {order}>
			{#each chunks as chunk}
				<SudokuBlock {order}>
					{#each chunk as cell}
						<SudokuCell
							number={cell.number}
							row={cell.row}
							col={cell.col}
							selected={cell.selected}
							peerCell={cell.peerCell}
							peerDigit={cell.peerDigit}
							valid={cell.legal}
							initial={cell.initial}
							success={cell.success}
							{order}
							on:cellSelection
						/>
					{/each}
				</SudokuBlock>
			{/each}
		</SudokuBlock>
	</div>
{/if}

<style>
	.container {
		width: 100%;
		aspect-ratio: 1;
		margin: auto;
		border-radius: 22px;
		overflow: hidden;
	}
</style>
