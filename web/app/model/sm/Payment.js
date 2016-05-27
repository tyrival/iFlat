Ext.define('iFlat.model.sm.Payment', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'payment.id', mapping: 'id', type: 'string'},
        {name: 'payment.projNo', mapping: 'projNo', type: 'string'},
        {name: 'payment.projName', mapping: 'projName', type: 'string'},
        {name: 'payment.deptCode', mapping: 'deptCode', type: 'string'},
        {name: 'payment.deptName', mapping: 'deptName', type: 'string'},
        {name: 'payment.team', mapping: 'team', type: 'string'},
        {name: 'payment.month', mapping: 'month', type: 'date'},
        {name: 'payment.amount', mapping: 'amount', type: 'number'},
        {name: 'payment.reduce', mapping: 'reduce', type: 'number'},
        {name: 'payment.summary', mapping: 'summary', type: 'number'},
        {name: 'payment.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'payment.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'payment.createTime', mapping: 'createTime', type: 'date'},
    ]
});