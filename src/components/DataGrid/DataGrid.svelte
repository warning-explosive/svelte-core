<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { slide } from 'svelte/transition'
    import { flip, FlipParams } from 'svelte/animate'
    import { linear } from 'svelte/easing'
    import { SlideParams } from 'svelte/types/runtime/transition'

    import { createGridStore } from '../../scripts/gridStore.ts'
    import { Entity, StringDataContainer, DataContainers } from '../../scripts/dataContainers.ts'
    import { SwapColumnsData } from './dataGrid.ts'
    import { ColumnData } from './dataGrid.ts'

    import ButtonGroup from '../Form/Controls/ButtonGroup.svelte'
    import Button from '../Form/Controls/Button.svelte'
    import Menu from '../Menu/Menu.svelte'
    import MenuOption from '../Menu/MenuOption.svelte'
    import MenuDivider from '../Menu/MenuDivider.svelte'

    export let url: string

    const dispatch = createEventDispatcher()

    /*
     * Row selection
     */
    let selected: string[] = []

    const isSelected = (entity: Entity, selected: string[]): boolean => {
        return selected.includes(entity.id.value)
    }

    const select = (entity: Entity, e: PointerEvent): void => {
        if (!e.altKey) {
            return
        }
        const id = entity.id.value
        if (selected.includes(id)) {
            selected = selected.filter((it) => it !== id)
        } else {
            selected = [...selected, id]
        }
    }

    /*
     * Grid store
     */
    const { store, refresh, reorderColumns, deleteEntity } = createGridStore(url)

    const refreshDataGrid = () => {
        selected = []
        refresh()
    }

    /*
     * Delete entity
     */
    const deleteSelected = () => {
        for (const id of selected) {
            deleteEntity(id)
            selected = selected.filter((selected) => selected !== id)
        }
    }

    /*
     * Form opening
     */
    const openForm = (entity: Entity): void => {
        dispatch('openForm', entity)
        closeContextMenu()
    }

    /*
     * Display data
     */
    const getHeaderContainer = (key: string): StringDataContainer => {
        return { kind: 'string', value: key }
    }

    const getDisplayValue = (container: DataContainers): string => {
        let displayValue: string

        switch (container.kind) {
            case 'string':
                displayValue = container.value
                break
            case 'password':
                displayValue = container.value
                break
            case 'number':
                displayValue = container.value.toString()
                break
            case 'boolean':
                displayValue = container.value.toString()
                break
            case 'date':
                displayValue = container.value.toDateString()
                break
            case 'link':
                displayValue = `${container.caption} (${container.id})`
                break
            case 'money':
                displayValue = `${container.amount} ${container.currency}`
                break
            default:
                const _exhaustiveCheck: never = container
                break
        }

        return displayValue
    }

    /*
     * Drag & Drop
     */
    let dndHoveredKey: string | undefined = undefined

    const dataKey = 'text/plain'

    const getColumnData = (key: string, index: number): ColumnData => {
        return {
            key: key,
            index: index,
        }
    }

    const onDragStart = (key: string, index: number, event: DragEvent): void => {
        event.dataTransfer.setData(dataKey, JSON.stringify(getColumnData(key, index)))
    }

    const onDragEnter = (key: string): void => {
        dndHoveredKey = key
    }

    const onDragLeave = (): void => {
        dndHoveredKey = undefined
    }

    const onDragOver = (event: DragEvent): void => {
        event.dataTransfer.dropEffect = 'move'
    }

    const onDrop = (key: string, index: number, event: DragEvent): void => {
        const columnData: ColumnData = JSON.parse(event.dataTransfer.getData(dataKey))

        if (columnData.key !== key) {
            const swapColumnsData: SwapColumnsData = {
                from: columnData,
                to: getColumnData(key, index),
            }
            reorderColumns(swapColumnsData)
        }

        dndHoveredKey = undefined
    }

    /*
     * Context menu
     */
    let contextMenuEntity: Entity | undefined
    let openMenu: (event: PointerEvent) => Promise<void>
    let closeMenu: () => Promise<void>

    const openContextMenu = async (entity: Entity, event: PointerEvent): Promise<void> => {
        await closeContextMenu()

        contextMenuEntity = entity

        if (!selected.includes(entity.id.value)) {
            selected = [entity.id.value]
        }

        await openMenu(event)
    }

    const closeContextMenu = async (): Promise<void> => {
        await closeMenu()
        contextMenuEntity = undefined
    }

    const contextualDeleteSelected = () => {
        deleteSelected()
        closeContextMenu()
    }

    const contextualDeleteSelectedArgs = (selected: string[]) => {
        return {
            text: 'delete ' + selected,
            disabled: false,
        }
    }

    /*
     * Animation
     */
    const columnsFlipParams: FlipParams = {
        duration: 500,
        easing: linear,
    }

    const rowSlideInParams: SlideParams = {
        duration: 500,
        easing: linear,
    }

    const rowSlideOutParams: SlideParams = {
        duration: 500,
        easing: linear,
    }
</script>

<Menu bind:openMenu bind:closeMenu>
    <MenuOption
        args="{{ text: 'open', disabled: false }}"
        on:click="{() => openForm(contextMenuEntity)}" />
    <MenuDivider />
    <MenuOption
        args="{contextualDeleteSelectedArgs(selected)}"
        on:click="{contextualDeleteSelected}" />
    <MenuDivider />
    <MenuOption
        args="{{ text: 'disabled action', disabled: true }}"
        on:click="{closeContextMenu}" />
</Menu>
<ButtonGroup>
    <Button
        options="{{
            label: $store.state === 'loading' ? 'Loading...' : 'Refresh',
            disabled: $store.state !== 'idling',
        }}"
        on:click="{refreshDataGrid}" />
    <Button
        options="{{
            label: 'Delete selected' + (selected.length ? ': ' + selected : ''),
            disabled: !selected.length,
        }}"
        on:click="{deleteSelected}" />
</ButtonGroup>
{#if $store.state === 'error'}
    <span>Error: {$store.data}</span>
{:else if $store.state === 'idling'}
    <table class="rounded-lg">
        <thead class="rounded-t-lg">
            <tr class="rounded-t-lg bg-gray-200">
                {#each $store.keys as key, index (key)}
                    <th
                        class="first:rounded-tl-lg last:rounded-tr-lg hover:bg-gray-300"
                        animate:flip="{columnsFlipParams}"
                        draggable="{true}"
                        on:dragstart="{(e) => onDragStart(key, index, e)}"
                        on:dragover|preventDefault="{onDragOver}"
                        on:drop="{(e) => onDrop(key, index, e)}"
                        on:dragenter="{() => onDragEnter(key)}"
                        on:dragleave="{onDragLeave}">
                        {getDisplayValue(getHeaderContainer(key))}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody class="rounded-b-lg">
            {#each $store.data as entity, rowIndex (entity.id.value)}
                <tr
                    class="last:rounded-b-lg {isSelected(entity, selected)
                        ? 'bg-slate-300 hover:bg-slate-400'
                        : 'odd:bg-white even:bg-gray-100 hover:bg-gray-300'}"
                    in:slide="{rowSlideInParams}"
                    out:slide="{rowSlideOutParams}"
                    on:click="{(e) => select(entity, e)}"
                    on:dblclick="{() => openForm(entity)}"
                    on:contextmenu|preventDefault="{(e) => openContextMenu(entity, e)}">
                    {#each $store.keys as key, index (key)}
                        <td
                            class="{$store.data.length === rowIndex + 1
                                ? 'first:rounded-bl-lg last:rounded-br-lg'
                                : ''}"
                            animate:flip="{columnsFlipParams}">
                            {getDisplayValue(entity[key])}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
{/if}
