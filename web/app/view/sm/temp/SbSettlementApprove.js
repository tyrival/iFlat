Ext.define('iFlat.view.sm.temp.SbSettlementApprove', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-sbsettlementapprove',
    xtype: 'sm-sbsettlementapprove',

    requires: [
        'iFlat.view.sm.temp.SbSettlementApproveController'
    ],

    controller: 'sm-sbsettlementapprove',

    id: 'sm-sbsettlementapprove',
    tbar: ['->', {
        text: '刷新',
        id: 'sm-sbsettlementapprove-refresh',
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
        dataIndex: 'sbSettlement.month',
        formatter: 'date("Y-m")'
    }, {
        header: '工号',
        dataIndex: 'sbSettlement.projNo',
    }, {
        header: '船名',
        flex: true,
        dataIndex: 'sbSettlement.projName',
    }, {
        header: '部门',
        width: 120,
        dataIndex: 'sbSettlement.deptName',
    }, {
        header: '工程队',
        width: 200,
        dataIndex: 'sbSettlement.team',
    }, {
        header: '附件',
        width: 50,
        dataIndex: 'sbSettlement.attachment',
        renderer: 'renderAttachment'
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'sbSettlement.comment',
    }, {
        header: '状态',
        width: 80,
        dataIndex: 'sbSettlement.status',
    }],
});
