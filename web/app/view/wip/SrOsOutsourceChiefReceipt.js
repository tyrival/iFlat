Ext.define('iFlat.view.wip.SrOsOutsourceChiefReceipt', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.wip-srosoutsourcechiefreceipt',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: 'y',
    width: '100%',

    requires: [
        'iFlat.model.wip.SrOutsource',
        'iFlat.view.wip.SrOsOutsourceChiefReceiptController',
    ],

    controller: 'wip-srosoutsourcechiefreceipt',
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
                        id: 'wip-srosoutsourcechiefreceipt-down',
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
                        id: 'wip-sroutsourceedit-detail',
                        store: srOsOutsourceChiefReceiptDetailStore = Ext.create('iFlat.store.wip.SrOutsourceDetl'),
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
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '20 0 0 0',
                width: '100%',
                items: [{
                    xtype: 'combo',
                    name: 'srOutsource.operatorAcc',
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    forceSelection : true,
                    minChars: 0,
                    displayField: 'userName',
                    valueField: 'account',
                    width: '30%',
                    fieldLabel: '外协员',
                    store: Ext.create('iFlat.store.system.UserRoleVo', {
                        proxy: {
                            extraParams: {
                                'userRoleVo.roleName': '修船外协员'
                            }
                        }
                    }),
                    listeners: {
                        select: function (cb, record) {
                            cb.nextSibling('textfield').setValue(record.get('userRoleVo.userName'));
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'srOutsource.operatorName',
                    hidden: true
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