Ext.define('iFlat.view.report.cst.sm.XrLaborExpense', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rpt-cst-sm-xrlaborexpense',

    requires: [
        'iFlat.view.xr.SrSettlementController',
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'rpt-cst-sm-xrlaborexpense',
    columnLines: true,

    store: rptCstSmXrLaborExpenseStore = Ext.create('iFlat.store.xr.LaborExpense', {
        autoLoad: false,
        proxy: {
            extraParams: {
                'laborExpense.status': '完成'
            }
        }
    }),

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'datefield',
            id: 'rpt-cst-sm-xrlaborexpense-from',
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
            id: 'rpt-cst-sm-xrlaborexpense-to',
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

    columns: [{
        header: '工号',
        dataIndex: 'laborExpense.projNo',
    }, {
        header: '船名',
        width: 150,
        dataIndex: 'laborExpense.projName',
    }, {
        header: '部门',
        width: 120,
        dataIndex: 'laborExpense.dept',
    }, {
        header: '工程队id',
        hidden: true,
        width: 100,
        dataIndex: 'laborExpense.teamCode',
    }, {
        header: '工程队',
        width: 200,
        dataIndex: 'laborExpense.team',
    }, {
        header: '一级结算金额',
        align: 'right',
        width: 100,
        dataIndex: 'laborExpense.amountFirst',
    }, {
        header: '二级结算金额',
        align: 'right',
        width: 100,
        dataIndex: 'laborExpense.amountSecond',
    }, {
        header: '开票金额（不含税）',
        align: 'right',
        width: 100,
        dataIndex: 'laborExpense.amountWithDiscount',
    }, {
        header: '盈亏',
        align: 'right',
        width: 100,
        dataIndex: 'laborExpense.amountDiff',
    }, {
        header: '开单时间',
        dataIndex: 'laborExpense.createTime',
        formatter: 'date("Y-m-d")'
    }, {
        header: '结算时间',
        dataIndex: 'laborExpense.settlementTime',
        formatter: 'date("Y-m-d")'
    }],
});
