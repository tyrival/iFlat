Ext.define('iFlat.storexr.SrSettlementDetlPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.SrSettlementDetl',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageSrSettlementDetl.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});