<script lang="ts">
    import type {ButtonGroupOptions} from "../../../scripts/formElementOptions";

    export let options: ButtonGroupOptions;
</script>

<div class={options.direction}>
    <slot />
</div>

<style>
    .vertical {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px 24px;
    }

    .horizontal {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding: 10px 24px;
    }
</style>