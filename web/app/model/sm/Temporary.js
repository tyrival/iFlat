Ext.define('iFlat.model.sm.Temporary', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'temporary.id', mapping: 'id', type: 'string'},
        {name: 'temporary.month', mapping: 'month', type: 'date'},
        {name: 'temporary.dept', mapping: 'dept', type: 'string'},
        {name: 'temporary.amount', mapping: 'amount', type: 'number'},
        {name: 'temporary.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'temporary.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'temporary.createTime', mapping: 'createTime', type: 'date'},
        {name: 'temporary.status', mapping: 'status', type: 'string'},
        {name: 'temporary.attachment', mapping: 'attachment', type: 'string'},
        {name: 'temporary.comment', mapping: 'comment', type: 'string'},
    ]
});