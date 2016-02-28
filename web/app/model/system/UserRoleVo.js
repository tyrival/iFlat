Ext.define('iFlat.model.system.UserRoleVo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'roleId', type: 'string'},
        {name: 'roleName', type: 'string'},
        {name: 'account', type: 'string'},
        {name: 'userName', type: 'string'},
        {name: 'category', type: 'string'}
    ]
});