Ext.define('iFlat.store.main.DefaultRole', {
    extend: 'Ext.data.Store',

    model: 'iFlat.model.main.UserRoleInfo',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'system_listDefaultRoleInfoByAccount.action',
        reader: {
            type: 'json',
            rootProperty: 'list'
        }
    }
})