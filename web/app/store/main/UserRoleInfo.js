Ext.define('iFlat.store.main.UserRoleInfo', {
    extend: 'Ext.data.Store',

    model: 'iFlat.model.main.UserRoleInfo',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'system_listUserRoleInfoByUser.action',
        reader: {
            type: 'json',
            rootProperty: 'list'
        }
    }
})