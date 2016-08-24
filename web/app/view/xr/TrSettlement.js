Ext.define('iFlat.view.xr.TrSettlement', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.xr-trsettlement',

    requires: [
        'iFlat.view.xr.TrSettlementController'
    ],

    controller: 'xr-trsettlement',

    store: trSettlementStore = Ext.create('iFlat.store.xr.TrSettlement', {
        proxy: {
            extraParams: {
                'trSettlement.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        }
    }),

    tbar: [{
        xtype: 'button',
        text: '新增',
        ui: 'orig-blue',
        id: 'xr-trsettlement-add',
        handler: 'edit'
    }, {
        xtype: 'form',
        items: [{
            xtype: 'fileuploadfield',
            name: 'upload',
            buttonText: '选择...',
            width: 140,
            margin: '0 0 0 0',
        }, ]
    }, {
        xtype: 'button',
        text: '导入',
        ui: 'orig-blue',
        handler: 'uploadFile'
    }, '->', {
        text: '下载模板',
        handler: 'downloadTemplate'
    }, {
        text: '刷新',
        id: 'xr-trsettlement-refresh',
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
            return record.get('trSettlement.status') != '未提交';
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
        dataIndex: 'trSettlement.status',
    }, {
        header: '工号',
        dataIndex: 'trSettlement.projNo',
    }, {
        header: '船名',
        width: 150,
        dataIndex: 'trSettlement.projName',
    }, {
        header: '承办部门',
        width: 120,
        dataIndex: 'trSettlement.dept',
    }, {
        header: '工程队',
        width: 200,
        dataIndex: 'trSettlement.team',
    }, {
        header: '附件',
        width: 50,
        dataIndex: 'trSettlement.attachment',
        renderer: 'renderAttachment'
    }, {
        header: '一级结算金额',
        width: 50,
        dataIndex: 'trSettlement.amountFirst',
    }, {
        header: '二级结算金额',
        width: 50,
        dataIndex: 'trSettlement.amountSecond',
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'trSettlement.comment',
    }, {
        header: '创建时间',
        dataIndex: 'trSettlement.createTime',
        formatter: 'date("Y-m-d")'
    }, {
        text: '删除',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'delete',
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('trSettlement.status') != '未提交';
        },
    }],
});
