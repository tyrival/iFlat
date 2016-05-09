Ext.define('iFlat.view.sm.Temporary', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-temporary',

    requires: [
        'iFlat.view.sm.TemporaryController'
    ],

    controller: 'sm-temporary',

    store: smTemporaryStore = Ext.create('iFlat.store.sm.Temporary', {
        proxy: {
            extraParams: {
                'temporary.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        }
    }),

    tbar: [{
        xtype: 'button',
        text: '新增',
        ui: 'orig-blue',
        id: 'sm-temporary-add',
        handler: 'edit'
    }, '->', {
        text: '刷新',
        id: 'sm-temporary-refresh',
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
            return record.get('temporary.status') != '未提交';
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
        dataIndex: 'temporary.status',
    }, {
        header: '月份',
        width: 200,
        dataIndex: 'temporary.month',
        formatter: 'date("Y-m")'
    }, {
        header: '附件',
        width: 50,
        dataIndex: 'temporary.attachment',
        renderer: 'renderAttachment'
    }, {
        header: '备注',
        flex: true,
        dataIndex: 'temporary.comment',
    }, {
        text: '删除',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'delete',
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('temporary.status') != '未提交';
        },
    }],
});
