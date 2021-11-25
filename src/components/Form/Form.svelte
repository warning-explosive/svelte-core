<script lang="ts">
    import FormLayout from "./FormLayout.svelte";
    import {FormLayoutNode} from "../../scripts/form";

    export let readonly: boolean = false;
    export let item: object;
    export let layout: FormLayoutNode;

    const submit = () => { console.log(JSON.stringify(item)) };
</script>

<section>
    <form on:submit|preventDefault={submit}>
        <FormLayout {...layout} readonly={readonly} bind:item={item} />
        <input type="submit" />
    </form>
</section>

<style>
</style>