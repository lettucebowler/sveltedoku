import { generateBoard } from '$lib/util/boardUtils';

export async function get({ locals }) {
	const { state } = locals;
	const hints = 30;
	const initialBoard = state.initial || generateBoard(hints);
	const currentBoard = state.current || initialBoard;
	return {
		body: {
			initialBoard,
			currentBoard,
			hints
		}
	};
}
