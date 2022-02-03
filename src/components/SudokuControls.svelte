<script>
    import SudokuButton from '../components/SudokuButton.svelte';
    import { createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();

</script>

<div class="grid">
    {#each [1, 2, 3, 4, 5] as move}
        <SudokuButton 
            buttonText={move}
            type="primary"
            aspectRatio={1}
            on:SudokuButtonClick={() => dispatch('SudokuMove', {
                num: move
            })}
        />
    {/each}
    {#each [6, 7, 8, 9, 0] as move}
        <SudokuButton 
            buttonText={move}
            type="primary"
            on:SudokuButtonClick={() => dispatch('SudokuMove', {
                num: move
            })}
        />
    {/each}
    <SudokuButton
        buttonText="New game"
        type="primary"
        square={false}
        fluid
        on:SudokuButtonClick={() => {
            dispatch('newGame')
        }}
    />
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        column-gap: 4px;
        row-gap: 4px;
    }
</style>