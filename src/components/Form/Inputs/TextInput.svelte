<script lang="ts">
    import {FormElementArgs} from "../../../scripts/form";
    import {StringContainer} from "../../../scripts/containers";

    export let args: FormElementArgs<StringContainer>;
</script>

<label for={args.id}>{args.label}</label>
<input id={args.id} type="text" disabled={args.disabled} bind:value={args.container.value}>

<style>
</style>