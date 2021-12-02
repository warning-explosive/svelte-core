<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {flip, FlipParams} from "svelte/animate";
    import {createGridStore} from "../../scripts/gridStore";
    import type {Entity, StringContainer} from "../../scripts/containers";
    import type {SwapColumnsData} from "../../scripts/dataGrid";
    import {Containers} from "../../scripts/containers";
    import {ColumnData} from "../../scripts/dataGrid";

    export let url: string;

    const dispatch = createEventDispatcher();

    /*
     * Row selection
     */
    let selected: string[] = [];

    const isSelected = (entity: Entity, selected: string[]): boolean => {
        return selected.includes(entity.id.value);
    };

    const select = (entity: Entity): void => {
        const id = entity.id.value;
        if (selected.includes(id)) {
            selected = selected.filter(it => it !== id);
        } else {
            selected = [...selected, id];
        }
    };

    /*
     * Grid store
     */
    const { store, refresh, reorderColumns } = createGridStore(url);

    const refreshDataGrid = () => {
        selected = [];
        refresh();
    }

    /*
     * Form opening
     */
    const openForm = (item: Entity): void => {
        dispatch('openForm', item);
    }

    /*
     * Display data
     */
    const getHeaderContainer = (key: string): StringContainer => {
        return { kind: 'string', value: key };
    };

    const getDisplayValue = (container: Containers): string => {
        let displayValue: string;

        switch (container.kind) {
            case "string":
                displayValue = container.value;
                break;
            case "number":
                displayValue = container.value.toString();
                break;
            case "boolean":
                displayValue = container.value.toString();
                break;
            case "date":
                displayValue = container.value.toDateString();
                break
            case "link":
                displayValue = `${container.caption} (${container.id})`;
                break;
            case "money":
                displayValue = `${container.amount} ${container.currency}`;
                break;
            default:
                const _exhaustiveCheck: never = container;
                break;
        }

        return displayValue;
    }

    /*
     * Drag & Drop
     */
    let dndHoveredKey: string | undefined = undefined;

    const dataKey = 'text/plain';

    const getColumnData = (key: string, index: number): ColumnData => {
        return {
            key: key,
            index: index
        };
    }

    const onDragStart = (key:string, index: number, event: DragEvent): void => {
        event.dataTransfer.setData(dataKey, JSON.stringify(getColumnData(key, index)));
    }

    const onDragEnter = (key: string): void => {
        dndHoveredKey = key;
    }

    const onDragLeave = (): void => {
        dndHoveredKey = undefined;
    }

    const onDragOver = (event: DragEvent): void => {
        event.dataTransfer.dropEffect = 'move';
    }

    const onDrop = (key: string, index: number, event: DragEvent): void => {
        const columnData: ColumnData = JSON.parse(event.dataTransfer.getData(dataKey));

        if (columnData.key !== key) {
            const swapColumnsData: SwapColumnsData = { from: columnData, to: getColumnData(key, index) }
            reorderColumns(swapColumnsData);
        }

        dndHoveredKey = undefined;
    }

    /*
     * Animation
     */
    const flipParams: FlipParams = { duration: 500 };
</script>

<button
    disabled={$store.state !== 'idling'}
    on:click={refreshDataGrid}>
    {$store.state === "loading" ? 'Loading...' : 'Refresh'}
</button>
<span>Selected rows: {selected.length ? selected : 'empty'}</span>
{#if $store.state === "error"}
    <span>Error: {$store.data}</span>
{:else if $store.state === "idling"}
    <table>
        <tr class="header">
            {#each $store.keys as key, index (key)}
                <th
                    class="noselect"
                    class:dndHover={dndHoveredKey === key}
                    animate:flip={flipParams}
                    draggable={true}
                    on:dragstart={e => onDragStart(key, index, e)}
                    on:dragover|preventDefault={onDragOver}
                    on:drop={e => onDrop(key, index, e)}
                    on:dragenter={() => onDragEnter(key)}
                    on:dragleave={onDragLeave}>
                    {getDisplayValue(getHeaderContainer(key))}
                </th>
            {/each}
        </tr>
        {#each $store.data as entity (entity.id.value)}
            <tr class:selected={isSelected(entity, selected)} on:click={() => select(entity)} on:dblclick={() => openForm(entity)}>
                {#each $store.keys as key, index (key)}
                    <td
                        class="noselect"
                        animate:flip={flipParams}>
                        {getDisplayValue(entity[key])}
                    </td>
                {/each}
            </tr>
        {/each}
    </table>
{/if}

<style>
    table {
        border-collapse: collapse;
    }

    th, td {
        text-align: left;
        border-bottom: 1px solid black;
    }

    tr.selected {
        background-color: cornflowerblue;
    }

    tr:hover:not(.header) {
        background-color: darkgrey;
    }

    tr.selected:hover:not(.header) {
        background-color: royalblue;
    }

    th[draggable] {
        cursor: grab;
    }

    .dndHover {
        background-color: darkgrey;
    }
</style>