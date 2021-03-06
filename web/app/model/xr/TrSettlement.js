Ext.define('iFlat.model.xr.TrSettlement', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'trSettlement.id', mapping: 'id', type: 'string'},
        {name: 'trSettlement.projNo', mapping: 'projNo', type: 'string'},
        {name: 'trSettlement.projName', mapping: 'projName', type: 'string'},
        {name: 'trSettlement.deptCode', mapping: 'deptCode', type: 'string'},
        {name: 'trSettlement.dept', mapping: 'dept', type: 'string'},
        {name: 'trSettlement.teamCode', mapping: 'teamCode', type: 'string'},
        {name: 'trSettlement.team', mapping: 'team', type: 'string'},
        {name: 'trSettlement.reason', mapping: 'reason', type: 'string'},
        {name: 'trSettlement.isOutwork', mapping: 'isOutwork', type: 'boolean'},
        {name: 'trSettlement.amountFirst', mapping: 'amountFirst', type: 'number'},
        {name: 'trSettlement.amountSecond', mapping: 'amountSecond', type: 'number'},
        {name: 'trSettlement.amountDiff', mapping: 'amountDiff', type: 'number'},
        {name: 'trSettlement.attachment', mapping: 'attachment', type: 'string'},
        {name: 'trSettlement.balApplAtt', mapping: 'balApplAtt', type: 'string'},
        {name: 'trSettlement.comment', mapping: 'comment', type: 'string'},
        {name: 'trSettlement.status', mapping: 'status', type: 'string'},
        {name: 'trSettlement.isQuota', mapping: 'isQuota', type: 'boolean'},
        {name: 'trSettlement.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'trSettlement.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'trSettlement.creatorDeptCode', mapping: 'creatorDeptCode', type: 'string'},
        {name: 'trSettlement.creatorDept', mapping: 'creatorDept', type: 'string'},
        {name: 'trSettlement.createTime', mapping: 'createTime', type: 'date'},
        {name: 'trSettlement.teamAcc', mapping: 'teamAcc', type: 'string'},
        {name: 'trSettlement.teamName', mapping: 'teamName', type: 'string'},
        {name: 'trSettlement.score', mapping: 'score', defaultValue: 100, type: 'number'},
        {name: 'trSettlement.opinion', mapping: 'opinion', type: 'string'},
        {name: 'trSettlement.settFirstAcc', mapping: 'settFirstAcc', type: 'string'},
        {name: 'trSettlement.settFirstName', mapping: 'settFirstName', type: 'string'},
        {name: 'trSettlement.settFirstTime', mapping: 'settFirstTime', type: 'date'},
        {name: 'trSettlement.settlementTime', mapping: 'settlementTime', type: 'date'},
        {name: 'trSettlement.discountRate', mapping: 'discountRate', type: 'number'},
        {name: 'trSettlement.amountWithDiscount', mapping: 'amountWithDiscount', type: 'number'},
    ]
});