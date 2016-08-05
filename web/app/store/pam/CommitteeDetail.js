Ext.define('iFlat.store.pam.CommitteeDetail', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.pam.CommitteeDetail',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listCommitteeDetail.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});