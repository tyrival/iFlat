Ext.define('iFlat.view.report.wip.manhour.WoStatus', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    controller: 'rpt-wip-manhour-wostatus',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    tbar: [{
        xtype: 'combo',
        id: 'rpt-wip-manhour-wostatus-combo-projno',
        store: rptWipManhourWoStatusComboStore = Ext.create('iFlat.store.report.bi.Project'),
        queryMode: 'local',
        allowBlank: false,
        editable: true,
        forceSelection : true,
        displayField: 'name',
        valueField: 'projNo',
        width: 300,
        fieldLabel: '船名',
        labelAlign: 'right',
        labelWidth: 40,
        typeAhead: true,
        minChars: 0,
    }, {
        xtype: 'combo',
        id: 'rpt-wip-manhour-wostatus-combo-type',
        bind: {
            store: '{woType}',
        },
        editable: false,
        width: 150,
        fieldLabel: '类型',
        labelAlign: 'right',
        labelWidth: 40,
    }, {
        xtype: 'textfield',
        id: 'rpt-wip-manhour-wostatus-combo-wono',
        width: 200,
        fieldLabel: '派工单号',
        labelAlign: 'right',
        labelWidth: 60,
    }, {
        text: '查询',
        handler: 'search'
    },'->',{
        text: '导出',
        handler: 'exportToExcel'
    }, {
        text: '刷新',
        handler: 'refresh'
    }],

    items: [{
        xtype: 'grid',
        id: 'rpt-wip-manhour-wostatus-grid',
        plugins: [{
            ptype: 'gridexporter'
        }],
        margin: '10 0 0 0',
        border: true,
        columnLines: true,
        flex: 1,
        store: rptWipManhourWoStatusGridStore = Ext.create('iFlat.store.report.wip.manhour.WoStatus'),
        columns: [{
            text: '单号',
            width: 120,
            align: 'center',
            locked: true,
            dataIndex: 'woNo',
        }, {
            text: '内容',
            width: 300,
            align: 'left',
            dataIndex: 'description',
        }, {
            text: '主管审核',
            id: 'rpt-wip-manhour-wostatus-mgrconfirm',
            width: 80,
            align: 'center',
            dataIndex: 'mgrConfirm',
            renderer: 'columnRenderer'
        }, {
            text: '需结算',
            width: 80,
            align: 'center',
            dataIndex: 'balConfirm',
            renderer: 'columnRenderer'
        }, {
            text: '完工时间',
            id: 'rpt-wip-manhour-wostatus-hascomplete',
            width: 80,
            align: 'center',
            dataIndex: 'hasComplete',
            renderer: 'columnRenderer'
        }, {
            text: '已定额',
            width: 80,
            align: 'center',
            dataIndex: 'hasQuota',
            renderer: 'columnRenderer'
        }, {
            text: '定额工时',
            width: 80,
            align: 'center',
            dataIndex: 'quota',
        }, {
            text: '已反馈',
            id: 'rpt-wip-manhour-wostatus-hasactual',
            width: 80,
            align: 'center',
            dataIndex: 'hasActual',
            renderer: 'columnRenderer'
        }, {
            text: '已打印',
            width: 80,
            align: 'center',
            dataIndex: 'printed',
            renderer: 'columnRenderer'
        }, {
            text: '审核',
            width: 80,
            align: 'center',
            dataIndex: 'finalConfirm',
            renderer: 'columnRenderer'
        }, {
            text: '部门',
            width: 120,
            align: 'center',
            dataIndex: 'dept',
        }, {
            text: '施工队',
            width: 180,
            align: 'center',
            dataIndex: 'team',
        }, {
            text: '班组',
            width: 120,
            align: 'center',
            dataIndex: 'group',
        }, {
            text: '派工人员',
            width: 80,
            align: 'center',
            dataIndex: 'createUser',
        }, {
            text: '派工时间',
            width: 140,
            align: 'center',
            dataIndex: 'createTime',
            renderer: 'columnCreateTimeRenderer'
        }]
    }]
});