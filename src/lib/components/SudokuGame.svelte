<script lang="ts">
	import Cookies from 'js-cookie';
	import SudokuBoard from '$lib/components/SudokuBoard.svelte';
	import type { Cell, CellSelectionEvent } from '$lib/types/types';
	import SudokuControls from '$lib/components/SudokuControls.svelte';
	import { generateBoard } from '$lib/util/boardUtils';

	export let order = 3;
	export let hints = 30;
	export let initialBoard: number[];
	export let currentBoard = initialBoard;

	let selectedRow: number;
	let selectedCol: number;

	$: board = getBoard(currentBoard, selectedRow, selectedCol);
	$: saveState(initialBoard, currentBoard);

	const saveState = (initial: number[], current: number[]) => {
		const state = JSON.stringify({
			initial: initial,
			current: current
		});

		Cookies.set('state', state, { expires: 365 });
	};

	const getCell = (number: number, index: number, order: number): Cell => {
		const row = Math.floor(index / (order * order));
		const col = Math.floor(index % (order * order));
		const selected = false;
		const peerCell = false;
		const peerDigit = false;
		const initial = !!initialBoard[index];
		const legal = true;
		const success = false;
		return {
			number,
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

	const getDuplicateLocations = (locations: { num: number; col: number; row: number }[][][]) =>
		locations
			.flat()
			.filter((l: { num: number; col: number; row: number }[]) => l.length > 1)
			.flat();

	const getIllegalLocations = (board: Cell[]) => {
		const rows = Array(9)
			.fill(0)
			.map(() =>
				Array(10)
					.fill(0)
					.map(() => [])
			);
		const cols = JSON.parse(JSON.stringify(rows));
		const blocks = JSON.parse(JSON.stringify(rows));

		board.forEach((c: Cell, index: number) => {
			if (!c.number) {
				return;
			}

			const row = Math.floor(index / (order * order));
			const col = Math.floor(index % (order * order));
			const lane = Math.floor(row / order);
			const trunk = Math.floor(col / order);
			const block = lane * order + trunk;
			rows[row][c.number] = rows[row][c.number].concat({ num: c.number, row, col });
			cols[col][c.number] = cols[col][c.number].concat({ num: c.number, row, col });
			blocks[block][c.number] = blocks[block][c.number].concat({ num: c.number, row, col });
		});

		const duplicateLocations = [
			...new Set(
				[
					...getDuplicateLocations(rows),
					...getDuplicateLocations(cols),
					...getDuplicateLocations(blocks)
				].map((c) => c.row * order * order + c.col)
			)
		];
		return duplicateLocations;
	};

	const getPeerCellLocations = (row: number, col: number) => {
		if (isNaN(row) || isNaN(col)) {
			return [];
		}

		const rowIndices = Array.from(Array(order * order).keys()).map(
			(col) => row * order * order + col
		);
		const colIndices = Array.from(Array(order * order).keys()).map(
			(row) => col + row * order * order
		);

		const trunkRoot = Math.floor(col / order) * order;
		const laneRoot = Math.floor(row / order) * order;
		const blockIndices = [0, 1, 2, 9, 10, 11, 18, 19, 20].map(
			(offset) => offset + (laneRoot * order * order + trunkRoot)
		);
		const peerCellLocations = [...new Set([...rowIndices, ...colIndices, ...blockIndices])].sort(
			(a, b) => (a > b ? 1 : -1)
		);
		return peerCellLocations;
	};

	const getPeerDigitLocations = (board: number[], selectedNum: number) => {
		if (isNaN(selectedRow) || isNaN(selectedCol)) {
			return [];
		}
		return board
			.map((number: number, index: number) => {
				if (!!number && number === selectedNum) {
					return index;
				}
			})
			.filter(Boolean);
	};

	const getBoard = (board: number[], selectedRow: number, selectedCol: number): Cell[] => {
		if (!board) {
			return null;
		}
		let boardReal = board.map((c, index) => getCell(c, index, order));
		const illegalLocations = getIllegalLocations(boardReal);
		const success = !illegalLocations.length && !boardReal.some((c) => !c.number);
		const peerCellLocations = getPeerCellLocations(selectedRow, selectedCol);
		const selectedIndex = selectedRow * order * order + selectedCol;
		const selectedNum = board[selectedIndex];
		const peerDigitLocations = getPeerDigitLocations(board, selectedNum);

		const validated = boardReal.map((cell: Cell, index) => ({
			...cell,
			success,
			peerCell: peerCellLocations.includes(index),
			peerDigit: peerDigitLocations.includes(index),
			legal: !illegalLocations.includes(index),
			selected: index === selectedIndex
		}));
		return validated;
	};

	const doMove = (board: Cell[], row: number, col: number, num: number) => {
		const i = row * order * order + col;
		if (board[i].initial) {
			return board.map((cell) => cell.number);
		}
		const before = board.filter((cell, index) => !!cell && index < i).map((cell) => cell.number);
		const after = board.filter((cell, index) => !!cell && index > i).map((cell) => cell.number);
		const newBoard = [...before, num, ...after];

		return newBoard;
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
<div class="big">
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
	.big {
		display: flex;
		flex: 1 1 auto;
		margin: auto auto;
		width: 100%;
		max-width: min(100%, 65vh);
	}
</style>
