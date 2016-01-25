Ext.define('iFlat.store.bi.Contract', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.bi.Contract',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listContract.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});