Ext.define('iFlat.view.sm.ScSettlementEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-scsettlementedit',
    title: '钢结构结算单',
    layout: 'fit',
    modal: true,
    height: '95%',
    width: '95%',
    id: 'sm-scsettlementedit',
    controller: 'sm-scsettlement',
    closeAction: 'hide',
    items: [{
        xtype: 'container',
        padding: '15 15 0 15',
        scrollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            id: 'sm-scsettlementedit-form',
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
                    id: 'sm-scsettlementedit-time',
                    width: 200,
                    listeners: {
                        change: function (df, newValue, oldValue, eOpts) {
                            Ext.getCmp('sm-scsettlementedit-month')
                                .setValue(Ext.Date.format(newValue, 'Y-m-d'));
                        }
                    }
                }, {
                    xtype: 'combo',
                    name: 'scSettlement.projNo',
                    id: 'sm-scsettlementedit-projno',
                    store: smScSettlementEditComboStore = Ext.create('iFlat.store.report.bi.Project', {
                        proxy: {
                            extraParams: {
                                'rptProject.type': '钢结构',
                                'rptProject.status': 0
                            }
                        }
                    }),
                    queryMode: 'local',
                    allowBlank: false,
                    editable: true,
                    typeAhead: true,
                    anyMatch: true,
                    minChars: 0,
                    forceSelection : true,
                    displayField: 'name',
                    valueField: 'projNo',
                    flex: 1,
                    fieldLabel: '工程',
                    listeners: {
                        select: 'onProjNoChange',
                    }
                }, {
                    xtype: 'combo',
                    id: 'sm-scsettlementedit-team',
                    name: 'scSettlement.team',
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    anyMatch: true,
                    forceSelection : true,
                    displayField: 'teamName',
                    valueField: 'teamName',
                    width: 300,
                    fieldLabel: '施工队',
                    store: smScSettlementTeamStore = Ext.create('iFlat.store.code.Team'),
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    name: 'scSettlement.mgrScore',
                    fieldLabel: '管理分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'scSettlement.progressScore',
                    fieldLabel: '进度分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'scSettlement.qualityScore',
                    fieldLabel: '质量分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'scSettlement.safetyScore',
                    fieldLabel: '安全分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'scSettlement.fineAmount',
                    fieldLabel: '扣款',
                    value: 0,
                    flex: 1,
                }, ]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    id: 'sm-scsettlementedit-attachment',
                    name: 'scSettlement.attachment',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        change: 'onAttachmentChange'
                    }]
                }, {
                    xtype: 'textfield',
                    id: 'sm-scsettlementedit-projname',
                    name: 'scSettlement.projName',
                    fieldLabel: '船名',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    id: 'sm-scsettlementedit-deptname',
                    name: 'scSettlement.deptName',
                    fieldLabel: '部门',
                    listeners: {
                        change: function(textfield, newValue, oldValue, eOpts) {
                            smScSettlementTeamStore
                                .getProxy().extraParams['team.deptName']
                                = newValue;
                            smScSettlementTeamStore.reload();
                        }
                    },
                    hidden: true
                }, {
                    xtype: 'datefield',
                    id: 'sm-scsettlementedit-month',
                    name: 'scSettlement.month',
                    format: 'Y-m-d',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'scSettlement.id',
                    id: 'sm-scsettlementedit-id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'scSettlement.status',
                    id: 'sm-scsettlementedit-status',
                    hidden: true,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            if (newValue === '未提交') {
                                Ext.getCmp('sm-scsettlementedit-toolbar').show();
                                Ext.getCmp('sm-scsettlementedit-uploadatt').show();
                                Ext.getCmp('sm-scsettlementedit-deleteatt').show();
                            } else {
                                Ext.getCmp('sm-scsettlementedit-toolbar').hide();
                                Ext.getCmp('sm-scsettlementedit-uploadatt').hide();
                                Ext.getCmp('sm-scsettlementedit-deleteatt').hide();
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
                    name: 'scSettlement.comment',
                    id: 'sm-scsettlementedit-comment',
                    fieldLabel: '备注',
                    width: '100%',
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'sm-scsettlementedit-att',
                margin: '10 0 0 55',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'sm-scsettlementedit-link',
                    text: '下载附件',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    id: 'sm-scsettlementedit-deleteatt',
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
            id: 'sm-scsettlementedit-uploadatt',
            items: [{
                xtype: 'form',
                id: 'sm-scsettlementedit-upload',
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
            minHeight: 300,
            flex: 1,
            border: false,
            margin: '30 0 5 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'gridpanel',
                width: '100%',
                scrollable: true,
                id: 'sm-scsettlementedit-detail',
                store: smScSettlementDetailStore = Ext.create('iFlat.store.sm.ScSettlementDetail'),
                border: true,
                columnLines: true,
                plugins: [
                    smScSettlementDetailRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'sm-scsettlementedit-detail-edit',
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
                    id: 'sm-scsettlementedit-detail-add',
                    handler: 'addDetail'
                }],

                columns: [{
                    text: '删除',
                    width: 50,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    align: 'center',
                    iconCls: 'x-fa fa-close',
                    id: 'sm-scsettlementedit-detail-delete',
                    handler: 'deleteDetail',
                    editor: {
                        xtype: 'label'
                    }
                }, {
                    header: '成本代码',
                    width: 250,
                    dataIndex: 'scSettlementDetail.account',
                    editor: {
                        xtype: 'combo',
                        allowBlank: false,
                        store: smScSettlementDetailComboStore = Ext.create('iFlat.store.sm.TargetCostAccount'),
                        queryMode: 'local',
                        editable: true,
                        forceSelection : true,
                        valueField : 'code',
                        displayField : 'description',
                        listeners: {
                            change: function (combo, newValue, oldValue, eOpts) {
                                var v = combo.getStore().findRecord('code', newValue).get('name');
                                Ext.getCmp('sm-scsettlementedit-detail-accountname').setValue(v);
                            }
                        }
                    }
                }, {
                    header: '成本科目',
                    width: 200,
                    dataIndex: 'scSettlementDetail.accountName',
                    editor: {
                        id: 'sm-scsettlementedit-detail-accountname',
                        editable: false,
                    }
                }, {
                    header: '施工内容',
                    width: 200,
                    dataIndex: 'scSettlementDetail.content',
                    cellWrap: true,
                    editor: {
                        xtype: 'textarea',
                        allowBlank: false,
                    }
                }, {
                    header: '物量',
                    dataIndex: 'scSettlementDetail.matQty',
                    editor: {
                    }
                }, {
                    header: '规格',
                    dataIndex: 'scSettlementDetail.spec',
                    editor: {
                    }
                }, {
                    header: '单位',
                    dataIndex: 'scSettlementDetail.unit',
                    editor: {
                    }
                }, {
                    header: '单价',
                    dataIndex: 'scSettlementDetail.price',
                }, {
                    header: '金额',
                    dataIndex: 'scSettlementDetail.amount',
                }, {
                    header: '备注',
                    width: 150,
                    dataIndex: 'scSettlementDetail.comment',
                    cellWrap: true,
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
        id: 'sm-scsettlementedit-toolbar',
        hidden: true,
        items: [{
            xtype: 'button',
            text: '保存并提交',
            handler: 'saveAndSubmitScSettlementEdit',
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