Ext.define('iFlat.storexr.TrSettlementDetlPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.TrSettlementDetl',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageTrSettlementDetl.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});