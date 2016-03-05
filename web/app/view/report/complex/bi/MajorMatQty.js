Ext.define('iFlat.view.report.complex.bi.MajorMatQty', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-complex-bi-majormatqty',

    requires: [
        'iFlat.view.report.complex.bi.MajorMatQtyController'
    ],

    listeners: {
        render: 'init',
    },

    items: [{
        xtype: 'textfield',
        id: 'rpt-complex-bi-majormatqty-projno',
        hidden: true,
        listeners: {
            change: 'reload'
        }
    }, {
        xtype: 'grid',
        border: true,
        columnLines: true,
        sortableColumns: false,
        flex: 1,  //开启竖向滚动条
        store: rptComplexBiMajorMatQtyCost = Ext.create('iFlat.store.report.bi.MajorMatQty'),
        columns: [{
            text: '名称',
            flex: 1.5,
            align: 'center',
            dataIndex: 'name',
            renderer: 'cellWindowQtyRenderer'
        }, {
            text: '单位',
            flex: 0.5,
            align: 'center',
            dataIndex: 'name',
            renderer: 'cellWindowQtyRenderer'
        }, {
            text: '托盘',
            flex: 1,
            align: 'right',
            dataIndex: 'estimate',
            renderer: 'cellWindowQtyRenderer'
        }, {
            text: '订货',
            flex: 1,
            align: 'right',
            dataIndex: 'purchase',
            renderer: 'cellWindowQtyRenderer'
        }, {
            text: '实际',
            flex: 1,
            align: 'right',
            dataIndex: 'actual',
            renderer: 'cellWindowQtyRenderer'
        }, {
            text: '实际-托盘',
            flex: 1,
            align: 'right',
            dataIndex: 'difference',
            renderer: 'cellWindowQtyRenderer'
        }, {
            text: '实际超托盘%',
            flex: 1,
            align: 'right',
            dataIndex: 'diffPct',
            renderer: 'cellWindowQtyRenderer'
        }]
    }]
});