Ext.define('iFlat.view.report.bi.AdditionalBill', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    controller: 'rpt-bi-additionalbill',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    tbar: [{
        xtype: 'combo',
        id: 'rpt-bi-additionalbill-combo',
        store: rptBiAdditionalBillComboStore = Ext.create('iFlat.store.bi.Project'),
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
        xtype: 'label',
        text: '金额单位： 万元',
        style: 'font-size: 16px'
    },'->',{
        text: '导出',
        handler: 'exportToExcel'
    }, {
        text: '刷新',
        handler: 'refresh'
    }],

    items: [{
        xtype: 'grid',
        id: 'rpt-bi-additionalbill-grid',
        plugins: [{
            ptype: 'gridexporter'
        }],
        margin: '10 0 0 0',
        border: true,
        columnLines: true,
        flex: 1,
        store: rptBiAdditionalBillGridStore = Ext.create('iFlat.store.report.bi.AdditionalBill'),
        features: [{
            ftype: 'summary',
            dock: 'bottom'
        }],
        columns: [{
            text: '项目',
            width: 250,
            locked: true,
            align: 'left',
            dataIndex: 'additionalBill.item',
            summaryType: 'count',
            summaryRenderer: 'summaryRenderer'
        }, {
            text: '设备（美元）',
            width: 130,
            align: 'right',
            dataIndex: 'additionalBill.deviceUsd',
            renderer: 'renderer',
            summaryType: 'sum',
            summaryRenderer: 'summaryRenderer'
        }, {
            text: '设备',
            width: 100,
            align: 'right',
            dataIndex: 'additionalBill.device',
            renderer: 'renderer',
            summaryType: 'sum',
            summaryRenderer: 'summaryRenderer'
        }, {
            text: '材料（美元）',
            width: 130,
            align: 'right',
            dataIndex: 'additionalBill.materialUsd',
            renderer: 'renderer',
            summaryType: 'sum',
            summaryRenderer: 'summaryRenderer'
        }, {
            text: '材料',
            width: 100,
            align: 'right',
            dataIndex: 'additionalBill.material',
            renderer: 'renderer',
            summaryType: 'sum',
            summaryRenderer: 'summaryRenderer'
        }, {
            text: '人工（美元）',
            width: 130,
            align: 'right',
            dataIndex: 'additionalBill.labourUsd',
            renderer: 'renderer',
            summaryType: 'sum',
            summaryRenderer: 'summaryRenderer'
        }, {
            text: '人工',
            width: 100,
            align: 'right',
            dataIndex: 'additionalBill.labour',
            renderer: 'renderer',
            summaryType: 'sum',
            summaryRenderer: 'summaryRenderer'
        }, {
            text: '总金额（美元）',
            width: 140,
            align: 'right',
            dataIndex: 'additionalBill.amountUsd',
            renderer: 'renderer',
            summaryType: 'sum',
            summaryRenderer: 'summaryRenderer'
        }, {
            text: '总金额',
            width: 100,
            align: 'right',
            dataIndex: 'additionalBill.amount',
            renderer: 'renderer',
            summaryType: 'sum',
            summaryRenderer: 'summaryRenderer'
        }, {
            text: '备注',
            width: 200,
            align: 'center',
            dataIndex: 'additionalBill.comment',
        }]
    }]
});