<script lang="ts">
	import SudokuBoard from '$lib/components/SudokuBoard.svelte';
	import type { Cell, CellSelectionEvent } from '$lib/types/types';
	import SudokuControls from '$lib/components/SudokuControls.svelte';
	import { generateBoard } from '$lib/util/boardUtils';

	export let order = 3;
	export let hints = 30;
	export let initialBoard: number[];

	let currentBoard = initialBoard;
	let selectedRow: number;
	let selectedCol: number;

	$: board = getBoard(currentBoard, selectedRow, selectedCol);

	const isPeerCell = (
		row: number,
		col: number,
		order: number,
		selectedRow: number,
		selectedCol: number
	) => {
		const isSameRow = row === selectedRow;
		const isSameCol = col === selectedCol;
		const isSelected = isSameRow && isSameCol;
		const isSameTrunk = Math.floor(row / order) === Math.floor(selectedRow / order);
		const isSameLane = Math.floor(col / order) === Math.floor(selectedCol / order);
		const isSameBlock = isSameTrunk && isSameLane;
		return !isSelected && (isSameRow || isSameCol || isSameBlock);
	};

	const isCellLegal = (
		number: number,
		row: number,
		col: number,
		board: number[],
		order: number
	) => {
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

	const getCell = (
		number: number,
		index: number,
		order: number,
		selectedRow: number,
		selectedCol: number
	): Cell => {
		const row = Math.floor(index / (order * order));
		const col = Math.floor(index % (order * order));
		const selected = row === selectedRow && col === selectedCol;
		const peerCell = isPeerCell(row, col, order, selectedRow, selectedCol);
		const selectedNum = currentBoard[selectedRow * order * order + selectedCol];
		const peerDigit =
			number && (row !== selectedRow || col !== selectedCol) && number === selectedNum;
		const initial = !!initialBoard[index];
		const legal = isCellLegal(number, row, col, currentBoard, order);
		const success = false;
		return {
			number: number ? number.toString() : '',
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

	const getBoard = (board: number[], selectedRow: number, selectedCol: number): Cell[] => {
		if (!board) {
			return null;
		}
		const boardReal = board.map((c, index) => getCell(c, index, order, selectedRow, selectedCol));
		const success =
			boardReal.filter((cell: Cell) => !!cell.legal && cell.number !== '').length ===
			order * order * order * order;
		const validated = boardReal.map((cell: Cell) => ({ ...cell, success }));
		return validated;
	};

	const doMove = (board: Cell[], row: number, col: number, num: number) => {
		const i = row * order * order + col;
		if (board[i].initial) {
			return board.map((cell) => parseInt(cell.number) || 0);
		}
		const before = board
			.filter((cell, index) => index < i)
			.map((cell) => parseInt(cell.number) || 0);
		const after = board
			.filter((cell, index) => index > i)
			.map((cell) => parseInt(cell.number) || 0);
		return [...before, num, ...after];
	};

	const moveSelection = (rowDelta: number, colDelta: number) => {
		const newRow = selectedRow + rowDelta;
		const newCol = selectedCol + colDelta;
		const b = order * order;
		selectedRow = ((newRow % b) + b) % b;
		selectedCol = ((newCol % b) + b) % b;
	};

	const handleKeyPress = (event: { key: string }) => {
		const actions = {
			0() {
				currentBoard = doMove(board, selectedRow, selectedCol, 0);
			},
			1() {
				currentBoard = doMove(board, selectedRow, selectedCol, 1);
			},
			2() {
				currentBoard = doMove(board, selectedRow, selectedCol, 2);
			},
			3() {
				currentBoard = doMove(board, selectedRow, selectedCol, 3);
			},
			4() {
				currentBoard = doMove(board, selectedRow, selectedCol, 4);
			},
			5() {
				currentBoard = doMove(board, selectedRow, selectedCol, 5);
			},
			6() {
				currentBoard = doMove(board, selectedRow, selectedCol, 6);
			},
			7() {
				currentBoard = doMove(board, selectedRow, selectedCol, 7);
			},
			8() {
				currentBoard = doMove(board, selectedRow, selectedCol, 8);
			},
			9() {
				currentBoard = doMove(board, selectedRow, selectedCol, 9);
			},
			ArrowUp() {
				moveSelection(-1, 0);
			},
			ArrowDown() {
				moveSelection(1, 0);
			},
			ArrowLeft() {
				moveSelection(0, -1);
			},
			ArrowRight() {
				moveSelection(0, 1);
			}
		};
		const { key } = event;
		actions[key] && actions[key]();
	};

	const handleCellSelection = (event: CellSelectionEvent) => {
		const { row, col } = event.detail;
		selectedRow = row;
		selectedCol = col;
	};

	const newGame = () => {
		initialBoard = generateBoard(hints);
		currentBoard = initialBoard;
	};
</script>

<svelte:window on:keydown={handleKeyPress} />
<div>
	<SudokuBoard order={3} {board} on:cellSelection={handleCellSelection} />
</div>
<div>
	<SudokuControls
		on:SudokuMove={(event) => {
			currentBoard = doMove(board, selectedRow, selectedCol, event.detail.num);
		}}
		on:newGame={newGame}
	/>
</div>

<style>
	/* div {
		padding: 2px 2px;
	} */
</style>
