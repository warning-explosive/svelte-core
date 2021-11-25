<script lang="ts">
    import DataCell from "./DataCell.svelte";
    import type {Containers} from "../../scripts/containers";

    export let isHeader: boolean = false;
    export let keys: string[];
    export let containers: { [index: string]: Containers };
</script>

<tr>
    {#each keys as key}
        <DataCell isHeader={isHeader} container={containers[key]} />
    {/each}
</tr>

<style>
</style>