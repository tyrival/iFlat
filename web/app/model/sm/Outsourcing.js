Ext.define('iFlat.model.sm.Outsourcing', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'outsourcing.id', mapping: 'id', type: 'string'},
        {name: 'outsourcing.month', mapping: 'month', type: 'date'},
        {name: 'outsourcing.projNo', mapping: 'projNo', type: 'string'},
        {name: 'outsourcing.dept', mapping: 'dept', type: 'string'},
        {name: 'outsourcing.team', mapping: 'team', type: 'string'},
        {name: 'outsourcing.amount', mapping: 'amount', type: 'number'},
        {name: 'outsourcing.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'outsourcing.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'outsourcing.createTime', mapping: 'createTime', type: 'date'},
    ]
});