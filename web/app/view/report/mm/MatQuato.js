Ext.define('iFlat.view.report.mm.MatQuato', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    controller: 'rpt-mm-matquato',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    tbar: [{
        xtype: 'combo',
        id: 'rpt-mm-matquato-combo',
        store: rptMmMatQuatoComboStore = Ext.create('iFlat.store.report.bi.Project'),
        queryMode: 'local',
        allowBlank: false,
        editable: true,
        forceSelection : true,
        displayField: 'name',
        valueField: 'projNo',
        width: 370,
        fieldLabel: '船名',
        labelAlign: 'right',
        labelWidth: 40,
        typeAhead: true,
        minChars: 0,
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
        id: 'rpt-mm-matquato-grid',
        plugins: [{
            ptype: 'gridexporter'
        }],
        margin: '10 0 0 0',
        border: true,
        columnLines: true,
        flex: 1,
        store: rptMmMatQuatoGridStore = Ext.create('iFlat.store.report.mm.MatQuato'),
        columns: [{
            text: '物资分类',
            width: 80,
            align: 'center',
            locked: true,
            dataIndex: 'category',
        }, {
            text: '单位',
            width: 50,
            locked: true,
            align: 'center',
            dataIndex: 'unit',
        }, {
            text: '托盘限额',
            width: 100,
            align: 'right',
            dataIndex: 'palletQuato',
        }, {
            text: '补充限额',
            width: 100,
            align: 'right',
            dataIndex: 'additionalQuato',
        }, {
            text: '超出限额',
            columns: [{
                text: '设计原因',
                width: 100,
                align: 'right',
                dataIndex: 'design',
            }, {
                text: '物资原因',
                width: 100,
                align: 'right',
                dataIndex: 'material',
            }, {
                text: '施工原因',
                width: 100,
                align: 'right',
                dataIndex: 'construction',
            }, {
                text: '船东加帐',
                width: 100,
                align: 'right',
                dataIndex: 'shipowner',
            }, {
                text: '外协原因',
                width: 100,
                align: 'right',
                dataIndex: 'outSourcing',
            }, {
                text: '缺料件',
                width: 100,
                align: 'right',
                dataIndex: 'lack',
            }, {
                text: '小计',
                width: 100,
                align: 'right',
                dataIndex: 'subtotal',
            }, ]
        }, {
            text: '总限额',
            width: 100,
            align: 'right',
            dataIndex: 'totalQuato',
        }, {
            text: '实际领用',
            width: 100,
            align: 'right',
            dataIndex: 'requisition',
        }, {
            text: '限额进度',
            width: 100,
            align: 'right',
            dataIndex: 'progress',
            renderer: 'renderer'
        }]
    }]
});