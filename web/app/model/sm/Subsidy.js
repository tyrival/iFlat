Ext.define('iFlat.model.sm.Subsidy', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'subsidy.id', mapping: 'id', type: 'string'},
        {name: 'subsidy.month', mapping: 'month', type: 'date'},
        {name: 'subsidy.type', mapping: 'type', type: 'string'},
        {name: 'subsidy.team', mapping: 'team', type: 'string'},
        {name: 'subsidy.amount', mapping: 'amount', type: 'number'},
        {name: 'subsidy.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'subsidy.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'subsidy.createTime', mapping: 'createTime', type: 'date'},
    ]
});