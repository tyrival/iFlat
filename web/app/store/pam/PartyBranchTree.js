Ext.define('iFlat.store.pam.PartyBranchTree', {
    extend: 'Ext.data.TreeStore',

    autoLoad: true,
    model: 'iFlat.model.pam.PartyBranchTree',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listPartyBranch.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
    rootVisible: false,
    parentIdProperty: 'parentId',
    folderSort: true,
});