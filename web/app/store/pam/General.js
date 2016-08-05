Ext.define('iFlat.store.pam.General', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.pam.General',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listGeneral.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});