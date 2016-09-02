Ext.define('iFlat.model.wip.SrOsBidding', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srOsBidding.id', mapping: 'id', type: 'string'},
        {name: 'srOsBidding.pid', mapping: 'pid', type: 'string'},
        {name: 'srOsBidding.vendor', mapping: 'vendor', type: 'string'},
        {name: 'srOsBidding.vendorType', mapping: 'vendorType', type: 'string'},
        {name: 'srOsBidding.amount', mapping: 'amount', type: 'number'},
        {name: 'srOsBidding.amountAdj', mapping: 'amountAdj', type: 'number'},
        {name: 'srOsBidding.comment', mapping: 'comment', type: 'string'},
        {name: 'srOsBidding.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'srOsBidding.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'srOsBidding.createTime', mapping: 'createTime', type: 'string'},
    ]
});