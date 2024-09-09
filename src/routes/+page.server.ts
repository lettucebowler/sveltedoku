import { doMove, generateBoard } from '$lib/util/boardUtils';
import { fail, type Cookies } from '@sveltejs/kit';
import type { ServerLoad } from '@sveltejs/kit';

export const prerender = false;

const getListFromCookie = (cookies: Cookies, cookieName: string) => {
	let board: number[] = [];
	try {
		board = JSON.parse(cookies.get(cookieName) || '[]') as number[];
		if (!board.every((entry) => typeof entry === 'number') || board.length !== 81) {
			throw new Error('bad data');
		}
	} catch (e) {
		board = [];
	}
	return board;
};

const getBoardFromCookie = (cookies: Cookies) => {
	let board = getListFromCookie(cookies, 'board');
	if (board.length !== 81) {
		board = generateBoard(30);
	}
	return board;
};

const getMovesFromCookie = (cookies: Cookies) => {
	let moves = getListFromCookie(cookies, 'moves');
	if (moves.length !== 81) {
		moves = new Array(81).fill(0);
	}
	return moves;
};

export const load: ServerLoad = async (event) => {
	const selectedRow = parseInt(event.cookies.get('selectedRow') || '-1');
	const selectedCol = parseInt(event.cookies.get('selectedCol') || '-1');
	const board = getBoardFromCookie(event.cookies);
	const moves = getMovesFromCookie(event.cookies);
	event.cookies.set('board', JSON.stringify(board), {
		httpOnly: false,
		path: '/',
		maxAge: 86400
	});
	event.cookies.set('moves', JSON.stringify(moves), {
		httpOnly: false,
		path: '/',
		maxAge: 86400
	});
	return {
		board,
		moves,
		selectedRow,
		selectedCol
	};
};

import type { Actions } from './$types';
export const actions: Actions = {
	selection: async ({ url, cookies }) => {
		const row = parseInt(url.searchParams.get('row') || '-1');
		const col = parseInt(url.searchParams.get('col') || '-1');

		if (row < -1 || row > 8) {
			return fail(400, { message: 'invalid row' });
		}
		cookies.set('selectedRow', row.toString(), {
			httpOnly: false,
			path: '/',
			maxAge: 86400
		});

		if (col < -1 || col > 8) {
			return fail(400, { message: 'invalid column' });
		}
		cookies.set('selectedCol', col.toString(), {
			httpOnly: false,
			path: '/',
			maxAge: 86400
		});

		return {
			message: ''
		};
	},
	number: async (event) => {
		const number = parseInt(event.url.searchParams.get('number') || '');
		const selectedRow = parseInt(event.cookies.get('selectedRow') || '-1');
		const selectedCol = parseInt(event.cookies.get('selectedCol') || '-1');
		const board = getBoardFromCookie(event.cookies);
		const moves = getMovesFromCookie(event.cookies);
		const index = selectedRow * 9 + selectedCol;
		let updatedMoves = moves;
		try {
			updatedMoves = doMove(board, moves, index, number);
		} catch (e) {
			return fail(400, {
				message: 'invalid location'
			});
		}
		event.cookies.set('moves', JSON.stringify(updatedMoves), {
			httpOnly: false,
			path: '/',
			maxAge: 86400
		});

		return {
			message: ''
		};
	},
	newgame: async (event) => {
		event.cookies.delete('selectedRow', { path: '/' });
		event.cookies.delete('selectedCol', { path: '/' });
		event.cookies.delete('board', { path: '/' });
		event.cookies.delete('moves', { path: '/' });
		return {
			message: ''
		};
	}
};
