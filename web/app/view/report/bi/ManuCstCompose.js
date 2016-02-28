Ext.define('iFlat.view.report.bi.ManuCstCompose', {
    extend: 'Ext.window.Window',
    alias: 'widget.rpt-bi-manucstcompose',
    title: '加工费构成',
    layout: 'fit',
    modal: true,

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    id: 'rpt-bi-manucstcompose',
    controller: 'rpt-bi-projectmanucost',
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
        id: 'rpt-bi-manucstcompose-form',
        margin: 5,
        border: false,
        width: 700,
        items: [{
            xtype: 'grid',
            id: 'rpt-bi-manucstcompose-grid',
            plugins: [{
                ptype: 'gridexporter'
            }],
            border: true,
            columnLines: true,
            sortableColumns: false,
            flex: 1,  //开启竖向滚动条
            store: rptManuCstComposeStore = Ext.create('iFlat.store.report.bi.ProjectCostBalance', {
                filters: function(item) {
                    var name = item.get("name");
                    return name == "加工费." || name == "劳务工费" || name == "职工薪酬" || name == "制造费" || name == "动力费" || name == "外协费" || name == "外协包料";
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