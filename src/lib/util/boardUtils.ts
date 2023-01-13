import { fail } from '@sveltejs/kit';
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
