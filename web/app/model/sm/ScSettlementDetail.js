Ext.define('iFlat.model.sm.ScSettlementDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ScscSettlementDetail.id', mapping: 'id', type: 'string'},
        {name: 'ScscSettlementDetail.pid', mapping: 'pid', type: 'string'},
        {name: 'ScscSettlementDetail.account', mapping: 'account', type: 'string'},
        {name: 'ScscSettlementDetail.content', mapping: 'content', type: 'string'},
        {name: 'ScscSettlementDetail.matQty', mapping: 'matQty', type: 'number'},
        {name: 'ScscSettlementDetail.spec', mapping: 'spec', type: 'string'},
        {name: 'ScscSettlementDetail.unit', mapping: 'unit', type: 'string'},
        {name: 'ScscSettlementDetail.price', mapping: 'price', type: 'number'},
        {name: 'ScscSettlementDetail.amount', mapping: 'amount', type: 'number'},
        {name: 'ScscSettlementDetail.attachment', mapping: 'attachment', type: 'string'},
        {name: 'ScscSettlementDetail.comment', mapping: 'comment', type: 'string'},
        {name: 'ScscSettlementDetail.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'ScscSettlementDetail.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'ScscSettlementDetail.createTime', mapping: 'createTime', type: 'date'},
    ]
});