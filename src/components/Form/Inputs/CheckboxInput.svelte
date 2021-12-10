<script lang="ts">
    import {onMount, createEventDispatcher} from "svelte";
    import {slide} from "svelte/transition";
    import {linear} from 'svelte/easing';
    import {SlideParams} from "svelte/types/runtime/transition";

    import {ValidationEventArgs} from "../formValidation.ts";
    import {FormElementArgs} from "../formLayoutNode.ts";
    import {FormContextMenuArgs} from "../formContextualMenu.ts";
    import {BooleanDataContainer} from "../../../scripts/dataContainers.ts";

    export let args: FormElementArgs<BooleanDataContainer>;

    const dispatch = createEventDispatcher();

    let input: HTMLInputElement;
    let errorMessage = '';
    let validationEventArgs: ValidationEventArgs = {
        key: args.key,
        message: errorMessage
    };

    const validate = (): void => {
        dispatch('validate', validationEventArgs);
        errorMessage = validationEventArgs.message ?? '';
        input.setCustomValidity(errorMessage);
    };

    onMount(() => {
        validate();

        if (args.focused) {
            input.focus();
        }
    });

    const openContextMenu = (event: PointerEvent): void => {
        const contextMenuArgs:FormContextMenuArgs = {
            key: args.key,
            event: event
        };

        dispatch('openContextMenu', contextMenuArgs);
    }

    /*
     * Animation
     */
    const slideParams: SlideParams = {
        duration: 200,
        easing: linear
    };
</script>

<div on:contextmenu|preventDefault={openContextMenu}>
    <label class="noselect" for={args.key}>
        <span>{args.label}</span>
    </label>
    <input
        id={args.key}
        type="checkbox"
        disabled={args.disabled}
        bind:checked={args.container.value}
        bind:this={input}
        on:click={validate}>
    {#if errorMessage}
        <span class="error" transition:slide={slideParams}>{errorMessage}</span>
    {/if}
</div>

<style>
</style>