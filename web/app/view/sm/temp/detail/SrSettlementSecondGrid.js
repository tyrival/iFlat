Ext.define('iFlat.view.sm.temp.detail.SrSettlementSecondGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-detail-srsettlementsecondgrid',

    requires: [
        'iFlat.view.sm.temp.SrSettlementSecondController'
    ],
    controller: 'sm-srsettlementsecond',

    width: '100%',
    scrollable: true,
    border: true,
    columnLines: true,
    store: smSrSettlementSecondGridStore = Ext.create('iFlat.store.sm.SrSettlementSecond'),

    tbar: [{
        text: '新增',
        ui: 'orig-blue',
        handler: 'editSecond',
    }, '->', {
        xtype: 'textfield',
        name: 'summaryAmountSecond',
        fieldLabel: '已分配',
        labelAlign: 'right',
        width: 240,
    }, {
        text: '刷新',
        handler: 'refresh',
    }],

    columns: [{
        text: '编辑',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'editSecond',
        editor: {
            xtype: 'label',
        }
    }, {
        header: '工程队',
        width: 220,
        dataIndex: 'srSettlementSecond.team',
    }, {
        header: '总金额',
        align: 'right',
        dataIndex: 'srSettlementSecond.summaryAmount',
    }, {
        header: '人工费',
        align: 'right',
        dataIndex: 'srSettlementSecond.laborAmount',
    }, {
        header: '易耗品补贴',
        align: 'right',
        dataIndex: 'srSettlementSecond.consumableAmount',
    }, {
        header: '绩效',
        align: 'right',
        dataIndex: 'srSettlementSecond.performanceAmount',
    }, {
        header: '材料费',
        align: 'right',
        dataIndex: 'srSettlementSecond.materialAmount',
    }, {
        header: '附件',
        align: 'right',
        dataIndex: 'srSettlementSecond.attachment',
        renderer: 'renderAttachment'
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'srSettlementSecond.comment',
        shrinkWrap: 1,
    }, {
        text: '删除',
        id: 'sm-sbtargetcost-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteSettlementSecond',
        editor: {
            xtype: 'label',
        }
    }],
});
