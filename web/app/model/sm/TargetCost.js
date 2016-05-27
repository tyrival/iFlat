Ext.define('iFlat.model.sm.TargetCost', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'targetCost.id', mapping: 'id', type: 'string'},
        {name: 'targetCost.type', mapping: 'type', type: 'string'},
        {name: 'targetCost.projNo', mapping: 'projNo', type: 'string'},
        {name: 'targetCost.projName', mapping: 'projName', type: 'string'},
        {name: 'targetCost.costAccount', mapping: 'costAccount', type: 'string'},
        {name: 'targetCost.costAccountName', mapping: 'costAccountName', type: 'string'},
        {name: 'targetCost.amount', mapping: 'amount', type: 'number'},
    ]
});