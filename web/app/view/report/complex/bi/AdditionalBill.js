Ext.define('iFlat.view.report.complex.bi.AdditionalBill', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rpt-complex-bi-additionalbill',

    requires: [
     'iFlat.view.report.complex.bi.AdditionalBillController'
    ],

    controller: 'rpt-complex-bi-additionalbill',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'init'
    },
    items: [{
        xtype: 'textfield',
        id: 'rpt-complex-bi-additionalbill-projno',
        hidden: true,
        listeners: {
            change: 'reload'
        }
    }, {
        xtype: 'grid',
        border: true,
        columnLines: true,
        flex: 1,
        store: rptComplexBiAdditionalBillGridStore = Ext.create('iFlat.store.report.bi.AdditionalBill'),
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