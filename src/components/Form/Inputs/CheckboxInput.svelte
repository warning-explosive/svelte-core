<script lang="ts">
    import {FormElementArgs} from "../../../scripts/form";
    import {BooleanContainer} from "../../../scripts/containers";

    export let args: FormElementArgs<BooleanContainer>;
</script>

<label class="noselect" for={args.id}>{args.label}</label>
<input id={args.id} type="checkbox" disabled={args.disabled} bind:checked={args.container.value}>

<style>
</style>