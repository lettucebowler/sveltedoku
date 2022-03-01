import { generateBoard } from '$lib/util/boardUtils';

export async function get() {
	return {
		body: {
			initialGameList: generateBoard(30)
		}
	};
}
