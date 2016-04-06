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
                    store: smSbSettlementEditComboStore = Ext.create('iFlat.store.bi.Project'),
                    queryMode: 'local',
                    allowBlank: false,
                    editable: true,
                    typeAhead: true,
                    minChars: 0,
                    forceSelection : true,
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
                    displayField: 'teamName',
                    valueField: 'teamName',
                    width: 300,
                    fieldLabel: '施工队',
                    store: smSbSettlementTeamStore = Ext.create('iFlat.store.code.Team'),
                }]
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
                    xtype: 'textfield',
                    id: 'sm-sbsettlementedit-month',
                    name: 'sbSettlement.month',
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
                    handler: 'deleteDetail',
                }, {
                    header: '成本科目',
                    dataIndex: 'sbSettlementDetail.account',
                    editor: {
                        xtype: 'combo',
                        allowBlank: false,
                        store: smSbSettlementDetailComboStore = Ext.create('iFlat.store.sm.SbTargetCostAccount'),
                        queryMode: 'local',
                        editable: true,
                        forceSelection : true,
                        valueField : 'name',
                        displayField : 'name',
                    }
                }, {
                    header: '内容',
                    width: 200,
                    dataIndex: 'sbSettlementDetail.content',
                    editor: {
                        allowBlank: false,
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
                    editor: {
                    }
                }, {
                    header: '备注',
                    width: 150,
                    dataIndex: 'sbSettlementDetail.comment',
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