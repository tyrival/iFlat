Ext.define('iFlat.store.sm.ScSettlement', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.ScSettlement',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listScSettlement.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});