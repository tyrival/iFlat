Ext.define('iFlat.view.sm.temp.SrSettlementApprove', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-srsettlementapprove',
    xtype: 'sm-srsettlementapprove',

    requires: [
        'iFlat.view.sm.temp.SrSettlementApproveController'
    ],

    controller: 'sm-srsettlementapprove',

    id: 'sm-srsettlementapprove',
    tbar: ['->', {
        text: '刷新',
        name: 'sm-srsettlementapprove-refresh',
        handler: 'refresh',
    }],

    columns: [{
        text: '办理',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-th-large',
        handler: 'info',
    }, {
        header: '附件',
        width: 50,
        dataIndex: 'srSettlement.attachment',
        renderer: 'renderAttachment'
    }, {
        header: '类型',
        width: 120,
        dataIndex: 'srSettlement.type',
        renderer: 'renderType'
    }, {
        header: '工号',
        dataIndex: 'srSettlement.projNo',
    }, {
        header: '船名',
        width: 150,
        dataIndex: 'srSettlement.projName',
    }, {
        header: '进度%',
        width: 80,
        dataIndex: 'srSettlement.progress',
    }, {
        header: '部门',
        width: 120,
        dataIndex: 'srSettlement.deptName',
    }, {
        header: '工程队',
        width: 200,
        dataIndex: 'srSettlement.team',
    }, {
        header: '工费合计',
        dataIndex: 'srSettlement.summaryAmount',
        align: 'right',
        renderer: 'amountFormat'
    }, {
        header: '工程总价',
        dataIndex: 'srSettlement.laborAmount',
        align: 'right',
        renderer: 'amountFormat'
    }, {
        header: '易耗品补贴',
        dataIndex: 'srSettlement.consumableAmount',
        align: 'right',
        renderer: 'amountFormat'
    }, {
        header: '绩效',
        dataIndex: 'srSettlement.performanceAmount',
        align: 'right',
        renderer: 'amountFormat'
    }, {
        header: '材料费',
        dataIndex: 'srSettlement.materialAmount',
        align: 'right',
        renderer: 'amountFormat'
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'srSettlement.comment',
    }, {
        header: '状态',
        width: 120,
        dataIndex: 'srSettlement.status',
    }],
});
