Ext.define('iFlat.store.system.OrganizationEdit', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.system.OrganizationEdit',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'system_listOrganization.action',
        reader: {
            type: 'json',
            totalProperty: 'totalCount',
            rootProperty: 'list'
        }
    },
    folderSort: true
});