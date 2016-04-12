Ext.define('iFlat.store.sm.SrSettlement', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.SrSettlement',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listSrSettlement.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});