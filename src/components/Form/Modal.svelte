<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {linear, backIn, backOut} from "svelte/easing";
    import {fade, scale, ScaleParams} from "svelte/transition";
    import type {FadeParams} from "svelte/types/runtime/transition";
    import Modal from "../../scripts/modal";

    export let modal: Modal;

    const dispatch = createEventDispatcher();

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

{#if modal.modalIsShown}
    <div
        class="modal-backdrop centered-content"
        transition:fade={fadeParams}
        on:click={onBackdropClick}>
        <div
            class="modal-form"
            in:scale={scaleIn}
            out:scale={scaleOut}
            on:click|stopPropagation={() => {}}>
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
        backdrop-filter: blur(4px);
    }
    .modal-form {
        position: relative;
        border-radius: 4px;
        background: white;
        border: 2px solid black;
        filter: drop-shadow(4px 4px 4px gray);
        padding: 1em;
        display: flex;
        flex-direction: column;
    }
</style>