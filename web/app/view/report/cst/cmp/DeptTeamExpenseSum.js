Ext.define('iFlat.view.report.cst.cmp.DeptTeamExpenseSum', {
    extend: 'Ext.pivot.Grid',
    controller: 'rpt-cst-cmp-deptteamexpensesum',

    requires: [
        'iFlat.view.report.cst.cmp.DeptTeamExpenseSumController',
        'Ext.pivot.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'pivotexporter'
    }],

    collapsible: true,
    multiSelect: true,

    store: rptCstCmpDeptTeamExpenseSum = Ext.create('iFlat.store.report.cst.cmp.DeptTeamExpense', {
        'deptTeamExpense.status': '完成'
    }),
    selModel: {
        type: 'rowmodel'
    },

    viewLayoutType: 'outline',

    startRowGroupsCollapsed: false,
    textGrandTotalTpl: '总计',
    aggregate: [{
        dataIndex:  'deptTeamExpense.amountSecond',
        header:     '小计',
        aggregator: 'sum',
        width:      90
    }],

    leftAxis: [{
        dataIndex:  'deptTeamExpense.dept',
        header:     '部门',
        width:      120
    },{
        dataIndex:  'deptTeamExpense.team',
        header:     '队伍',
        sortable:   false,
        width:      200
    }],

    topAxis: [{
        dataIndex:  'deptTeamExpense.month',
        header:     '月份'
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'datefield',
            id: 'rpt-cst-cmp-deptteamexpensesum-from',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 200,
            fieldLabel: '起始时间',
            labelAlign: 'right',
            labelWidth: 60,
            format: 'Y-m-d'
        }, {
            xtype: 'datefield',
            id: 'rpt-cst-cmp-deptteamexpensesum-to',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 200,
            fieldLabel: '截止时间',
            labelAlign: 'right',
            labelWidth: 60,
            format: 'Y-m-d'
        }, {
            text: '查询',
            ui: 'orig-blue',
            handler: 'search'
        }, '->', {
            text: '导出',
            handler: 'exportToExcel'
        }, {
            text: '刷新',
            handler: 'refresh'
        }],
    }],
});