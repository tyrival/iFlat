Ext.define('iFlat.store.system.Module', {
    extend: 'Ext.data.TreeStore',

    autoLoad: true,
    model: 'iFlat.model.system.Module',

    proxy: {
        type: 'ajax',
        url: 'system_listModuleNode.action',
        reader: {
            type: 'json',
            rootProperty: 'list'
        }
    },
    rootVisible: false,
    parentIdProperty: 'parentId',
    sort: 'module.sequence',
    folderSort: true
});