Ext.define('iFlat.model.wip.SrOutsourceDetl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srOutsourceDetl.id', mapping: 'id', type: 'string'},
        {name: 'srOutsourceDetl.pid', mapping: 'pid', type: 'string'},
        {name: 'srOutsourceDetl.content', mapping: 'content', type: 'string'},
        {name: 'srOutsourceDetl.specs', mapping: 'specs', type: 'string'},
        {name: 'srOutsourceDetl.unit', mapping: 'unit', type: 'string'},
        {name: 'srOutsourceDetl.qty', mapping: 'qty', type: 'number'},
        {name: 'srOutsourceDetl.comment', mapping: 'comment', type: 'string'},
    ]
});