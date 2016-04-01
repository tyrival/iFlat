Ext.define('iFlat.store.sm.SbSettlement', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.SbSettlement',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listSbSettlement.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});