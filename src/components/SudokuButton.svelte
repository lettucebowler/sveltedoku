<script>
    import { createEventDispatcher } from "svelte";
    export let buttonText;
    const dispatch = createEventDispatcher();
    export let type;
</script>

<button class={`${type} square`} on:click={() => dispatch("SudokuButtonClick")}>{buttonText}</button>

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

    .primary {
        background: var(--nord-3);
        color: var(--nord-6);
    }

    .primary:hover {
        background: var(--nord-2);
    }

    .square {
        aspect-ratio: 1;
    }
</style>