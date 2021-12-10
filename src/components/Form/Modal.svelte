<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {linear, backIn, backOut} from "svelte/easing";
    import {fade, scale, ScaleParams} from "svelte/transition";
    import type {FadeParams} from "svelte/types/runtime/transition";

    const dispatch = createEventDispatcher();

    let showModal = false;

    export const openModal = () => {
        const body = getBody();

        if (body) {
            showModal = true;
            body.style.overflow = 'hidden';
        }
    };

    export const closeModal = () => {
        const body = getBody();

        if (body) {
            showModal = false;
            body.style.overflow  = 'auto';
        }
    };

    const getBody = (): ElementCSSInlineStyle | null => {
        return document.querySelector('body');
    }

    const onBackdropClick = () => {
        dispatch('backdropClick');
    };

    const onKeydown = (e) => {
        dispatch('keydown', e);
    };

    /*
     * Animation
     */
    const fadeParams: FadeParams = {
        duration: 500,
        easing: linear
    };

    const scaleIn: ScaleParams = {
        duration: 500,
        easing: backOut
    };

    const scaleOut: ScaleParams = {
        duration: 500,
        easing: backIn
    };
</script>

<svelte:window on:keydown={onKeydown}/>

{#if showModal}
    <div
        class="modal-backdrop centered-content"
        transition:fade={fadeParams}
        on:click={onBackdropClick}
        on:contextmenu|stopPropagation={() => {}}>
        <div
            class="modal-content"
            in:scale={scaleIn}
            out:scale={scaleOut}
            on:click|stopPropagation={() => {}}
            on:contextmenu|stopPropagation={() => {}}>
            <slot />
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        visibility: visible;
        z-index: 9999;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: transparent;
        -webkit-backdrop-filter: blur(4px);
        backdrop-filter: blur(4px);
    }
    .modal-content {
        border-radius: 4px;
        background: white;
        border: 2px solid black;
        filter: drop-shadow(4px 4px 4px gray);
        padding: 1em;
        display: flex;
        flex-direction: column;
    }
</style>