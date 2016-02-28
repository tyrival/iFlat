Ext.define('iFlat.store.code.Group', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.code.Group',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'code_listGroup.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});