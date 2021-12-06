<script lang="ts">
    import FormLayout from "./FormLayout.svelte";
    import {ChildFormLayoutNode, IFormValidator, ValidationEventArgs} from "../../scripts/form";
    import {Entity} from "../../scripts/dataContainers";
    import {getContainer} from "../../scripts/dependencyContainer";

    export let entity: Entity;
    export let layout: ChildFormLayoutNode;
    export let isValidForm: boolean = false;

    const formValidator = getContainer().resolve<IFormValidator>('formValidator');

    let validationState: Map<string, string>;

    const validateField = (event: CustomEvent<ValidationEventArgs>) => {
        event.detail.message = validationState?.get(event.detail.key) ?? '';
    }

    const validate = (entity: Entity): void => {
        validationState = formValidator.validate(entity);

        isValidForm = Object
            .keys(entity)
            .reduce((acc, key) => !(validationState.get(key)), true);
    }

    $: validate(entity);
</script>

<form on:submit|stopPropagation novalidate>
    <FormLayout node={layout} bind:entity={entity} on:validate={validateField}/>
</form>

<style>
</style>