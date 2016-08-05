Ext.define('iFlat.store.pam.Activist', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.pam.Activist',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listActivist.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});