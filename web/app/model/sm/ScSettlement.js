Ext.define('iFlat.model.sm.ScSettlement', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'scSettlement.id', mapping: 'id', type: 'string'},
        {name: 'scSettlement.projNo', mapping: 'projNo', type: 'string'},
        {name: 'scSettlement.projName', mapping: 'projName', type: 'string'},
        {name: 'scSettlement.month', mapping: 'month', type: 'date'},
        {name: 'scSettlement.deptName', mapping: 'deptName', type: 'string'},
        {name: 'scSettlement.team', mapping: 'team', type: 'string'},
        {name: 'scSettlement.attachment', mapping: 'attachment', type: 'string'},
        {name: 'scSettlement.comment', mapping: 'comment', type: 'string'},
        {name: 'scSettlement.status', mapping: 'status', type: 'string'},
        {name: 'scSettlement.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'scSettlement.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'scSettlement.createTime', mapping: 'createTime', type: 'date'},
        {name: 'scSettlement.amount', mapping: 'amount', type: 'number'},
        {name: 'scSettlement.mgrScore', mapping: 'mgrScore', type: 'number', defaultValue: 100 },
        {name: 'scSettlement.progressScore', mapping: 'progressScore', type: 'number', defaultValue: 100 },
        {name: 'scSettlement.qualityScore', mapping: 'qualityScore', type: 'number', defaultValue: 100 },
        {name: 'scSettlement.safetyScore', mapping: 'safetyScore', type: 'number', defaultValue: 100 },
        {name: 'scSettlement.fineAmount', mapping: 'fineAmount', type: 'number', defaultValue: 0 },
        {name: 'scSettlement.summaryAmount', mapping: 'summaryAmount', type: 'number'},
    ]
});