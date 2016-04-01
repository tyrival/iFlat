Ext.define('iFlat.view.sm.SbSettlementTemplate', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-sbsettlementtemplate',
    xtype: 'sm-sbsettlementtemplate',

    requires: [
        'iFlat.view.sm.SbSettlementTemplateController'
    ],

    controller: 'sm-sbsettlementtemplate',

    tbar: [{
        xtype: 'button',
        text: '新增',
        ui: 'orig-blue',
        id: 'sm-sbsettlementtemplate-add',
        handler: 'edit'
    }, '->', {
        text: '刷新',
        id: 'sm-sbsettlementtemplate-refresh',
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
        width: 150,
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
