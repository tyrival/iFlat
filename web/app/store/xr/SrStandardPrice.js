Ext.define('iFlat.store.xr.SrStandardPrice', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.SrStandardPrice',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listSrStandardPrice.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});