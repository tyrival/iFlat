Ext.define('iFlat.store.main.Memo', {
    extend: 'Ext.data.Store',

    model: 'iFlat.model.main.Memo',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'system_getMemoNote.action',
        reader: {
            type: 'json',
            rootProperty: 'object'
        }
    }
})