Ext.define('iFlat.view.report.complex.bi.ManuCstCompose', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rpt-complex-bi-manucstcompose',

    requires: [
        'iFlat.view.report.complex.bi.ManuCstComposeController'
    ],

    controller: 'rpt-complex-bi-manucstcompose',

    listeners: {
        render: 'init',
    },

    items: [{
        xtype: 'textfield',
        id: 'rpt-complex-bi-manucstcompose-projno',
        hidden: true,
        listeners: {
            change: 'reload'
        }
    }, {
        xtype: 'grid',
        id: 'rpt-bi-manucstcompose-grid',
        plugins: [{
            ptype: 'gridexporter'
        }],
        border: true,
        columnLines: true,
        sortableColumns: false,
        flex: 1,  //开启竖向滚动条
        store: rptComplexBiManuCstComposeStore = Ext.create('iFlat.store.report.bi.ProjectCostBalance', {
            filters: function(item) {
                var name = item.get("name");
                return name == "加工费." || name == "劳务工费" || name == "职工薪酬" || name == "制造费" || name == "动力费" || name == "外协费" || name == "外协包料";
            }
        }),
        columns: [{
            text: '名称',
            flex: 1.5,
            align: 'center',
            dataIndex: 'name',
            renderer: 'cellWindowRenderer'
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