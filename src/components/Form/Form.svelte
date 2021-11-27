<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import FormLayout from "./FormLayout.svelte";
    import {FormLayoutNode} from "../../scripts/form";
    import {Entity} from "../../scripts/containers";

    export let readonly: boolean = false;
    export let item: Entity;
    export let layout: FormLayoutNode;

    const dispatch = createEventDispatcher();
    const onSubmit = () => dispatch('submit', item);
</script>

<section>
    <form on:submit|preventDefault={onSubmit}>
        <FormLayout {...layout} readonly={readonly} bind:item={item} />
        <input type="submit" />
    </form>
</section>

<style>
</style>