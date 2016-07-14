Ext.define('iFlat.store.code.Employee', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.code.Employee',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'code_listEmployee.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});