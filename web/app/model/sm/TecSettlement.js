Ext.define('iFlat.model.sm.TecSettlement', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'tecSettlement.id', mapping: 'id', type: 'string'},
        {name: 'tecSettlement.projNo', mapping: 'projNo', type: 'string'},
        {name: 'tecSettlement.projName', mapping: 'projName', type: 'string'},
        {name: 'tecSettlement.month', mapping: 'month', type: 'date'},
        {name: 'tecSettlement.deptName', mapping: 'deptName', type: 'string'},
        {name: 'tecSettlement.team', mapping: 'team', type: 'string'},
        {name: 'tecSettlement.attachment', mapping: 'attachment', type: 'string'},
        {name: 'tecSettlement.comment', mapping: 'comment', type: 'string'},
        {name: 'tecSettlement.status', mapping: 'status', type: 'string'},
        {name: 'tecSettlement.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'tecSettlement.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'tecSettlement.createTime', mapping: 'createTime', type: 'date'},
        {name: 'tecSettlement.amount', mapping: 'amount', type: 'number'},
        {name: 'tecSettlement.mgrScore', mapping: 'mgrScore', type: 'number', defaultValue: 100 },
        {name: 'tecSettlement.progressScore', mapping: 'progressScore', type: 'number', defaultValue: 100 },
        {name: 'tecSettlement.qualityScore', mapping: 'qualityScore', type: 'number', defaultValue: 100 },
        {name: 'tecSettlement.safetyScore', mapping: 'safetyScore', type: 'number', defaultValue: 100 },
        {name: 'tecSettlement.fineAmount', mapping: 'fineAmount', type: 'number', defaultValue: 0 },
        {name: 'tecSettlement.summaryAmount', mapping: 'summaryAmount', type: 'number'},
    ]
});