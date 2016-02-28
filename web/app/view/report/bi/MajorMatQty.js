Ext.define('iFlat.view.report.bi.MajorMatQty', {
    extend: 'Ext.window.Window',
    alias: 'widget.rpt-bi-majormatqty',
    title: '主要材料用量',
    layout: 'fit',
    modal: true,

    id: 'rpt-bi-majormatqty',
    controller: 'rpt-bi-projectdevmatcost',
    closeAction: 'hide',
    y: 60,
    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    tbar: ['->',{
        text: '导出',
        handler: 'exportToExcel'
    }],

    items: {
        xtype: 'form',
        id: 'rpt-bi-majormatqty-form',
        margin: 5,
        border: false,
        width: 750,
        items: [{
            xtype: 'grid',
            id: 'rpt-bi-majormatqty-grid',
            plugins: [{
                ptype: 'gridexporter'
            }],
            border: true,
            columnLines: true,
            sortableColumns: false,
            flex: 1,  //开启竖向滚动条
            store: rptBiProjectMatQtyCost = Ext.create('iFlat.store.report.bi.MajorMatQty'),
            columns: [{
                text: '名称',
                flex: 1,
                align: 'center',
                dataIndex: 'name',
                renderer: 'cellWindowQtyRenderer'
            }, {
                text: '单位',
                width: 50,
                align: 'center',
                dataIndex: 'name',
                renderer: 'cellWindowQtyRenderer'
            }, {
                text: '托盘',
                width: 100,
                align: 'right',
                dataIndex: 'estimate',
                renderer: 'cellWindowQtyRenderer'
            }, {
                text: '订货',
                width: 110,
                align: 'right',
                dataIndex: 'purchase',
                renderer: 'cellWindowQtyRenderer'
            }, {
                text: '实际',
                width: 110,
                align: 'right',
                dataIndex: 'actual',
                renderer: 'cellWindowQtyRenderer'
            }, {
                text: '实际-托盘',
                width: 110,
                align: 'right',
                dataIndex: 'difference',
                renderer: 'cellWindowQtyRenderer'
            }, {
                text: '实际超托盘%',
                width: 120,
                align: 'right',
                dataIndex: 'diffPct',
                renderer: 'cellWindowQtyRenderer'
            }]
        }]
    },
    listeners: {
        beforeshow: 'beforeWindowShow',
    }
});