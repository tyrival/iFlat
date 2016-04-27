Ext.define('iFlat.view.sm.temp.ScSettlementApprove', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-scsettlementapprove',
    xtype: 'sm-scsettlementapprove',

    requires: [
        'iFlat.view.sm.temp.ScSettlementApproveController'
    ],

    controller: 'sm-scsettlementapprove',

    id: 'sm-scsettlementapprove',
    tbar: ['->', {
        text: '刷新',
        id: 'sm-scsettlementapprove-refresh',
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
        header: '月份',
        dataIndex: 'scSettlement.month',
        formatter: 'date("Y-m")'
    }, {
        header: '工号',
        dataIndex: 'scSettlement.projNo',
    }, {
        header: '船名',
        flex: true,
        dataIndex: 'scSettlement.projName',
    }, {
        header: '部门',
        width: 120,
        dataIndex: 'scSettlement.deptName',
    }, {
        header: '工程队',
        width: 200,
        dataIndex: 'scSettlement.team',
    }, {
        header: '附件',
        width: 50,
        dataIndex: 'scSettlement.attachment',
        renderer: 'renderAttachment'
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'scSettlement.comment',
    }, {
        header: '状态',
        width: 80,
        dataIndex: 'scSettlement.status',
    }],
});
