<script lang="ts">
    import {Containers} from "../../scripts/containers";

    export let isHeader: boolean = false;
    export let container: Containers;

    function getDisplayValue(container: Containers) : string {
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

</script>

{#if isHeader}
    <th class="noselect">{getDisplayValue(container)}</th>
{:else}
    <td class="noselect">{getDisplayValue(container)}</td>
{/if}

<style>
</style>