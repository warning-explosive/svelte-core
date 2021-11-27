<script lang="ts">
    import {LinkContainer} from "../../../scripts/containers";
    import {FormElementArgs} from "../../../scripts/form";

    export let args: FormElementArgs<LinkContainer>;

    let options: LinkContainer[] = [args.container, { kind: 'link', type: 'security', id: '42', caption: '4242' } ];
</script>

<label class="noselect" for={args.id}>{args.label}</label>
<select id={args.id} disabled={args.disabled} name={args.label} bind:value={args.container.id}>
    {#each options as option}
        <option value={option.id}>{option.caption}</option>
    {/each}
</select>

<style>
</style>