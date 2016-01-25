Ext.define('iFlat.store.system.AuthDuplicateModule', {
    extend: 'Ext.data.TreeStore',

    autoLoad: true,
    model: 'iFlat.model.system.AuthDuplicateModule',

    proxy: {
        type: 'ajax',
        method: 'post',
        url: 'system_listModuleNode.action',
        reader: {
            type: 'json',
            rootProperty: 'list'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            root: 'authModuleVoList',
            encode: true,
        }
    },
    rootVisible: true,
    parentIdProperty: 'parentId',
});