Ext.define('iFlat.store.ss.AccParty', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.ss.AccParty',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listAccParty.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});