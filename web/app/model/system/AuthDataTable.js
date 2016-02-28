Ext.define('iFlat.model.system.AuthDataTable', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'tvId', mapping: 'tvId', type: 'string'},
        {name: 'nameSpace', mapping: 'nameSpace', type: 'string'},
        {name: 'moduleName', mapping: 'moduleName', type: 'string'},
        {name: 'dbInstance', mapping: 'dbInstance', type: 'string'},
        {name: 'dbName', mapping: 'dbName', type: 'string'},
        {name: 'name', mapping: 'name', type: 'string'},
        {name: 'description', mapping: 'description', type: 'string'}
    ],
});