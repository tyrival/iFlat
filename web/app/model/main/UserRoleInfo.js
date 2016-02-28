Ext.define('iFlat.model.main.UserRoleInfo', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'account', mapping: 'account', type: 'string'},
        {name: 'userName', mapping: 'userName', type: 'string'},
        {name: 'roleId', mapping: 'roleId', type: 'string'},
        {name: 'roleName', mapping: 'roleName', type: 'string'},
        {name: 'category', mapping: 'category', type: 'string'},
        {name: 'sequence', mapping: 'sequence', type: 'int'},
    ]
})