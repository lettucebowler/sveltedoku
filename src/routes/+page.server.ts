import { generateBoard } from '$lib/util/boardUtils';

export async function load({ locals }) {
	const { state } = locals;
	const hints = 30;
	const initialBoard = state.initial || generateBoard(hints);
	const currentBoard = state.current || initialBoard;
	return {
		initialBoard,
		currentBoard,
		hints
	};
}
