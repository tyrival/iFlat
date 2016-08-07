Ext.define('iFlat.model.ss.PhCode', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'phCode.id', mapping: 'id', type: 'string'},
        {name: 'phCode.type', mapping: 'type', type: 'string'},
        {name: 'phCode.code', mapping: 'code', type: 'string'},
        {name: 'phCode.description', mapping: 'description', type: 'string'},
        {name: 'phCode.amount', mapping: 'amount', type: 'number'},
        {name: 'phCode.score', mapping: 'score', type: 'number'},
    ]
});