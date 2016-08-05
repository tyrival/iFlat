Ext.define('iFlat.store.pam.PartyBranch', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.pam.PartyBranch',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listPartyBranch.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});