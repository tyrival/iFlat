Ext.define('iFlat.store.xr.Salary', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.Salary',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listSalary.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});