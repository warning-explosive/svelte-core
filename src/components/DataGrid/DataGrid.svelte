<script lang="ts">
    import DataRow from "./DataRow.svelte";
    import {createGridStore} from "../../scripts/store";

    export let keys: string[];

    let headerContainers = keys.reduce((acc, key) => {
        acc[key] = { kind: 'string', value: key };
        return acc;
    }, {});

    const { store, refresh } = createGridStore('https://jsonplaceholder.typicode.com/posts');
</script>

<button on:click={refresh} disabled={$store.state !== 'idling'}>Refresh</button>
{#if $store.state === "loading"}
    <span>Loading...</span>
{:else if $store.state === "error"}
    <span>Error: {$store.data}</span>
{:else }
    <table>
        <DataRow isHeader={true} {keys} containers={headerContainers} />
        {#each $store.data as containers}
            <DataRow {keys} {containers} />
        {/each}
    </table>
{/if}

<style>
</style>