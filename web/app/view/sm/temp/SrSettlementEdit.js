Ext.define('iFlat.view.sm.temp.SrSettlementEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-srsettlementedit',
    title: '修船结算单',
    layout: 'fit',
    modal: true,
    
    requires: [
        'iFlat.view.sm.temp.detail.SrApplyMain',
        'iFlat.view.sm.temp.detail.SrApplyMisc',
        'iFlat.view.sm.temp.detail.SrApplySys',
    ],

    controller: 'sm-srsettlement',
    closeAction: 'hide',
    id: 'sm-srsettlementedit',
    items: [{
        xtype: 'container',
        margin: '15 15 0 15',
        maxHeight: 500,
        scollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            name: 'sm-srsettlementedit-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    name: 'srSettlement.projNo',
                    store: smSrSettlementEditComboStore 
                        = Ext.create('iFlat.store.report.bi.Project', {
                        proxy: {
                            extraParams: {
                                'rptProject.type': '修船',
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
                    width: 250,
                    fieldLabel: '工程',
                    listeners: {
                        // 选择工号时，在隐藏单元格中保存船名
                        select: function (combo, record, eOpts) {
                            combo.nextSibling('textfield').setValue(record.get('rptProject.name'));
                        },
                    }
                }, {
                    xtype: 'textfield',
                    name: 'srSettlement.projName',
                    fieldLabel: '船名',
                    hidden: true
                }, {
                    xtype: 'combo',
                    name: 'srSettlement.deptName',
                    fieldLabel: '部门',
                    queryMode: 'local',
                    allowBlank: true,
                    editable: false,
                    forceSelection : true,
                    anyMatch: true,
                    width: 200,
                    bind: {
                        store: '{smDeptSrFirst}',
                    },
                    listeners: {
                        change: function(combo, newValue, oldValue, eOpts) {
                            // 将下一个控件的store根据部门值联动
                            var store = combo.nextSibling('combo').getStore()
                            store.getProxy().extraParams['team.deptName']= newValue;
                            store.reload();
                        }
                    },
                }, {
                    xtype: 'combo',
                    name: 'srSettlement.team',
                    queryMode: 'local',
                    allowBlank: true,
                    editable: false,
                    forceSelection : true,
                    anyMatch: true,
                    displayField: 'teamName',
                    valueField: 'teamName',
                    width: 250,
                    fieldLabel: '施工队',
                    store: Ext.create('iFlat.store.code.Team'),
                }, {
                    xtype: 'combo',
                    name: 'srSettlement.professionalMgrAcc',
                    queryMode: 'local',
                    allowBlank: true,
                    editable: true,
                    forceSelection : true,
                    typeAhead: true,
                    anyMatch: true,
                    minChars: 0,
                    displayField: 'userName',
                    valueField: 'account',
                    width: 150,
                    fieldLabel: '主修',
                    store: Ext.create('iFlat.store.system.UserRoleVo', {
                        proxy: {
                            extraParams: {
                                'userRoleVo.roleName': '修船主修'
                            }
                        }
                    }),
                }, {
                    xtype: 'textfield',
                    name: 'srSettlement.progress',
                    fieldLabel: '进度',
                    width: 150,
                    //hidden: true
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    name: 'srSettlement.id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'srSettlement.type',
                    fieldLabel: 'type',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'srSettlement.attachment',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        // 上传附件时触发显示附件下载和删除按钮
                        change: function(field, newValue, oldValue, eOpts) {
                            var win = field.up('window');
                            var att = win.down('container[name=sm-srsettlementedit-att]');
                            var link = win.down('button[name=sm-srsettlementedit-link]');
                            if (!Flat.util.isEmpty(newValue)) {
                                att.show();
                                link.setHref(newValue);
                            } else {
                                att.hide();
                                link.setHref('');
                            }
                        },
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'srSettlement.status',
                    hidden: true,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            var win = field.up('window');
                            var dept = win.down('combo[name=srSettlement.deptName]');
                            dept.setDisabled(newValue != '未提交');
                            var mgr = win.down('combo[name=srSettlement.professionalMgrAcc]');
                            mgr.setDisabled(newValue != '未提交');
                            var progress = win.down('textfield[name=srSettlement.progress]');
                            progress.setDisabled(newValue != '未提交');
                            var toolbar = win.down('toolbar[name=sm-srsettlementedit-toolbar]');
                            var uploadatt
                                = win.down('container[name=sm-srsettlementedit-uploadatt]');
                            var deleteatt
                                = win.down('button[name=sm-srsettlementedit-deleteatt]');
                            if (newValue === '未提交') {
                                toolbar.show();
                                uploadatt.show();
                                deleteatt.show();
                            } else {
                                toolbar.hide();
                                uploadatt.hide();
                                deleteatt.hide();
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
                    name: 'srSettlement.comment',
                    fieldLabel: '备注',
                    width: 600,
                }, {
                    xtype: 'textfield',
                    name: 'srSettlement.teamName',
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
                                        textfield.setValue(name);
                                        textfield.nextSibling('textfield[name=srSettlement.teamAcc]').setValue(acc);
                                    },
                                    failure: function(response, opts) {
                                        Flat.util.unmask();
                                        Flat.util.tip(response.responseText);
                                    }
                                });
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'srSettlement.teamAcc',
                    fieldLabel: '确认人',
                    width: 200,
                    editable: false,
                    hidden: true
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                name: 'sm-srsettlementedit-att',
                margin: '10 0 0 55',
                hidden: true,
                items: [{
                    xtype: 'button',
                    name: 'sm-srsettlementedit-link',
                    text: '下载附件',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    name: 'sm-srsettlementedit-deleteatt',
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
            name: 'sm-srsettlementedit-uploadatt',
            items: [{
                xtype: 'form',
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
            name: 'detail',
            height: 300,
            border: false,
            margin: '30 0 5 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'sm-detail-srapplymain'
            }, {
                xtype: 'sm-detail-srapplymisc'
            }, {
                xtype: 'sm-detail-srapplysys'
            }, ]
        }],
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        name: 'sm-srsettlementedit-toolbar',
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
        hide: 'editClose',
        beforeshow: 'changeGridWithType'
    }

});