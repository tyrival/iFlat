Ext.define('iFlat.store.code.Worker', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.code.Worker',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'code_listWorker.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});