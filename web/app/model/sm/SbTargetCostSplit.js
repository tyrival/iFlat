Ext.define('iFlat.model.sm.SbTargetCostSplit', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'sbTargetCostSplit.id', mapping: 'id', type: 'string'},
        {name: 'sbTargetCostSplit.type', mapping: 'type', type: 'string'},
        {name: 'sbTargetCostSplit.projNo', mapping: 'projNo', type: 'string'},
        {name: 'sbTargetCostSplit.projName', mapping: 'projName', type: 'string'},
        {name: 'sbTargetCostSplit.deptName', mapping: 'deptName', type: 'string'},
        {name: 'sbTargetCostSplit.costAccount', mapping: 'costAccount', type: 'string'},
        {name: 'sbTargetCostSplit.amount', mapping: 'amount', type: 'number'},
        {name: 'sbTargetCostSplit.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'sbTargetCostSplit.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'sbTargetCostSplit.createTime', mapping: 'createTime', type: 'date'},
        {name: 'sbTargetCostSplit.fixed', mapping: 'fixed', type: 'boolean'},
        {name: 'sbTargetCostSplit.fixedTime', mapping: 'fixedTime', type: 'date'},
    ]
});