Ext.define('iFlat.store.system.OrganizationTree', {
    extend: 'Ext.data.TreeStore',

    autoLoad: true,
    model: 'iFlat.model.system.OrganizationTree',

    proxy: {
        type: 'ajax',
        url: 'system_listOrganizationNode.action',
        reader: {
            type: 'json',
            rootProperty: 'list'
        }
    },
    rootVisible: false,
    parentIdProperty: 'parentId',
    folderSort: true
});