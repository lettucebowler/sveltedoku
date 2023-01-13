<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { doMove } from '$lib/util/boardUtils';
	import Cookies from 'js-cookie';

	export let data: import('./$types').PageData;

	const getPeerCellLocations = (row: number, col: number, order: number) => {
		if (isNaN(row) || isNaN(col) || row < 0 || col < 0) {
			return [];
		}

		const rowIndices = Array.from(Array(order * order).keys()).map(
			(col) => row * order * order + col
		);
		const colIndices = Array.from(Array(order * order).keys()).map(
			(row) => col + row * order * order
		);

		const trunkRoot = Math.floor(col / order) * order;
		const laneRoot = Math.floor(row / order) * order;
		const blockIndices = [0, 1, 2, 9, 10, 11, 18, 19, 20].map(
			(offset) => offset + (laneRoot * order * order + trunkRoot)
		);
		const selectedIndex = row * order * order + col;
		const peerCellLocations = [...new Set([...rowIndices, ...colIndices, ...blockIndices])]
			.sort((a, b) => (a > b ? 1 : -1))
			.filter((index) => index !== selectedIndex);
		return peerCellLocations;
	};

	const getDuplicateLocations = (locations: { num: number; col: number; row: number }[][][]) =>
		locations
			.flat()
			.filter((l: { num: number; col: number; row: number }[]) => l.length > 1)
			.flat();

	const getIllegalLocations = (board: number[]) => {
		const order = 3;
		const rows: { num: number; row: number; col: number }[][][] = Array(9)
			.fill(0)
			.map(() =>
				Array(10)
					.fill(0)
					.map(() => [])
			);
		const cols = JSON.parse(JSON.stringify(rows));
		const blocks = JSON.parse(JSON.stringify(rows));

		board.forEach((num, index: number) => {
			if (!num) {
				return;
			}

			const row = Math.floor(index / (order * order));
			const col = Math.floor(index % (order * order));
			const lane = Math.floor(row / order);
			const trunk = Math.floor(col / order);
			const block = lane * order + trunk;
			rows[row][num] = rows[row][num].concat({ num: num, row, col });
			cols[col][num] = cols[col][num].concat({ num: num, row, col });
			blocks[block][num] = blocks[block][num].concat({ num: num, row, col });
		});

		const duplicateLocations = [
			...new Set(
				[
					...getDuplicateLocations(rows),
					...getDuplicateLocations(cols),
					...getDuplicateLocations(blocks)
				].map((c) => c.row * order * order + c.col)
			)
		];
		return duplicateLocations;
	};

	$: peerCellLocations = getPeerCellLocations(data.selectedRow, data.selectedCol, 3);
	$: boardWithMovesApplied = data.board.map((initialValue, i) => {
		if (initialValue !== 0) {
			return initialValue;
		}
		return data.moves[i];
	});
	$: illegalLocations = getIllegalLocations(boardWithMovesApplied);
	$: success = !illegalLocations.length && !boardWithMovesApplied.some((c) => !c);

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
</script>

<main class="box-border flex w-full flex-auto flex-col justify-between gap-2">
	<div class="m-auto flex aspect-square max-w-[min(100%,_752px,_80vh)] flex-[1_1_100%]">
		<form
			class="my-auto grid aspect-square w-full grid-cols-9 text-xl font-bold text-charade-900"
			method="post"
			use:enhance={enhanceSelection}
		>
			{#each boardWithMovesApplied as cell, i}
				<button
					class="grid aspect-square w-full select-none place-items-center border-b-[1px] border-r-[1px] border-charade-900 bg-snow-100  hover:bg-aurora-300"
					class:bg-frost-200={peerCellLocations.includes(i)}
					class:bg-aurora-300={data.selectedRow * 9 + data.selectedCol === i}
					class:bg-aurora-500={illegalLocations.includes(i) && peerCellLocations.includes(i)}
					class:bg-aurora-400={success}
					class:text-frost-400={!!data.moves[i] && !data.board[i]}
					class:text-aurora-100={illegalLocations.includes(i) && !data.board[i]}
					class:border-r-2={i % 3 === 2 && i % 9 < 8}
					class:rounded-tl-2xl={i === 0}
					class:rounded-tr-2xl={i === 8}
					class:rounded-bl-2xl={i === 72}
					class:rounded-br-2xl={i === 80}
					class:text-transparent={!cell}
					class:border-r-[3px]={i % 3 === 2 && i % 3 < 8}
					class:border-b-[3px]={Math.floor(i / 9) % 3 === 2 && i < 71}
					formaction={`?/selection&col=${i % 9}&row=${Math.floor(i / 9)}`}>{cell}</button
				>
			{/each}
		</form>
	</div>
	<div class="grid gap-1 text-2xl font-medium text-snow-100">
		<form class="grid w-full grid-cols-5 gap-1" method="post" use:enhance={enhanceNumberSubmit}>
			{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as number, i}
				<button
					formaction={`?/number&number=${number}`}
					class="bg-charade-600 p-2 hover:bg-charade-700 active:bg-charade-800"
					class:rounded-tl-2xl={i === 0}
					class:rounded-tr-2xl={i === 4}
				>
					{number || 'X'}
				</button>
			{/each}
		</form>
		<form method="post" action="?/newgame" use:enhance>
			<button
				class="block w-full rounded-b-2xl bg-charade-600 p-4 hover:bg-charade-700 active:bg-charade-800"
				>New game</button
			>
		</form>
	</div>
</main>
