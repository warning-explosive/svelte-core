<script lang="ts">
    import DataRow from "./DataRow.svelte";
    import {createGridStore} from "../../scripts/gridStore";

    export let keys: string[] = [];

    let headerContainers = keys.reduce((acc, key) => {
        acc[key] = { kind: 'string', value: key };
        return acc;
    }, {});

    let selected:string[] = [];

    const select = event => {
        selected.push(event.detail);
        selected = selected;
    };

    const unselect = event => {
        selected = selected.filter(id => id !== event.detail);
    };

    const { store, refresh } = createGridStore('https://jsonplaceholder.typicode.com/posts');

    const refreshDataGrid = () => {
        selected = [];
        refresh();
    }
</script>

<button on:click={refreshDataGrid} disabled={$store.state !== 'idling'}>Refresh</button>
<span>Selected rows: {selected.length ? selected : 'empty'}</span>
{#if $store.state === "loading"}
    <span>Loading...</span>
{:else if $store.state === "error"}
    <span>Error: {$store.data}</span>
{:else }
    <table>
        <DataRow id={'header'} isHeader={true} {keys} containers={headerContainers} />
        {#each $store.data as containers (containers.id.value)}
            <DataRow id={containers.id.value} isHeader={false} {keys} {containers} on:selected={select} on:unselected={unselect} />
        {/each}
    </table>
{/if}

<style>
</style>