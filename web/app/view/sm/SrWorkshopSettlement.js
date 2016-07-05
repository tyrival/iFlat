Ext.define('iFlat.view.sm.SrWorkshopSettlement', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sm-srworkshopsettlement',

    requires: [
        'iFlat.view.sm.SrWorkshopSettlementController',
        'iFlat.view.sm.temp.detail.SrSettlementSecondGrid',
        'iFlat.view.sm.temp.detail.SrSettlementSecondDetailSys'
    ],

    controller: 'sm-srworkshopsettlement',
    closeAction: 'hide',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: 'y',

    items: [{
        xtype: 'container',
        margin: '0 0 0 15',
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
                title: '一级结算单',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 10 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'deptName',
                        fieldLabel: '部门',
                        width: 230,
                        listeners: {
                            change: 'getBalanceOfDept'
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '施工队',
                        name: 'team',
                        width: 430,
                    }, {
                        xtype: 'button',
                        text: '下载附件',
                        name: 'down',
                        margin: '0 0 0 50',
                        hidden: true,
                        width: 100,
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
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '工号',
                        name: 'projNo',
                        width: 180,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '船名',
                        name: 'projName',
                        width: 310,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '进度%',
                        name: 'progress',
                        width: 150,
                    }, {
                        xtype: 'textfield',
                        name: 'balance',
                        fieldLabel: '可分配金额',
                        labelWidth: 120,
                        width: 250,
                    }, {
                        xtype: 'textfield',
                        name: 'task.processInstanceId',
                        fieldLabel: 'processInstanceId',
                        listeners: {
                            change: 'loadBusinessObjByTaskId',
                        },
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'id',
                        fieldLabel: 'taskId',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'srSettlement.id',
                        fieldLabel: 'ID',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'type',
                        hidden: true,
                        listeners: {
                            change: 'changeEleByType'
                        }
                    }, {
                        xtype: 'textfield',
                        name: 'status',
                        hidden: true,
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'laborAmount',
                        fieldLabel: '工程总价',
                        width: 170,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '易耗品补贴',
                        name: 'consumableAmount',
                        labelWidth: 80,
                        width: 180,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '绩效',
                        name: 'performanceAmount',
                        width: 170,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '材料费',
                        name: 'materialAmount',
                        width: 170,
                    }, {
                        xtype: 'textfield',
                        name: 'summaryAmount',
                        fieldLabel: '总计',
                        width: 200,
                    }]
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
                xtype: 'sm-detail-srsettlementsecondgrid'
            }, {
                xtype: 'sm-detail-srsettlementseconddetailsys'
            }]
        }, {
            xtype: 'form',
            name: 'approve',
            margin: '10 0 10 0',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                name: 'sysSecond',
                items: [{
                    xtype: 'textfield',
                    name: 'srSettlementSecond.id',
                    fieldLabel: 'Second.ID',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'srSettlementSecond.laborAmount',
                    fieldLabel: '工程总价',
                    allowBlank: true,
                    width: 180,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '易耗品补贴',
                    name: 'srSettlementSecond.consumableAmount',
                    allowBlank: true,
                    labelWidth: 80,
                    width: 200,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '绩效',
                    name: 'srSettlementSecond.performanceAmount',
                    allowBlank: true,
                    width: 180,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '材料费',
                    name: 'srSettlementSecond.materialAmount',
                    allowBlank: true,
                    width: 180,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }, {
                    xtype: 'label',
                    margin: '0 0 0 20',
                    padding: '10',
                    text: '合计： ',
                    style: 'font-weight: bold; text-align: right; font-size: 110%',
                    flex: 1
                }, {
                    xtype: 'label',
                    name: 'summaryAmountSecond',
                    padding: '10',
                    text: '0',
                    style: 'font-weight: bold; text-align: right; font-size: 110%',
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                name: 'assess',
                items: [{
                    xtype: 'textfield',
                    name: 'srSettlementSecond.mgrScore',
                    fieldLabel: '管理分',
                    value: 100,
                    allowBlank: true,
                    width: 150,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '进度分',
                    name: 'srSettlementSecond.progressScore',
                    value: 100,
                    allowBlank: true,
                    width: 150,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '质量分',
                    name: 'srSettlementSecond.qualityScore',
                    value: 100,
                    allowBlank: true,
                    width: 150,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '安全分',
                    name: 'srSettlementSecond.safetyScore',
                    value: 100,
                    allowBlank: true,
                    width: 150,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '扣款',
                    name: 'srSettlementSecond.fineAmount',
                    value: 0,
                    allowBlank: true,
                    width: 150,
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
                //height: 20,
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
        items: [{
            xtype: 'button',
            name: 'completeProcess',
            ui: 'soft-purple',
            text: '结束流程',
            width: 100,
            hidden: true,
            handler: 'completeProcess',
        }, {
            xtype: 'button',
            text: '历史意见',
            ui: 'gray',
            handler: 'showComment',
        }, '->', {
            xtype: 'button',
            text: '提交',
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