import { generateBoard } from '$lib/util/boardUtils';

export async function GET({ params }) {
	const hints: number = parseInt(params.hints);
	const initialBoard = generateBoard(hints);
	return {
		body: {
			initialBoard,
			hints
		}
	};
}
