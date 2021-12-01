<script lang="ts">
    import {onMount} from "svelte";
    import {getDateString} from "../../../scripts/date";
    import {FormElementArgs} from "../../../scripts/form";
    import {DateContainer} from "../../../scripts/containers";

    export let args: FormElementArgs<DateContainer>;

    let dateString;

    onMount(() => {
        dateString = getDateString(args.container.value);
    });

    const onChange = () => {
        args.container.value = new Date(Date.parse(dateString));
    }
</script>

<label class="noselect" for={args.id}>{args.label}</label>
<input id={args.id} type="date" disabled={args.disabled} bind:value={dateString} on:change={onChange}>

<style>
</style>