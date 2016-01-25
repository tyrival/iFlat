Ext.define('iFlat.store.system.Role', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.system.Role',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'system_listRole.action',
        reader: {
            type: 'json',
            totalProperty: 'totalCount',
            rootProperty: 'list',
        },
    },
});