Ext.define('iFlat.store.system.Release', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.system.Release',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'system_listRelease.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});