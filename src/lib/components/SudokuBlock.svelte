<script>
	export let order = 3;
	export let board = false;
</script>

<div class={`${order === 3 ? 'three' : 'two'} ${board ? 'board' : ''}`}>
	<slot />
</div>

<style>
	div {
		display: grid;
		grid-gap: 1px;
	}

	.three {
		grid-template-columns: 1fr 1fr 1fr;
	}

	.two {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
	}

	.board {
		grid-gap: 4px;
		aspect-ratio: 1;
	}
</style>
