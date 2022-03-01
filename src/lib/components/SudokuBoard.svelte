<script>
	import SudokuCell from '$lib/components/SudokuCell.svelte';
	import SudokuBlock from '$lib/components/SudokuBlock.svelte';

	export let order = 3;
	export let board;

	$: chunks = board ? getChunks(board) : [];

	const getChunk = (row, col, order) => {
		const trunk = Math.floor(row / order);
		const lane = Math.floor(col / order);
		const chunk = trunk * order + lane;
		return chunk;
	};

	const getChunks = (board) => {
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
		width: calc(100% - 4px);
		padding: 2px 2px;
		margin: auto;
	}
</style>
