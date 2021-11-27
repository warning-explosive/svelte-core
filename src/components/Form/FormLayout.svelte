<script lang="ts">
    import {ChildFormLayoutNode, FormElementArgs, FormLayoutDirection} from "../../scripts/form";
    import TextInput from "./Inputs/TextInput.svelte";
    import MoneyInput from "./Inputs/MoneyInput.svelte";
    import LinkInput from "./Inputs/LinkInput.svelte";
    import DateInput from "./Inputs/DateInput.svelte";
    import CheckboxInput from "./Inputs/CheckboxInput.svelte";
    import {Entity} from "../../scripts/containers";

    export let readonly: boolean = true;
    export let item: Entity;
    export let direction: FormLayoutDirection = undefined;
    export let children: ChildFormLayoutNode[] = [];

    let args: FormElementArgs<any>;

    $: if (!direction) {
        let key = $$props.key;

        args = {
            id: key,
            disabled: readonly,
            label: key,
            container: item[key]
        }
    }
</script>

<div class={direction}>
    {#if !!direction}
        {#each children as child}
            <svelte:self {...child} {readonly} bind:item={item} />
        {/each}
    {:else}
        {#if args.container.kind === 'string'}
            <TextInput bind:args={args} />
        {:else if args.container.kind === 'number'}
            <TextInput bind:args={args} />
        {:else if args.container.kind === 'boolean'}
            <CheckboxInput bind:args={args} />
        {:else if args.container.kind === 'date'}
            <DateInput bind:args={args} />
        {:else if args.container.kind === 'link'}
            <LinkInput bind:args={args} />
        {:else if args.container.kind === 'money'}
            <MoneyInput bind:args={args} />
        {:else}
            <div>Unknown container: {args.container.kind}</div>
        {/if}
    {/if}
</div>

<style>
    .horizontal {
        margin: 5px;
        padding: 5px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .vertical {
        margin: 5px;
        padding: 5px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
</style>