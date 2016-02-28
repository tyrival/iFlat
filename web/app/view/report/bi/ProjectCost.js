Ext.define('iFlat.view.report.bi.ProjectCost', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-bi-projectcost',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.theme.DefaultGradients',
        'Ext.chart.interactions.ItemHighlight'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        beforerender: 'onPanelRendered'
    },

    tbar: [{
        xtype: 'combo',
        id: 'rpt-bi-projectcost-combo',
        store: rptBiProjectCostComboStore = Ext.create('iFlat.store.bi.Project'),
        queryMode: 'local',
        allowBlank: false,
        editable: true,
        typeAhead: true,
        minChars: 0,
        forceSelection : true,
        displayField: 'name',
        valueField: 'projNo',
        width: 350,
        fieldLabel: '船名',
        labelAlign: 'right',
        labelWidth: 40
    }, {
        text: '查询',
        handler: 'search'
    }, {
        xtype: 'label',
        text: '金额单位： 万元',
        style: 'font-size: 16px'
    },
    '->',{
        text: '报价',
        handler: 'download'
    }, {
        text: '目标',
        handler: 'download'
    }, {
        text: '实际',
        handler: 'download'
    }],

    items: [{
        xtype: 'container',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'polar',
            reference: 'rpt-bi-projectcost-est',
            theme: 'default-gradients',
            width: 350,
            height: 350,
            insetPadding: 30,
            innerPadding: 20,
            /*legend: {
                docked: 'bottom'
            },*/
            interactions: ['rotate'],
            sprites: [{
                type: 'text',
                text: '报价成本',
                fontFamily: '微软雅黑',
                fontSize: '18px',
                fontWeight: 'bold',
                width: 100,
                height: 30,
                x: 20,
                y: 30
            }],
            series: [{
                type: 'pie',
                angleField: 'estimate',
                highlight: true,
                offsetY: 10,
                donut: 50,
                label: {
                    field: 'name',
                    renderer: 'pieRenderer',
                    fontFamily: '微软雅黑',
                    fontSize: '13px',
                    calloutLine: {
                        length: 20,
                        width: 3
                    }
                },
                tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
            }]
        }, {
            xtype: 'polar',
            reference: 'rpt-bi-projectcost-tar',
            theme: 'default-gradients',
            width: 350,
            height: 350,
            insetPadding: 30,
            innerPadding: 20,
            interactions: ['rotate'],
            sprites: [{
                type: 'text',
                text: '目标成本',
                fontFamily: '微软雅黑',
                fontSize: '18px',
                fontWeight: 'bold',
                width: 100,
                height: 30,
                x: 20,
                y: 30
            }],
            series: [{
                type: 'pie',
                angleField: 'target',
                highlight: true,
                offsetY: 10,
                donut: 50,
                label: {
                    field: 'name',
                    renderer: 'pieRenderer',
                    fontFamily: '微软雅黑',
                    fontSize: '13px',
                    calloutLine: {
                        length: 20,
                        width: 3
                    }
                },
                tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
            }]
        }, {
            xtype: 'polar',
            reference: 'rpt-bi-projectcost-act',
            theme: 'default-gradients',
            width: 350,
            height: 350,
            insetPadding: 30,
            innerPadding: 20,
            interactions: ['rotate'],
            sprites: [{
                type: 'text',
                text: '实际成本',
                fontFamily: '微软雅黑',
                fontSize: '18px',
                fontWeight: 'bold',
                width: 100,
                height: 30,
                x: 20,
                y: 30
            }],
            series: [{
                type: 'pie',
                angleField: 'actual',
                highlight: true,
                offsetY: 10,
                donut: 50,
                label: {
                    field: 'name',
                    renderer: 'pieRenderer',
                    fontFamily: '微软雅黑',
                    fontSize: '13px',
                    calloutLine: {
                        length: 20,
                        width: 3
                    }
                },
                tooltip: {
                    trackMouse: true,
                    renderer: 'onSeriesTooltipRender'
                }
            }]
        }]
    }, {
        xtype: 'grid',
        margin: '10 0 0 0',
        border: true,
        columnLines: true,
        sortableColumns: false,
        flex: 1,  //开启竖向滚动条
        store: rptBiProjectCostStore = Ext.create('iFlat.store.report.bi.ProjectCostBalance', {
            filters: function(item) {
                var name = item.get("name");
                return name == "销售收入" || name == "器材费" || name == "加工费" || name == "专项费" || name == "不可预见费" || name == "材料" || name == "设备" || name == "外协包料" || name == "器材费占比" || name == "加工费占比" || name == "专项费占比" || name == "总成本" || name == "毛利" || name == "毛利率";
            }
        }),
        columns: [{
            text: '名称',
            flex: true,
            align: 'center',
            dataIndex: 'name',
            renderer: 'cellRenderer'
        }, {
            text: '报价',
            width: 200,
            align: 'right',
            dataIndex: 'estimate',
            renderer: 'cellRenderer',
        }, {
            text: '目标',
            width: 200,
            align: 'right',
            dataIndex: 'target',
            renderer: 'cellRenderer'
        }, {
            text: '实际',
            width: 200,
            align: 'right',
            dataIndex: 'actual',
            renderer: 'cellRenderer'
        }, {
            text: '实际-目标',
            width: 200,
            align: 'right',
            dataIndex: 'difference',
            renderer: 'cellRenderer'
        }]
    }]
});