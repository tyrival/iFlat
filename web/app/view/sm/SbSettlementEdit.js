Ext.define('iFlat.view.sm.SbSettlementEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-sbsettlementedit',
    title: '造船结算单',
    layout: 'fit',
    modal: true,

    id: 'sm-sbsettlementedit',
    controller: 'sm-sbsettlement',
    closeAction: 'hide',
    items: [{
        xtype: 'container',
        margin: '15 15 0 15',
        maxHeight: 650,
        scollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            id: 'sm-sbsettlementedit-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'datefield',
                    allowBlank: false,
                    fieldLabel: '日期',
                    format: 'Y-m',
                    id: 'sm-sbsettlementedit-time',
                    width: 200,
                    listeners: {
                        change: function (df, newValue, oldValue, eOpts) {
                            Ext.getCmp('sm-sbsettlementedit-month')
                                .setValue(Ext.Date.format(newValue, 'Y-m-d'));
                        }
                    }
                }, {
                    xtype: 'combo',
                    name: 'sbSettlement.projNo',
                    id: 'sm-sbsettlementedit-projno',
                    store: smSbSettlementEditComboStore = Ext.create('iFlat.store.report.bi.Project', {
                        proxy: {
                            extraParams: {
                                'rptProject.type': '造船',
                                'rptProject.status': 0
                            }
                        }
                    }),
                    queryMode: 'local',
                    allowBlank: false,
                    editable: true,
                    typeAhead: true,
                    minChars: 0,
                    forceSelection : true,
                    anyMatch: true,
                    displayField: 'name',
                    valueField: 'projNo',
                    width: 300,
                    fieldLabel: '工程',
                    listeners: {
                        select: 'onProjNoChange',
                    }
                }, {
                    xtype: 'combo',
                    id: 'sm-sbsettlementedit-team',
                    name: 'sbSettlement.team',
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    forceSelection : true,
                    anyMatch: true,
                    displayField: 'teamName',
                    valueField: 'teamName',
                    width: 300,
                    fieldLabel: '施工队',
                    store: smSbSettlementTeamStore = Ext.create('iFlat.store.code.Team'),
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    name: 'sbSettlement.mgrScore',
                    fieldLabel: '管理分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'sbSettlement.progressScore',
                    fieldLabel: '进度分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'sbSettlement.qualityScore',
                    fieldLabel: '质量分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'sbSettlement.safetyScore',
                    fieldLabel: '安全分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'sbSettlement.fineAmount',
                    fieldLabel: '扣款(元)',
                    value: 0,
                    width: 160,
                }, ]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    id: 'sm-sbsettlementedit-attachment',
                    name: 'sbSettlement.attachment',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        change: 'onAttachmentChange'
                    }]
                }, {
                    xtype: 'textfield',
                    id: 'sm-sbsettlementedit-projname',
                    name: 'sbSettlement.projName',
                    fieldLabel: '船名',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    id: 'sm-sbsettlementedit-deptname',
                    name: 'sbSettlement.deptName',
                    fieldLabel: '部门',
                    listeners: {
                        change: function(textfield, newValue, oldValue, eOpts) {
                            smSbSettlementTeamStore
                                .getProxy().extraParams['team.deptName']
                                = newValue;
                            smSbSettlementTeamStore.reload();
                        }
                    },
                    hidden: true
                }, {
                    xtype: 'datefield',
                    id: 'sm-sbsettlementedit-month',
                    name: 'sbSettlement.month',
                    format: 'Y-m-d',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'sbSettlement.id',
                    id: 'sm-sbsettlementedit-id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'sbSettlement.status',
                    id: 'sm-sbsettlementedit-status',
                    hidden: true,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            if (newValue === '未提交') {
                                Ext.getCmp('sm-sbsettlementedit-toolbar').show();
                                Ext.getCmp('sm-sbsettlementedit-uploadatt').show();
                                Ext.getCmp('sm-sbsettlementedit-deleteatt').show();
                            } else {
                                Ext.getCmp('sm-sbsettlementedit-toolbar').hide();
                                Ext.getCmp('sm-sbsettlementedit-uploadatt').hide();
                                Ext.getCmp('sm-sbsettlementedit-deleteatt').hide();
                            }
                        }
                    }
                }]
            }, {
                xtype: 'container',
                type: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    name: 'sbSettlement.comment',
                    id: 'sm-sbsettlementedit-comment',
                    fieldLabel: '备注',
                    width: 800,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'sm-sbsettlementedit-att',
                margin: '10 0 0 55',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'sm-sbsettlementedit-link',
                    text: '下载附件',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    id: 'sm-sbsettlementedit-deleteatt',
                    hidden: true,
                    ui: 'gray',
                    text: '删除',
                    handler: 'deleteAttachment'
                }]
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '10 0 0 0',
            hidden: true,
            id: 'sm-sbsettlementedit-uploadatt',
            items: [{
                xtype: 'form',
                id: 'sm-sbsettlementedit-upload',
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 50,
                },
                items: [{
                    xtype: 'fileuploadfield',
                    fieldLabel: '附件',
                    name: 'upload',
                    buttonText: '选择...',
                    width: 300,
                    margin: '0 10 0 0',
                }]
            }, {
                xtype: 'button',
                text: '上传',
                ui: 'orig-blue',
                handler: 'uploadAttachment'
            }]
        }, {
            xtype: 'panel',
            height: 300,
            border: false,
            margin: '30 0 5 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'gridpanel',
                width: 800,
                scrollable: true,
                id: 'sm-sbsettlementedit-detail',
                store: smSbSettlementDetailStore = Ext.create('iFlat.store.sm.SbSettlementDetail'),
                border: true,
                columnLines: true,
                plugins: [
                    smSbSettlementDetailRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'sm-sbsettlementedit-detail-edit',
                        clicksToMoveEditor: 1,
                        autoCancel: true,
                        listeners: {
                            edit: 'updateDetail',
                            cancelEdit: 'deleteEmptyRecord',
                        }
                    })
                ],
                tbar: [{
                    xtype: 'button',
                    text: '新增',
                    ui: 'orig-blue',
                    id: 'sm-sbsettlementedit-detail-add',
                    handler: 'addDetail'
                }],

                columns: [{
                    text: '删除',
                    width: 50,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    align: 'center',
                    iconCls: 'x-fa fa-close',
                    id: 'sm-sbsettlementedit-detail-delete',
                    handler: 'deleteDetail',
                    editor: {
                        xtype: 'label'
                    }
                }, {
                    header: '成本代码',
                    width: 250,
                    dataIndex: 'sbSettlementDetail.account',
                    editor: {
                        xtype: 'combo',
                        allowBlank: false,
                        store: smSbSettlementDetailComboStore = Ext.create('iFlat.store.sm.TargetCostAccount', {
                            proxy: {
                                extraParams: {
                                    'targetCostAccount.type': '造船'
                                }
                            }
                        }),
                        queryMode: 'local',
                        editable: true,
                        anyMatch: true,
                        forceSelection : true,
                        valueField : 'code',
                        displayField : 'description',
                        listeners: {
                            change: function (combo, newValue, oldValue, eOpts) {
                                var v = combo.getStore().findRecord('code', newValue).get('name');
                                Ext.getCmp('sm-sbsettlementedit-detail-accountname').setValue(v);
                            }
                        }
                    }
                }, {
                    header: '成本科目',
                    width: 200,
                    dataIndex: 'sbSettlementDetail.accountName',
                    editor: {
                        id: 'sm-sbsettlementedit-detail-accountname',
                        editable: false,
                    }
                }, {
                    header: '金额',
                    dataIndex: 'sbSettlementDetail.amount',
                    editor: {
                        allowBlank: false,
                    }
                }, {
                    header: '单价',
                    dataIndex: 'sbSettlementDetail.price',
                    editor: {
                    }
                }, {
                    header: '物量',
                    dataIndex: 'sbSettlementDetail.matQty',
                    editor: {
                    }
                }, {
                    header: '规格',
                    dataIndex: 'sbSettlementDetail.spec',
                    editor: {
                    }
                }, {
                    header: '单位',
                    dataIndex: 'sbSettlementDetail.unit',
                    editor: {
                    }
                }, {
                    header: '附件',
                    dataIndex: 'sbSettlementDetail.attachment',
                    renderer: 'renderAttachment',
                    hidden: true,
                    editor: {
                    }
                }, {
                    header: '备注',
                    width: 150,
                    dataIndex: 'sbSettlementDetail.comment',
                    shrinkWrap: 1,
                    editor: {
                    }
                }],
            }]
        }],
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        id: 'sm-sbsettlementedit-toolbar',
        hidden: true,
        items: [{
            xtype: 'button',
            text: '保存并提交',
            handler: 'saveAndSubmitSbSettlementEdit',
        }, '->', {
            xtype: 'button',
            text: '保 存',
            handler: 'saveEdit',
        }]
    }],
    
    listeners: {
        close: 'editClose'
    }

});