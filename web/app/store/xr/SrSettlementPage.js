Ext.define('iFlat.storexr.SrSettlementPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.SrSettlement',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageSrSettlement.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});