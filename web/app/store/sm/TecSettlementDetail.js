Ext.define('iFlat.store.sm.TecSettlementDetail', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.sm.TecSettlementDetail',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listTecSettlementDetail.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});