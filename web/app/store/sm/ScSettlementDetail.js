Ext.define('iFlat.store.sm.ScSettlementDetail', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.sm.ScSettlementDetail',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listScSettlementDetail.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});