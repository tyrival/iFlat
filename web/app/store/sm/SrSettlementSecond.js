Ext.define('iFlat.store.sm.SrSettlementSecond', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.sm.SrSettlementSecond',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'sm_listSrSettlementSecond.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});