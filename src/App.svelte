<script lang="ts">
    import {containersObjectFactory, BooleanContainer} from "./scripts/containers";
    import {FormElementArgs, FormLayoutNode} from "./scripts/form";
	import DataGrid from "./components/DataGrid/DataGrid.svelte";
    import Form from "./components/Form/Form.svelte";
    import CheckboxInput from "./components/Form/Inputs/CheckboxInput.svelte";

    /*
     * GRID
     */
    let keys = ['string_field', 'number_field', 'boolean_field', 'date_field', 'money_field', 'link_field'];
    let rows = [
        containersObjectFactory({
            string_field: { kind: 'string', value: 'abc' },
            number_field: { kind: 'number', value: 0 },
            boolean_field: { kind: 'boolean', value: true },
            date_field: { kind: 'date', value: new Date() },
            money_field: { kind: 'money', amount: 42, currency: 'USD' },
            link_field: { kind: 'link', type: 'security', caption: 'Sec_1', id: '100' }
        }),
        containersObjectFactory({
            string_field: { kind: 'string', value: 'qwe' },
            number_field: { kind: 'number', value: 0.1 },
            boolean_field: { kind: 'boolean', value: false },
            date_field: { kind: 'date', value: new Date() },
            money_field: { kind: 'money', amount: 43, currency: 'RUB' },
            link_field: { kind: 'link', type: 'security', caption: 'Sec_2', id: '101' }
        }),
    ];

    /*
     * FORM
     */
    let item = rows[0];
    let formSwitch: FormElementArgs<BooleanContainer> = {
        id: 'readonly',
        disabled: false,
        label: 'readonly',
        container: { kind: 'boolean', value: false }
    };
    let layout: FormLayoutNode = {
        direction: 'horizontal',
        children: [
            {
                direction: "vertical",
                children: [
                    { key: 'string_field' },
                    {
                        direction: "horizontal",
                        children: [
                            {
                                direction: "vertical",
                                children: [
                                    { key: 'number_field' },
                                    { key: 'boolean_field' }
                                ]
                            },
                            {
                                direction: "vertical",
                                children: [
                                    { key: 'money_field' },
                                    { key: 'link_field' }
                                ]
                            }
                        ]
                    }
                ]
            },
            { key: 'date_field' }
        ]
    };

    $: console.log(item);
</script>

<b>Welcome to svelte-data-grid!</b>
<br />
<DataGrid {keys} {rows} />
<br />

<b>Welcome to svelte-form.</b>
<br />
<b>Readonly: {formSwitch.container.value}</b>
<CheckboxInput bind:args={formSwitch} />
<br />
<Form bind:readonly={formSwitch.container.value} bind:item={item} {layout}/>
<br />

<style>
</style>