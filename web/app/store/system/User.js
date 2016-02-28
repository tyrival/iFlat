Ext.define('iFlat.store.system.User', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.system.User',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'system_listUserByOrg.action',
        reader: {
            type: 'json',
            totalProperty: 'totalCount',
            rootProperty: 'list',
        },
        extraParams: {
            orgId: '',
        }
    },
});