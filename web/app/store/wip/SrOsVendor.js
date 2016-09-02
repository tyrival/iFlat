Ext.define('iFlat.store.wip.SrOsVendor', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.wip.SrOsVendor',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'wip_listSrOsVendor.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});