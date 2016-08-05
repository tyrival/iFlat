Ext.define('iFlat.store.pam.MemberList', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.pam.Member',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listMember.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});