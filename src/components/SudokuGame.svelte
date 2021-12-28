<script>
	import SudokuBoard from '../components/SudokuBoard.svelte';

	export let order = 3;

	// let boardString =
	// 	'000801000000000043500000000000070800000000100020030000600000075003400000000200600';
	export let boardString =
		'000000000000000000000000000000000000000000000000000000000000000000000000000000000';
	let boardList = boardString.split('').map((char) => parseInt(char) || 0);
	let initialBoardList = boardList;
	let selectedRow;
	let selectedCol;

	$: board = getBoard(boardList, selectedRow, selectedCol);

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

	const doMove = (board, row, col, num) => {
		const i = row * order * order + col;
		if (board[i].initial) {
			return board.map((cell) => cell.number);
		}
		const before = board.filter((cell, index) => index < i);
		const after = board.filter((cell, index) => index > i);
		const now = getCell(num, i, order, row, col);
		return before
			.concat(now)
			.concat(after)
			.map((cell) => cell.number);
	};

	const moveSelection = (rowDelta, colDelta) => {
		const newRow = selectedRow + rowDelta;
		const newCol = selectedCol + colDelta;
		const b = order * order;
		selectedRow = ((newRow % b) + b) % b;
		selectedCol = ((newCol % b) + b) % b;
	}

	const handleKeyPress = (event) => {
		const actions = {
			0() {boardList = doMove(board, selectedRow, selectedCol, 0)},
			1() {boardList = doMove(board, selectedRow, selectedCol, 1)},
			2() {boardList = doMove(board, selectedRow, selectedCol, 2)},
			3() {boardList = doMove(board, selectedRow, selectedCol, 3)},
			4() {boardList = doMove(board, selectedRow, selectedCol, 4)},
			5() {boardList = doMove(board, selectedRow, selectedCol, 5)},
			6() {boardList = doMove(board, selectedRow, selectedCol, 6)},
			7() {boardList = doMove(board, selectedRow, selectedCol, 7)},
			8() {boardList = doMove(board, selectedRow, selectedCol, 8)},
			9() {boardList = doMove(board, selectedRow, selectedCol, 9)},
			ArrowUp() {moveSelection(-1, 0)},
			ArrowDown() {moveSelection(1, 0)},
			ArrowLeft() {moveSelection(0, -1)},
			ArrowRight() {moveSelection(0, 1)},
		};
		const { key } = event;
		actions[key] && actions[key]();
	};

	const handleCellSelection = (event) => {
		const { row, col } = event?.detail;
		selectedRow = row;
		selectedCol = col;
	};
</script>

<svelte:window on:keydown={handleKeyPress} />
<SudokuBoard order={3} {board} on:cellSelection={handleCellSelection} />
