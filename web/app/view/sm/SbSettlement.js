Ext.define('iFlat.view.sm.SbSettlement', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-sbsettlement',

    requires: [
        'iFlat.view.sm.SbSettlementController'
    ],

    controller: 'sm-sbsettlement',

    store: smSbSettlementStore = Ext.create('iFlat.store.sm.SbSettlement'),

    tbar: [{
        xtype: 'button',
        text: '新增',
        ui: 'orig-blue',
        id: 'sm-sbsettlement-add',
        handler: 'edit'
    }, '->', {
        text: '刷新',
        id: 'sm-sbsettlement-refresh',
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
            return record.get('sbSettlement.status') != '未提交';
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
        header: '状态',
        width: 80,
        dataIndex: 'sbSettlement.status',
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
        text: '删除',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'delete',
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('sbSettlement.status') != '未提交';
        },
    }],
});
