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
    class="px-4 py-2 bg-gray-100 hover:bg-gray-300 active:bg-gray-400 first:rounded-l-lg last:rounded-r-lg shadow-lg"
    on:click="{onClick}"
    on:contextmenu|preventDefault="{() => {}}">
    {#if options.icon}
        {options.icon}
    {/if}
    {#if options.label}
        <span>{options.label}</span>
    {/if}
</button>
