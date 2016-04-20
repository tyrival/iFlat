Ext.define('iFlat.model.sm.SrSettlementSecond', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srSettlementSecond.id', mapping: 'id', type: 'string'},
        {name: 'srSettlementSecond.pid', mapping: 'pid', type: 'string'},
        {name: 'srSettlementSecond.type', mapping: 'type', type: 'string'},
        {name: 'srSettlementSecond.progress', mapping: 'progress', type: 'number'},
        {name: 'srSettlementSecond.projNo', mapping: 'projNo', type: 'string'},
        {name: 'srSettlementSecond.projName', mapping: 'projName', type: 'string'},
        {name: 'srSettlementSecond.deptName', mapping: 'deptName', type: 'string'},
        {name: 'srSettlementSecond.team', mapping: 'team', type: 'string'},
        {name: 'srSettlementSecond.laborAmount', mapping: 'laborAmount', type: 'number'},
        {name: 'srSettlementSecond.consumableAmount', mapping: 'consumableAmount', type: 'number'},
        {name: 'srSettlementSecond.performanceAmount', mapping: 'performanceAmount', type: 'number'},
        {name: 'srSettlementSecond.materialAmount', mapping: 'materialAmount', type: 'number'},
        {name: 'srSettlementSecond.summaryAmount', mapping: 'summaryAmount', type: 'number'},
        {name: 'srSettlementSecond.attachment', mapping: 'attachment', type: 'string'},
        {name: 'srSettlementSecond.comment', mapping: 'comment', type: 'string'},
        {name: 'srSettlementSecond.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'srSettlementSecond.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'srSettlementSecond.createTime', mapping: 'createTime', type: 'date'},
    ]
});