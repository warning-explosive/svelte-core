<script lang="ts">
    import FormLayout from "./FormLayout.svelte";
    import {FormLayoutNode} from "../../scripts/form";
    import {Entity} from "../../scripts/containers";

    export let readonly: boolean = false;
    export let item: Entity;
    export let layout: FormLayoutNode;
    export let isValidForm: boolean = false;

    $: {
        // TODO: make real validation;
        isValidForm = true;
    };
</script>

<form on:submit|preventDefault>
    <FormLayout {...layout} readonly={readonly} bind:item={item} />
</form>

<style>
</style>