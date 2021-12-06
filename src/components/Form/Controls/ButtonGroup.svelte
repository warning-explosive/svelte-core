<script lang="ts">
    import type {ButtonGroupOptions} from "../../../scripts/formElementOptions";

    export let options: ButtonGroupOptions;
</script>

<div class={`${options.direction} layout`}>
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