Ext.define('iFlat.store.wip.SrOsBidding', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.wip.SrOsBidding',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'wip_listSrOsBidding.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});