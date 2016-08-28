Ext.define('iFlat.view.xr.TrSettlementEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.xr-trsettlementedit',
    title: '技措技改/大修理结算单',
    layout: 'fit',
    modal: true,

    height: '95%',
    width: '95%',
    id: 'xr-trsettlementedit',
    controller: 'xr-trsettlement',
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
            id: 'xr-trsettlementedit-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    name: 'trSettlement.projNo',
                    id: 'xr-trsettlementedit-projno',
                    store: trSettlementEditComboStore = Ext.create('iFlat.store.xr.Project', {
                        proxy: {
                            extraParams: {
                                'xrProject.type': '技',
                                'xrProject.status': 0
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
                    //width: 300,
                    flex: 1,
                    fieldLabel: '工程',
                    listeners: {
                        select: 'onProjNoChange',
                    }
                }, {
                    xtype: 'combo',
                    id: 'xr-trsettlementedit-dept',
                    name: 'trSettlement.dept',
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    forceSelection : true,
                    width: 300,
                    labelWidth: 80,
                    fieldLabel: '承办部门',
                    bind: {
                        store: '{xrWorkshop}'
                    },
                    listeners: {
                        change: function (combo, newV, oldV, eOpts) {
                            trSettlementTeamStore.getProxy().extraParams['xrTeam.dept'] = newV;
                            trSettlementTeamStore.reload();
                        }
                    }
                }, {
                    xtype: 'combo',
                    id: 'xr-trsettlementedit-team',
                    name: 'trSettlement.team',
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    forceSelection : true,
                    anyMatch: true,
                    displayField: 'team',
                    valueField: 'team',
                    width: 300,
                    fieldLabel: '施工队',
                    store: trSettlementTeamStore = Ext.create('iFlat.store.xr.Team', {
                        autoLoad: false
                    }),
                    listeners: {
                        select: function (combo, record, eOpts) {
                            var type = record.get('xrTeam.type');
                            combo.up('window').down('textfield[name=trSettlement.isOutwork]').setValue(type != '本厂');
                            combo.up('window').down('textfield[name=trSettlement.teamCode]').setValue(record.get('xrTeam.teamCode'));
                            combo.up('window').down('textfield[name=trSettlement.deptCode]').setValue(record.get('xrTeam.deptCode'));
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.teamCode',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.deptCode',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.isOutwork',
                    hidden: true
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    id: 'xr-trsettlementedit-attachment',
                    name: 'trSettlement.attachment',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        change: 'onAttachmentChange'
                    }]
                }, {
                    xtype: 'textfield',
                    id: 'xr-trsettlementedit-projname',
                    name: 'trSettlement.projName',
                    fieldLabel: '船名',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.id',
                    id: 'xr-trsettlementedit-id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.status',
                    id: 'xr-trsettlementedit-status',
                    hidden: true,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            if (newValue === '未提交') {
                                Ext.getCmp('xr-trsettlementedit-toolbar').show();
                                Ext.getCmp('xr-trsettlementedit-uploadatt').show();
                                Ext.getCmp('xr-trsettlementedit-deleteatt').show();
                            } else {
                                Ext.getCmp('xr-trsettlementedit-toolbar').hide();
                                Ext.getCmp('xr-trsettlementedit-uploadatt').hide();
                                Ext.getCmp('xr-trsettlementedit-deleteatt').hide();
                            }
                        }
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    name: 'trSettlement.reason',
                    id: 'xr-trsettlementedit-reason',
                    fieldLabel: '无法内协原因',
                    flex: 1,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    name: 'trSettlement.comment',
                    id: 'xr-trsettlementedit-comment',
                    fieldLabel: '备注',
                    flex: 1,
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.teamName',
                    fieldLabel: '确认人',
                    width: 200,
                    listeners: {
                        change: function (textfield, newValue, oldValue, eOpts) {
                            var reg = new RegExp("^[0-9]*$");
                            if (reg.test(newValue)) {
                                Flat.util.mask();
                                Ext.Ajax.request({
                                    url: 'code_listCardInfo.action',
                                    method: 'post',
                                    params: {
                                        'cardInfo.cardFixNo': newValue
                                    },
                                    success: function(response, opts) {
                                        Flat.util.unmask();
                                        var o = Ext.JSON.decode(response.responseText)['list'];
                                        var acc = o[0]['empNo'];
                                        var name = o[0]['empName'];
                                        if (Flat.util.isEmpty(acc)) {
                                            textfield.nextSibling('textfield[name=trSettlement.teamAcc]').setValue('');
                                        } else {
                                            textfield.setValue(name);
                                            textfield.nextSibling('textfield[name=trSettlement.teamAcc]').setValue(acc);
                                        }
                                    },
                                    failure: function(response, opts) {
                                        Flat.util.unmask();
                                        Flat.util.tip(response.responseText);
                                        textfield.nextSibling('textfield[name=trSettlement.teamAcc]').setValue('');
                                    }
                                });
                            } else {
                                textfield.nextSibling('textfield[name=trSettlement.teamAcc]').setValue('');
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'trSettlement.teamAcc',
                    fieldLabel: '确认人',
                    editable: false,
                    hidden: true,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'xr-trsettlementedit-att',
                margin: '10 0 0 55',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'xr-trsettlementedit-link',
                    text: '下载附件',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    id: 'xr-trsettlementedit-deleteatt',
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
            id: 'xr-trsettlementedit-uploadatt',
            items: [{
                xtype: 'form',
                id: 'xr-trsettlementedit-upload',
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
                id: 'xr-trsettlementedit-detail',
                store: trSettlementDetailStore = Ext.create('iFlat.store.xr.TrSettlementDetl', {
                    autoLoad: false,
                }),
                border: true,
                columnLines: true,
                plugins: [
                    trSettlementDetailRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'xr-trsettlementedit-detail-edit',
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
                    id: 'xr-trsettlementedit-detail-add',
                    handler: 'addDetail'
                }],

                columns: [{
                    text: '删除',
                    width: 50,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    align: 'center',
                    iconCls: 'x-fa fa-close',
                    id: 'xr-trsettlementedit-detail-delete',
                    handler: 'deleteDetail',
                    editor: {
                        xtype: 'label'
                    }
                }, {
                    header: '施工内容',
                    flex: 1,
                    dataIndex: 'trSettlementDetl.content',
                    cellWrap: true,
                    editor: {
                        xtype: 'textarea',
                        allowBlank: false,
                    },
                }, {
                    header: '规格',
                    dataIndex: 'trSettlementDetl.specs',
                    editor: {
                    }
                }, {
                    header: '单位',
                    dataIndex: 'trSettlementDetl.unit',
                    editor: {
                    }
                }, {
                    header: '数量',
                    dataIndex: 'trSettlementDetl.applyQty',
                    editor: {
                        regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    }
                }, {
                    header: '备注',
                    width: 150,
                    dataIndex: 'trSettlementDetl.comment',
                    shrinkWrap: 1,
                    editor: {
                    }
                }, ],
            }]
        }],
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        id: 'xr-trsettlementedit-toolbar',
        hidden: true,
        items: [{
            xtype: 'button',
            text: '保存并提交',
            handler: 'saveAndSubmitTrSettlementEdit',
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