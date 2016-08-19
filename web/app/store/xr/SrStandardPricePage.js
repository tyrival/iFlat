Ext.define('iFlat.storexr.SrStandardPricePage', {

    autoLoad: true,
    model: 'iFlat.model.xr.SrStandardPrice',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageSrStandardPrice.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});