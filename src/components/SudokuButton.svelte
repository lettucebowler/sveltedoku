<script>
    import { createEventDispatcher } from "svelte";
    export let buttonText;
    export let square = true;
    export let fluid = false;
    const dispatch = createEventDispatcher();
    export let type;
</script>

<button
    class={`${type} ${square ? 'square' : ''} ${fluid ? 'fluid' : ''}`}
    on:click={() => dispatch("SudokuButtonClick")}
>
    {buttonText}
</button>

<style>
    button {
        border-radius: 9px;
        border: none;
        transition: 0.1s ease-in-out;
        cursor: pointer;
        font-weight: 900;
        display: inline;
        align-items: center;
        justify-content: center;
        font-family: inherit;
        min-height: 50px;
        font-size: 16px;
    }

    .square {
        aspect-ratio: 1;
        grid-column: span 1;
    }

    .fluid {
        grid-column: span 5;
        aspect-ratio: 5;
    }

    .primary {
        background: var(--nord-3);
        color: var(--nord-6);
    }

    .primary:hover {
        background: var(--nord-2);
    }

    .primary:active {
        background: var(--nord-1);
    }
</style>