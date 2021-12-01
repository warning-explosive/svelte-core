<script lang="ts">
    import {BooleanContainer, Entity} from "./scripts/containers";
    import {FormElementArgs, FormLayoutNode} from "./scripts/form";
    import DataGrid from "./components/DataGrid/DataGrid.svelte";
    import Dialog from "./components/Form/Dialog.svelte";
    import Form from "./components/Form/Form.svelte";
    import CheckboxInput from "./components/Form/Inputs/CheckboxInput.svelte";

    let dialog;
    let item: Entity | undefined = undefined;
    let isValidForm: boolean;

    let formSwitch: FormElementArgs<BooleanContainer> = {
        id: 'readonly',
        disabled: false,
        label: 'readonly',
        container: { kind: 'boolean', value: true }
    };

    let layout: FormLayoutNode = {
        direction: 'horizontal',
        children: [
            {
                direction: "horizontal",
                children: [
                    {
                        direction: "vertical",
                        children: [
                            { key: 'id' },
                            { key: 'userId' }
                        ]
                    },
                    {
                        direction: "vertical",
                        children: [
                            { key: 'title' },
                            { key: 'body' }
                        ]
                    }
                ]
            }
        ]
    };

    const openForm = (event: CustomEvent<Entity>): void => {
        item = event.detail;
        dialog.showModal();
        dialog = dialog;
        document.querySelector('body').style.overflow = 'hidden';
    };

    const closeForm = () => {
        dialog.close();
        dialog = dialog;
        document.querySelector('body').style.overflow = 'auto';
    }

    const submitForm = () => {
        console.log(JSON.stringify(item));
        closeForm();
        dialog = dialog;
        document.querySelector('body').style.overflow = 'auto';
    };

    const clearItem = () => {
        item = undefined;
    };
</script>

<b>Welcome to svelte-data-grid!</b>
<br />
<DataGrid url={'https://jsonplaceholder.typicode.com/posts'} on:openForm={openForm} />
<Dialog bind:dialog={dialog} on:close={clearItem}>
    <div class="noselect" slot="header">
        <b>Welcome to svelte-form!</b>
    </div>
    <div slot="body">
        {#if (item)}
            <CheckboxInput bind:args={formSwitch} />
            <Form readonly={formSwitch.container.value} bind:item={item} layout={layout} bind:isValidForm={isValidForm} />
        {/if}
    </div>
    <div slot="buttons">
        <button on:click={closeForm}>Close</button>
        <button disabled={!isValidForm} on:click={submitForm}>Submit</button>
    </div>
</Dialog>

<style>
</style>