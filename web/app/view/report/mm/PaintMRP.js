Ext.define('iFlat.view.report.mm.PaintMRP', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    controller: 'rpt-mm-paintmrp',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    tbar: [{
        xtype: 'combo',
        id: 'rpt-mm-paintmrp-combo',
        store: rptMmPaintMRPComboStore = Ext.create('iFlat.store.report.bi.Project'),
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
        id: 'rpt-mm-paintmrp-grid',
        plugins: [{
            ptype: 'gridexporter'
        }],
        margin: '10 0 0 0',
        border: true,
        columnLines: true,
        flex: 1,
        store: rptMmPaintMRPGridStore = Ext.create('iFlat.store.report.mm.PaintMRP'),
        columns: [{
            text: '编码',
            width: 80,
            align: 'center',
            dataIndex: 'code',
        }, {
            text: '名称',
            width: 80,
            align: 'center',
            dataIndex: 'name',
        }, {
            text: '描述',
            width: 250,
            flex: true,
            align: 'left',
            dataIndex: 'description',
        }, {
            text: '单位',
            width: 50,
            align: 'center',
            dataIndex: 'unit',
        }, {
            text: '需求数量',
            width: 100,
            align: 'right',
            dataIndex: 'demand',
        }, {
            text: '已申请',
            width: 100,
            align: 'right',
            dataIndex: 'hasRequest',
        }, {
            text: '转入',
            width: 100,
            align: 'right',
            dataIndex: 'carryOver',
        }, {
            text: '转出',
            width: 100,
            align: 'right',
            dataIndex: 'delivery',
        }, {
            text: '可申请量',
            width: 100,
            align: 'right',
            dataIndex: 'rest',
        }, ]
    }]
});