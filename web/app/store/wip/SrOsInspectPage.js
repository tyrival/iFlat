Ext.define('iFlat.store.wip.SrOsInspectPage', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.wip.SrOsInspect',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'wip_listPageSrOsInspect.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});