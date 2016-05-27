Ext.define('iFlat.model.sm.ProjectTargetCost', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'projectTargetCost.id', mapping: 'id', type: 'string'},
        {name: 'projectTargetCost.projNo', mapping: 'projNo', type: 'string'},
        {name: 'projectTargetCost.projName', mapping: 'projName', type: 'string'},
        {name: 'projectTargetCost.type', mapping: 'type', type: 'string'},
        {name: 'projectTargetCost.amount', mapping: 'amount', type: 'number'},
        {name: 'projectTargetCost.attachment', mapping: 'attachment', type: 'string'},
        {name: 'projectTargetCost.comment', mapping: 'comment', type: 'string'},
    ]
});