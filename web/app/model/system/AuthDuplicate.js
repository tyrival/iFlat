Ext.define('iFlat.model.system.AuthDuplicate', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'fromRoleId', type: 'string'},
        {name: 'fromAccount', type: 'string'},
        {name: 'toRoleId', type: 'string'},
        {name: 'toAccount', type: 'string'},
        {name: 'nameSpace', type: 'string'},
        {name: 'moduleName', type: 'string'},
        {name: 'dupAll', type: 'boolean', defaultValue: false},
    ],
});