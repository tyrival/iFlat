Ext.define('iFlat.storexr.DiscountPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.Discount',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageDiscount.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});