<script>
	import SudokuCell from '../components/SudokuCell.svelte';
	import SudokuBlock from '../components/SudokuBlock.svelte';
	import { onMount } from 'svelte';

	export let boardString =
		'000801000000000043500000000000070800000000100020030000600000075003400000000200600';
	export let order = 3;

	let board;
	$: chunks = getChunks(board);
	let selectedRow;
	let selectedCol;

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

	const getCell = (number, index, order, selectedRow, selectedCol) => {
		const row = Math.floor(index / (order * order));
		const col = Math.floor(index % (order * order));
		const selected = row === selectedRow && col === selectedCol;
		const peerCell = isPeerCell(row, col, order, selectedRow, selectedCol);
		return {
			number: parseInt(number),
			row,
			col,
			selected,
			peerCell
		};
	};

	const getBoard = (boardString) => {
		const b = boardString
			.split('')
			.map((c, index) => getCell(c, index, order, selectedRow, selectedCol));
		return b;
	};

	const doMove = (board, row, col, num) => {
		const i = row * order * order + col;
		const before = board.filter((cell, index) => index < i);
		const after = board.filter((cell, index) => index > i);
		const now = getCell(num, i, order, row, col);
		return before.concat(now).concat(after);
	};

	const handleCellSelection = (event) => {
		const { row, col } = event?.detail;
		selectedRow = row;
		selectedCol = col;
		board = getBoard(boardString);
	};

	const handleKeyPress = (event) => {
		const num = parseInt(event.key);
		if (num || num === 0) {
			board = doMove(board, selectedRow, selectedCol, num);
		}
		doMove(board, selectedRow, selectedCol, num);
	};

	onMount(async () => {
		board = getBoard(boardString);
	});
</script>

<svelte:window on:keypress={handleKeyPress} />

{#if !!board && board.length !== 16 && board.length !== 81}
	<div>Board is not correct length.</div>
{:else if board?.length}
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
						on:cellSelection={handleCellSelection}
					/>
				{/each}
			</SudokuBlock>
		{/each}
	</SudokuBlock>
{/if}
