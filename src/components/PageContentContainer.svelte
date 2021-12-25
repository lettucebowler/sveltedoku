<div class="center">
	<div class="page">
		<slot />
	</div>
</div>

<style>
	.page {
		width: 62.5vh;
		display: grid;
		flex-direction: column;
		height: 100vh;
		text-align: center;
		margin: auto;
		grid-template-columns: 1fr;
		padding: 0px 0px;
	}

	.center {
		/* display: flex;
    flex-direction: row;
    align-content: center;
    width: 100vw; */
		margin: 0 0;
		padding: 4px 4px;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		position: absolute;
	}
</style>
