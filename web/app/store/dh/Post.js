Ext.define('iFlat.store.dh.Post', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.dh.Post',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'dh_listPost.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});