Ext.define('iFlat.view.xr.temp.TrSettlementApproveBatchInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.xr-trsettlementapprovebatchinfo',
    title: '修船结算明细',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.xr.temp.TrSettlementApproveBatchController',
    ],

    controller: 'xr-trsettlementapprovebatch',
    closeAction: 'hide',
    id: 'xr-trsettlementapprovebatchinfo',
    width: '95%',
    height: '95%',
    y: 20,
    items: [{
        xtype: 'container',
        padding: '15 15 15 15',
        scrollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            flex: 1,
            scrollable: true,
            border: true,
            columnLines: true,
            store: Ext.create('iFlat.store.xr.TrSettlementDetl'),
            columns: [{
                header: '施工内容',
                width: 200,
                dataIndex: 'trSettlementDetl.content',
                cellWrap: true,
            }, {
                header: '规格',
                dataIndex: 'trSettlementDetl.specs',
            }, {
                header: '计量单位',
                dataIndex: 'trSettlementDetl.unit',
            }, {
                header: '一级单位',
                dataIndex: 'trSettlementDetl.settUnit',
            }, {
                header: '一级数量',
                dataIndex: 'trSettlementDetl.settleQtyFirst',
            }, {
                header: '一级单价',
                dataIndex: 'trSettlementDetl.priceFirst',
            }, {
                header: '一级小计',
                dataIndex: 'trSettlementDetl.amountFirst',
            }, {
                header: '二级结算单位',
                dataIndex: 'trSettlementDetl.settUnitSecond',
            }, {
                header: '二级结算单价',
                dataIndex: 'trSettlementDetl.priceSecond',
            }, {
                header: '二级数量',
                dataIndex: 'trSettlementDetl.settleQtySecond',
            }, {
                header: '二级系数',
                dataIndex: 'trSettlementDetl.degree',
            }, {
                header: '二级小计',
                dataIndex: 'trSettlementDetl.amountSecond',
            }, {
                header: '备注',
                width: 150,
                dataIndex: 'trSettlementDetl.comment',
                shrinkWrap: 1,
            }],
        }],
    }],
});