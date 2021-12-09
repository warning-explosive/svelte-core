<script lang="ts">
    import page from "page";
    import Form from "../Form/Form.svelte";
    import validator from 'validator';
    import {createEntity} from "../../scripts/dataContainers";
    import type {ChildFormLayoutNode} from "../../scripts/form";
    import {Pages} from "../../scripts/pages";
    import ButtonGroup from "../Form/Controls/ButtonGroup.svelte";
    import Button from "../Form/Controls/Button.svelte";

    let isValidSignInForm: boolean;

    let entity = createEntity({
        login: {
            kind: 'string',
            value: '',
            validate(): string {
                return validator.isEmail(this.value)
                    ? ''
                    : 'Value should be a valid email address';
            }
        },
        password: {
            kind: 'password',
            value: '',
            validate(): string {
                return this.value
                    ? ''
                    : 'Required';
            }
        }
    });

    const layout: ChildFormLayoutNode = {
        direction: 'vertical',
        children: [
            {
                key: 'login',
                disabled: false,
                focused: true
            },
            {
                key: 'password',
                disabled: false
            }
        ]
    }

    const signIn = () => {
        // TODO: authenticate user on the server
        page(Pages.Main);
    };

    const signUp = () => {
        page(Pages.SignUp);
    };
</script>

<section class="centered-content">
    <div>
        <Form bind:entity={entity} {layout} bind:isValidForm={isValidSignInForm}/>
        <ButtonGroup options={{direction: 'horizontal'}}>
            <Button options={{label: 'Sign in', disabled: !isValidSignInForm}} on:click={signIn}/>
            <Button options={{label: 'Sign up'}} on:click={signUp}/>
        </ButtonGroup>
    </div>
</section>

<style>
    div {
        width: 300px;
    }
</style>