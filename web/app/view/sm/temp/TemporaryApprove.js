Ext.define('iFlat.view.sm.TemporaryApprove', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sm-temporaryapprove',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'iFlat.view.sm.TemporaryApproveController',
    ],

    scrollable: 'true',
    maxHeight: 500,
    controller: 'sm-temporaryapprove',
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
                        name: 'month',
                        fieldLabel: '月份',
                        width: 160,
                        format: 'Y-m'
                    }, {
                        xtype: 'textfield',
                        name: 'dept',
                        fieldLabel: '部门',
                        width: 160,
                    }, {
                        xtype: 'textfield',
                        name: 'amount',
                        fieldLabel: '合计',
                        width: 160,
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
                xtype: 'sm-detail-srsettlementfirstmain',
                //width: '100%',
                scrollable: true,
                border: true,
                columnLines: true,
                store: Ext.create('iFlat.store.sm.SrSettlementDetail'),

                tbar: ['->', {
                    text: '刷新',
                    handler: 'refresh',
                }],
                columns: [{
                    header: '施工队',
                    width: 180,
                    dataIndex: 'srSettlementDetail.team',
                }, {
                    header: '姓名',
                    dataIndex: 'srSettlementDetail.name',
                }, {
                    header: '工种',
                    dataIndex: 'srSettlementDetail.trades',
                }, {
                    header: '岗位工资标准',
                    dataIndex: 'srSettlementDetail.standard',
                }, {
                    header: '出勤天数',
                    dataIndex: 'srSettlementDetail.days',
                }, {
                    header: '绩效基数',
                    dataIndex: 'srSettlementDetail.ratio',
                }, {
                    header: '考核分',
                    dataIndex: 'srSettlementDetail.score',
                }, {
                    header: '实发绩效工资',
                    dataIndex: 'srSettlementDetail.salary',
                }, {
                    header: '补发（扣）工资',
                    dataIndex: 'srSettlementDetail.adjust',
                }, {
                    header: '实发薪资',
                    dataIndex: 'srSettlementDetail.summary',
                }, {
                    header: '备注',
                    width: 150,
                    dataIndex: 'srSettlementDetail.comment',
                    shrinkWrap: 1,
                }],
            }]
        }, {
            xtype: 'form',
            name: 'amount',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
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