Ext.define('iFlat.model.system.AuthDataField', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'adId', mapping: 'adId', type: 'string'},
        {name: 'fieldName', mapping: 'fieldName', type: 'string'},
        {name: 'alias', mapping: 'alias', type: 'string'},
        {name: 'status', mapping: 'status', type: 'string'},
        {name: 'filter', mapping: 'filter', type: 'string'},
    ],
});