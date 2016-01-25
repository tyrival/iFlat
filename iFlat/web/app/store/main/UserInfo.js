Ext.define('iFlat.store.main.UserInfo', {
    extend: 'Ext.data.Store',

    model: 'iFlat.model.main.UserInfo',
    proxy: {
        type: 'ajax',
        url: 'system_getSession.action',
        reader: {
            type: 'json',
            rootProperty: 'object'
        }
    }
})