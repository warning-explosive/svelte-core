<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import DataCell from "./DataCell.svelte";
    import type {Entity} from "../../scripts/containers";

    export let id:string;
    export let isHeader: boolean = false;
    export let keys: string[];
    export let containers: Entity;

    const dispatch = createEventDispatcher();

    let selected: boolean = false;

    const select = () => {
        if (!isHeader) {
            selected = !selected;
            if (selected) {
                dispatch('selected', id);
            } else {
                dispatch('unselected', id);
            }
        }
    };

    const openForm = () => {
        if (!isHeader) {
            dispatch('openForm', id);
        }
    }
</script>

<tr id={containers.id.value} class:selected={selected} class:header={isHeader} on:click={select} on:dblclick={openForm}>
    {#each keys as key, index}
        <DataCell isHeader={isHeader} {index} {key} container={containers[key]} on:swapColumns />
    {/each}
</tr>

<style>
</style>