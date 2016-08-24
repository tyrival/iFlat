Ext.define('iFlat.view.xr.TrHrAudit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xr-trhraudit',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: 'y',
    width: '100%',

    requires: [
        'iFlat.model.xr.TrSettlement',
        'iFlat.view.xr.TrHrAuditController',
    ],

    controller: 'xr-trhraudit',
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
                    fieldLabel: '状态',
                    name: 'trSettlement.status',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'ID',
                    name: 'trSettlement.id',
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
                    width: '25%',
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
                    fieldLabel: '一级总额',
                    name: 'trSettlement.amountFirst',
                    labelWidth: 100,
                    width: '25%',
                    editable: false,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '二级总额',
                    name: 'trSettlement.amountSecond',
                    labelWidth: 100,
                    width: '25%',
                    editable: false,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '二级明细汇总',
                    labelWidth: 100,
                    id: 'xr-trhraudit-sum',
                    width: '24%',
                    editable: false,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                width: '100%',
                items: [{
                    xtype: 'textfield',
                    name: 'trSettlement.score',
                    fieldLabel: '考核分',
                    editable: false,
                    width: '20%',
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.opinion',
                    fieldLabel: '意见',
                    labelWidth: 60,
                    editable: false,
                    width: '79%',
                }, ]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                items: [{
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
                    margin: '0 0 0 56',
                    hidden: true,
                    id: 'xr-trhraudit-down',
                    width: 100,
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.balApplAtt',
                    hidden: true,
                    editable: false,
                    listeners: {
                        change: 'onAttachmentChange2'
                    },
                }, {
                    xtype: 'button',
                    text: '下载超支审批表',
                    margin: '0 0 0 56',
                    hidden: true,
                    id: 'xr-trhraudit-down2',
                    width: 140,
                }]
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
                    id: 'xr-trsettlementedit-detail',
                    store: trHrAuditDetailStore = Ext.create('iFlat.store.xr.TrSettlementDetl'),
                    border: true,
                    columnLines: true,

                    columns: [{
                        header: '施工内容',
                        width: 200,
                        dataIndex: 'trSettlementDetl.content',
                        cellWrap: true,
                    }, {
                        header: '规格',
                        dataIndex: 'trSettlementDetl.specs',
                    }, {
                        header: '计量单位',
                        dataIndex: 'trSettlementDetl.unit',
                    }, {
                        header: '二级结算单位',
                        dataIndex: 'trSettlementDetl.settUnitSecond',
                    }, {
                        header: '二级结算单价',
                        dataIndex: 'trSettlementDetl.priceSecond',
                    }, {
                        header: '二级数量',
                        dataIndex: 'trSettlementDetl.settleQtySecond',
                    }, {
                        header: '二级系数',
                        dataIndex: 'trSettlementDetl.degree',
                    }, {
                        header: '二级小计',
                        dataIndex: 'trSettlementDetl.amountSecond',
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