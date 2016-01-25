Ext.define('iFlat.store.system.AuthModule', {
    extend: 'Ext.data.TreeStore',

    autoLoad: true,
    model: 'iFlat.model.system.AuthModule',

    proxy: {
        type: 'ajax',
        method: 'post',
        api: {
            create: 'system_saveBatchAuthModule.action',
            read: 'system_listModuleNode.action',
            update: 'system_saveBatchAuthModule.action',
        },
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