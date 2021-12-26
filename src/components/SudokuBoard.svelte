<script>
	import SudokuCell from '../components/SudokuCell.svelte';
	import SudokuBlock from '../components/SudokuBlock.svelte';
	import { onMount } from 'svelte';

	export let boardString =
		'000801000000000043500000000000070800000000100020030000600000075003400000000200600';
	export let order = 3;

	const boardList = boardString.split('').map((char) => parseInt(char));
  const initialBoardList = boardList;
	let selectedRow;
	let selectedCol;

	$: board = getBoard(boardList, selectedRow, selectedCol);
	$: chunks = getChunks(board);

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

	const isPeerCell = (row, col, order, selectedRow, selectedCol) => {
		const isSameRow = row === selectedRow;
		const isSameCol = col === selectedCol;
		const isSelected = isSameRow && isSameCol;
		const isSameTrunk = Math.floor(row / order) === Math.floor(selectedRow / order);
		const isSameLane = Math.floor(col / order) === Math.floor(selectedCol / order);
		const isSameBlock = isSameTrunk && isSameLane;
		return !isSelected && (isSameRow || isSameCol || isSameBlock);
	};

	const isCellLegal = (number, row, col, board, order) => {
		const lane = Math.floor(row / order);
		const trunk = Math.floor(col / order);
		const rowLegal =
			!number ||
			board.filter((num, index) => {
				const fRow = Math.floor(index / order / order);
				return row == fRow && board[index] === number;
			}).length <= 1;
		const colLegal =
			!number ||
			board.filter((num, index) => {
				const fCol = index % (order * order);
				return col == fCol && board[index] === number;
			}).length <= 1;
		const blockLegal =
			!number ||
			board.filter((num, index) => {
				const fTrunk = Math.floor(index / order / order / order);
				const fLane = Math.floor((index % (order * order)) / order);
				return lane === fLane && trunk === fTrunk && board[index] === number;
			}).length <= 1;
		return rowLegal && colLegal && blockLegal;
	};

	const getCell = (number, index, order, selectedRow, selectedCol) => {
		const row = Math.floor(index / (order * order));
		const col = Math.floor(index % (order * order));
		const selected = row === selectedRow && col === selectedCol;
		const peerCell = isPeerCell(row, col, order, selectedRow, selectedCol);
		const selectedNum = boardList[selectedRow * order * order + selectedCol];
		const peerDigit =
			number && (row !== selectedRow || col !== selectedCol) && number === selectedNum;
		const initial = !!initialBoardList[index];
		const legal = isCellLegal(number, row, col, boardList, order);
		const success =
			board &&
			board.filter((cell) => cell.initial || cell.valid).length === order * order * order * order;
		return {
			number: parseInt(number),
			row,
			col,
			selected,
			peerCell,
			peerDigit,
			initial,
			legal,
			success
		};
	};

	const getBoard = (board, selectedRow, selectedCol) =>
		board.map((c, index) => getCell(c, index, order, selectedRow, selectedCol));

	// const doMove = (board, row, col, num) => {
	// 	const i = row * order * order + col;
	// 	if (board[i].initial) {
	// 		return board.map((cell) => cell.number);
	// 	}
	// 	const before = board.filter((cell, index) => index < i);
	// 	const after = board.filter((cell, index) => index > i);
	// 	const now = getCell(num, i, order, row, col);
	// 	return before
	// 		.concat(now)
	// 		.concat(after)
	// 		.map((cell) => cell.number);
	// };

	const handleCellSelection = (event) => {
		const { row, col } = event?.detail;
		selectedRow = row;
		selectedCol = col;
	};

	// const handleKeyPress = (event) => {
	// 	const num = parseInt(event.key);
	// 	if (num || num === 0) {
	// 		boardList = doMove(board, selectedRow, selectedCol, num);
	// 	}
	// };

	onMount(async () => {
		selectedRow = null;
	});
</script>

<!-- <svelte:window on:keypress={handleKeyPress} /> -->

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
							on:cellSelection={handleCellSelection}
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
