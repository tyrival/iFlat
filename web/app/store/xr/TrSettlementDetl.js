Ext.define('iFlat.store.xr.TrSettlementDetl', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.TrSettlementDetl',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listTrSettlementDetl.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});