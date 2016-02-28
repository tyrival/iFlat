Ext.define('iFlat.view.report.bi.AuxCstCompose', {
    extend: 'Ext.window.Window',
    alias: 'widget.rpt-bi-auxcstcompose',
    title: '专项费构成',
    layout: 'fit',
    modal: true,

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    id: 'rpt-bi-auxcstcompose',
    controller: 'rpt-bi-projectauxcost',
    closeAction: 'hide',
    y: 60,
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
        id: 'rpt-bi-auxcstcompose-form',
        margin: 5,
        border: false,
        width: 700,
        items: [{
            xtype: 'grid',
            id: 'rpt-bi-auxcstcompose-grid',
            plugins: [{
                ptype: 'gridexporter'
            }],
            border: true,
            columnLines: true,
            sortableColumns: false,
            flex: 1,  //开启竖向滚动条
            store: rptAuxCstComposeStore = Ext.create('iFlat.store.report.bi.ProjectCostBalance', {
                filters: function(item) {
                    var name = item.get("name");
                    return name == "专项费." || name == "设计费" || name == "检验费" || name == "销售费用" || name == "设备采购附加费" || name == "销售附加费" || name == "专项协作费" || name == "专项设备工装费" || name == "试航费用" || name == "其他费用" || name == "保修费用";
                }
            }),
            columns: [{
                text: '名称',
                flex: 1,
                align: 'center',
                dataIndex: 'name',
                renderer: 'cellWindowRenderer'
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