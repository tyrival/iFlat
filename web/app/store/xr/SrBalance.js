Ext.define('iFlat.store.xr.SrBalance', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.SrBalance',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listSrBalance.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});