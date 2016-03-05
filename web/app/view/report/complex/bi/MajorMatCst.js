Ext.define('iFlat.view.report.complex.bi.MajorMatCst', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-complex-bi-majormatcst',

    requires: [
        'iFlat.view.report.complex.bi.MajorMatCstController'
    ],

    listeners: {
        render: 'init',
    },

    items: [{
        xtype: 'textfield',
        id: 'rpt-complex-bi-majormatcst-projno',
        hidden: true,
        listeners: {
            change: 'reload'
        }
    }, {
        xtype: 'grid',
        plugins: [{
            ptype: 'gridexporter'
        }],
        border: true,
        columnLines: true,
        sortableColumns: false,
        flex: 1,  //开启竖向滚动条
        store: rptComplexBiMajorMatCstCost = Ext.create('iFlat.store.report.bi.MajorMatCst'),
        columns: [{
            text: '名称',
            flex: 1.5,
            align: 'center',
            dataIndex: 'name',
        }, {
            text: '报价',
            flex: 1,
            align: 'right',
            dataIndex: 'estimate',
            renderer: 'cellWindowRenderer'
        }, {
            text: '目标',
            flex: 1,
            align: 'right',
            dataIndex: 'target',
            renderer: 'cellWindowRenderer'
        }, {
            text: '实际',
            flex: 1,
            align: 'right',
            dataIndex: 'actual',
            renderer: 'cellWindowRenderer'
        }, {
            text: '实际-目标',
            flex: 1,
            align: 'right',
            dataIndex: 'difference',
            renderer: 'cellWindowRenderer'
        }, {
            text: '实际超目标百分比',
            flex: 1,
            align: 'right',
            dataIndex: 'diffPct',
            renderer: 'cellWindowRenderer'
        }]
    }]
});