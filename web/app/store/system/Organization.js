Ext.define('iFlat.store.system.Organization', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.system.Organization',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'system_listOrganizationVo.action',
        reader: {
            type: 'json',
            totalProperty: 'totalCount',
            rootProperty: 'list'
        }
    },
    folderSort: true
});