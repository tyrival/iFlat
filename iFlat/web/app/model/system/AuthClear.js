Ext.define('iFlat.model.system.AuthClear', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'roleId', type: 'string'},
        {name: 'account', type: 'string'},
        {name: 'nameSpace', type: 'string'},
        {name: 'moduleName', type: 'string'},
        {name: 'clearAll', type: 'boolean', defaultValue: false},
    ],
});