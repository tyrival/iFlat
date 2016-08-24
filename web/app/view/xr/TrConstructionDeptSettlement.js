Ext.define('iFlat.view.xr.TrConstructionDeptSettlement', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xr-trconstructiondeptaettlement',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: 'y',
    width: '100%',

    requires: [
        'iFlat.model.xr.TrSettlement',
        'iFlat.view.xr.TrConstructionDeptSettlementController',
    ],

    controller: 'xr-trconstructiondeptaettlement',
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
            id: 'xr-trconstructiondeptaettlement-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                width: '100%',
                items: [{
                    xtype: 'textfield',
                    name: 'trSettlement.projNo',
                    fieldLabel: '工号',
                    editable: false,
                    width: '20%',
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.projName',
                    fieldLabel: '船名',
                    editable: false,
                    width: '30%',
                }, {
                    xtype: 'textfield',
                    fieldLabel: '部门',
                    name: 'trSettlement.dept',
                    editable: false,
                    width: '20%',
                }, {
                    xtype: 'textfield',
                    fieldLabel: '施工队',
                    name: 'trSettlement.team',
                    editable: false,
                    width: '29%',
                }, {
                    xtype: 'textfield',
                    fieldLabel: '外包工',
                    id: 'xr-trconstructiondeptaettlement-isoutwork',
                    name: 'trSettlement.isOutwork',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '状态',
                    name: 'trSettlement.status',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'isQuota',
                    name: 'trSettlement.isQuota',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'isOutwork',
                    name: 'trSettlement.isOutwork',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'ID',
                    name: 'trSettlement.id',
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
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '开单日',
                    width: '22%',
                    editable: false,
                }, {
                    xtype: 'datefield',
                    name: 'trSettlement.createTime',
                    hidden: true,
                    format: 'Y-m-d',
                    listeners: {
                        change: function(df, newV, oldV) {
                            df.previousSibling("textfield").setValue(Ext.Date.format(newV, "Y年m月d日"));
                        }
                    }
                },{
                    xtype: 'textfield',
                    name: 'trSettlement.attachment',
                    hidden: true,
                    editable: false,
                    listeners: {
                        change: 'onAttachmentChange'
                    },
                }, {
                    xtype: 'button',
                    text: '下载附件',
                    margin: '0 0 0 100',
                    hidden: true,
                    id: 'xr-trconstructiondeptaettlement-down',
                    width: 100,
                }, ]
            }, {
                xtype: 'panel',
                border: false,
                width: '100%',
                name: 'detail',
                flex: 1,
                minHeight: 350,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'gridpanel',
                    width: '100%',
                    scrollable: true,
                    id: 'xr-trconstructiondeptaettlement-detail',
                    store: trConstructionDeptSettlementDetailStore = Ext.create('iFlat.store.xr.TrSettlementDetl'),
                    border: true,
                    columnLines: true,
                    plugins: [
                        Ext.create('Ext.grid.plugin.RowEditing', {
                            clicksToMoveEditor: 1,
                            autoCancel: true,
                            listeners: {
                                edit: 'updateDetail',
                            }
                        })
                    ],
                    columns: [{
                        header: '施工内容',
                        width: 200,
                        dataIndex: 'trSettlementDetl.adjustContent',
                        cellWrap: true,
                    }, {
                        header: '规格',
                        dataIndex: 'trSettlementDetl.specs',
                    }, {
                        header: '计量单位',
                        dataIndex: 'trSettlementDetl.unit',
                    }, {
                        header: '结算单位',
                        dataIndex: 'trSettlementDetl.settUnitSecond',
                        editor: {
                            allowBlank: false,
                        }
                    }, {
                        header: '结算单价',
                        dataIndex: 'trSettlementDetl.priceSecond',
                        editor: {
                            xtype: 'textfield',
                            id: 'xr-trconstructiondeptaettlement-pricesecond',
                            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                            listeners: {
                                change: 'calcAmountSecond'
                            }
                        }
                    }, {
                        header: '数量',
                        dataIndex: 'trSettlementDetl.settleQtySecond',
                        editor: {
                            xtype: 'textfield',
                            id: 'xr-trconstructiondeptaettlement-settleqtysecond',
                            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                            listeners: {
                                change: 'calcAmountSecond'
                            }
                        }
                    }, {
                        header: '系数',
                        dataIndex: 'trSettlementDetl.degree',
                        editor: {
                            xtype: 'textfield',
                            id: 'xr-trconstructiondeptaettlement-degree',
                            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                            listeners: {
                                change: 'calcAmountSecond'
                            }
                        }
                    }, {
                        header: '小计',
                        dataIndex: 'trSettlementDetl.amountSecond',
                        editor: {
                            xtype: 'textfield',
                            id: 'xr-trconstructiondeptaettlement-amountsecond',
                            editable: false,
                        }
                    }, {
                        header: '一级单位',
                        dataIndex: 'trSettlementDetl.settUnit',
                    }, {
                        header: '一级数量',
                        dataIndex: 'trSettlementDetl.settleQtyFirst',
                    }, {
                        header: '一级单价',
                        dataIndex: 'trSettlementDetl.priceFirst',
                    }, {
                        header: '一级小计',
                        dataIndex: 'trSettlementDetl.amountFirst',
                    }, {
                        header: '备注',
                        width: 150,
                        dataIndex: 'trSettlementDetl.comment',
                        shrinkWrap: 1,
                    }],
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '20 0 10 0',
                items: [{
                    xtype: 'form',
                    id: 'xr-trconstructiondeptaettlement-upload',
                    fieldDefaults: {
                        labelAlign: 'right',
                        labelWidth: 80,
                    },
                    items: [{
                        xtype: 'fileuploadfield',
                        fieldLabel: '超支审批表',
                        name: 'upload',
                        buttonText: '选择...',
                        width: 350,
                        margin: '0 10 0 0',
                    }]
                }, {
                    xtype: 'button',
                    text: '上传',
                    ui: 'orig-blue',
                    handler: 'uploadAttachment'
                }, {
                    xtype: 'textfield',
                    id: 'xr-trconstructiondeptaettlement-balapplatt',
                    name: 'trSettlement.balApplAtt',
                    hidden: true,
                    listeners: [{
                        change: 'onAttachmentChange2'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    id: 'xr-trconstructiondeptaettlement-att2',
                    margin: '0 0 0 55',
                    hidden: true,
                    items: [{
                        xtype: 'button',
                        id: 'xr-trconstructiondeptaettlement-link2',
                        text: '下载超支审批表',
                        margin: '0 5 0 0',
                        width: 140,
                    }, {
                        xtype: 'button',
                        id: 'xr-trconstructiondeptaettlement-deleteatt2',
                        ui: 'gray',
                        text: '删除',
                        handler: 'deleteAttachment'
                    }]
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '20 0 10 0',
                width: '100%',
                items: [{
                    xtype: 'textfield',
                    name: 'trSettlement.score',
                    id: 'xr-trconstructiondeptaettlement-score',
                    fieldLabel: '考核分',
                    labelWidth: 80,
                    allowBlank: false,
                    width: '20%',
                    regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    listeners: {
                        change: 'calcAmountSecondSum'
                    }
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.opinion',
                    fieldLabel: '意见',
                    labelWidth: 60,
                    allowBlank: false,
                    width: '79%',
                }, ]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '20 0 10 0',
                width: '100%',
                items: [{
                    xtype: 'textfield',
                    name: 'trSettlement.amountFirst',
                    id: 'xr-trconstructiondeptaettlement-amountfirst-act',
                    fieldLabel: '一级总额',
                    labelWidth: 80,
                    editable: false,
                    width: '30%',
                }, {
                    xtype: 'textfield',
                    id: 'xr-trconstructiondeptaettlement-amountsecond-sum',
                    fieldLabel: '二级明细汇总',
                    labelWidth: 100,
                    editable: false,
                    width: '30%',
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.amountSecond',
                    id: 'xr-trconstructiondeptaettlement-amountsecond-act',
                    fieldLabel: '二级实际金额',
                    labelWidth: 100,
                    editable: false,
                    width: '30%',
                }, {
                    xtype: 'button',
                    margin: '0 0 0 10',
                    id: 'xr-trconstructiondeptaettlement-amountsecond-button',
                    text: '汇总计算',
                    handler: 'calcAmountSecondSum'
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