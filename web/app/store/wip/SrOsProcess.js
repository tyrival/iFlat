Ext.define('iFlat.store.wip.SrOsProcess', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.wip.SrOsProcess',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'wip_listSrOsProcess.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});