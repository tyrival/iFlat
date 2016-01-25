Ext.define('iFlat.store.system.ModuleEdit', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.system.Module',

    pageSize: 0, //禁用分页
    proxy: {
        type: 'ajax',
        url: 'system_listModule.action',
        reader: {
            type: 'json',
            totalProperty: 'totalCount',
            rootProperty: 'list',
        }
    },
    folderSort: true
});