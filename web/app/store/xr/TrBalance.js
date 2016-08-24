Ext.define('iFlat.store.xr.TrBalance', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.TrBalance',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listTrBalance.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});