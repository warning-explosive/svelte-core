<script lang="ts">
    import {onMount, createEventDispatcher} from "svelte";
    import {slide} from "svelte/transition";
    import {linear} from 'svelte/easing';
    import {getDateString} from "../../../scripts/date";
    import {FormElementArgs, ValidationEventArgs} from "../../../scripts/form";
    import {DateDataContainer} from "../../../scripts/dataContainers";
    import {SlideParams} from "svelte/types/runtime/transition";

    export let args: FormElementArgs<DateDataContainer>;

    const dispatch = createEventDispatcher();

    let dateString;
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
    }

    onMount(() => {
        dateString = getDateString(args.container.value);
        validate();
    })

    const setValue = () => {
        args.container.value = new Date(Date.parse(dateString));
    }

    const onChange = () => {
        setValue();
        validate();
    }

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
    <input
        id={args.key}
        type="date"
        disabled={args.disabled}
        bind:value={dateString}
        on:change={onChange}>
    {#if errorMessage}
        <span class="error" transition:slide={slideParams}>{errorMessage}</span>
    {/if}
</div>

<style>
</style>