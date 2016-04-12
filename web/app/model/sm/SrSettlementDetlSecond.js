Ext.define('iFlat.model.sm.SrSettlementDetlSecond', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srSettlementDetlSecond.id', mapping: 'id', type: 'string'},
        {name: 'srSettlementDetlSecond.pid', mapping: 'pid', type: 'string'},
        {name: 'srSettlementDetlSecond.type', mapping: 'type', type: 'string'},
        {name: 'srSettlementDetlSecond.specs', mapping: 'specs', type: 'string'},
        {name: 'srSettlementDetlSecond.content', mapping: 'content', type: 'string'},
        {name: 'srSettlementDetlSecond.qty1', mapping: 'qty1', type: 'number'},
        {name: 'srSettlementDetlSecond.qty2', mapping: 'qty2', type: 'number'},
        {name: 'srSettlementDetlSecond.qty3', mapping: 'qty3', type: 'number'},
        {name: 'srSettlementDetlSecond.qty4', mapping: 'qty4', type: 'number'},
        {name: 'srSettlementDetlSecond.qty5', mapping: 'qty5', type: 'number'},
        {name: 'srSettlementDetlSecond.qty6', mapping: 'qty6', type: 'number'},
        {name: 'srSettlementDetlSecond.amount', mapping: 'amount', type: 'number'},
        {name: 'srSettlementDetlSecond.attachment', mapping: 'attachment', type: 'string'},
        {name: 'srSettlementDetlSecond.comment', mapping: 'comment', type: 'string'},
        {name: 'srSettlementDetlSecond.status', mapping: 'status', type: 'string'},
        {name: 'srSettlementDetlSecond.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'srSettlementDetlSecond.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'srSettlementDetlSecond.createTime', mapping: 'createTime', type: 'date'},
    ]
});