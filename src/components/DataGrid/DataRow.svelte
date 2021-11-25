<script lang="ts">
    import DataCell from "./DataCell.svelte";

    export let isHeader: boolean = false;
    export let keys: string[];
    export let containers: {};
</script>

<tr>
    {#each keys as key}
        <DataCell isHeader={isHeader} container={containers[key]} />
    {/each}
</tr>

<style>
</style>