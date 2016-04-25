Ext.define('iFlat.model.sm.TargetCostAccount', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'targetCostAccount.code', mapping: 'code', type: 'string'},
        {name: 'targetCostAccount.name', mapping: 'name', type: 'string'},
        {name: 'targetCostAccount.type', mapping: 'type', type: 'string'},
    ]
});