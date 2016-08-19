Ext.define('iFlat.view.xr.temp.SrSettlementApproveBatch', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xr-srsettlementapprovebatch',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: 'y',

    requires: [
        'iFlat.view.xr.temp.SrSettlementApproveBatchController',
    ],

    controller: 'xr-srsettlementapprovebatch',
    closeAction: 'hide',

    items: [{
        xtype: 'container',
        margin: '15 15 0 15',
        width: '100%',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                items: [{
                    xtype: 'textfield',
                    name: 'xrSrSettlement.projNo',
                    fieldLabel: '工号',
                    editable: false,
                    width: 180,
                }, {
                    xtype: 'textfield',
                    name: 'xrSrSettlement.projName',
                    fieldLabel: '船名',
                    editable: false,
                    width: 300,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '状态',
                    name: 'xrSrSettlement.status',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'task.processInstanceId',
                    fieldLabel: 'processInstanceId',
                    listeners: {
                        change: 'loadBusinessObjByTaskId'
                    },
                    hidden: true,
                }, ]
            }, {
                xtype: 'panel',
                border: false,
                width: '100%',
                name: 'detail',
                flex: 1,
                minHeight: 400,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'gridpanel',
                    width: '100%',
                    scrollable: true,
                    border: true,
                    columnLines: true,
                    store: Ext.create('iFlat.store.xr.SrSettlement', {
                        autoLoad: false,
                    }),

                    selModel: {
                        type: 'spreadsheet',
                        columnSelect: true,
                        checkboxSelect: true,
                        pruneRemoved: false,
                        extensible: 'y',
                    },

                    tbar: ['->', {
                        xtype: 'textfield',
                        name: 'summaryAmountFirst',
                        fieldLabel: '经营结算汇总',
                        labelAlign: 'right',
                        align: 'right',
                        width: 200,
                        labelWidth: 100,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'summaryAmountSecond',
                        fieldLabel: '实结汇总',
                        labelAlign: 'right',
                        align: 'right',
                        width: 200,
                        labelWidth: 80,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'summaryAmountDiff',
                        fieldLabel: '总盈亏',
                        labelAlign: 'right',
                        align: 'right',
                        width: 200,
                        labelWidth: 60,
                        editable: false,
                    }, {
                        text: '刷新',
                        handler: 'refresh',
                    }],

                    columns: [{
                        text: '详情',
                        width: 60,
                        menuDisabled: true,
                        xtype: 'actioncolumn',
                        align: 'center',
                        iconCls: 'x-fa fa-file-text-o',
                        handler: 'info',
                        editor: {
                            xtype: 'label',
                        }
                    }, {
                        header: '工号',
                        dataIndex: 'xrSrSettlement.projNo',
                        hidden: true,
                    }, {
                        header: '船名',
                        dataIndex: 'xrSrSettlement.projName',
                        hidden: true,
                    }, {
                        header: '工程队',
                        width: 220,
                        dataIndex: 'xrSrSettlement.team',
                    }, {
                        header: '用工部门',
                        width: 160,
                        dataIndex: 'xrSrSettlement.dept',
                    }, {
                        header: '经营部结算',
                        width: 120,
                        align: 'right',
                        dataIndex: 'xrSrSettlement.amountFirst',
                    }, {
                        header: '用工部门实结',
                        width: 120,
                        align: 'right',
                        dataIndex: 'xrSrSettlement.amountSecond',
                    }, {
                        header: '盈亏',
                        align: 'right',
                        dataIndex: 'xrSrSettlement.amountDiff',
                    }, {
                        header: '附件',
                        width: 80,
                        dataIndex: 'xrSrSettlement.attachment',
                        renderer: 'renderAttachment'
                    }, {
                        header: '超支审批',
                        width: 120,
                        dataIndex: 'xrSrSettlement.balApplAtt',
                        renderer: 'renderAttachment'
                    }, {
                        header: '备注',
                        width: 150,
                        dataIndex: 'xrSrSettlement.comment',
                        cellWrap: true,
                    }, {
                        header: '开单日期',
                        width: 150,
                        dataIndex: 'xrSrSettlement.createTime',
                        formatter: 'date("Y-m-d")',
                    }, {
                        header: '车间考核',
                        width: 80,
                        dataIndex: 'xrSrSettlement.score',
                    }, {
                        header: '意见',
                        width: 150,
                        dataIndex: 'xrSrSettlement.opinion',
                        cellWrap: true,
                    }],
                }]
            }, {
                xtype: 'textarea',
                name: 'comment',
                labelAlign: 'top',
                fieldLabel: '审批意见',
                allowBlank: false,
                width: '100%',
                value: '',
                emptyText: '输入审批意见后，审批通过或退回结算申请'
            }]
        }],
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        items: ['->', {
            xtype: 'button',
            text: '通过',
            width: 100,
            handler: 'completeTask',
        }, {
            xtype: 'button',
            ui: 'soft-red',
            text: '退回',
            width: 100,
            handler: 'completeTask',
        }]
    }],
});