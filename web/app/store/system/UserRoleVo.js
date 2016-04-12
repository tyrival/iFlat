Ext.define('iFlat.store.system.UserRoleVo', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.system.UserRoleVo',

    groupField: 'userRoleVo.roleName',
    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'system_listUserRoleVo.action',
        reader: {
            type: 'json',
            totalProperty: 'totalCount',
            rootProperty: 'list'
        },
    },
});