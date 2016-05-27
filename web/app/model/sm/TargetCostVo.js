Ext.define('iFlat.model.sm.TargetCostVo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'targetCostVo.type', mapping: 'type', type: 'string'},
        {name: 'targetCostVo.projNo', mapping: 'projNo', type: 'string'},
        {name: 'targetCostVo.projName', mapping: 'projName', type: 'string'},
        {name: 'targetCostVo.costAccount', mapping: 'costAccount', type: 'string'},
        {name: 'targetCostVo.costAccountName', mapping: 'costAccountName', type: 'string'},
        {name: 'targetCostVo.amount', mapping: 'amount', type: 'number'},
        {name: 'targetCostVo.distribution', mapping: 'distribution', type: 'number'},
    ]
});