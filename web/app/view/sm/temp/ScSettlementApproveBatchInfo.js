Ext.define('iFlat.view.sm.temp.ScSettlementApproveBatchInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-scsettlementapprovebatchinfo',
    title: '造船结算明细',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.sm.temp.ScSettlementApproveBatchController',
    ],

    controller: 'sm-scsettlementapprovebatch',
    closeAction: 'hide',
    id: 'sm-scsettlementapprovebatchinfo',
    width: '95%',
    maxHeight: 500,
    y: 20,
    items: [{
        xtype: 'container',
        margin: '15 15 15 15',
        scollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            scrollable: true,
            border: true,
            columnLines: true,
            store: Ext.create('iFlat.store.sm.ScSettlementDetail'),
            columns: [{
                header: '成本科目',
                width: 180,
                dataIndex: 'scSettlementDetail.account',
            }, {
                header: '施工内容',
                width: 200,
                dataIndex: 'scSettlementDetail.content',
                shrinkWrap: 1,
            }, {
                header: '物量',
                dataIndex: 'scSettlementDetail.matQty',
            }, {
                header: '规格',
                dataIndex: 'scSettlementDetail.spec',
            }, {
                header: '单位',
                dataIndex: 'scSettlementDetail.unit',
            }, {
                header: '单价',
                align: 'right',
                dataIndex: 'scSettlementDetail.price',
            }, {
                header: '金额',
                align: 'right',
                dataIndex: 'scSettlementDetail.amount',
            }, {
                header: '备注',
                width: 150,
                dataIndex: 'scSettlementDetail.comment',
                shrinkWrap: 1,
            }],
        }],
    }],
});