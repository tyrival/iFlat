Ext.define('iFlat.view.sm.ScProjectTargetCost', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-sbprojecttargetcost',
    xtype: 'sm-sbprojecttargetcost',

    requires: [
        'iFlat.view.sm.ScProjectTargetCostController',
    ],

    controller: 'sm-sbprojecttargetcost',
    store: smScProjectTargetCostStore = Ext.create('iFlat.store.sm.ProjectTargetCostVo', {
        proxy: {
            extraParams: {
                'projectTargetCostVo.type': '造船'
            }
        }
    }),
    id: 'sm-sbprojecttargetcost',

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'sm-sbprojecttargetcost-combo',
            store: smScTargetCostComboStore = Ext.create('iFlat.store.report.bi.Project'),
            queryMode: 'local',
            allowBlank: false,
            editable: true,
            typeAhead: true,
            minChars: 0,
            forceSelection : true,
            displayField: 'name',
            valueField: 'projNo',
            width: 350,
            fieldLabel: '船名',
            labelAlign: 'right',
            labelWidth: 40
        }, {
            text: '查询',
            handler: 'search'
        }, {
            xtype: 'form',
            id: 'sm-scprojecttargetcost-import',
            items: [{
                xtype: 'fileuploadfield',
                name: 'upload',
                buttonText: '选择...',
                width: 300,
                margin: '0 0 0 20',
            }, ]
        }, {
            xtype: 'button',
            text: '导入',
            ui: 'orig-blue',
            handler: 'uploadFile'
        }, '->', {
            text: '下载模板',
            id: 'bi-scprojecttargetcost-template',
            handler: 'downloadTemplate'
        }, {
            text: '刷新',
            handler: 'refreshList',
        }],
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
        header: '工号',
        width: 120,
        dataIndex: 'projectTargetCostVo.projNo',
    }, {
        header: '船名',
        width: 350,
        dataIndex: 'projectTargetCostVo.projName',
    }, {
        header: '金额',
        width: 120,
        dataIndex: 'projectTargetCostVo.amount',
    }, {
        header: '已分配',
        width: 120,
        dataIndex: 'projectTargetCostVo.distribution',
    }],
});