import { generateBoard } from '$lib/util/boardUtils';

export async function get() {
	const hints = 30;
	const initialBoard = generateBoard(hints);
	return {
		body: {
			initialBoard,
			hints
		}
	};
}
