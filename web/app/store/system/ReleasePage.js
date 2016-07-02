Ext.define('iFlat.store.system.ReleasePage', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.system.Release',

    pageSize: 5,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'system_listPageRelease.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});