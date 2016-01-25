Ext.define('iFlat.view.report.cst.sr.SrProjectCost', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Pie',
        'Ext.chart.theme.Category2',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.theme.DefaultGradients',
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    listeners: {
        beforerender: 'onPanelRendered'
    },

    id: 'rpt-cst-sr-srprojectcost',
    controller: 'rpt-cst-sr-srprojectcost',
    items: [{
        xtype: 'treepanel',
        id: 'rpt-cst-sr-srprojectcost-tree',
        store: rptSrSrProjectCostNodeStore = Ext.create('iFlat.store.report.cst.sr.SrProjectCostNode'),
        border: true,
        useArrows: true,
        rootVisible: false,
        width: '25%',
        scrollable: true,
        listeners: {
            rowclick: 'onRowClick',
        }
    }, {
        xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        scrollable: true,
        width: '75%',
        items: [{
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'cartesian',
                reference: 'rpt-cst-sr-srprojectcost-barchart',
                theme: 'category2',
                width: '50%',
                height: 250,
                insetPadding: '50 20 30 20',
                sprites: [{
                    type: 'text',
                    text: '成本对比',
                    fontFamily: '微软雅黑',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    width: 100,
                    height: 30,
                    x: 20,
                    y: 30
                }],
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    fields: 'amountShort',
                    minimum: 0,
                    grid: true,
                    label: {
                        font: '13px 微软雅黑'
                    },
                }, {
                    type: 'category',
                    position: 'bottom',
                    label: {
                        font: '14px 微软雅黑'
                    },
                    fields: 'type',
                }],
                series: [{
                    type: 'bar',
                    title: '成本对比',
                    xField: 'type',
                    yField: 'amountShort',
                    style: {
                        opacity: 0.80,
                        minGapWidth: 20,
                    },
                    highlight: {
                        fillStyle: 'rgba(204, 230, 73, 1.0)',
                        strokeStyle: 'black',
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: 'onBarSeriesTooltipRender'
                    }
                }]
            }, {
                xtype: 'grid',
                id: 'rpt-cst-sr-srprojectcost-grid',
                border: true,
                columnLines: true,
                width: '50%',
                margin: '80 20 100 0',
                render: 'renderGrid',
                columns: [{
                    text: '类型',
                    width: 80,
                    align: 'center',
                    dataIndex: 'type',
                }, {
                    text: '金额',
                    width: 100,
                    dataIndex: 'amount',
                    align: 'right',
                    flex: 1,
                }, {
                    text: '毛利',
                    width: 100,
                    dataIndex: 'grossProfit',
                    align: 'right',
                    flex: 1,
                }, {
                    text: '毛利率',
                    width: 80,
                    dataIndex: 'profitMargin',
                    align: 'right',
                }, ]
            }]
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'polar',
                reference: 'rpt-cst-sr-projectcost-pie2',
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
                    angleField: 'actualPct',
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
        }]
    }]
});