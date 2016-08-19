Ext.define('iFlat.store.xr.SrProjectPrice', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.SrProjectPrice',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listSrProjectPrice.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});