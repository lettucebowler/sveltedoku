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

	$: peerCellLocations = getPeerCellLocations(data.selectedRow, data.selectedCol, 3);
	$: boardWithMovesApplied = data.board.map((initialValue, i) => {
		if (initialValue !== 0) {
			return initialValue;
		}
		return data.moves[i];
	});
</script>

<main class="box-border flex w-full flex-auto flex-col justify-between gap-2">
	<div class="m-auto flex aspect-square max-w-[min(100%,_752px,_80vh)] flex-[1_1_100%]">
		<form class="my-auto grid aspect-square w-full grid-cols-9 gap-[2px]" method="post" use:enhance>
			{#each boardWithMovesApplied as cell, i}
				<button
					class="bg-snow-100"
					class:bg-frost-200={peerCellLocations.includes(i)}
					class:bg-aurora-300={data.selectedRow * 9 + data.selectedCol === i}
					class:text-transparent={!cell}
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
