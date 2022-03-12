<div class="center">
	<div class="page">
		<slot />
	</div>
</div>

<style>
	.page {
		aspect-ratio: 5 / 8.5;
		margin: 0 auto;
		min-height: 100%;
		height: 100vh;
		max-height: 100vh;
		max-width: 100vw;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.center {
		margin: 0 0;
		display: flex;
	}
</style>
