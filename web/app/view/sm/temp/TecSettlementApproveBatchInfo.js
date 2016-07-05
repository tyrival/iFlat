Ext.define('iFlat.view.sm.temp.TecSettlementApproveBatchInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-tecsettlementapprovebatchinfo',
    title: '造船结算明细',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.sm.temp.TecSettlementApproveBatchController',
    ],

    controller: 'sm-tecsettlementapprovebatch',
    closeAction: 'hide',
    id: 'sm-tecsettlementapprovebatchinfo',
    width: '95%',
    height: '95%',
    y: 20,
    items: [{
        xtype: 'container',
        margin: '15 0 15 15',
        scrollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            scrollable: true,
            border: true,
            columnLines: true,
            store: Ext.create('iFlat.store.sm.TecSettlementDetail'),
            columns: [{
                header: '成本科目',
                width: 180,
                dataIndex: 'tecSettlementDetail.account',
            }, {
                header: '施工内容',
                width: 200,
                dataIndex: 'tecSettlementDetail.content',
                cellWrap: true,
            }, {
                header: '物量',
                dataIndex: 'tecSettlementDetail.matQty',
            }, {
                header: '规格',
                dataIndex: 'tecSettlementDetail.spec',
            }, {
                header: '单位',
                dataIndex: 'tecSettlementDetail.unit',
            }, {
                header: '单价',
                align: 'right',
                dataIndex: 'tecSettlementDetail.price',
            }, {
                header: '金额',
                align: 'right',
                dataIndex: 'tecSettlementDetail.amount',
            }, {
                header: '备注',
                width: 150,
                dataIndex: 'tecSettlementDetail.comment',
                cellWrap: true,
            }],
        }],
    }],
});