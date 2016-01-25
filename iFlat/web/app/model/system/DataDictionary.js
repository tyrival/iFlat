Ext.define('iFlat.model.system.DataDictionary', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'dataDictionary.dbInstance', mapping: 'dbInstance', type: 'string'},
        {name: 'dataDictionary.dbName', mapping: 'dbName', type: 'string'},
        {name: 'dataDictionary.tableName', mapping: 'tableName', type: 'string'},
        {name: 'dataDictionary.fieldName', mapping: 'fieldName', type: 'string'},
        {name: 'dataDictionary.alias', mapping: 'alias', type: 'string'},
        {name: 'dataDictionary.type', mapping: 'type', type: 'string'},
        {name: 'dataDictionary.length', mapping: 'length', type: 'int'},
    ]
});