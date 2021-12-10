<script lang="ts">
    import {ButtonGroupOptions} from "./buttonOptions.ts";

    export let options: ButtonGroupOptions;
</script>

<div
    class={`${options.direction} layout`}
    on:contextmenu|preventDefault={() => {}}>
    <slot />
</div>

<style>
    .layout {
        display: flex;
        justify-content: center;
        padding: 12px 24px;
    }

    .vertical {
        flex-direction: column;
    }

    .horizontal {
        flex-direction: row;
    }
</style>