Ext.define('iFlat.store.sm.TecSettlement', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.TecSettlement',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listTecSettlement.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});