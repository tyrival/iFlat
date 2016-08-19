Ext.define('iFlat.store.xr.SrSettlementDetl', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.xr.SrSettlementDetl',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listSrSettlementDetl.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});