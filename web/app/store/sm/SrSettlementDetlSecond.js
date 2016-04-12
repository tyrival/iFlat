Ext.define('iFlat.store.sm.SrSettlementDetlSecond', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.sm.SrSettlementDetlSecond',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listSrSettlementDetlSecond.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});