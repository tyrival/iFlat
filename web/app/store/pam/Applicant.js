Ext.define('iFlat.store.pam.Applicant', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.pam.Applicant',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listApplicant.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});