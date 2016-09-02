Ext.define('iFlat.store.wip.SrOsAssess', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.wip.SrOsAssess',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'wip_listSrOsAssess.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});