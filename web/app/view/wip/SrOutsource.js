Ext.define('iFlat.view.wip.SrOutsource', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.wip-sroutsource',

    requires: [
        'iFlat.view.wip.SrOutsourceController'
    ],

    controller: 'wip-sroutsource',

    store: wipSrOutsourceStore = Ext.create('iFlat.store.wip.SrOutsourcePage', {
        proxy: {
            extraParams: {
                'srOutsource.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        }
    }),

    tbar: [{
        xtype: 'button',
        text: '新增',
        ui: 'orig-blue',
        id: 'wip-sroutsource-add',
        handler: 'edit'
    }, '->', {
        text: '刷新',
        id: 'wip-sroutsource-refresh',
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
            return record.get('srOutsource.status') != '未提交';
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
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('srOutsource.status') == '完成';
        },
    }, {
        header: '状态',
        width: 150,
        dataIndex: 'srOutsource.status',
    }, {
        header: '工号',
        dataIndex: 'srOutsource.projNo',
    }, {
        header: '船名',
        width: 150,
        dataIndex: 'srOutsource.projName',
    }, {
        header: '项目名称',
        width: 150,
        dataIndex: 'srOutsource.name',
    }, {
        header: '工程类型',
        width: 150,
        dataIndex: 'srOutsource.projType',
    }, {
        header: '外协类型',
        width: 150,
        dataIndex: 'srOutsource.type',
    }, {
        header: '施工单位',
        width: 120,
        dataIndex: 'srOutsource.dept',
    }, {
        header: '资金来源',
        width: 120,
        dataIndex: 'srOutsource.capitalSource',
    }, {
        header: '交货期',
        width: 120,
        dataIndex: 'srOutsource.tod',
        formatter: 'date("Y-m-d")'
    }, {
        xtype: 'checkcolumn',
        disabled: true,
        header: '有图纸',
        width: 100,
        dataIndex: 'srOutsource.hasBluePrint',
    }, {
        xtype: 'checkcolumn',
        disabled: true,
        header: '有老样',
        width: 100,
        dataIndex: 'srOutsource.hasSample',
    }, {
        xtype: 'checkcolumn',
        disabled: true,
        header: '船东指定',
        width: 100,
        dataIndex: 'srOutsource.ownerAppoint',
    }, {
        header: '附件',
        width: 50,
        dataIndex: 'srOutsource.aplAtt',
        renderer: 'renderAttachment'
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'srOutsource.aplComment',
    }, {
        header: '创建时间',
        dataIndex: 'srOutsource.createTime',
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
            return record.get('srOutsource.status') != '未提交';
        },
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: wipSrOutsourceStore,
        displayInfo: true,
    }
});
