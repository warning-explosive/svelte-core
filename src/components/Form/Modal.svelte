<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte'
    import { linear, backIn, backOut } from 'svelte/easing'
    import { fade, scale, fly, ScaleParams, FlyParams } from 'svelte/transition'
    import type { FadeParams, TransitionConfig } from 'svelte/types/runtime/transition'

    const dispatch = createEventDispatcher()

    let showModal = false

    export const openModal = () => {
        const body = getBody()

        if (body) {
            showModal = true
            body.style.overflow = 'hidden'
        }
    }

    export const closeModal = () => {
        const body = getBody()

        if (body) {
            showModal = false
            body.style.overflow = 'auto'
        }
    }

    const getBody = (): ElementCSSInlineStyle | null => {
        return document.querySelector('body')
    }

    const onBackdropClick = () => {
        dispatch('backdropClick')
    }

    const onKeydown = (e) => {
        dispatch('keydown', e)
    }

    /*
     * Animation
     */
    const fadeParams: FadeParams = {
        duration: 500,
        easing: linear,
    }

    const scaleIn: ScaleParams = {
        duration: 500,
        easing: backOut,
    }

    const scaleOut: ScaleParams = {
        duration: 500,
        easing: backIn,
    }

    const flyIn: FlyParams = {
        duration: 1000,
        easing: linear,
        opacity: 1,
        y: 500,
    }

    const flyOut: FlyParams = {
        duration: 1000,
        easing: linear,
        opacity: 1,
        y: 500,
    }

    let mobile = false

    const checkSize = () => {
        mobile = !window.matchMedia('(min-width: 1024px)').matches
    }

    const transitionInFunc = (node: Element): TransitionConfig => {
        return mobile ? fly(node, flyIn) : scale(node, scaleIn)
    }

    const transitionOutFunc = (node: Element): TransitionConfig => {
        return mobile ? fly(node, flyOut) : scale(node, scaleOut)
    }
</script>

<svelte:window on:keydown="{onKeydown}" on:resize="{checkSize}" />

{#if showModal}
    <div
        class="fixed z-9999 inset-0 flex flex-col bg-transparent backdrop-blur-sm justify-end lg:justify-center lg:items-center"
        transition:fade="{fadeParams}"
        on:click="{onBackdropClick}"
        on:contextmenu|stopPropagation="{() => {}}">
        <div
            class="p-4 flex flex-col bg-white overflow-hidden rounded-t-lg mt-4 lg:m-0 lg:rounded-lg lg:shadow-lg"
            in:transitionInFunc
            out:transitionOutFunc
            on:click|stopPropagation="{() => {}}"
            on:contextmenu|stopPropagation="{() => {}}">
            <slot />
        </div>
    </div>
{/if}
