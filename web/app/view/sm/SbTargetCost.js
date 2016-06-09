Ext.define('iFlat.view.sm.SbTargetCost', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-sbtargetcost',

    requires: [
        'Ext.grid.plugin.Exporter',
        'iFlat.view.sm.SbTargetCostController'
    ],

    controller: 'sm-sbtargetcost',

    store: smSbProjectTargetCostStore = Ext.create('iFlat.store.sm.ProjectTargetCostVo', {
        proxy: {
            extraParams: {
                'projectTargetCostVo.type': '造船'
            }
        }
    }),

    tbar: [{
        xtype: 'combo',
        id: 'sm-sbtargetcost-combo',
        store: smSbTargetCostComboStore = Ext.create('iFlat.store.report.bi.Project', {
            proxy: {
                extraParams: {
                    'rptProject.type': '造船',
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
        id: 'sm-sbtargetcost-import',
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
        id: 'bi-sbtargetcost-template',
        handler: 'downloadTemplate'
    }, {
        text: '刷新',
        id: 'sm-sbtargetcost-refresh',
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
        dataIndex: 'projectTargetCostVo.id',
        hidden: true
    }, {
        header: '工号',
        width: 150,
        dataIndex: 'projectTargetCostVo.projNo',
    }, {
        header: '船名',
        flex: true,
        dataIndex: 'projectTargetCostVo.projName',
    }, {
        header: '金额',
        width: 200,
        dataIndex: 'projectTargetCostVo.amount',
    }, {
        header: '已分配',
        width: 200,
        dataIndex: 'projectTargetCostVo.distribution',
    }],
});
