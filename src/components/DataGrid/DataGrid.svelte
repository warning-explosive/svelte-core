<script lang="ts">
    import DataRow from "./DataRow.svelte";

    export let keys: string[];
    export let rows: object[];

    let headerContainers = keys.reduce((acc, key) => {
        acc[key] = { kind: 'string', value: key };
        return acc;
    }, {});
</script>

<table>
    <DataRow isHeader={true} {keys} containers={headerContainers} />
    {#each rows as containers}
        <DataRow {keys} {containers} />
    {/each}
</table>

<style>
</style>