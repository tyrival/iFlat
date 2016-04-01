Ext.define('iFlat.store.sm.SbSettlementDetail', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.sm.SbSettlementDetail',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listSbSettlementDetail.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});