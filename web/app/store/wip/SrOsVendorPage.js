Ext.define('iFlat.store.wip.SrOsVendorPage', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.wip.SrOsVendor',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'wip_listPageSrOsVendor.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});