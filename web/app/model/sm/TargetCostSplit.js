Ext.define('iFlat.model.sm.TargetCostSplit', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'targetCostSplit.id', mapping: 'id', type: 'string'},
        {name: 'targetCostSplit.type', mapping: 'type', type: 'string'},
        {name: 'targetCostSplit.projNo', mapping: 'projNo', type: 'string'},
        {name: 'targetCostSplit.projName', mapping: 'projName', type: 'string'},
        {name: 'targetCostSplit.deptName', mapping: 'deptName', type: 'string'},
        {name: 'targetCostSplit.costAccount', mapping: 'costAccount', type: 'string'},
        {name: 'targetCost.costAccountName', mapping: 'costAccountName', type: 'string'},
        {name: 'targetCostSplit.amount', mapping: 'amount', type: 'number'},
        {name: 'targetCostSplit.comment', mapping: 'comment', type: 'string'},
        {name: 'targetCostSplit.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'targetCostSplit.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'targetCostSplit.createTime', mapping: 'createTime', type: 'date'},
        {name: 'targetCostSplit.fixed', mapping: 'fixed', type: 'boolean'},
        {name: 'targetCostSplit.fixedTime', mapping: 'fixedTime', type: 'date'},
    ]
});