Ext.define('iFlat.store.xr.LaborExpense', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.LaborExpense',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listLaborExpense.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});