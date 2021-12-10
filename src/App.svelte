<script lang="ts">
    import page from "page";
    import {SvelteComponent} from "svelte";

    import DependencyContainer, {setContainer} from "./scripts/dependencyContainer.ts";
    import FormValidator from "./components/Form/formValidation.ts";
    import {Pages} from "./pages.ts";

    import MainPage from "./MainPage.svelte";
    import NotFound from "./components/NotFound.svelte";
    import SignIn from "./components/Authentication/SignIn.svelte";
    import SignUp from "./components/Authentication/SignUp.svelte";

    let component: SvelteComponent;

    const container = new DependencyContainer();
    container.register('formValidator', new FormValidator());
    setContainer(container);

    page.redirect('/', Pages.SignIn);
    page(Pages.SignIn, () => (component = SignIn));
    page(Pages.SignUp, () => (component = SignUp));
    page(Pages.Main, () => (component = MainPage));
    page('*', () => (component = NotFound));

    page.start();
</script>

<main>
    <svelte:component this={component} />
</main>

<style>
</style>