Ext.define('iFlat.view.sm.temp.detail.SrSettlementSecondApproveGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-detail-srsettlementsecondapprovegrid',

    requires: [
        'iFlat.view.sm.temp.SrSettlementApproveSecondController',
        'iFlat.view.sm.temp.SrSettlementApproveSecondInfoMain',
        'iFlat.view.sm.temp.SrSettlementApproveSecondInfoMisc',
        'iFlat.view.sm.temp.SrSettlementApproveSecondInfoSys',
    ],
    controller: 'sm-srsettlementapprovesecond',

    width: '100%',
    scrollable: true,
    border: true,
    columnLines: true,
    store: Ext.create('iFlat.store.sm.SrSettlementSecond', {
        proxy: {
            type: 'ajax',
            url: 'sm_listSrSettlementSecondBySrSettlement.action',
        },
    }),

    selModel: {
        type: 'spreadsheet',
        columnSelect: true,
        checkboxSelect: true,
        pruneRemoved: false,
        extensible: 'y',
    },
    
    tbar: ['->', {
        xtype: 'textfield',
        name: 'summaryAmountSecond',
        fieldLabel: '已分配',
        labelAlign: 'right',
        align: 'right',
        width: 240,
        editable: false,
    }, {
        text: '刷新',
        handler: 'refresh',
    }],

    columns: [{
        text: '详情',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-file-text-o',
        handler: 'info',
        editor: {
            xtype: 'label',
        }
    }, {
        header: '工号',
        dataIndex: 'srSettlementSecond.projNo',
    }, {
        header: '船名',
        width: 220,
        dataIndex: 'srSettlementSecond.projName',
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
        header: '扣款',
        align: 'right',
        dataIndex: 'srSettlementSecond.fineAmount',
    }, {
        header: '附件',
        align: 'right',
        width: 80,
        dataIndex: 'srSettlementSecond.attachment',
        renderer: 'renderAttachment'
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'srSettlementSecond.comment',
        shrinkWrap: 1,
    }],
});
