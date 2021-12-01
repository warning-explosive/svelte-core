<script lang="ts">
    import page from 'page';
    import Form from "../Form/Form.svelte";
    import {createEntity} from "../../scripts/containers";
    import type {FormLayoutNode} from "../../scripts/form";
    import {Pages} from "../../scripts/pages";

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

<section class="centered">
    <Form readonly={false} {item} {layout} bind:isValidForm={isValidSignInForm} />
    <button disabled={!isValidSignInForm} on:click={signIn}>Sign in</button>
    <button on:click={signUp}>Sign up</button>
</section>

<style>
</style>