<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { fade } from 'svelte/transition'
    import { linear } from 'svelte/easing'
    import { FadeParams } from 'svelte/types/runtime/transition'

    import { Point } from './menu.ts'

    const dispatch = createEventDispatcher()

    let menu
    let showMenu = false
    let position: Point = {
        x: 0,
        y: 0,
    }

    export const openMenu = async (event: PointerEvent): Promise<void> => {
        if (showMenu) {
            await closeMenu()
        }

        position = {
            x: event.clientX,
            y: event.clientY,
        }

        showMenu = true
        await new Promise((resolve) => setTimeout(resolve, fadeParams.duration))
    }

    export const closeMenu = async (): Promise<void> => {
        showMenu = false
        await new Promise((resolve) => setTimeout(resolve, fadeParams.duration))
    }

    const recalculatePosition = (position: Point): void => {
        if (!menu) {
            return
        }

        const rect = menu.getBoundingClientRect()
        position.x = Math.min(window.innerWidth - rect.width, position.x)

        if (position.y > window.innerHeight - rect.height) {
            position.y -= rect.height
        }
    }

    $: recalculatePosition(position)

    /*
     * Animation
     */
    const fadeParams: FadeParams = {
        duration: 100,
        easing: linear,
    }
</script>

<svelte:body on:click="{closeMenu}" />

{#if showMenu}
    <div
        style="top: {position.y}px; left: {position.x}px;"
        class="fixed flex flex-col bg-white shadow-lg rounded-lg"
        transition:fade="{fadeParams}"
        bind:this="{menu}"
        on:contextmenu|preventDefault="{() => {}}">
        <slot />
    </div>
{/if}
