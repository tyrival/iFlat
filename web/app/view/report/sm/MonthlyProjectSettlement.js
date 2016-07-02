Ext.define('iFlat.view.report.sm.MonthlyProjectSettlement', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-sm-monthlyprojectsettlement',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'datefield',
            allowBlank: false,
            fieldLabel: '月份',
            labelAlign: 'right',
            format: 'Y-m',
            id: 'rpt-sm-monthlyprojectsettlement-time',
            labelWidth: 60,
            width: 200,
            listeners: {
                change: function (df, newValue, oldValue, eOpts) {
                    Ext.getCmp('rpt-sm-monthlyprojectsettlement-month')
                        .setValue(Ext.Date.format(newValue, 'Y-m-d'));
                }
            }
        }, {
            xtype: 'textfield',
            id: 'rpt-sm-monthlyprojectsettlement-month',
            hidden: true,
        }, {
            xtype: 'combo',
            id: 'rpt-sm-monthlyprojectsettlement-projno',
            store: rptSmMonthlyProjectSettlementProjectStore = Ext.create('iFlat.store.report.bi.Project'),
            queryMode: 'local',
            allowBlank: false,
            editable: true,
            typeAhead: true,
            minChars: 0,
            forceSelection : true,
            anyMatch: true,
            displayField: 'name',
            labelAlign: 'right',
            labelWidth: 60,
            valueField: 'projNo',
            width: 300,
            fieldLabel: '工程',
            listeners: {
                select: 'onProjNoChange',
            }
        }, {
            xtype: 'textfield',
            id: 'rpt-sm-monthlyprojectsettlement-type',
            hidden: true,
        }, {
            xtype: 'combo',
            id: 'rpt-sm-monthlyprojectsettlement-dept',
            queryMode: 'local',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 220,
            fieldLabel: '部门',
            labelAlign: 'right',
            labelWidth: 60,
            bind: {
                store: '{smDept}'
            },
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

    items: [{
        xtype: 'grid',
        id: 'rpt-sm-monthlyprojectsettlement-grid1',
        plugins: [{
            ptype: 'gridexporter'
        }],
        margin: '10 0 0 0',
        border: true,
        columnLines: true,
        flex: 1,
        store: rptSmMonthlyProjectSettlementStore = Ext.create('iFlat.store.report.sm.MonthlyProjectSettlement'),
        columns: [{
            header: '月份',
            dataIndex: 'monthlyProjectSettlement.month',
        }, {
            header: '工号',
            dataIndex: 'monthlyProjectSettlement.projNo',
        }, {
            header: '船名',
            dataIndex: 'monthlyProjectSettlement.projName',
        }, {
            header: '部门',
            dataIndex: 'monthlyProjectSettlement.dept',
        }, {
            header: '施工队',
            dataIndex: 'monthlyProjectSettlement.team',
        }, {
            header: '工费',
            align: 'right',
            dataIndex: 'monthlyProjectSettlement.labor',
        }, {
            header: '绩效',
            align: 'right',
            dataIndex: 'monthlyProjectSettlement.performance',
        }, {
            header: '易耗品补贴',
            align: 'right',
            dataIndex: 'monthlyProjectSettlement.consumable',
        }, {
            header: '材料费',
            align: 'right',
            dataIndex: 'monthlyProjectSettlement.material',
        }, {
            text: '合计',
            align: 'right',
            dataIndex: 'monthlyProjectSettlement.summary',
        }, {
            header: '开票金额（不含税）',
            align: 'right',
            dataIndex: 'monthlyProjectSettlement.invoice',
        }, {
            header: '扣款',
            align: 'right',
            dataIndex: 'monthlyProjectSettlement.fine',
        }]
    }]
});