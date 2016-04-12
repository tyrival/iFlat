Ext.define('iFlat.model.system.UserRoleVo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'userRoleVo.roleId', mapping: 'roleId', type: 'string'},
        {name: 'userRoleVo.roleName', mapping: 'roleName', type: 'string'},
        {name: 'userRoleVo.account', mapping: 'account', type: 'string'},
        {name: 'userRoleVo.userName', mapping: 'userName', type: 'string'},
        {name: 'userRoleVo.category', mapping: 'category', type: 'string'}
    ]
});