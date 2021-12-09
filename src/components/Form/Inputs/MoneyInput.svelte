<script lang="ts">
    import {onMount, createEventDispatcher} from "svelte";
    import {slide} from "svelte/transition";
    import {linear} from 'svelte/easing';
    import {MoneyDataContainer} from "../../../scripts/dataContainers";
    import {FormElementArgs, ValidationEventArgs} from "../../../scripts/form";
    import {SlideParams} from "svelte/types/runtime/transition";

    export let args: FormElementArgs<MoneyDataContainer>;

    let options = [args.container.currency];

    const dispatch = createEventDispatcher();

    let select: HTMLSelectElement;
    let errorMessage = '';
    let validationEventArgs: ValidationEventArgs = {
        key: args.key,
        message: errorMessage
    };

    const validate = (): void => {
        dispatch('validate', validationEventArgs);
        errorMessage = validationEventArgs.message ?? '';
        select.setCustomValidity(errorMessage);
    };

    onMount(() => {
        validate();

        if (args.focused) {
            select.focus();
        }
    });

    /*
     * Animation
     */
    const slideParams: SlideParams = {
        duration: 200,
        easing: linear
    };
</script>

<div>
    <label class="noselect" for={args.key + '_amount'}>
        <span>{args.label}</span>
    </label>
    <input
        id={args.key + '_amount'}
        type="number"
        disabled={args.disabled}
        bind:value={args.container.amount}
        bind:this={select}
        on:input={validate}>
    <select
        id={args.key + '_currency'}
        disabled={args.disabled}
        name={args.label}
        bind:value={args.container.currency}
        on:change={validate}>
        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
    </select>
    {#if errorMessage}
        <span class="error" transition:slide={slideParams}>{errorMessage}</span>
    {/if}
</div>

<style>
</style>