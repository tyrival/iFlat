Ext.define('iFlat.store.main.Profile', {
    extend: 'Ext.data.Store',

    model: 'iFlat.model.main.Profile',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'system_getProfile.action',
        reader: {
            type: 'json',
            rootProperty: 'object'
        }
    }
})