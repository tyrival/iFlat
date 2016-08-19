Ext.define('iFlat.storexr.SrProjectPricePage', {

    autoLoad: true,
    model: 'iFlat.model.xr.SrProjectPrice',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageSrProjectPrice.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});