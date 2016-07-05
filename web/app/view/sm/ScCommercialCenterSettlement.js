Ext.define('iFlat.view.sm.ScCommercialCenterSettlement', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sm-sccommercialcentersettlement',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: 'y',

    requires: [
        'iFlat.view.sm.ScCommercialCenterSettlementController'
    ],

    controller: 'sm-scsettlement',
    id: 'sm-sccommercialcentersettlement',

    items: [{
        xtype: 'container',
        margin: '0 15 0 15',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            id: 'sm-sccommercialcentersettlement-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
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
                        listeners: {
                            change: 'loadBusinessObjByTaskId'
                        },
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'scSettlement.id',
                        id: 'sm-sccommercialcentersettlement-id',
                        fieldLabel: 'ID',
                        hidden: true,
                        listeners: {
                            change: 'loadDetail'
                        }
                    }, {
                        xtype: 'textfield',
                        name: 'month',
                        hidden: true,
                        listeners: {
                            change: function (df, newValue, oldValue, eOpts) {
                                Ext.getCmp('sm-sccommercialcentersettlement-month')
                                    .setValue(Ext.Date.format(new Date(newValue), 'Y-m'));
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '年月',
                        id: 'sm-sccommercialcentersettlement-month',
                        format: 'Y-m',
                        width: 220,
                        editable: false
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '工号',
                        id: 'sm-sccommercialcentersettlement-projno',
                        name: 'projNo',
                        width: 230,
                        editable: false
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '工程名',
                        id: 'sm-sccommercialcentersettlement-projname',
                        name: 'projName',
                        width: 350,
                        editable: false
                    }, {
                        xtype: 'textfield',
                        name: 'status',
                        id: 'sm-sccommercialcentersettlement-status',
                        hidden: true,
                        editable: false
                    }, {
                        xtype: 'textfield',
                        name: 'attachment',
                        id: 'sm-sccommercialcentersettlement-attachment',
                        hidden: true,
                        editable: false,
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
                        id: 'sm-sccommercialcentersettlement-deptname',
                        name: 'deptName',
                        fieldLabel: '部门',
                        width: 220,
                        editable: false
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '施工队',
                        id: 'sm-sccommercialcentersettlement-team',
                        name: 'team',
                        width: 430,
                        editable: false
                    }, {
                        xtype: 'button',
                        text: '下载附件',
                        margin: '0 0 0 50',
                        hidden: true,
                        id: 'sm-sccommercialcentersettlement-down',
                        width: 100,
                    }, ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 10 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'mgrScore',
                        fieldLabel: '管理分',
                        editable: false,
                        width: 160,
                        editable: false
                    },{
                        xtype: 'textfield',
                        name: 'progressScore',
                        fieldLabel: '进度分',
                        editable: false,
                        width: 160,
                        editable: false
                    },{
                        xtype: 'textfield',
                        name: 'qualityScore',
                        fieldLabel: '质量分',
                        editable: false,
                        width: 160,
                        editable: false
                    },{
                        xtype: 'textfield',
                        name: 'safetyScore',
                        fieldLabel: '安全分',
                        editable: false,
                        width: 160,
                        editable: false
                    },{
                        xtype: 'textfield',
                        name: 'fineAmount',
                        fieldLabel: '扣款(元)',
                        editable: false,
                        width: 160,
                        editable: false
                    },]
                }, {
                    xtype: 'container',
                    type: 'hbox',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'comment',
                        fieldLabel: '备注',
                        width: 800,
                        editable: false
                    }]
                }, {
                    xtype: 'panel',
                    height: 200,
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'gridpanel',
                        width: '100%',
                        scrollable: true,
                        id: 'sm-sccommercialcentersettlement-detail',
                        store: smScCommercialCenterSettlementDetailStore = Ext.create('iFlat.store.sm.ScSettlementDetail'),
                        border: true,
                        columnLines: true,
                        plugins: [
                            Ext.create('Ext.grid.plugin.RowEditing', {
                                pluginId: 'sm-scsettlementedit-detail-edit',
                                clicksToMoveEditor: 1,
                                autoCancel: true,
                                listeners: {
                                    edit: 'updateDetail',
                                }
                            })
                        ],
                        columns: [{
                            header: '成本科目',
                            width: 200,
                            dataIndex: 'scSettlementDetail.account',
                        }, {
                            header: '内容',
                            width: 200,
                            dataIndex: 'scSettlementDetail.content',
                            cellWrap: true,
                        }, {
                            header: '单价',
                            dataIndex: 'scSettlementDetail.price',
                            editor: {
                                allowBlank: false,
                                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                                listeners: {
                                    change: 'calcAmount'
                                }
                            }
                        }, {
                            header: '金额',
                            dataIndex: 'scSettlementDetail.amount',
                            editor: {
                                allowBlank: false,
                                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                            }
                        }, {
                            header: '物量',
                            dataIndex: 'scSettlementDetail.matQty',
                            editor: {
                                allowBlank: false,
                                editable: false
                            }
                        }, {
                            header: '规格',
                            dataIndex: 'scSettlementDetail.spec',
                        }, {
                            header: '单位',
                            dataIndex: 'scSettlementDetail.unit',
                        }, {
                            header: '备注',
                            width: 150,
                            dataIndex: 'scSettlementDetail.comment',
                            cellWrap: true,
                        }],
                    }]
                }]
            }]
        }, {
            xtype: 'textarea',
            name: 'comment',
            id: 'sm-sccommercialcentersettlement-comment',
            labelAlign: 'top',
            fieldLabel: '审批意见',
            allowBlank: false,
            value: '',
            emptyText: '输入审批意见后，审批通过或退回结算申请'
        }],
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        id: 'sm-sccommercialcentersettlement-toolbar',
        items: [{
            xtype: 'button',
            text: '历史意见',
            ui: 'gray',
            handler: 'comment',
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