Ext.define('iFlat.model.sm.SbSettlementDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'sbSettlementDetail.id', mapping: 'id', type: 'string'},
        {name: 'sbSettlementDetail.pid', mapping: 'pid', type: 'string'},
        {name: 'sbSettlementDetail.account', mapping: 'account', type: 'string'},
        {name: 'sbSettlementDetail.accountName', mapping: 'accountName', type: 'string'},
        {name: 'sbSettlementDetail.content', mapping: 'content', type: 'string'},
        {name: 'sbSettlementDetail.matQty', mapping: 'matQty', type: 'number'},
        {name: 'sbSettlementDetail.spec', mapping: 'spec', type: 'string'},
        {name: 'sbSettlementDetail.unit', mapping: 'unit', type: 'string'},
        {name: 'sbSettlementDetail.price', mapping: 'price', type: 'number'},
        {name: 'sbSettlementDetail.amount', mapping: 'amount', type: 'number'},
        {name: 'sbSettlementDetail.attachment', mapping: 'attachment', type: 'string'},
        {name: 'sbSettlementDetail.comment', mapping: 'comment', type: 'string'},
        {name: 'sbSettlementDetail.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'sbSettlementDetail.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'sbSettlementDetail.createTime', mapping: 'createTime', type: 'date'},
    ]
});