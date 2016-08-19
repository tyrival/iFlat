Ext.define('iFlat.view.xr.temp.SrSettlementApproveBatchInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.xr-srsettlementapprovebatchinfo',
    title: '修船结算明细',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.xr.temp.SrSettlementApproveBatchController',
    ],

    controller: 'xr-srsettlementapprovebatch',
    closeAction: 'hide',
    id: 'xr-srsettlementapprovebatchinfo',
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
            store: Ext.create('iFlat.store.xr.SrSettlementDetl'),
            columns: [{
                header: '施工项目',
                width: 120,
                dataIndex: 'srSettlementDetl.code',
                hidden: true,
            }, {
                header: '分类',
                dataIndex: 'srSettlementDetl.category',
            }, {
                header: '施工内容',
                width: 200,
                dataIndex: 'srSettlementDetl.adjustContent',
                cellWrap: true,
            }, {
                header: '规格',
                dataIndex: 'srSettlementDetl.specs',
            }, {
                header: '单位',
                dataIndex: 'srSettlementDetl.unit',
            }, {
                header: '系数',
                dataIndex: 'srSettlementDetl.degree',
            }, {
                xtype: 'checkcolumn',
                width: 100,
                disabled: true,
                header: '以定额结算',
                dataIndex: 'srSettlementDetl.isQuota',
            }, {
                header: '定额',
                dataIndex: 'srSettlementDetl.quota',
            }, {
                header: '数量',
                dataIndex: 'srSettlementDetl.adjustQty',
            }, {
                header: '一级单价',
                dataIndex: 'srSettlementDetl.priceFirst',
            }, {
                header: '一级总价',
                dataIndex: 'srSettlementDetl.amountFirst',
            }, {
                header: '二级单价',
                dataIndex: 'srSettlementDetl.priceSecond',
            }, {
                header: '二级总价',
                dataIndex: 'srSettlementDetl.amountSecond',
            }, {
                header: '备注',
                width: 150,
                dataIndex: 'srSettlementDetl.comment',
                shrinkWrap: 1,
            }],
        }],
    }],
});