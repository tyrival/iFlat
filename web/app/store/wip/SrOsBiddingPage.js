Ext.define('iFlat.store.wip.SrOsBiddingPage', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.wip.SrOsBidding',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'wip_listPageSrOsBidding.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});