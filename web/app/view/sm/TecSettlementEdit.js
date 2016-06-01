Ext.define('iFlat.view.sm.TecSettlementEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-tecsettlementedit',
    title: '技措技改/大修理/108结算单',
    layout: 'fit',
    modal: true,

    id: 'sm-tecsettlementedit',
    controller: 'sm-tecsettlement',
    closeAction: 'hide',
    items: [{
        xtype: 'container',
        margin: '15 15 0 15',
        maxHeight: 650,
        tecollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            id: 'sm-tecsettlementedit-form',
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
                    id: 'sm-tecsettlementedit-time',
                    width: 200,
                    listeners: {
                        change: function (df, newValue, oldValue, eOpts) {
                            Ext.getCmp('sm-tecsettlementedit-month')
                                .setValue(Ext.Date.format(newValue, 'Y-m-d'));
                        }
                    }
                }, {
                    xtype: 'combo',
                    name: 'tecSettlement.projNo',
                    id: 'sm-tecsettlementedit-projno',
                    store: smTecSettlementEditComboStore = Ext.create('iFlat.store.report.bi.Project', {
                        proxy: {
                            extraParams: {
                                'rptProject.type': '技',
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
                    id: 'sm-tecsettlementedit-team',
                    name: 'tecSettlement.team',
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    forceSelection : true,
                    anyMatch: true,
                    displayField: 'teamName',
                    valueField: 'teamName',
                    width: 300,
                    fieldLabel: '施工队',
                    store: smTecSettlementTeamStore = Ext.create('iFlat.store.code.Team'),
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    name: 'tecSettlement.mgrTecore',
                    fieldLabel: '管理分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'tecSettlement.progressTecore',
                    fieldLabel: '进度分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'tecSettlement.qualityTecore',
                    fieldLabel: '质量分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'tecSettlement.safetyTecore',
                    fieldLabel: '安全分',
                    value: 100,
                    width: 160,
                }, {
                    xtype: 'textfield',
                    name: 'tecSettlement.fineAmount',
                    fieldLabel: '扣款',
                    value: 0,
                    width: 160,
                }, ]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    id: 'sm-tecsettlementedit-attachment',
                    name: 'tecSettlement.attachment',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        change: 'onAttachmentChange'
                    }]
                }, {
                    xtype: 'textfield',
                    id: 'sm-tecsettlementedit-projname',
                    name: 'tecSettlement.projName',
                    fieldLabel: '船名',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    id: 'sm-tecsettlementedit-deptname',
                    name: 'tecSettlement.deptName',
                    fieldLabel: '部门',
                    listeners: {
                        change: function(textfield, newValue, oldValue, eOpts) {
                            smTecSettlementTeamStore
                                .getProxy().extraParams['team.deptName']
                                = newValue;
                            smTecSettlementTeamStore.reload();
                        }
                    },
                    hidden: true
                }, {
                    xtype: 'textfield',
                    id: 'sm-tecsettlementedit-month',
                    name: 'tecSettlement.month',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'tecSettlement.id',
                    id: 'sm-tecsettlementedit-id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'tecSettlement.status',
                    id: 'sm-tecsettlementedit-status',
                    hidden: true,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            if (newValue === '未提交') {
                                Ext.getCmp('sm-tecsettlementedit-toolbar').show();
                                Ext.getCmp('sm-tecsettlementedit-uploadatt').show();
                                Ext.getCmp('sm-tecsettlementedit-deleteatt').show();
                            } else {
                                Ext.getCmp('sm-tecsettlementedit-toolbar').hide();
                                Ext.getCmp('sm-tecsettlementedit-uploadatt').hide();
                                Ext.getCmp('sm-tecsettlementedit-deleteatt').hide();
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
                    name: 'tecSettlement.comment',
                    id: 'sm-tecsettlementedit-comment',
                    fieldLabel: '备注',
                    width: 800,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'sm-tecsettlementedit-att',
                margin: '10 0 0 55',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'sm-tecsettlementedit-link',
                    text: '下载附件',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    id: 'sm-tecsettlementedit-deleteatt',
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
            id: 'sm-tecsettlementedit-uploadatt',
            items: [{
                xtype: 'form',
                id: 'sm-tecsettlementedit-upload',
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
                tecrollable: true,
                id: 'sm-tecsettlementedit-detail',
                store: smTecSettlementDetailStore = Ext.create('iFlat.store.sm.TecSettlementDetail'),
                border: true,
                columnLines: true,
                plugins: [
                    smTecSettlementDetailRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'sm-tecsettlementedit-detail-edit',
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
                    id: 'sm-tecsettlementedit-detail-add',
                    handler: 'addDetail'
                }],

                columns: [{
                    text: '删除',
                    width: 50,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    align: 'center',
                    iconCls: 'x-fa fa-close',
                    id: 'sm-tecsettlementedit-detail-delete',
                    handler: 'deleteDetail',
                    editor: {
                        xtype: 'label'
                    }
                }, {
                    header: '内容',
                    width: 200,
                    dataIndex: 'tecSettlementDetail.content',
                    shrinkWrap: 1,
                    editor: {
                        allowBlank: false,
                    }
                }, {
                    header: '金额',
                    dataIndex: 'tecSettlementDetail.amount',
                    editor: {
                        allowBlank: false,
                    }
                }, {
                    header: '单价',
                    dataIndex: 'tecSettlementDetail.price',
                    editor: {
                    }
                }, {
                    header: '物量',
                    dataIndex: 'tecSettlementDetail.matQty',
                    editor: {
                    }
                }, {
                    header: '规格',
                    dataIndex: 'tecSettlementDetail.spec',
                    editor: {
                    }
                }, {
                    header: '单位',
                    dataIndex: 'tecSettlementDetail.unit',
                    editor: {
                    }
                }, {
                    header: '附件',
                    dataIndex: 'tecSettlementDetail.attachment',
                    renderer: 'renderAttachment',
                    hidden: true,
                    editor: {
                    }
                }, {
                    header: '备注',
                    width: 150,
                    dataIndex: 'tecSettlementDetail.comment',
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
        id: 'sm-tecsettlementedit-toolbar',
        hidden: true,
        items: [{
            xtype: 'button',
            text: '保存并提交',
            handler: 'saveAndSubmitTecSettlementEdit',
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