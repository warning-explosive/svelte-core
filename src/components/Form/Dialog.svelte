<script lang="ts">
    import dialogPolyfill from "dialog-polyfill";
    import {onMount} from "svelte";

    export let dialog;

    onMount(() => {
       dialogPolyfill.registerDialog(dialog);
    });
</script>

<dialog bind:this={dialog}>
    <header>
        <slot name="header" />
    </header>
    <main>
        <slot name="body" />
    </main>
    <footer>
        <slot name="buttons" />
    </footer>
</dialog>

<style>
</style>