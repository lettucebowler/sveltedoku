import SudokuToolCollection from 'sudokutoolcollection';

export const generateBoard = (hints: number): number[] => {
	const board = SudokuToolCollection().generator.generate(hints);
	return board
		.split('.')
		.join('0')
		.split('')
		.map((num: string) => parseInt(num) || 0);
};
