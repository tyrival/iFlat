Ext.define('iFlat.model.sm.SrSettlement', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srSettlement.id', mapping: 'id', type: 'string'},
        {name: 'srSettlement.type', mapping: 'type', type: 'string'},
        {name: 'srSettlement.progress', mapping: 'progress', type: 'number'},
        {name: 'srSettlement.projNo', mapping: 'projNo', type: 'string'},
        {name: 'srSettlement.projName', mapping: 'projName', type: 'string'},
        {name: 'srSettlement.deptName', mapping: 'deptName', type: 'string'},
        {name: 'srSettlement.team', mapping: 'team', type: 'string'},
        {name: 'srSettlement.laborAmount', mapping: 'laborAmount', type: 'number'},
        {name: 'srSettlement.consumableAmount', mapping: 'consumableAmount', type: 'number'},
        {name: 'srSettlement.performanceAmount', mapping: 'performanceAmount', type: 'number'},
        {name: 'srSettlement.materialAmount', mapping: 'materialAmount', type: 'number'},
        {name: 'srSettlement.summaryAmount', mapping: 'summaryAmount', type: 'number'},
        {name: 'srSettlement.attachment', mapping: 'attachment', type: 'string'},
        {name: 'srSettlement.comment', mapping: 'comment', type: 'string'},
        {name: 'srSettlement.status', mapping: 'status', type: 'string'},
        {name: 'srSettlement.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'srSettlement.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'srSettlement.createTime', mapping: 'createTime', type: 'date'},
    ]
});