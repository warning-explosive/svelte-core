<script lang="ts">
    import page from "page";
    import {SvelteComponent} from "svelte";
    import MainPage from "./MainPage.svelte";
    import NotFound from "./components/NotFound.svelte";
    import SignIn from "./components/Authorization/SignIn.svelte";
    import SignUp from "./components/Authorization/SignUp.svelte";
    import {Pages} from "./scripts/pages";

    let component: SvelteComponent;

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