Ext.define('iFlat.model.sm.ProjectTargetCostVo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'projectTargetCostVo.projNo', mapping: 'projNo', type: 'string'},
        {name: 'projectTargetCostVo.type', mapping: 'type', type: 'string'},
        {name: 'projectTargetCostVo.projName', mapping: 'projName', type: 'string'},
        {name: 'projectTargetCostVo.amount', mapping: 'amount', type: 'number'},
        {name: 'projectTargetCostVo.distribution', mapping: 'distribution', type: 'number'},
    ]
});