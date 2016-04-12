Ext.define('iFlat.model.sm.SrSettlementBalance', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srSettlementBalance.id', mapping: 'id', type: 'string'},
        {name: 'srSettlementBalance.deptName', mapping: 'deptName', type: 'string'},
        {name: 'srSettlementBalance.amount', mapping: 'amount', type: 'number'},
        {name: 'srSettlementBalance.adjustment', mapping: 'adjustment', type: 'number'},
    ]
});