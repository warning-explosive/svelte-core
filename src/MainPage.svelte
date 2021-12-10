<script lang="ts">
    import {Entity} from "./scripts/dataContainers.ts";
    import {FormLayoutNode} from "./components/Form/formLayoutNode.ts";

    import DataGrid from "./components/DataGrid/DataGrid.svelte";
    import Modal from "./components/Form/Modal.svelte";
    import Form from "./components/Form/Form.svelte";
    import Button from "./components/Form/Controls/Button.svelte";
    import ButtonGroup from "./components/Form/Controls/ButtonGroup.svelte";

    let entity: Entity | undefined = undefined;
    let isValidForm: boolean;

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

    let openModal: () => void;
    let closeModal: () => void;

    const openForm = (event: CustomEvent<Entity>): void => {
        entity = event.detail;
        openModal();
    };

    const closeForm = () => {
        closeModal();
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
<Modal
    bind:openModal={openModal}
    bind:closeModal={closeModal}
    on:backdropClick={closeForm}
    on:keydown={closeFormEsc}>
    {#if (entity)}
        <div class="noselect">
            <b>Welcome to svelte-form!</b>
        </div>
        <Form bind:entity={entity} layout={layout} bind:isValidForm={isValidForm}/>
        <ButtonGroup options={{direction: 'horizontal'}}>
            <Button options={{label: 'Close'}} on:click={closeForm}/>
            <Button options={{label: 'Submit', disabled: !isValidForm}} on:click={submitForm}/>
        </ButtonGroup>
    {/if}
</Modal>
<DataGrid url={'https://jsonplaceholder.typicode.com/posts'} on:openForm={openForm}/>

<style>
</style>