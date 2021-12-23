<script>

    let w;
    let h;
    let clicked = false;

    const handleClick = () => {
        clicked = true;
    }
</script>

<div
    on:click={handleClick}
    bind:clientWidth={w}
    bind:clientHeight={h}
    style="
        font-size: {w * .8}px;
    "
    class={this.clicked ? 'clicked' : null}
>1</div>

<style>
    div {
        aspect-ratio: 1;
        height: 100%;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: var(--background-color);
        color: var(--text-color);
        text-align: center;
    }

    .clicked {
        background-color: red;
    }
</style>