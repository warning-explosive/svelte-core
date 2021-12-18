<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'
    import { slide } from 'svelte/transition'
    import { linear } from 'svelte/easing'
    import { SlideParams } from 'svelte/types/runtime/transition'

    import { LinkDataContainer } from '../../../scripts/dataContainers.ts'
    import { ValidationEventArgs } from '../formValidation.ts'
    import { FormElementArgs } from '../formLayoutNode.ts'
    import { FormContextMenuArgs } from '../formContextualMenu.ts'

    export let args: FormElementArgs<LinkDataContainer>

    let options: LinkDataContainer[] = [args.container]

    const dispatch = createEventDispatcher()

    let select: HTMLSelectElement
    let errorMessage = ''
    let validationEventArgs: ValidationEventArgs = {
        key: args.key,
        message: errorMessage,
    }

    const validate = (): void => {
        dispatch('validate', validationEventArgs)
        errorMessage = validationEventArgs.message ?? ''
        select.setCustomValidity(errorMessage)
    }

    onMount(() => {
        validate()

        if (args.focused) {
            select.focus()
        }
    })

    const openContextMenu = (event: PointerEvent): void => {
        const contextMenuArgs: FormContextMenuArgs = {
            key: args.key,
            event: event,
        }

        dispatch('openContextMenu', contextMenuArgs)
    }

    /*
     * Animation
     */
    const slideParams: SlideParams = {
        duration: 200,
        easing: linear,
    }
</script>

<div class="m-2" on:contextmenu|preventDefault="{openContextMenu}">
    <label for="{args.key}">
        <span>{args.label}</span>
    </label>
    <select
        id="{args.key}"
        disabled="{args.disabled}"
        name="{args.label}"
        bind:value="{args.container.id}"
        bind:this="{select}"
        on:change="{validate}">
        {#each options as option}
            <option value="{option.id}">{option.caption}</option>
        {/each}
    </select>
    {#if errorMessage}
        <span class="error" transition:slide="{slideParams}">{errorMessage}</span>
    {/if}
</div>
