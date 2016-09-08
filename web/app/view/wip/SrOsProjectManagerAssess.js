Ext.define('iFlat.view.wip.SrOsProjectManagerAssess', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.wip-srosprojectmanagerassess',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: 'y',
    width: '100%',

    requires: [
        'iFlat.model.wip.SrOutsource',
        'iFlat.view.wip.SrOsProjectManagerAssessController',
    ],

    controller: 'wip-srosprojectmanagerassess',
    closeAction: 'hide',

    items: [{
        xtype: 'container',
        margin: '5 15 0 15',
        width: '100%',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 70,
            },
            items: [{
                xtype: 'fieldset',
                title: '修船外协申请',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 10 0',
                    width: '100%',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.projNo',
                        fieldLabel: '工号',
                        editable: false,
                        width: '20%',
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.projName',
                        fieldLabel: '船名',
                        editable: false,
                        width: '30%',
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '工程类别',
                        name: 'srOutsource.projType',
                        editable: false,
                        width: '29%',
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '施工部门',
                        name: 'srOutsource.dept',
                        editable: false,
                        width: '20%',
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '状态',
                        name: 'srOutsource.status',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'ID',
                        name: 'srOutsource.id',
                        id: 'wip-srosprojectmanagerassess-id',
                        hidden: true,
                        listeners: {
                         change: function (tf, newV, oldV) {
                                tf.up('form').down('textfield[name=srOsAssess.pid]').setValue(newV);
                            }
                         }
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
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 10 0',
                    width: '100%',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.name',
                        fieldLabel: '项目名称',
                        editable: false,
                        width: '99%',
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 10 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.capitalSource',
                        fieldLabel: '资金来源',
                        width: '25%',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.type',
                        fieldLabel: '外包类型',
                        width: '25%',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.matSource',
                        fieldLabel: '外包性质',
                        width: '25%',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '交货期',
                        width: '24%',
                        editable: false,
                    }, {
                        xtype: 'datefield',
                        name: 'srOutsource.tod',
                        hidden: true,
                        format: 'Y-m-d',
                        listeners: {
                            change: function(df, newV, oldV) {
                                df.previousSibling("textfield").setValue(Ext.Date.format(newV, "Y年m月d日"));
                            }
                        }
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 10 0',
                    width: '100%',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.aplAtt',
                        hidden: true,
                        editable: false,
                        listeners: {
                            change: 'onAttachmentChange'
                        },
                    }, {
                        xtype: 'button',
                        text: '下载申请附件',
                        margin: '0 0 0 75',
                        hidden: true,
                        id: 'wip-srosprojectmanagerassess-down',
                        width: 100,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.hasBluePrint',
                        hidden: true,
                        listeners: {
                            change: 'loadCheckbox'
                        }
                    }, {
                        xtype: 'checkbox',
                        fieldLabel: '有图纸',
                        margin: '0 0 0 50',
                        inputValue: true,
                        width: 130,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.hasSample',
                        hidden: true,
                        listeners: {
                            change: 'loadCheckbox'
                        }
                    }, {
                        xtype: 'checkbox',
                        fieldLabel: '有老样',
                        inputValue: true,
                        width: 130,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.ownerAppoint',
                        hidden: true,
                        listeners: {
                            change: 'loadCheckbox'
                        }
                    }, {
                        xtype: 'checkbox',
                        fieldLabel: '船东指定',
                        inputValue: true,
                        width: 130,
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 10 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.aplComment',
                        fieldLabel: '备注',
                        labelWidth: 70,
                        flex: 1,
                        editable: false,
                    }, ]
                }, {
                    xtype: 'panel',
                    border: false,
                    width: '100%',
                    name: 'detail',
                    flex: 1,
                    minHeight: 250,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'gridpanel',
                        width: '100%',
                        scrollable: true,
                        id: 'wip-srosprojectmanagerassess-detail',
                        store: srOsProjectManagerAssessDetailStore = Ext.create('iFlat.store.wip.SrOutsourceDetl'),
                        border: true,
                        columnLines: true,
                        columns: [{
                            header: '施工内容',
                            width: 300,
                            dataIndex: 'srOutsourceDetl.content',
                            cellWrap: true,
                        }, {
                            header: '规格',
                            width: 200,
                            dataIndex: 'srOutsourceDetl.specs',
                        }, {
                            header: '数量',
                            width: 200,
                            dataIndex: 'srOutsourceDetl.qty',
                        }, {
                            header: '备注',
                            flex: 1,
                            dataIndex: 'srOutsourceDetl.comment',
                            shrinkWrap: 1,
                        },],
                    }]
                }, ]
            }, {
                xtype: 'fieldset',
                title: '比价信息',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.bidNo',
                        fieldLabel: '开标编号',
                        width: '25%',
                        editable: false
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.bidType',
                        fieldLabel: '竞价方式',
                        width: '25%',
                        editable: false
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.vendor',
                        fieldLabel: '推荐供方',
                        width: '30%',
                        editable: false
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.vendorType',
                        fieldLabel: '供方性质',
                        width: '19%',
                        editable: false
                    }, ]

                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    width: '100%',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.targetCst',
                        fieldLabel: '目标成本',
                        width: '20%',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.bidAmountFirst',
                        fieldLabel: '报价金额',
                        width: '20%',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.bidAmountSecond',
                        fieldLabel: '结算金额',
                        width: '20%',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.bidLowest',
                        hidden: true,
                        listeners: {
                            change: 'loadCheckbox'
                        }
                    }, {
                        xtype: 'checkbox',
                        fieldLabel: '最低价中标',
                        labelWidth: 100,
                        inputValue: true,
                        width: '19%',
                    }, {
                        xtype: 'button',
                        text: '报价详情',
                        margin: '0 0 0 20',
                        handler: 'showBidding',
                    }]
                },  {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    width: '100%',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.bidComment',
                        fieldLabel: '备注',
                        width: '85%',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.bidAtt',
                        hidden: true,
                        editable: false,
                        listeners: {
                            change: 'onAttachmentChange2'
                        },
                    }, {
                        xtype: 'button',
                        text: '下载报价附件',
                        margin: '0 0 0 20',
                        hidden: true,
                        id: 'wip-srosprojectmanagerassess-down2',
                    }]
                }, ]
            }, {
                xtype: 'fieldset',
                title: '经营代表意见',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.saleOpinion',
                        fieldLabel: '经营代表意见',
                        labelWidth: 100,
                        flex: 1,
                        editable: false,
                    }, ]
                }, ]
            }, {
                xtype: 'fieldset',
                title: '资料信息',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.conComment',
                        fieldLabel: '备注',
                        width: '89%',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.contAtt',
                        hidden: true,
                        editable: false,
                        listeners: {
                            change: 'onAttachmentChange3'
                        },
                    }, {
                        xtype: 'button',
                        text: '下载资料附件',
                        margin: '0 0 0 10',
                        hidden: true,
                        id: 'wip-srosprojectmanagerassess-down3',
                    }, ]

                }]
            }, {
                xtype: 'fieldset',
                title: '完工信息',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.finishTime',
                        fieldLabel: '完工日期',
                        width: '25%',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.otReason',
                        width: '64%',
                        fieldLabel: '超期原因',
                        editable: false,
                    }, {
                        xtype: 'button',
                        width: '10%',
                        margin: '0 0 0 10',
                        text: '施工过程',
                        handler: 'showProcess'
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: '质检信息',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.inspResult',
                        width: '20%',
                        fieldLabel: '检验结果',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.inspComment',
                        width: '69%',
                        fieldLabel: '意见',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.inspAtt',
                        hidden: true,
                        editable: false,
                        listeners: {
                            change: 'onAttachmentChange4'
                        },
                    }, {
                        xtype: 'button',
                        text: '下载质检附件',
                        margin: '0 0 0 20',
                        hidden: true,
                        id: 'wip-srosprojectmanagerassess-down4',
                        width: 100,
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: '结算信息',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.contNo',
                        fieldLabel: '合同编号',
                        width: '33%',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.contDate',
                        fieldLabel: '合同日期',
                        width: '33%',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.contAmount',
                        width: '33%',
                        fieldLabel: '合同金额',
                        editable: false,
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.settAmountFirst',
                        width: '33%',
                        fieldLabel: '报价金额',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.settAmountSecond',
                        width: '33%',
                        fieldLabel: '结算金额',
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srOutsource.settAtt',
                        hidden: true,
                        editable: false,
                        listeners: {
                            change: 'onAttachmentChange5'
                        },
                    }, {
                        xtype: 'button',
                        text: '下载结算附件',
                        margin: '0 0 0 20',
                        hidden: true,
                        id: 'wip-srosprojectmanagerassess-down5',
                        width: 100,
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'srOutsource.settComment',
                        width: '99%',
                        fieldLabel: '备注',
                        editable: false,
                    }]
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '20 0 0 0',
                width: '100%',
                items: [{
                    xtype: 'textfield',
                    name: 'srOsAssess.pid',
                    fieldLabel: 'pid',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'srOsAssess.id',
                    fieldLabel: 'id',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'srOsAssess.description',
                    width: '79%',
                    fieldLabel: '考核评价',
                    allowBlank: false,
                }, {
                    xtype: 'textfield',
                    name: 'srOsAssess.fineAmount',
                    width: '20%',
                    fieldLabel: '分数',
                    regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
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
        items: [{
            xtype: 'button',
            text: '历史意见',
            ui: 'gray',
            handler: 'showComment',
        }, {
            xtype: 'button',
            text: '考核记录',
            ui: 'gray',
            handler: 'showAssess',
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