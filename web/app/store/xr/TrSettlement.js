Ext.define('iFlat.store.xr.TrSettlement', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.TrSettlement',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listTrSettlement.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});