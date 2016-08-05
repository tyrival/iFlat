Ext.define('iFlat.store.pam.Committee', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.pam.Committee',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listCommittee.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});