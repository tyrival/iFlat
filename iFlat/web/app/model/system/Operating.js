Ext.define('iFlat.model.system.Operating', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'operating.opId', mapping: 'opId', type: 'string'},
        {name: 'operating.operating', mapping: 'operating', type: 'string'},
        {name: 'operating.alias', mapping: 'alias', type: 'string'},
        {name: 'operating.method', mapping: 'method', type: 'string'},
        {name: 'operating.sequence', mapping: 'sequence', type: 'string'},
        {name: 'operating.nameSpace', mapping: 'nameSpace', type: 'string'},
        {name: 'operating.moduleName', mapping: 'moduleName', type: 'string'},
    ]
});