Ext.define('iFlat.model.sm.Temporary', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'temporary.id', mapping: 'id', type: 'string'},
        {name: 'temporary.month', mapping: 'month', type: 'date'},
        {name: 'temporary.dept', mapping: 'dept', type: 'string'},
        {name: 'temporary.team', mapping: 'team', type: 'string'},
        {name: 'temporary.name', mapping: 'name', type: 'string'},
        {name: 'temporary.amount', mapping: 'amount', type: 'number'},
        {name: 'temporary.trades', mapping: 'trades', type: 'string'},
        {name: 'temporary.comment', mapping: 'comment', type: 'string'},
        {name: 'temporary.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'temporary.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'temporary.createTime', mapping: 'createTime', type: 'date'},
    ]
});