<script lang="ts">
    import {onMount, createEventDispatcher} from "svelte";
    import {slide} from "svelte/transition";
    import {linear} from 'svelte/easing';
    import {LinkDataContainer} from "../../../scripts/dataContainers";
    import {FormElementArgs, ValidationEventArgs} from "../../../scripts/form";
    import {SlideParams} from "svelte/types/runtime/transition";

    export let args: FormElementArgs<LinkDataContainer>;

    let options: LinkDataContainer[] = [args.container];

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

    onMount(() => validate());

    /*
     * Animation
     */
    const slideParams: SlideParams = {
        duration: 200,
        easing: linear
    };
</script>

<div>
    <label class="noselect" for={args.key}>
        <span>{args.label}</span>
    </label>
    <select
        id={args.key}
        disabled={args.disabled}
        name={args.label}
        bind:value={args.container.id}
        on:change={validate}>
        {#each options as option}
            <option value={option.id}>{option.caption}</option>
        {/each}
    </select>
    {#if errorMessage}
        <span class="error" transition:slide={slideParams}>{errorMessage}</span>
    {/if}
</div>

<style>
</style>