<script lang="ts">
    import {onMount, createEventDispatcher} from "svelte";
    import {slide} from "svelte/transition";
    import {linear} from 'svelte/easing';
    import {SlideParams} from "svelte/types/runtime/transition";

    import {ValidationEventArgs} from "../formValidation.ts";
    import {FormElementArgs} from "../formLayoutNode.ts";
    import {FormContextMenuArgs} from "../formContextualMenu.ts";
    import {StringDataContainer} from "../../../scripts/dataContainers.ts";

    export let args: FormElementArgs<StringDataContainer>;

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
        type="password"
        disabled={args.disabled}
        bind:value={args.container.value}
        bind:this={input}
        on:input={validate}>
    {#if errorMessage}
        <span class="error" transition:slide={slideParams}>{errorMessage}</span>
    {/if}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
    }

    label {
        display: block;
    }

    input {
        margin: 0px;
        padding: 0px;
        height: 2em;
        border-width: 1px;
        border-style: solid;
        border-radius: 0px;
        border-color: #333;
    }

    input:invalid {
        border-color: #900;
        background-color: #FDD;
    }

    input:focus:invalid {
        outline: none;
    }

    .error {
        min-height: 1em;
        color: white;
        background-color: #900;
        border-radius: 0 0 4px 4px;
        margin: 0px;
        padding: 4px;
    }
</style>