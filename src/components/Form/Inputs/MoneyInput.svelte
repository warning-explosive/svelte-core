<script lang="ts">
    import {MoneyContainer} from "../../../scripts/containers";
    import {FormElementArgs} from "../../../scripts/form";

    export let args: FormElementArgs<MoneyContainer>;

    let options = [args.container.currency];
</script>

<div>
    <label class="noselect" for={args.id + '_amount'}>{args.label}</label>
    <input id={args.id + '_amount'} type="number" disabled={args.disabled} bind:value={args.container.amount}>
    <select id={args.id + '_currency'} disabled={args.disabled} name={args.label} bind:value={args.container.currency}>
        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
    </select>
</div>

<style>
</style>