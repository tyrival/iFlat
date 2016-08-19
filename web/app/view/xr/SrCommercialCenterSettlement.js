Ext.define('iFlat.view.xr.SrCommercialCenterSettlement', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xr-srcommercialcenteraettlement',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: 'y',
    width: '100%',

    requires: [
        'iFlat.model.xr.SrSettlement',
        'iFlat.view.xr.SrCommercialCenterSettlementController',
    ],

    controller: 'xr-srcommercialcenteraettlement',
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
                    name: 'xrSrSettlement.projNo',
                    fieldLabel: '工号',
                    editable: false,
                    width: '20%',
                }, {
                    xtype: 'textfield',
                    name: 'xrSrSettlement.projName',
                    fieldLabel: '船名',
                    editable: false,
                    width: '30%',
                }, {
                    xtype: 'textfield',
                    fieldLabel: '部门',
                    name: 'xrSrSettlement.dept',
                    editable: false,
                    width: '20%',
                }, {
                    xtype: 'textfield',
                    fieldLabel: '施工队',
                    name: 'xrSrSettlement.team',
                    editable: false,
                    width: '29%',
                }, {
                    xtype: 'textfield',
                    fieldLabel: '外包工',
                    id: 'xr-srcommercialcenteraettlement-isoutwork',
                    name: 'xrSrSettlement.isOutwork',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '状态',
                    name: 'xrSrSettlement.status',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'isQuota',
                    name: 'xrSrSettlement.isQuota',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'isOutwork',
                    name: 'xrSrSettlement.isOutwork',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'ID',
                    name: 'xrSrSettlement.id',
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
                    name: 'xrSrSettlement.createTime',
                    hidden: true,
                    format: 'Y-m-d',
                    listeners: {
                        change: function(df, newV, oldV) {
                            df.previousSibling("textfield").setValue(Ext.Date.format(newV, "Y年m月d日"));
                        }
                    }
                },{
                    xtype: 'textfield',
                    name: 'xrSrSettlement.attachment',
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
                    id: 'xr-srcommercialcenteraettlement-down',
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
                    store: srCommercialCenterSettlementDetailStore = Ext.create('iFlat.store.xr.SrSettlementDetl'),
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
                        header: '施工项目',
                        width: 120,
                        dataIndex: 'srSettlementDetl.code',
                        hidden: true,
                    }, {
                        xtype: 'checkcolumn',
                        width: 100,
                        disabled: true,
                        header: '以定额结算',
                        dataIndex: 'srSettlementDetl.isQuota',
                        editor: {
                            xtype: 'checkbox',
                            id: 'xr-srcommercialcenteraettlement-isquota',
                            disabled: true
                        }
                    }, {
                        header: '施工内容',
                        width: 200,
                        dataIndex: 'srSettlementDetl.adjustContent',
                        cellWrap: true,
                    }, {
                        header: '分类',
                        dataIndex: 'srSettlementDetl.category',
                    }, {
                        header: '规格',
                        dataIndex: 'srSettlementDetl.specs',
                    }, {
                        header: '单位',
                        dataIndex: 'srSettlementDetl.unit',
                    }, {
                        header: '总定额',
                        dataIndex: 'srSettlementDetl.quota',
                        editor: {
                            xtype: 'textfield',
                            id: 'xr-srcommercialcenteraettlement-quota',
                            editable: false,
                        }
                    }, {
                        header: '数量',
                        dataIndex: 'srSettlementDetl.adjustQty',
                        editor: {
                            xtype: 'textfield',
                            id: 'xr-srcommercialcenteraettlement-adjustqty',
                            editable: false,
                        }
                    }, {
                        header: '系数',
                        dataIndex: 'srSettlementDetl.degree',
                        editor: {
                            xtype: 'textfield',
                            id: 'xr-srcommercialcenteraettlement-degree',
                            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                            listeners: {
                                change: 'calcAmountFirst'
                            }
                        }
                    }, {
                        header: '结算单价',
                        dataIndex: 'srSettlementDetl.priceFirst',
                        editor: {
                            xtype: 'textfield',
                            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                            listeners: {
                                change: 'calcAmountFirst'
                            }
                        }
                    }, {
                        header: '一级总价',
                        dataIndex: 'srSettlementDetl.amountFirst',
                        editor: {
                            xtype: 'textfield',
                            id: 'xr-srcommercialcenteraettlement-amountfirst',
                            editable: false,
                        }
                    }, {
                        header: '备注',
                        width: 150,
                        dataIndex: 'srSettlementDetl.comment',
                        shrinkWrap: 1,
                    }, {
                        header: '单位定额',
                        dataIndex: 'srSettlementDetl.quotaUnit',
                        hidden: true,
                    }, ],
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '20 0 10 0',
                width: '100%',
                items: [{
                    xtype: 'textfield',
                    name: 'xrSrSettlement.amountFirst',
                    id: 'xr-srcommercialcenteraettlement-amountfirst-act',
                    fieldLabel: '实际结算金额',
                    labelWidth: 120,
                    width: '30%',
                    regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                }, {
                    xtype: 'textfield',
                    id: 'xr-srcommercialcenteraettlement-amountfirst-sum',
                    fieldLabel: '明细汇总',
                    labelWidth: 100,
                    editable: false,                    
                    width: '30%',
                }, {
                    xtype: 'button',
                    margin: '0 0 0 20',
                    id: 'xr-srcommercialcenteraettlement-amountfirst-button',
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