Ext.define('iFlat.model.ss.FsCode', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'fsCode.id', mapping: 'id', type: 'string'},
        {name: 'fsCode.type', mapping: 'type', type: 'string'},
        {name: 'fsCode.code', mapping: 'code', type: 'string'},
        {name: 'fsCode.description', mapping: 'description', type: 'string'},
        {name: 'fsCode.amount', mapping: 'amount', type: 'number'},
        {name: 'fsCode.score', mapping: 'score', type: 'number'},
    ]
});