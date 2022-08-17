import { generateBoard } from '$lib/util/boardUtils';

/** @type {import('./$types').RequestHandler} */
export function GET({ params }) {
	const { hints } = params;
	const newBoard = generateBoard(parseInt(hints) || 30);

	const state = {
		initial: newBoard,
		current: newBoard
	};

	return new Response('bleh', {
		headers: {
			location: '/',
			'set-cookie': `sudokuState=${JSON.stringify(state)}; Path=/;`
		},
		status: 302
	});
}
