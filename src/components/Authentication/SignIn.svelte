<script lang="ts">
    import page from 'page'
    import Form from '../Form/Form.svelte'
    import validator from 'validator'

    import { createEntity } from '../../scripts/dataContainers.ts'
    import { ChildFormLayoutNode } from '../Form/formLayoutNode.ts'
    import { Pages } from '../../pages.ts'

    import ButtonGroup from '../Form/Controls/ButtonGroup.svelte'
    import Button from '../Form/Controls/Button.svelte'

    let isValidSignInForm: boolean

    let entity = createEntity({
        login: {
            kind: 'string',
            value: '',
            /*validate(): string {
                return validator.isEmail(this.value)
                    ? ''
                    : 'Value should be a valid email address';
            }*/
        },
        password: {
            kind: 'password',
            value: '',
            /*validate(): string {
                return this.value
                    ? ''
                    : 'Required';
            }*/
        },
    })

    const layout: ChildFormLayoutNode = {
        direction: 'vertical',
        children: [
            {
                key: 'login',
                disabled: false,
                focused: true,
            },
            {
                key: 'password',
                disabled: false,
            },
        ],
    }

    const signIn = () => {
        // TODO: authenticate user on the server
        page(Pages.Main)
    }

    const signUp = () => {
        page(Pages.SignUp)
    }
</script>

<div class="flex flex-col justify-center items-center h-full w-full">
    <div class="p-4 flex flex-col items-center shadow-lg rounded-lg">
        <Form bind:entity layout="{layout}" bind:isValidForm="{isValidSignInForm}" />
        <ButtonGroup>
            <Button
                options="{{ label: 'Sign in', disabled: !isValidSignInForm }}"
                on:click="{signIn}" />
            <Button options="{{ label: 'Sign up' }}" on:click="{signUp}" />
        </ButtonGroup>
    </div>
</div>
