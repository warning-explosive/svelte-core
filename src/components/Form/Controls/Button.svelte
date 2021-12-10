<script lang="ts">
    import {createEventDispatcher} from "svelte";

    import {ButtonOptions} from "./buttonOptions.ts";

    export let options: ButtonOptions;

    const dispatch = createEventDispatcher();

    const onClick = () => {
        dispatch('click')
    };
</script>

<button
    disabled={options.disabled}
    on:click={onClick}
    on:contextmenu|preventDefault={() => {}}>
    {#if options.icon}
        {options.icon}
    {/if}
    {#if options.label}
        <span class="noselect">{options.label}</span>
    {/if}
</button>

<style>
    button {
        color: #333;
        background-color: #f4f4f4;
        outline: none;
    }

    button:disabled {
        color: #999;
    }

    button:not(:disabled):active {
        background-color: #ddd;
    }

    button:focus {
        border-color: #666;
    }
</style>