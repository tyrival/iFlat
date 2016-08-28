Ext.define('iFlat.view.report.cst.sm.XrQuotaManhour', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rpt-cst-sm-xrquotamanhour',

    requires: [
        'iFlat.view.xr.SrSettlementController',
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'rpt-cst-sm-xrquotamanhour',
    columnLines: true,

    store: rptCstSmXrQuotaManhourStore = Ext.create('iFlat.store.xr.QuotaManhour', {
        autoLoad: false,
    }),

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'datefield',
            id: 'rpt-cst-sm-xrquotamanhour-from',
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
            id: 'rpt-cst-sm-xrquotamanhour-to',
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
        dataIndex: 'quotaManhour.projNo',
    }, {
        header: '船名',
        width: 150,
        dataIndex: 'quotaManhour.projName',
    }, {
        header: '部门',
        width: 120,
        dataIndex: 'quotaManhour.dept',
    }, {
        header: '工程队id',
        hidden: true,
        width: 100,
        dataIndex: 'quotaManhour.teamCode',
    }, {
        header: '工程队',
        width: 200,
        dataIndex: 'quotaManhour.team',
    }, {
        header: '工时',
        align: 'right',
        width: 100,
        dataIndex: 'quotaManhour.quota',
    }, {
        header: '开单时间',
        dataIndex: 'quotaManhour.createTime',
        formatter: 'date("Y-m-d")'
    }, {
        header: '结算时间',
        dataIndex: 'quotaManhour.settlementTime',
        formatter: 'date("Y-m-d")'
    }],
});
