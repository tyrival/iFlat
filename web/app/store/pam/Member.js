Ext.define('iFlat.store.pam.Member', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.pam.Member',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'pam_listPageMember.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});