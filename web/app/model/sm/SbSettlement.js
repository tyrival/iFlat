Ext.define('iFlat.model.sm.SbSettlement', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'sbSettlement.id', mapping: 'id', type: 'string'},
        {name: 'sbSettlement.projNo', mapping: 'projNo', type: 'string'},
        {name: 'sbSettlement.projName', mapping: 'projName', type: 'string'},
        {name: 'sbSettlement.month', mapping: 'month', type: 'date'},
        {name: 'sbSettlement.deptName', mapping: 'deptName', type: 'string'},
        {name: 'sbSettlement.team', mapping: 'team', type: 'string'},
        {name: 'sbSettlement.attachment', mapping: 'attachment', type: 'string'},
        {name: 'sbSettlement.comment', mapping: 'comment', type: 'string'},
        {name: 'sbSettlement.status', mapping: 'status', type: 'string'},
        {name: 'sbSettlement.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'sbSettlement.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'sbSettlement.createTime', mapping: 'createTime', type: 'date'},
    ]
});