<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { focusAction, hotKeyAction } from 'svelte-legos';
	import {
		doMove,
		getPeerCellLocations,
		getPeerDigitLocations,
		getIllegalLocations,
		generateBoard
	} from '$lib/util/boardUtils';
	import Cookies from 'js-cookie';

	export let data: import('./$types').PageData;
	type Offset = {
		row: -1 | 0 | 1;
		col: -1 | 0 | 1;
	};

	const moveSelection = (offset: Offset) => {
		const modulo = (value: number, n: number = 0) => {
			return ((value % n) + n) % n;
		};
		data.selectedCol = modulo(data.selectedCol + offset.col, 9);
		data.selectedRow = modulo(data.selectedRow + offset.row, 9);
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
	$: peerDigitLocations = getPeerDigitLocations(
		boardWithMovesApplied,
		data.selectedRow,
		data.selectedCol
	);
	$: illegalLocations = getIllegalLocations(boardWithMovesApplied);
	$: success = !illegalLocations.length && !boardWithMovesApplied.some((c) => !c);
</script>

<svelte:window
	use:hotKeyAction={{ code: 'ArrowRight', cb: () => moveSelection({ row: 0, col: 1 }) }}
	use:hotKeyAction={{ code: 'ArrowLeft', cb: () => moveSelection({ row: 0, col: -1 }) }}
	use:hotKeyAction={{ code: 'ArrowUp', cb: () => moveSelection({ row: -1, col: 0 }) }}
	use:hotKeyAction={{ code: 'ArrowDown', cb: () => moveSelection({ row: 1, col: 0 }) }}
/>
<main class="flex w-full flex-auto flex-col justify-between gap-2">
	<div class="m-auto flex aspect-square h-full w-full max-w-[100%]">
		<form
			class="mx-auto my-auto grid aspect-square w-full grid-rows-3 gap-1 rounded-3xl text-base font-bold text-charade-900 sm:gap-2 sm:text-xl md:text-2xl lg:text-3xl"
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
											class:bg-frost-200={isPeerCell && !isInvalidPeerDigit}
											class:bg-aurora-300={cellSelected}
											class:bg-aurora-500={isInvalidPeerDigit}
											class:bg-snow-100={!isPeerCell && !cellSelected && !isInvalidPeerDigit}
											class:bg-aurora-400={success}
											class:text-frost-400={!!data.moves[i] &&
												!data.board[i] &&
												!illegalLocations.includes(i)}
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
											use:focusAction={cellSelected}
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
					use:hotKeyAction={{ code: `Digit${number}` }}
					use:hotKeyAction={{ code: number === 0 ? 'KeyX' : undefined }}
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
				use:hotKeyAction={{ ctrl: true, alt: true, code: 'KeyN' }}
				class="block w-full rounded-b-2xl rounded-t bg-charade-600 p-4 hover:bg-charade-700 active:bg-charade-800"
				>New game</button
			>
		</form>
	</div>
</main>
