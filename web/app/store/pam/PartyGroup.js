Ext.define('iFlat.store.pam.PartyGroup', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.pam.PartyGroup',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listPartyGroup.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});