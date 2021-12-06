<script lang="ts">
    import {Entity} from "./scripts/dataContainers";
    import {FormLayoutNode} from "./scripts/form";
    import DataGrid from "./components/DataGrid/DataGrid.svelte";
    import Dialog from "./components/Form/Modal.svelte";
    import Form from "./components/Form/Form.svelte";
    import Modal from "./scripts/modal";
    import Button from "./components/Form/Controls/Button.svelte";
    import ButtonGroup from "./components/Form/Controls/ButtonGroup.svelte";

    let entity: Entity | undefined = undefined;
    let isValidForm: boolean;
    const form = new Modal();

    let layout: FormLayoutNode = {
        direction: 'horizontal',
        children: [
            {
                direction: "horizontal",
                children: [
                    {
                        direction: "vertical",
                        children: [
                            { key: 'id', disabled: true },
                            { key: 'userId', disabled: false }
                        ]
                    },
                    {
                        direction: "vertical",
                        children: [
                            { key: 'title', disabled: false },
                            { key: 'body', disabled: false }
                        ]
                    }
                ]
            }
        ]
    };

    const openForm = (event: CustomEvent<Entity>): void => {
        entity = event.detail;
        form.open();
    };

    const closeForm = () => {
        form.close();
        entity = undefined;
    }

    const closeFormEsc = (event: CustomEvent<KeyboardEvent>): void => {
        if (event.detail.key === 'Escape') {
            closeForm();
        }
    }

    const submitForm = () => {
        console.log(JSON.stringify(entity));
        closeForm();
    };
</script>

<b>Welcome to svelte-data-grid!</b>
<br />
<DataGrid url={'https://jsonplaceholder.typicode.com/posts'} on:openForm={openForm} />
<Dialog modal={form} on:backdropClick={closeForm} on:keydown={closeFormEsc}>
    <div class="noselect">
        <b>Welcome to svelte-form!</b>
    </div>
    {#if (entity)}
        <div>
            <Form bind:entity={entity} layout={layout} bind:isValidForm={isValidForm} />
        </div>
    {/if}
    <ButtonGroup options={{direction: 'horizontal'}}>
        <Button options={{label: 'Close'}} on:click={closeForm}/>
        <Button options={{label: 'Submit', disabled: !isValidForm}} on:click={submitForm}/>
    </ButtonGroup>
</Dialog>

<style>
</style>