Ext.define('iFlat.view.sm.TecSettlement', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-tecsettlement',

    requires: [
        'iFlat.view.sm.TecSettlementController'
    ],

    controller: 'sm-tecsettlement',

    store: smTecSettlementStore = Ext.create('iFlat.store.sm.TecSettlement'),

    tbar: [{
        xtype: 'button',
        text: '新增',
        ui: 'orig-blue',
        id: 'sm-tecsettlement-add',
        handler: 'edit'
    }, '->', {
        text: '刷新',
        id: 'sm-tecsettlement-refresh',
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
            return record.get('tecSettlement.status') != '未提交';
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
        dataIndex: 'tecSettlement.status',
    }, {
        header: '月份',
        dataIndex: 'tecSettlement.month',
        formatter: 'date("Y-m")'
    }, {
        header: '工号',
        dataIndex: 'tecSettlement.projNo',
    }, {
        header: '项目名称',
        width: 150,
        dataIndex: 'tecSettlement.projName',
    }, {
        header: '部门',
        width: 120,
        dataIndex: 'tecSettlement.deptName',
    }, {
        header: '工程队',
        width: 200,
        dataIndex: 'tecSettlement.team',
    }, {
        header: '附件',
        width: 50,
        dataIndex: 'tecSettlement.attachment',
        renderer: 'renderAttachment'
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'tecSettlement.comment',
    }, {
        text: '删除',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'delete',
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('tecSettlement.status') != '未提交';
        },
    }],
});
