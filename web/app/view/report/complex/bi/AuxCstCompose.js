Ext.define('iFlat.view.report.complex.bi.AuxCstCompose', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rpt-complex-bi-auxcstcompose',

    requires: [
        'iFlat.view.report.complex.bi.AuxCstComposeController'
    ],

    controller: 'rpt-complex-bi-auxcstcompose',

    listeners: {
        render: 'init',
    },

    items: [{
        xtype: 'textfield',
        id: 'rpt-complex-bi-auxcstcompose-projno',
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
        store: rptComplexBiAuxCstComposeStore = Ext.create('iFlat.store.report.bi.ProjectCostBalance', {
            filters: function(item) {
                var name = item.get("name");
                return name == "专项费." || name == "设计费" || name == "检验费" || name == "销售费用" || name == "设备采购附加费" || name == "销售附加费" || name == "专项协作费" || name == "专项设备工装费" || name == "试航费用" || name == "其他费用" || name == "保修费用";
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
    }],

});