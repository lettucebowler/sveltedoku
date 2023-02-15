<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import {
		doMove,
		getPeerCellLocations,
		getPeerDigitLocations,
		getIllegalLocations,
		generateBoard
	} from '$lib/util/boardUtils';
	import Cookies from 'js-cookie';

	export let data: import('./$types').PageData;

	const keys = new Array(10).fill(undefined);
	const cells = new Array(81).fill(undefined);

	const clickNumber = (num: number) => {
		if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(num)) {
			return;
		}
		keys[num].click();
	};

	type Offset = {
		row: -1 | 0 | 1;
		col: -1 | 0 | 1;
	};

	const moveSelection = (offset: Offset) => {
		const modulo = (value: number, n: number = 0) => {
			return ((value % n) + n) % n;
		};
		const i =
			modulo(data.selectedRow + offset.row, 9) * 9 + modulo(data.selectedCol + offset.col, 9);
		if (cells[i]) {
			cells[i].click();
			cells[i].focus();
		}
	};

	const handleKeyPress = (event: KeyboardEvent) => {
		const key = event.key || '';
		if (!key) {
			return;
		}

		const validNumbers = /[0-9]/;
		if (validNumbers.test(key)) {
			clickNumber(parseInt(key));
		}

		const offsets = new Map<string, Offset>([
			['ArrowRight', { row: 0, col: 1 }],
			['ArrowLeft', { row: 0, col: -1 }],
			['ArrowUp', { row: -1, col: 0 }],
			['ArrowDown', { row: 1, col: 0 }]
		]);
		const offset = offsets.get(key);
		if (!offset) {
			return;
		}

		moveSelection(offset);
	};

	const enhanceNumberSubmit: SubmitFunction = (event) => {
		const number = parseInt(event.action.searchParams.get('number') || '');
		let updatedMoves = data.moves;
		try {
			updatedMoves = doMove(
				data.board,
				data.moves,
				data.selectedRow * 9 + data.selectedCol,
				number
			);
		} catch (e) {
			updatedMoves = data.moves;
		}

		data.moves = updatedMoves;
		Cookies.set('moves', JSON.stringify(updatedMoves), {
			path: '/',
			httpOnly: false,
			expires: 1,
			secure: false
		});

		event.cancel();
	};

	const enhanceSelection: SubmitFunction = (event) => {
		const searchParams = event.action.searchParams;
		const row = parseInt(searchParams.get('row') || '-1');
		const col = parseInt(searchParams.get('col') || '-1');
		data.selectedRow = row;
		data.selectedCol = col;

		Cookies.set('selectedRow', row.toString(), {
			path: '/',
			httpOnly: false,
			expires: 1,
			secure: false
		});
		Cookies.set('selectedCol', col.toString(), {
			path: '/',
			httpOnly: false,
			expires: 1,
			secure: false
		});
		event.cancel();
	};

	const enhanceNewGame: SubmitFunction = (event) => {
		Cookies.set('selectedRow', '-1', {
			path: '/',
			httpOnly: false,
			expires: 1,
			secure: false
		});
		data.selectedRow = -1;
		Cookies.set('selectedCol', '-1', {
			path: '/',
			httpOnly: false,
			expires: 1,
			secure: false
		});
		data.selectedCol = -1;
		data.moves = new Array(81).fill(0);
		data.board = generateBoard(30);
		Cookies.set('moves', JSON.stringify(data.moves), {
			path: '/',
			httpOnly: false,
			expires: 1,
			secure: false
		});
		Cookies.set('board', JSON.stringify(data.board), {
			path: '/',
			httpOnly: false,
			expires: 1,
			secure: false
		});
		event.cancel();
	};

	$: boardWithMovesApplied = data.board.map((initialValue, i) => (initialValue ||= data.moves[i]));
	$: peerCellLocations = getPeerCellLocations(data.selectedRow, data.selectedCol, 3);
	$: console.log(peerCellLocations);
	$: peerDigitLocations = getPeerDigitLocations(
		boardWithMovesApplied,
		boardWithMovesApplied[data.selectedRow * 9 + data.selectedCol]
	);
	$: illegalLocations = getIllegalLocations(boardWithMovesApplied);
	$: success = !illegalLocations.length && !boardWithMovesApplied.some((c) => !c);
</script>

<svelte:window on:keydown={handleKeyPress} />
<main class="flex w-full flex-auto flex-col justify-between gap-2">
	<div class="m-auto flex aspect-square h-full w-full max-w-[100%]">
		<form
			class="my-auto mx-auto grid aspect-square w-full grid-rows-3 gap-1 rounded-3xl text-base font-bold text-charade-900 sm:gap-2 sm:text-xl md:text-2xl lg:text-3xl"
			method="post"
			use:enhance={enhanceSelection}
		>
			{#each [0, 1, 2] as lane}
				<div class="grid grid-rows-3 gap-0.5">
					{#each [0, 1, 2] as subRow}
						{@const row = lane * 3 + subRow}
						<div class="grid grid-cols-3 gap-1 sm:gap-2">
							{#each [0, 1, 2] as trunk}
								<div class="grid grid-cols-3 gap-0.5">
									{#each [0, 1, 2] as subCol}
										{@const col = trunk * 3 + subCol}
										{@const i = row * 9 + col}
										{@const cellSelected = i === data.selectedRow * 9 + data.selectedCol}
										{@const isPeerCell = peerCellLocations.includes(i)}
										{@const isInvalidPeerDigit =
											!data.board[data.selectedRow * 9 + data.selectedCol] &&
											illegalLocations.includes(i) &&
											peerCellLocations.includes(i) &&
											peerDigitLocations.includes(i)}
										<button
											class="grid aspect-square h-full select-none place-items-center rounded-sm border-charade-900 outline-none ring-inset ring-aurora-200 hover:bg-aurora-300 focus:ring-4 focus-visible:ring-4"
											class:bg-frost-200={isPeerCell}
											class:bg-aurora-300={cellSelected}
											class:bg-aurora-500={isInvalidPeerDigit}
											class:bg-snow-100={!isPeerCell && !cellSelected && !isInvalidPeerDigit}
											class:bg-aurora-400={success}
											class:text-frost-400={!!data.moves[i] && !data.board[i]}
											class:text-aurora-100={illegalLocations.includes(i) && !data.board[i]}
											class:rounded-tr={i % 3 === 2 && Math.floor(i / 9) % 3 === 0}
											class:rounded-tl={i % 3 === 0 && Math.floor(i / 9) % 3 === 0}
											class:rounded-br={i % 3 === 2 && Math.floor(i / 9) % 3 === 2}
											class:rounded-bl={i % 3 === 0 && Math.floor(i / 9) % 3 === 2}
											class:rounded-tl-2xl={i === 0}
											class:rounded-tr-2xl={i === 8}
											class:rounded-bl-2xl={i === 72}
											class:rounded-br-2xl={i === 80}
											class:text-transparent={!boardWithMovesApplied[i]}
											formaction={`?/selection&col=${i % 9}&row=${Math.floor(i / 9)}`}
											bind:this={cells[i]}
										>
											{boardWithMovesApplied[i]}
										</button>
									{/each}
								</div>
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</form>
	</div>
	<div class="grid gap-1 text-2xl font-medium text-snow-100">
		<form class="grid w-full grid-cols-5 gap-1" method="post" use:enhance={enhanceNumberSubmit}>
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as number, i}
				<button
					formaction={`?/number&number=${number}`}
					bind:this={keys[number]}
					class="rounded bg-charade-600 p-2 hover:bg-charade-700 active:bg-charade-800"
					class:rounded-tl-2xl={i === 0}
					class:rounded-tr-2xl={i === 4}
				>
					{number || 'X'}
				</button>
			{/each}
		</form>
		<form method="post" action="?/newgame" use:enhance={enhanceNewGame}>
			<button
				class="block w-full rounded-t rounded-b-2xl bg-charade-600 p-4 hover:bg-charade-700 active:bg-charade-800"
				>New game</button
			>
		</form>
	</div>
</main>
