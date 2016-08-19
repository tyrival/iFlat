Ext.define('iFlat.storexr.SrBalanceApplPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.SrBalanceAppl',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageSrBalanceAppl.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});