import { generateBoard } from '$lib/util/boardUtils';

export async function get({ params }) {
    const hints: number = 30;
    const initialBoard = generateBoard(hints);
    return {
		body: {
			initialBoard,
			hints
		}
	};
}