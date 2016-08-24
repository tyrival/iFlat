Ext.define('iFlat.storexr.TrBalancePage', {

    autoLoad: true,
    model: 'iFlat.model.xr.TrBalance',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageTrBalance.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});