<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {createGridStore} from "../../scripts/gridStore";
    import DataRow from "./DataRow.svelte";
    import type {Entity} from "../../scripts/containers";

    export let url: string;

    let selected:string[] = [];

    const select = event => {
        selected.push(event.detail);
        selected = selected;
    };

    const unselect = event => {
        selected = selected.filter(id => id !== event.detail);
    };

    const { store, refresh, getById } = createGridStore(url);

    const refreshDataGrid = () => {
        selected = [];
        refresh();
    }

    const dispatch = createEventDispatcher();

    const openForm = event => {
        dispatch('openForm', getById(event.detail));
    }

    let headerContainers: Entity = {
        id: {
            kind: 'string',
            value: 'id'
        }
    };

    const getHeaderContainers = (acc: Entity, key: string): Entity => {
        acc[key] = { kind: 'string', value: key };
        return acc;
    };
</script>

<button on:click={refreshDataGrid} disabled={$store.state !== 'idling'}>{$store.state === "loading" ? 'Loading...' : 'Refresh'}</button>
<span>Selected rows: {selected.length ? selected : 'empty'}</span>
{#if $store.state === "error"}
    <span>Error: {$store.data}</span>
{:else if $store.state === "idling"}
    <table>
        <DataRow id={'header'} isHeader={true} keys={$store.keys} containers={$store.keys.reduce(getHeaderContainers, headerContainers)} />
        {#each $store.data as containers (containers.id.value)}
            <DataRow id={containers.id.value} isHeader={false} keys={$store.keys} {containers} on:selected={select} on:unselected={unselect} on:openForm={openForm} />
        {/each}
    </table>
{/if}

<style>
</style>