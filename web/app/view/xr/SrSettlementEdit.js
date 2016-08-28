Ext.define('iFlat.view.xr.SrSettlementEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.xr-srsettlementedit',
    title: '修船结算单',
    layout: 'fit',
    modal: true,

    height: '95%',
    width: '95%',
    id: 'xr-srsettlementedit',
    controller: 'xr-srsettlement',
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
            id: 'xr-srsettlementedit-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    name: 'xrSrSettlement.projNo',
                    id: 'xr-srsettlementedit-projno',
                    store: xrSrSettlementEditComboStore = Ext.create('iFlat.store.xr.Project', {
                        proxy: {
                            extraParams: {
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
                    id: 'xr-srsettlementedit-team',
                    name: 'xrSrSettlement.team',
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    forceSelection : true,
                    anyMatch: true,
                    displayField: 'team',
                    valueField: 'team',
                    width: 300,
                    fieldLabel: '施工队',
                    store: xrSrSettlementTeamStore = Ext.create('iFlat.store.xr.Team', {
                        proxy: {
                            extraParams: {
                                'xrTeam.dept': Ext.getCmp('global-panel').getViewModel().get('user')['porgName']
                            }
                        }
                    }),
                    listeners: {
                        select: function (combo, record, eOpts) {
                            var type = record.get('xrTeam.type');
                            combo.up('window').down('textfield[name=xrSrSettlement.isOutwork]').setValue(type != '本厂');
                            combo.up('window').down('textfield[name=xrSrSettlement.teamCode]').setValue(record.get('xrTeam.teamCode'));
                            combo.up('window').down('textfield[name=xrSrSettlement.deptCode]').setValue(record.get('xrTeam.deptCode'));
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'xrSrSettlement.deptCode',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'xrSrSettlement.teamCode',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'xrSrSettlement.isOutwork',
                    hidden: true
                }]
            }, /*{
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    name: 'xrSrSettlement.score',
                    fieldLabel: '综合分',
                    width: 200,
                }, {
                    xtype: 'textfield',
                    name: 'xrSrSettlement.opinion',
                    fieldLabel: '意见',
                    flex: 1
                }, ]
            }, */{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    id: 'xr-srsettlementedit-attachment',
                    name: 'xrSrSettlement.attachment',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        change: 'onAttachmentChange'
                    }]
                }, {
                    xtype: 'textfield',
                    id: 'xr-srsettlementedit-projname',
                    name: 'xrSrSettlement.projName',
                    fieldLabel: '船名',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'xrSrSettlement.id',
                    id: 'xr-srsettlementedit-id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'xrSrSettlement.dept',
                    fieldLabel: '部门',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'xrSrSettlement.status',
                    id: 'xr-srsettlementedit-status',
                    hidden: true,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            if (newValue === '未提交') {
                                Ext.getCmp('xr-srsettlementedit-toolbar').show();
                                Ext.getCmp('xr-srsettlementedit-uploadatt').show();
                                Ext.getCmp('xr-srsettlementedit-deleteatt').show();
                            } else {
                                Ext.getCmp('xr-srsettlementedit-toolbar').hide();
                                Ext.getCmp('xr-srsettlementedit-uploadatt').hide();
                                Ext.getCmp('xr-srsettlementedit-deleteatt').hide();
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
                    name: 'xrSrSettlement.comment',
                    id: 'xr-srsettlementedit-comment',
                    fieldLabel: '备注',
                    flex: 1,
                }, {
                    xtype: 'textfield',
                    name: 'xrSrSettlement.teamName',
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
                                            textfield.nextSibling('textfield[name=xrSrSettlement.teamAcc]').setValue('');
                                        } else {
                                            textfield.setValue(name);
                                            textfield.nextSibling('textfield[name=xrSrSettlement.teamAcc]').setValue(acc);
                                        }
                                    },
                                    failure: function(response, opts) {
                                        Flat.util.unmask();
                                        Flat.util.tip(response.responseText);
                                        textfield.nextSibling('textfield[name=xrSrSettlement.teamAcc]').setValue('');
                                    }
                                });
                            } else {
                                textfield.nextSibling('textfield[name=xrSrSettlement.teamAcc]').setValue('');
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'xrSrSettlement.teamAcc',
                    fieldLabel: '确认人',
                    editable: false,
                    hidden: true,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'xr-srsettlementedit-att',
                margin: '10 0 0 55',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'xr-srsettlementedit-link',
                    text: '下载附件',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    id: 'xr-srsettlementedit-deleteatt',
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
            id: 'xr-srsettlementedit-uploadatt',
            items: [{
                xtype: 'form',
                id: 'xr-srsettlementedit-upload',
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
                id: 'xr-srsettlementedit-detail',
                store: xrSrSettlementDetailStore = Ext.create('iFlat.store.xr.SrSettlementDetl'),
                border: true,
                columnLines: true,
                plugins: [
                    xrSrSettlementDetailRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'xr-srsettlementedit-detail-edit',
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
                    id: 'xr-srsettlementedit-detail-add',
                    handler: 'addDetail'
                }],

                columns: [{
                    text: '删除',
                    width: 50,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    align: 'center',
                    iconCls: 'x-fa fa-close',
                    id: 'xr-srsettlementedit-detail-delete',
                    handler: 'deleteDetail',
                    editor: {
                        xtype: 'label'
                    }
                }, {
                    header: '施工项目',
                    width: 200,
                    dataIndex: 'srSettlementDetl.code',
                    cellWrap: true,
                    editor: {
                        xtype: 'combo',
                        id: 'xr-srsettlementedit-detail-code',
                        store: xrSrStandardPriceComboStore = Ext.create('iFlat.store.xr.SrStandardPrice'),
                        queryMode: 'local',
                        allowBlank: false,
                        editable: true,
                        typeAhead: true,
                        minChars: 0,
                        forceSelection : true,
                        anyMatch: true,
                        displayField: 'content',
                        valueField: 'code',
                        listeners: {
                            select: 'onSrStandardPriceChange',
                        }
                    }
                }, {
                    xtype: 'checkcolumn',
                    disabled: true,
                    header: '以定额结算',
                    width: 100,
                    dataIndex: 'srSettlementDetl.isQuota',
                    editor: {
                        xtype: 'checkbox',
                        id: 'xr-srsettlementedit-detail-isquota',
                        listeners: {
                            change: 'calcAmount'
                        }
                    }
                }, {
                    header: '申请施工内容',
                    width: 200,
                    dataIndex: 'srSettlementDetl.applyContent',
                    cellWrap: true,
                    editor: {
                        xtype: 'textarea',
                        id: 'xr-srsettlementedit-detail-content',
                        allowBlank: false,
                        listeners: {
                            change: 'onApplyContentChange'
                        }
                    },
                }, {
                    header: '申请数量',
                    dataIndex: 'srSettlementDetl.applyQty',
                    editor: {
                        xtype: 'textfield',
                        id: 'xr-srsettlementedit-detail-applyqty',
                        regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                        listeners: {
                            change: 'onApplyQtyChange'
                        }
                    }
                }, {
                    header: '分类',
                    dataIndex: 'srSettlementDetl.category',
                    editor: {
                        xtype: 'textfield',
                        id: 'xr-srsettlementedit-detail-category',
                    }
                }, {
                    header: '规格',
                    dataIndex: 'srSettlementDetl.specs',
                    editor: {
                        xtype: 'textfield',
                        id: 'xr-srsettlementedit-detail-specs',
                    }
                }, {
                    header: '单位',
                    dataIndex: 'srSettlementDetl.unit',
                    editor: {
                        xtype: 'textfield',
                        id: 'xr-srsettlementedit-detail-unit',
                    }
                }, {
                    header: '系数',
                    dataIndex: 'srSettlementDetl.degree',
                    editor: {
                        xtype: 'textfield',
                        id: 'xr-srsettlementedit-detail-degree',
                        regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                        listeners: {
                            change: 'calcAmount'
                        }
                    }
                }, {
                    header: '确认施工内容',
                    width: 200,
                    dataIndex: 'srSettlementDetl.adjustContent',
                }, {
                    header: '确认数量',
                    dataIndex: 'srSettlementDetl.adjustQty',
                }, {
                    header: '单位定额',
                    dataIndex: 'srSettlementDetl.quotaUnit',
                    hidden: true,
                    editor: {
                        xtype: 'textfield',
                        id: 'xr-srsettlementedit-detail-quotaunit',
                        regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                        editable: false,
                        listeners: {
                            change: 'calcQuota'
                        }
                    }
                }, {
                    header: '总定额',
                    dataIndex: 'srSettlementDetl.quota',
                    hidden: true,
                    editor: {
                        xtype: 'textfield',
                        id: 'xr-srsettlementedit-detail-quota',
                        regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                        editable: false,
                        listeners: {
                            change: 'calcAmount'
                        }
                    }
                }, {
                    header: '一级单价',
                    dataIndex: 'srSettlementDetl.priceFirst',
                    hidden: true,
                    editor: {
                        xtype: 'textfield',
                        id: 'xr-srsettlementedit-detail-price',
                        regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                        editable: false,
                        listeners: {
                            change: 'calcAmount'
                        }
                    }
                }, {
                    header: '一级总价',
                    dataIndex: 'srSettlementDetl.amountFirst',
                    hidden: true,
                    editor: {
                        id: 'xr-srsettlementedit-detail-amount',
                        regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                        editable: false
                    }
                }, {
                    header: '二级单价',
                    dataIndex: 'srSettlementDetl.priceSecond',
                    hidden: true,
                    editor: {
                        xtype: 'textfield',
                        id: 'xr-srsettlementedit-detail-price2',
                    }
                }, {
                    header: '二级总价',
                    dataIndex: 'srSettlementDetl.amountSecond',
                    hidden: true,
                    editor: {
                        xtype: 'textfield',
                        id: 'xr-srsettlementedit-detail-amount2',
                    }
                }, {
                    header: '备注',
                    width: 150,
                    dataIndex: 'srSettlementDetl.comment',
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
        id: 'xr-srsettlementedit-toolbar',
        hidden: true,
        items: [{
            xtype: 'button',
            text: '保存并提交',
            handler: 'saveAndSubmitSrSettlementEdit',
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