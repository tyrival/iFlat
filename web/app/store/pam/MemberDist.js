Ext.define('iFlat.store.pam.MemberDist', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.pam.MemberDist',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listMemberDist.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});