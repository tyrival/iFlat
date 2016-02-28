Ext.define('iFlat.model.system.AuthField', {
    extend: 'Ext.data.Model',
    idProperty: 'field',
    fields: [
        {name: 'field', mapping: 'field', type: 'string'},
        {name: 'status', mapping: 'status', type: 'int'},
    ],
});