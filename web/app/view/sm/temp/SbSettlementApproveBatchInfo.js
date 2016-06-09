Ext.define('iFlat.view.sm.temp.SbSettlementApproveBatchInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-sbsettlementapprovebatchinfo',
    title: '造船结算明细',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.sm.temp.SbSettlementApproveBatchController',
    ],

    controller: 'sm-sbsettlementapprovebatch',
    closeAction: 'hide',
    id: 'sm-sbsettlementapprovebatchinfo',
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
            store: Ext.create('iFlat.store.sm.SbSettlementDetail'),
            columns: [{
                header: '成本科目代码',
                width: 120,
                dataIndex: 'sbSettlementDetail.account',
            }, {
                header: '成本科目名称',
                width: 180,
                dataIndex: 'sbSettlementDetail.accountName',
            }, {
                header: '施工内容',
                width: 200,
                dataIndex: 'sbSettlementDetail.content',
                shrinkWrap: 1,
            }, {
                header: '物量',
                dataIndex: 'sbSettlementDetail.matQty',
            }, {
                header: '规格',
                dataIndex: 'sbSettlementDetail.spec',
            }, {
                header: '单位',
                dataIndex: 'sbSettlementDetail.unit',
            }, {
                header: '单价',
                align: 'right',
                dataIndex: 'sbSettlementDetail.price',
            }, {
                header: '金额',
                align: 'right',
                dataIndex: 'sbSettlementDetail.amount',
            }, {
                header: '备注',
                width: 150,
                dataIndex: 'sbSettlementDetail.comment',
                shrinkWrap: 1,
            }],
        }],
    }],
});