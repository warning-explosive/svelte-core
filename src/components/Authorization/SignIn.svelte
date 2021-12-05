<script lang="ts">
    import page from 'page';
    import Form from "../Form/Form.svelte";
    import {createEntity} from "../../scripts/containers";
    import type {FormLayoutNode} from "../../scripts/form";
    import {Pages} from "../../scripts/pages";
    import ButtonGroup from "../Form/Controls/ButtonGroup.svelte";
    import Button from "../Form/Controls/Button.svelte";

    let isValidSignInForm: boolean;

    let item = createEntity({
        login: { kind: 'string', value: '' },
        password: { kind: 'string', value: '' }
    });

    const layout: FormLayoutNode = {
        direction: 'vertical',
        children: [
            {
                key: 'login'
            }, {
                key: 'password'
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
        <Form readonly={false} {item} {layout} bind:isValidForm={isValidSignInForm} />
        <ButtonGroup options={{direction: 'horizontal'}}>
            <Button options={{label: 'Sign in', disabled: !isValidSignInForm}} on:click={signIn}/>
            <Button options={{label: 'Sign up'}} on:click={signUp}/>
        </ButtonGroup>
    </div>
</section>

<style>
</style>