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
        {name: 'sbSettlement.amount', mapping: 'amount', type: 'number'},
        {name: 'sbSettlement.mgrScore', mapping: 'mgrScore', type: 'number', defaultValue: 100 },
        {name: 'sbSettlement.progressScore', mapping: 'progressScore', type: 'number', defaultValue: 100 },
        {name: 'sbSettlement.qualityScore', mapping: 'qualityScore', type: 'number', defaultValue: 100 },
        {name: 'sbSettlement.safetyScore', mapping: 'safetyScore', type: 'number', defaultValue: 100 },
        {name: 'sbSettlement.fineAmount', mapping: 'fineAmount', type: 'number', defaultValue: 0 },
        {name: 'sbSettlement.summaryAmount', mapping: 'summaryAmount', type: 'number'},
    ]
});