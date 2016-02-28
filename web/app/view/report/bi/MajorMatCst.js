Ext.define('iFlat.view.report.bi.MajorMatCst', {
    extend: 'Ext.window.Window',
    alias: 'widget.rpt-bi-majormatcst',
    title: '主要材料费用',
    layout: 'fit',
    modal: true,

    id: 'rpt-bi-majormatcst',
    controller: 'rpt-bi-projectdevmatcost',
    closeAction: 'hide',
    y: 60,
    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    tbar: [{
        xtype: 'label',
        text: '金额单位： 万元',
        style: 'font-size: 16px'
    },'->',{
        text: '导出',
        handler: 'exportToExcel'
    }],

    items: {
        xtype: 'form',
        id: 'rpt-bi-majormatcst-form',
        margin: 5,
        border: false,
        width: 700,
        items: [{
            xtype: 'grid',
            id: 'rpt-bi-majormatcst-grid',
            plugins: [{
                ptype: 'gridexporter'
            }],
            border: true,
            columnLines: true,
            sortableColumns: false,
            flex: 1,  //开启竖向滚动条
            store: rptBiProjectMatCstCost = Ext.create('iFlat.store.report.bi.MajorMatCst'),
            columns: [{
                text: '名称',
                flex: 1,
                align: 'center',
                dataIndex: 'name',
            }, {
                text: '报价',
                width: 100,
                align: 'right',
                dataIndex: 'estimate',
                renderer: 'cellWindowRenderer'
            }, {
                text: '目标',
                width: 100,
                align: 'right',
                dataIndex: 'target',
                renderer: 'cellWindowRenderer'
            }, {
                text: '实际',
                width: 100,
                align: 'right',
                dataIndex: 'actual',
                renderer: 'cellWindowRenderer'
            }, {
                text: '实际-目标',
                width: 100,
                align: 'right',
                dataIndex: 'difference',
                renderer: 'cellWindowRenderer'
            }, {
                text: '实际超目标百分比',
                width: 100,
                align: 'right',
                dataIndex: 'diffPct',
                renderer: 'cellWindowRenderer'
            }]
        }]
    },
    listeners: {
        beforeshow: 'beforeWindowShow',
    }
});