Ext.define('iFlat.store.dh.Reply', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.dh.Reply',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'dh_listReply.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});