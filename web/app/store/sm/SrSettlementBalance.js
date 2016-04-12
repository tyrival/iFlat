Ext.define('iFlat.store.sm.SrSettlementBalance', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.sm.SrSettlementBalance',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listSrSettlementBalance.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});