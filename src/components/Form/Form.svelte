<script lang="ts">
    import {getContainer} from "../../scripts/dependencyContainer.ts";
    import {ValidationEventArgs} from "./formValidation.ts";
    import {FormContextMenuArgs} from "./formContextualMenu.ts";
    import {ChildFormLayoutNode} from "./formLayoutNode.ts";
    import {IFormValidator, ValidationEventArgs} from "./formValidation.ts";
    import {Entity} from "../../scripts/dataContainers.ts";

    import Menu from "../Menu/Menu.svelte";
    import MenuOption from "../Menu/MenuOption.svelte";
    import FormLayout from "../Form/FormLayout.svelte";

    export let entity: Entity;
    export let layout: ChildFormLayoutNode;
    export let isValidForm: boolean = false;

    /*
     * Context menu
     */
    let menuKey: string | undefined;
    let openMenu: (event: PointerEvent) => Promise<void>;
    let closeMenu: () => Promise<void>;

    const openContextMenu = async (event: CustomEvent<FormContextMenuArgs>):Promise<void> => {
        menuKey = event.detail.key;
        await openMenu(event.detail.event);
    }

    /*
     * Form validation
     */
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

<form
    novalidate
    on:click={closeMenu}
    on:submit|stopPropagation={() => {}}
    on:contextmenu|stopPropagation={() => {}}>
    <Menu bind:openMenu={openMenu} bind:closeMenu={closeMenu}>
        <MenuOption args={{text: menuKey + ' field action', disabled: false}} on:click={closeMenu}/>
    </Menu>
    <FormLayout
        node={layout}
        bind:entity={entity}
        on:validate={validateField}
        on:openContextMenu={openContextMenu}/>
</form>

<style>
</style>