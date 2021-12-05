<script lang="ts">
    import {BooleanContainer, Entity} from "./scripts/containers";
    import {FormElementArgs, FormLayoutNode} from "./scripts/form";
    import DataGrid from "./components/DataGrid/DataGrid.svelte";
    import Dialog from "./components/Form/Modal.svelte";
    import Form from "./components/Form/Form.svelte";
    import CheckboxInput from "./components/Form/Inputs/CheckboxInput.svelte";
    import Modal from "./scripts/modal";
    import Button from "./components/Form/Controls/Button.svelte";
    import ButtonGroup from "./components/Form/Controls/ButtonGroup.svelte";

    let item: Entity | undefined = undefined;
    let isValidForm: boolean;
    const form = new Modal();

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
        form.open();
    };

    const closeForm = () => {
        form.close();
        item = undefined;
    }

    const closeFormEsc = (e: CustomEvent<KeyboardEvent>): void => {
        if (e.detail.key === 'Escape') {
            closeForm();
        }
    }

    const submitForm = () => {
        console.log(JSON.stringify(item));
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
    {#if (item)}
        <div>
            <CheckboxInput bind:args={formSwitch} />
            <Form readonly={formSwitch.container.value} bind:item={item} layout={layout} bind:isValidForm={isValidForm} />
        </div>
    {/if}
    <ButtonGroup options={{direction: 'horizontal'}}>
        <Button options={{label: 'Close'}} on:click={closeForm}/>
        <Button options={{label: 'Submit', disabled: !isValidForm}} on:click={submitForm}/>
    </ButtonGroup>
</Dialog>

<style>
</style>