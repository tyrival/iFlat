Ext.define('iFlat.view.sm.temp.SrSettlement', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-srsettlement',

    requires: [
        'iFlat.view.sm.temp.SrSettlementController',
    ],

    controller: 'sm-srsettlement',

    tbar: [{
        xtype: 'button',
        text: '新增',
        ui: 'orig-blue',
        handler: 'edit'
    }, '->', {
        text: '刷新',
        handler: 'refresh',
    }],

    columns: [{
        text: '提交',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-hand-o-up',
        handler: 'submit',
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('srSettlement.status') != '未提交';
        },
    }, {
        text: '编辑',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '编辑',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'edit',
    }, {
        text: '批注',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-tags',
        handler: 'info',
    }, {
        header: '状态',
        width: 120,
        dataIndex: 'srSettlement.status',
    }, {
        header: '类型',
        dataIndex: 'srSettlement.type',
        hidden: true,
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
        header: '合计',
        dataIndex: 'srSettlement.summaryAmount',
        align: 'right',
        renderer: 'amountFormat'
    }, {
        header: '人工费',
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
        header: '附件',
        width: 50,
        dataIndex: 'srSettlement.attachment',
        renderer: 'renderAttachment'
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'srSettlement.comment',
    }, {
        text: '删除',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'delete',
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('srSettlement.status') != '未提交';
        },
    }],
});
