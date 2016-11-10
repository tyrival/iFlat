Ext.define('iFlat.model.ss.PhDetailType', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'phDetailType.type', mapping: 'type', type: 'string'},
        {name: 'phDetailType.code', mapping: 'code', type: 'string'},
        {name: 'phDetailType.description', mapping: 'description', type: 'string'},
        {name: 'phDetailType.detailType', mapping: 'detailType', type: 'string'},
    ]
});