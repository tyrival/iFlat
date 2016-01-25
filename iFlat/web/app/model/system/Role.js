Ext.define('iFlat.model.system.Role', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'role.roleId', mapping: 'roleId', type: 'string'},
        {name: 'role.roleName', mapping: 'roleName', type: 'string'},
        {name: 'role.category', mapping: 'category', type: 'string'},
        {name: 'role.description', mapping: 'description', type: 'string'},
        {name: 'role.status', mapping: 'status', type: 'boolean'},
    ]
});