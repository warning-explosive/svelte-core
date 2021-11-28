<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {Containers} from "../../scripts/containers";
    import type {ColumnData, SwapColumnsData} from "../../scripts/dataGrid";

    export let isHeader: boolean = false;
    export let index: number;
    export let key: string;
    export let container: Containers;

    const dispatch = createEventDispatcher();

    const id = key + index;

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

    const dataKey = 'text/plain';
    let isDndHovered: boolean = false;

    const getColumnData = (): ColumnData => {
        return {
            key: key,
            index: index
        };
    }

    const onDragStart = (event: DragEvent): void => {
        event.dataTransfer.setData(dataKey, JSON.stringify(getColumnData()));
    }

    const onDragEnter = (): void => {
        isDndHovered = true;
    }

    const onDragLeave = (): void => {
        isDndHovered = false;
    }

    const onDragOver = (event: DragEvent): void => {
        event.dataTransfer.dropEffect = 'move';
    }

    const onDrop = (event: DragEvent): void => {
        const columnData: ColumnData = JSON.parse(event.dataTransfer.getData(dataKey));

        if (columnData.key !== key) {
            const swapColumnsData: SwapColumnsData = { from: columnData, to: getColumnData() }
            dispatch('swapColumns', swapColumnsData);
        }

        isDndHovered = false;
    }
</script>

{#if isHeader}
    <th {id} class:dndHover={isDndHovered} draggable={true} on:dragstart={onDragStart} on:dragover|preventDefault={onDragOver} on:drop={onDrop} on:dragenter={onDragEnter} on:dragleave={onDragLeave} class="noselect">{getDisplayValue(container)}</th>
{:else}
    <td {id} class="noselect">{getDisplayValue(container)}</td>
{/if}

<style>
    th[draggable] {
        cursor: grab;
    }

    .dndHover {
        background-color: darkgrey;
    }
</style>