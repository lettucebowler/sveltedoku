import SudokuToolCollection from 'sudokutoolcollection';

export const generateBoard = (hints: number): number[] => {
	const board = SudokuToolCollection().generator.generate(hints);
	return board
		.split('.')
		.join('0')
		.split('')
		.map((num: string) => parseInt(num) || 0);
};

export const doMove = (board: number[], moves: number[], index: number, num: number) => {
	if (board.at(index) !== 0) {
		throw new Error('invalid location');
	}
	const newMoves = moves;
	newMoves[index] = num;
	return newMoves;
};

export const getPeerCellLocations = (row: number, col: number, order: number) => {
	if (isNaN(row) || isNaN(col) || row < 0 || col < 0) {
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
	const selectedIndex = row * order * order + col;
	const peerCellLocations = [...new Set([...rowIndices, ...colIndices, ...blockIndices])]
		.sort((a, b) => (a > b ? 1 : -1))
		.filter((index) => index !== selectedIndex);
	return peerCellLocations;
};

const getDuplicateLocations = (locations: { num: number; col: number; row: number }[][][]) =>
	locations
		.flat()
		.filter((l: { num: number; col: number; row: number }[]) => l.length > 1)
		.flat();

export const getIllegalLocations = (board: number[]) => {
	const order = 3;
	const rows: { num: number; row: number; col: number }[][][] = Array(9)
		.fill(0)
		.map(() =>
			Array(10)
				.fill(0)
				.map(() => [])
		);
	const cols = JSON.parse(JSON.stringify(rows));
	const blocks = JSON.parse(JSON.stringify(rows));

	board.forEach((num, index: number) => {
		if (!num) {
			return;
		}

		const row = Math.floor(index / (order * order));
		const col = Math.floor(index % (order * order));
		const lane = Math.floor(row / order);
		const trunk = Math.floor(col / order);
		const block = lane * order + trunk;
		rows[row][num] = rows[row][num].concat({ num: num, row, col });
		cols[col][num] = cols[col][num].concat({ num: num, row, col });
		blocks[block][num] = blocks[block][num].concat({ num: num, row, col });
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

export const getPeerDigitLocations = (
	board: number[],
	selectedRow: number,
	selectedCol: number
) => {
	let locations: number[] = [];
	const selectedNum = board.at(selectedRow * 9 + selectedCol);
	board.forEach((num, i) => {
		if (!num) {
			return;
		}
		if (num === selectedNum) {
			locations.push(i);
		}
	});
	return locations;
};
