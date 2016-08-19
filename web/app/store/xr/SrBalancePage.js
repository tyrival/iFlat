Ext.define('iFlat.storexr.SrBalancePage', {

    autoLoad: true,
    model: 'iFlat.model.xr.SrBalance',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageSrBalance.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});