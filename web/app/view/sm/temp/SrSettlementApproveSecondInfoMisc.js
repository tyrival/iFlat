Ext.define('iFlat.view.sm.temp.SrSettlementApproveSecondInfoMisc', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-srsettlementapprovesecondinfomisc',
    title: '修船结算明细',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.sm.temp.SrSettlementApproveSecondController',
    ],

    controller: 'sm-srsettlementapprovesecond',
    closeAction: 'hide',
    id: 'sm-srsettlementapprovesecondinfomisc',
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
            store: Ext.create('iFlat.store.sm.SrSettlementDetlSecond'),
            columns: [{
                header: '类型',
                width: 120,
                dataIndex: 'srSettlementDetlSecond.type',
            }, {
                header: '施工内容',
                width: 200,
                dataIndex: 'srSettlementDetlSecond.content',
                cellWrap: true,
            }, {
                header: '数量',
                dataIndex: 'srSettlementDetlSecond.qty1',
            }, {
                header: '规格',
                dataIndex: 'srSettlementDetlSecond.specs',
                editor: {
                }
            }, {
                header: '单位',
                dataIndex: 'srSettlementDetlSecond.unit',
                editor: {
                }
            }, {
                header: '单价',
                align: 'right',
                dataIndex: 'srSettlementDetlSecond.price',
            }, {
                header: '金额',
                align: 'right',
                dataIndex: 'srSettlementDetlSecond.amount',
            }, {
                header: '备注',
                width: 150,
                dataIndex: 'srSettlementDetlSecond.comment',
                cellWrap: true,
            }],
        }],
    }],
});