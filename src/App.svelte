<script lang="ts">
    import {containersObjectFactory} from "./scripts/containers";
	import DataGrid from "./components/DataGrid/DataGrid.svelte";

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
</script>

<b>Welcome to svelte-data-grid!</b>
<br />
<DataGrid {keys} {rows} />
<br />

<style>
</style>