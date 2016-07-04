Ext.define('iFlat.model.sm.ScSettlementDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'scSettlementDetail.id', mapping: 'id', type: 'string'},
        {name: 'scSettlementDetail.pid', mapping: 'pid', type: 'string'},
        {name: 'scSettlementDetail.account', mapping: 'account', type: 'string'},
        {name: 'scSettlementDetail.accountName', mapping: 'accountName', type: 'string'},
        {name: 'scSettlementDetail.content', mapping: 'content', type: 'string'},
        {name: 'scSettlementDetail.matQty', mapping: 'matQty', type: 'number'},
        {name: 'scSettlementDetail.spec', mapping: 'spec', type: 'string'},
        {name: 'scSettlementDetail.unit', mapping: 'unit', type: 'string'},
        {name: 'scSettlementDetail.price', mapping: 'price', type: 'number'},
        {name: 'scSettlementDetail.amount', mapping: 'amount', type: 'number'},
        {name: 'scSettlementDetail.attachment', mapping: 'attachment', type: 'string'},
        {name: 'scSettlementDetail.comment', mapping: 'comment', type: 'string'},
        {name: 'scSettlementDetail.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'scSettlementDetail.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'scSettlementDetail.createTime', mapping: 'createTime', type: 'date'},
    ]
});