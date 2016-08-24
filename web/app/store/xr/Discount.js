Ext.define('iFlat.store.xr.Discount', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.Discount',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listDiscount.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});