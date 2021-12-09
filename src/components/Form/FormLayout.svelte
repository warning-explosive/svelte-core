<script lang="ts">
    import {ChildFormLayoutNode, FormElementArgs, FormElementNode, FormLayoutNode} from "../../scripts/form";
    import {Entity} from "../../scripts/dataContainers";
    import TextInput from "./Inputs/TextInput.svelte";
    import MoneyInput from "./Inputs/MoneyInput.svelte";
    import LinkInput from "./Inputs/LinkInput.svelte";
    import DateInput from "./Inputs/DateInput.svelte";
    import CheckboxInput from "./Inputs/CheckboxInput.svelte";
    import PasswordInput from "./Inputs/PasswordInput.svelte";
    import NumberInput from "./Inputs/NumberInput.svelte";

    export let entity: Entity;
    export let node: ChildFormLayoutNode;

    const direction = (node as FormLayoutNode).direction;
    const children = (node as FormLayoutNode).children;
    const isLayout = !!direction && !!children;

    const key = (node as FormElementNode).key;
    const disabled = (node as FormElementNode).disabled;
    const focused = (node as FormElementNode).focused;
    const isElement = !!key;

    let args: FormElementArgs<any>;

    $: if (isElement) {
        args = {
            key: key,
            disabled: disabled,
            focused: focused,
            label: key,
            container: entity[key]
        }
    }
</script>

<div class="{isLayout ? `${direction} layout` : ''}">
    {#if isLayout}
        {#each children as child}
            <svelte:self node={child} bind:entity={entity} on:validate/>
        {/each}
    {:else}
        {#if args.container.kind === 'string'}
            <TextInput bind:args={args} on:validate/>
        {:else if args.container.kind === 'password'}
            <PasswordInput bind:args={args} on:validate/>
        {:else if args.container.kind === 'number'}
            <NumberInput bind:args={args} on:validate/>
        {:else if args.container.kind === 'boolean'}
            <CheckboxInput bind:args={args}/>
        {:else if args.container.kind === 'date'}
            <DateInput bind:args={args}/>
        {:else if args.container.kind === 'link'}
            <LinkInput bind:args={args}/>
        {:else if args.container.kind === 'money'}
            <MoneyInput bind:args={args}/>
        {:else}
            <div>Unknown container: {args.container.kind}</div>
        {/if}
    {/if}
</div>

<style>
    .layout {
        margin: 4px;
        padding: 4px;

        display: flex;
        justify-content: flex-start;
    }

    .horizontal {
        flex-direction: row;
    }

    .vertical {
        flex-direction: column;
    }
</style>