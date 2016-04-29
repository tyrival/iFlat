Ext.define('iFlat.model.sm.TecSettlementDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'tecSettlementDetail.id', mapping: 'id', type: 'string'},
        {name: 'tecSettlementDetail.pid', mapping: 'pid', type: 'string'},
        {name: 'tecSettlementDetail.content', mapping: 'content', type: 'string'},
        {name: 'tecSettlementDetail.matQty', mapping: 'matQty', type: 'number'},
        {name: 'tecSettlementDetail.spec', mapping: 'spec', type: 'string'},
        {name: 'tecSettlementDetail.unit', mapping: 'unit', type: 'string'},
        {name: 'tecSettlementDetail.price', mapping: 'price', type: 'number'},
        {name: 'tecSettlementDetail.amount', mapping: 'amount', type: 'number'},
        {name: 'tecSettlementDetail.attachment', mapping: 'attachment', type: 'string'},
        {name: 'tecSettlementDetail.comment', mapping: 'comment', type: 'string'},
        {name: 'tecSettlementDetail.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'tecSettlementDetail.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'tecSettlementDetail.createTime', mapping: 'createTime', type: 'date'},
    ]
});