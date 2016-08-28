Ext.define('iFlat.storexr.LaborExpensePage', {

    autoLoad: true,
    model: 'iFlat.model.xr.LaborExpense',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageLaborExpense.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});