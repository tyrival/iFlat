Ext.define('iFlat.model.sm.SbTargetCost', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'sbTargetCost.id', mapping: 'id', type: 'string'},
        {name: 'sbTargetCost.projNo', mapping: 'projNo', type: 'string'},
        {name: 'sbTargetCost.projName', mapping: 'projName', type: 'string'},
        {name: 'sbTargetCost.deptName', mapping: 'deptName', type: 'string'},
        {name: 'sbTargetCost.amount', mapping: 'amount', type: 'number'},
    ]
});