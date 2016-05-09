Ext.define('iFlat.view.sm.ScSettlement', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-scsettlement',

    requires: [
        'iFlat.view.sm.ScSettlementController'
    ],

    controller: 'sm-scsettlement',

    store: smScSettlementStore = Ext.create('iFlat.store.sm.ScSettlement', {
         proxy: {
             extraParams: {
                 'scSettlement.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
             }
         }
     }),

    tbar: [{
        xtype: 'button',
        text: '新增',
        ui: 'orig-blue',
        id: 'sm-scsettlement-add',
        handler: 'edit'
    }, '->', {
        text: '刷新',
        id: 'sm-scsettlement-refresh',
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
            return record.get('scSettlement.status') != '未提交';
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
        width: 80,
        dataIndex: 'scSettlement.status',
    }, {
        header: '月份',
        dataIndex: 'scSettlement.month',
        formatter: 'date("Y-m")'
    }, {
        header: '工号',
        dataIndex: 'scSettlement.projNo',
    }, {
        header: '工程名称',
        width: 150,
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
        text: '删除',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'delete',
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('scSettlement.status') != '未提交';
        },
    }],
});
