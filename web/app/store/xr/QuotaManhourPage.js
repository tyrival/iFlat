Ext.define('iFlat.storexr.QuotaManhourPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.QuotaManhour',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageQuotaManhour.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});