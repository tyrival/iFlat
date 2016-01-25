Ext.define('iFlat.model.system.AuthOperating', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'aoId', mapping: 'aoId', type: 'string'},
        {name: 'roleId', mapping: 'roleId', type: 'string'},
        {name: 'account', mapping: 'account', type: 'string'},
        {name: 'nameSpace', mapping: 'nameSpace', type: 'string'},
        {name: 'moduleName', mapping: 'moduleName', type: 'string'},
        {name: 'operating', mapping: 'operating', type: 'string'},
        {name: 'status', mapping: 'status', type: 'boolean', defaultValue: false},
        {name: 'alias', mapping: 'alias', type: 'string'},
        {name: 'method', mapping: 'method', type: 'string'},
        {name: 'pageId', mapping: 'pageId', type: 'string'},
        {name: 'sequence', mapping: 'sequence', type: 'string'},
    ],
});