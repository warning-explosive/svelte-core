<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { fade } from 'svelte/transition'
    import { linear } from 'svelte/easing'
    import { FadeParams } from 'svelte/types/runtime/transition'

    import { Point } from './menu.ts'
    import { determineBrowser } from '../../scripts/userAgent.ts'

    const dispatch = createEventDispatcher()

    let menu
    let showMenu = false
    let position: Point = {
        x: 0,
        y: 0,
    }

    const getFixedPosition = (event: PointerEvent): Point => {
        const browser = determineBrowser()

        if (!browser || browser === 'Safari') {
            return {
                x: event.clientX,
                y: event.clientY,
            }
        }

        return {
            x: event.layerX,
            y: event.layerY,
        }
    }

    export const openMenu = async (event: PointerEvent): Promise<void> => {
        if (showMenu) {
            await closeMenu()
        }

        position = getFixedPosition(event)

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
        transition:fade="{fadeParams}"
        bind:this="{menu}"
        on:contextmenu|preventDefault="{() => {}}">
        <slot />
    </div>
{/if}

<style>
    div {
        position: fixed;
        display: grid;
        border: 1px solid black;
        box-shadow: 4px 4px 4px 0px grey;
        background: white;
    }
</style>
