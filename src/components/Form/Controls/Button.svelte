<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    import { ButtonOptions } from './buttonOptions.ts'

    export let options: ButtonOptions

    const dispatch = createEventDispatcher()

    const onClick = () => {
        dispatch('click')
    }
</script>

<button
    disabled="{options.disabled}"
    on:click="{onClick}"
    on:contextmenu|preventDefault="{() => {}}">
    {#if options.icon}
        {options.icon}
    {/if}
    {#if options.label}
        <span class="noselect">{options.label}</span>
    {/if}
</button>

<style>
    span {
        color: black;
    }

    button {
        background-color: gray;
        outline: none;
        border: none;
    }

    button:disabled {
        background-color: darkgrey;
    }

    button:focus {
        background-color: dimgrey;
    }

    button:not(:disabled):active {
        background-color: royalblue;
    }

    button:not(:disabled):hover {
        background-color: dimgrey;
    }
</style>
