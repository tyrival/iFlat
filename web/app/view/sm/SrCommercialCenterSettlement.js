Ext.define('iFlat.view.sm.SrCommercialCenterSettlement', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sm-srcommercialcentersettlement',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'iFlat.view.sm.SrCommercialCenterSettlementController',
        'iFlat.view.sm.temp.detail.SrSettlementFirstMain',
        'iFlat.view.sm.temp.detail.SrSettlementFirstMisc',
        'iFlat.view.sm.temp.detail.SrSettlementFirstSys',
    ],

    scrollable: 'true',
    maxHeight: 500,
    controller: 'sm-srcommercialcentersettlement',
    closeAction: 'hide',

    items: [{
        xtype: 'container',
        margin: '0 15 0 15',
        maxHeight: 500,
        width: '100%',
        scollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
                disabled: true
            },
            items: [{
                xtype: 'fieldset',
                title: '结算单',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        name: 'task.processInstanceId',
                        fieldLabel: 'processInstanceId',
                        hidden: true,
                        listeners: {
                            change: 'loadBusinessObjByTaskId'
                        },
                    }, {
                        xtype: 'textfield',
                        name: 'srSettlement.id',
                        fieldLabel: 'ID',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '工号',
                        name: 'projNo',
                        width: 230,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '船名',
                        name: 'projName',
                        width: 350,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '进度%',
                        name: 'progress',
                        width: 150,
                    }, {
                        xtype: 'textfield',
                        name: 'summaryAmount',
                        fieldLabel: '合计',
                        width: 160,
                    }, {
                        xtype: 'textfield',
                        name: 'laborAmount',
                        fieldLabel: '工程总价',
                        hidden: true,
                        listeners: {
                            change: 'loadOrigRecord'
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '易耗品补贴',
                        name: 'consumableAmount',
                        hidden: true,
                        listeners: {
                            change: 'loadOrigRecord'
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '绩效',
                        name: 'performanceAmount',
                        hidden: true,
                        listeners: {
                            change: 'loadOrigRecord'
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '材料费',
                        name: 'materialAmount',
                        hidden: true,
                        listeners: {
                            change: 'loadOrigRecord'
                        }
                    }, {
                        xtype: 'textfield',
                        name: 'type',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'status',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'attachment',
                        hidden: true,
                        listeners: {
                            change: 'onAttachmentChange'
                        },
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'deptName',
                        fieldLabel: '部门',
                        width: 230,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '施工队',
                        name: 'team',
                        width: 430,
                    }, {
                        xtype: 'button',
                        name: 'down',
                        text: '下载附件',
                        margin: '0 0 0 50',
                        hidden: true,
                        width: 100,
                    }, ]
                }, {
                    xtype: 'container',
                    type: 'hbox',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textarea',
                        name: 'comment',
                        fieldLabel: '备注',
                        width: '100%',
                    }]
                }]
            }]
        }, {
            xtype: 'panel',
            border: false,
            width: '100%',
            name: 'detail',
            height: 250,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'sm-detail-srsettlementfirstmain'
            }, {
                xtype: 'sm-detail-srsettlementfirstmisc'
            }, {
                xtype: 'sm-detail-srsettlementfirstsys'
            }, ]
        }, {
            xtype: 'form',
            name: 'amount',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '20 0 10 0',
                items: [{
                    xtype: 'textfield',
                    name: 'srSettlement.laborAmount',
                    fieldLabel: '工程总价',
                    allowBlank: false,
                    width: 210,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '易耗品补贴',
                    name: 'srSettlement.consumableAmount',
                    allowBlank: false,
                    labelWidth: 80,
                    width: 220,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '绩效',
                    name: 'srSettlement.performanceAmount',
                    allowBlank: false,
                    width: 210,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '材料费',
                    name: 'srSettlement.materialAmount',
                    allowBlank: false,
                    width: 210,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }]
            }, {
                xtype: 'textarea',
                name: 'comment',
                labelAlign: 'top',
                fieldLabel: '审批意见',
                allowBlank: false,
                width: '100%',
                value: '同意',
                emptyText: '输入审批意见后，审批通过或退回结算申请'
            }]
        }],
    }],
    
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        items: [{
            xtype: 'button',
            text: '历史意见',
            ui: 'gray',
            handler: 'showComment',
        }, '->', {
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