Ext.define('iFlat.store.pam.Title', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.pam.Title',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listTitle.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});