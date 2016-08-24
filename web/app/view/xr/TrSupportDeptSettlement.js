Ext.define('iFlat.view.xr.TrSupportDeptSettlement', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xr-trsupportdeptaettlement',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: 'y',
    width: '100%',

    requires: [
        'iFlat.model.xr.TrSettlement',
        'iFlat.view.xr.TrSupportDeptSettlementController',
    ],

    controller: 'xr-trsupportdeptaettlement',
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
                    id: 'xr-trsupportdeptaettlement-isoutwork',
                    name: 'trSettlement.isOutwork',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '状态',
                    name: 'trSettlement.status',
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
                width: '100%',
                items: [{
                    xtype: 'textfield',
                    name: 'trSettlement.reason',
                    fieldLabel: '无法内协原因',
                    editable: false,
                    width: '99%',
                }]
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
                    id: 'xr-trsupportdeptaettlement-down',
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
                    id: 'xr-srsettlementedit-detail',
                    store: trSupportDeptSettlementDetailStore = Ext.create('iFlat.store.xr.TrSettlementDetl'),
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
                        dataIndex: 'trSettlementDetl.content',
                        cellWrap: true,
                    }, {
                        header: '规格',
                        dataIndex: 'trSettlementDetl.specs',
                    }, {
                        header: '单位',
                        dataIndex: 'trSettlementDetl.unit',
                    }, {
                        header: '申请数量',
                        dataIndex: 'trSettlementDetl.applyQty',
                    }, {
                        header: '结算单位',
                        dataIndex: 'trSettlementDetl.settUnit',
                        editor: {
                            allowBlank: false,
                        }
                    }, {
                        header: '结算数量',
                        dataIndex: 'trSettlementDetl.settleQtyFirst',
                        editor: {
                            xtype: 'textfield',
                            id: 'xr-trsupportdeptaettlement-qty',
                            allowBlank: false,
                            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                            listeners: {
                                change: 'calcAmountFirst'
                            }
                        }
                    }, {
                        header: '结算单价',
                        dataIndex: 'trSettlementDetl.priceFirst',
                        editor: {
                            xtype: 'textfield',
                            id: 'xr-trsupportdeptaettlement-price',
                            allowBlank: false,
                            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                            listeners: {
                                change: 'calcAmountFirst'
                            }
                        }
                    }, {
                        header: '结算总价',
                        dataIndex: 'trSettlementDetl.amountFirst',
                        editor: {
                            xtype: 'textfield',
                            id: 'xr-trsupportdeptaettlement-amountfirst',
                            editable: false,
                        }
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
                width: '100%',
                items: [{
                    xtype: 'textfield',
                    name: 'trSettlement.amountFirst',
                    id: 'xr-trsupportdeptaettlement-amountfirst-act',
                    fieldLabel: '实际结算金额',
                    labelWidth: 120,
                    width: '30%',
                    regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                }, {
                    xtype: 'textfield',
                    id: 'xr-trsupportdeptaettlement-amountfirst-sum',
                    fieldLabel: '明细汇总',
                    labelWidth: 100,
                    editable: false,                    
                    width: '30%',
                }, {
                    xtype: 'button',
                    margin: '0 0 0 20',
                    id: 'xr-trsupportdeptaettlement-amountfirst-button',
                    text: '汇总计算',
                    handler: 'calcAmountFirstSum'
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