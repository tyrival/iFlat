Ext.define('iFlat.storexr.TrSettlementPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.TrSettlement',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageTrSettlement.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});