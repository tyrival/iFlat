Ext.define('iFlat.store.wip.SrOsInspect', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.wip.SrOsInspect',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'wip_listSrOsInspect.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});