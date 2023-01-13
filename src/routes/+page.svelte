<script lang="ts">
	import { enhance } from '$app/forms';

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

	const getPeerDigitLocations = (board: number[], selectedNum: number) => {
		if (isNaN(data.selectedRow) || isNaN(data.selectedCol)) {
			return [];
		}
		let locations: number[] = [];
		board.forEach((num, i) => {
			if (!num) {
				return;
			}
			if (num === selectedNum) {
				locations.push(i);
			}
		});
		return locations.filter((location) => location !== data.selectedRow * 9 + data.selectedCol);
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
		// .filter((location) => location !== data.selectedRow * 9 + data.selectedCol);
	};

	$: peerCellLocations = getPeerCellLocations(data.selectedRow, data.selectedCol, 3);
	$: boardWithMovesApplied = data.board.map((initialValue, i) => {
		if (initialValue !== 0) {
			return initialValue;
		}
		return data.moves[i];
	});
	// $: peerDigitLocations = getPeerDigitLocations(boardWithMovesApplied, boardWithMovesApplied[data.selectedRow * 9 + data.selectedCol]);
	$: illegalLocations = getIllegalLocations(boardWithMovesApplied);
	$: success = !illegalLocations.length && !boardWithMovesApplied.some((c) => !c);
	$: console.log(illegalLocations);
</script>

<main class="box-border flex w-full flex-auto flex-col justify-between gap-2">
	<div class="m-auto flex aspect-square max-w-[min(100%,_752px,_80vh)] flex-[1_1_100%]">
		<form class="my-auto grid aspect-square w-full grid-cols-9" method="post" use:enhance>
			{#each boardWithMovesApplied as cell, i}
				<button
					class="grid aspect-square w-full select-none place-items-center border-b-[1px] border-r-[1px] border-charade-900 bg-snow-100 text-xl font-medium font-bold text-charade-900 hover:bg-aurora-300"
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
	<div class="grid gap-2">
		<form class="grid w-full grid-cols-5 gap-2" method="post" use:enhance>
			{#each [1, 2, 3, 4, 5] as number}
				<button formaction={`?/number&number=${number}`} class="aspect-[3/2] bg-aurora-300">
					{number}
				</button>
			{/each}
			{#each [6, 7, 8, 9, 0] as number}
				<button formaction={`?/number&number=${number}`} class="aspect-[3/2] bg-aurora-300">
					{number || 'X'}
				</button>
			{/each}
		</form>
		<form method="post" action="?/newgame" use:enhance>
			<button class="block aspect-[15/2] w-full bg-aurora-300">New game</button>
		</form>
	</div>
</main>
