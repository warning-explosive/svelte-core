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

<div class:disabled="{args.disabled}" on:click="{click}">
    {#if args.text}
        <span class="noselect">{args.text}</span>
    {:else}
        <slot />
    {/if}
</div>

<style>
    div {
        padding: 4px 16px;
        display: flex;
        align-items: center;
        grid-gap: 4px;
    }
    div:hover {
        background: darkgrey;
    }
    div.disabled {
        color: darkgrey;
    }
    div.disabled:hover {
        background: white;
    }
</style>
