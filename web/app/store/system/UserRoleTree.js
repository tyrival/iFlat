Ext.define('iFlat.store.system.UserRoleTree', {
    extend: 'Ext.data.TreeStore',

    autoLoad: true,
    model: 'iFlat.model.system.UserRoleTree',

    proxy: {
        type: 'ajax',
        url: 'system_listUserRoleNode.action',
        reader: {
            type: 'json',
            rootProperty: 'list'
        }
    },
    rootVisible: false,
    parentIdProperty: 'parentId',
    sorters: ['text','name']
    /* 看看treestore有没有sort属性 */
});