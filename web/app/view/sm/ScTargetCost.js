Ext.define('iFlat.view.sm.ScTargetCost', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-sctargetcost',

    requires: [
        'iFlat.view.sm.ScTargetCostController'
    ],

    controller: 'sm-sctargetcost',

    store: smScTargetCostStore = Ext.create('iFlat.store.sm.TargetCostVo', {
        proxy: {
            extraParams: {
                'targetCostVo.type': '钢结构'
            }
        }
    }),

    tbar: [{
        xtype: 'combo',
        id: 'sm-sctargetcost-combo',
        store: smScTargetCostComboStore = Ext.create('iFlat.store.report.bi.Project', {
            proxy: {
                extraParams: {
                    'rptProject.type': '钢结构',
                    'rptProject.status': 0,
                }
            }
        }),
        queryMode: 'local',
        allowBlank: false,
        editable: true,
        typeAhead: true,
        anyMatch: true,
        minChars: 0,
        forceSelection : true,
        displayField: 'name',
        valueField: 'projNo',
        width: 250,
        fieldLabel: '船名',
        labelAlign: 'right',
        labelWidth: 40
    }, {
        text: '查询',
        handler: 'search'
    }, {
        xtype: 'form',
        id: 'sm-sctargetcost-import',
        items: [{
            xtype: 'fileuploadfield',
            name: 'upload',
            buttonText: '选择...',
            width: 140,
            margin: '0 0 0 20',
        }, ]
    }, {
        xtype: 'button',
        text: '导入',
        ui: 'orig-blue',
        handler: 'uploadFile'
    }, '->', {
        text: '下载模板',
        id: 'bi-sctargetcost-template',
        handler: 'downloadTemplate'
    }, {
        text: '刷新',
        id: 'sm-sctargetcost-refresh',
        handler: 'refresh',
    }],

    columns: [{
        text: '分解',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'split',
    }, {
        header: 'id',
        dataIndex: 'targetCostVo.id',
        hidden: true
    }, {
        header: '工号',
        width: 150,
        dataIndex: 'targetCostVo.projNo',
    }, {
        header: '工程名',
        flex: true,
        dataIndex: 'targetCostVo.projName',
    }, {
        header: '成本科目代码',
        width: 200,
        dataIndex: 'targetCostVo.costAccount',
    }, {
        header: '成本科目',
        width: 200,
        dataIndex: 'targetCostVo.costAccountName',
    }, {
        header: '金额',
        width: 200,
        dataIndex: 'targetCostVo.amount',
    }, {
        header: '已分配',
        width: 200,
        dataIndex: 'targetCostVo.distribution',
    }],
});
