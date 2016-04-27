Ext.define('iFlat.view.sm.ScTargetCost', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-sctargetcost',

    requires: [
        'iFlat.view.sm.ScTargetCostController'
    ],

    controller: 'sm-sctargetcost',

    store: smScTargetCostStore = Ext.create('iFlat.store.sm.TargetCost', {
        proxy: {
            extraParams: {
                'targetCost.type': '钢结构'
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
    }, '->', {
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
        dataIndex: 'targetCost.id',
        hidden: true
    }, {
        header: '工号',
        width: 150,
        dataIndex: 'targetCost.projNo',
    }, {
        header: '船名',
        flex: true,
        dataIndex: 'targetCost.projName',
    }, {
        header: '部门',
        width: 200,
        dataIndex: 'targetCost.deptName',
    }, {
        header: '金额',
        width: 200,
        dataIndex: 'targetCost.amount',
    }],
});
