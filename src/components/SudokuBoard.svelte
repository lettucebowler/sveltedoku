<script>
	import SudokuCell from '../components/SudokuCell.svelte';
	import SudokuBlock from '../components/SudokuBlock.svelte';

	export let order = 3;
  export let board;

	$: chunks =  board ? getChunks(board) : [];

	const getChunk = (row, col, order) => {
		const trunk = Math.floor(row / order);
		const lane = Math.floor(col / order);
		const chunk = trunk * order + lane;
		return chunk;
	};

	const getChunks = (board) => {
		const b =
			board &&
			board.reduce((all, one, i) => {
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
	<div>
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
	div {
		padding: 4px 4px;
		aspect-ratio: 1;
	}
</style>
