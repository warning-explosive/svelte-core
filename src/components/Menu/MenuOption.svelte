<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    import { MenuOptionArgs } from './menu.ts'

    export let args: MenuOptionArgs

    const dispatch = createEventDispatcher()

    const click = () => {
        if (!args.disabled) {
            dispatch('click', args.text)
        }
    }
</script>

<div
    class:disabled="{args.disabled}"
    class="p-1 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100"
    on:click="{click}">
    {#if args.text}
        <span class="select-none">{args.text}</span>
    {:else}
        <slot />
    {/if}
</div>
