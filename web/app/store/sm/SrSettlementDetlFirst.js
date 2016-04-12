Ext.define('iFlat.store.sm.SrSettlementDetlFirst', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.sm.SrSettlementDetlFirst',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listSrSettlementDetlFirst.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});