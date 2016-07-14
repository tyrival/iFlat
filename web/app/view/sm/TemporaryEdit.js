Ext.define('iFlat.view.sm.TemporaryEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-temporaryedit',
    title: '零杂工费',
    layout: 'fit',
    modal: true,

    height: '95%',
    width: '95%',
    id: 'sm-temporaryedit',
    controller: 'sm-temporary',
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
            id: 'sm-temporaryedit-form',
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
                    fieldLabel: '月份',
                    format: 'Y-m',
                    id: 'sm-temporaryedit-time',
                    width: 200,
                    listeners: {
                        change: function (df, newValue, oldValue, eOpts) {
                            Ext.getCmp('sm-temporaryedit-month')
                                .setValue(Ext.Date.format(newValue, 'Y-m-d'));
                        }
                    }
                }, ]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    id: 'sm-temporaryedit-attachment',
                    name: 'temporary.attachment',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        change: 'onAttachmentChange'
                    }]
                }, {
                    xtype: 'textfield',
                    id: 'sm-temporaryedit-month',
                    name: 'temporary.month',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'temporary.id',
                    id: 'sm-temporaryedit-id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'temporary.status',
                    id: 'sm-temporaryedit-status',
                    hidden: true,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            if (newValue === '未提交') {
                                Ext.getCmp('sm-temporaryedit-toolbar').show();
                                Ext.getCmp('sm-temporaryedit-uploadatt').show();
                                Ext.getCmp('sm-temporaryedit-deleteatt').show();
                            } else {
                                Ext.getCmp('sm-temporaryedit-toolbar').hide();
                                Ext.getCmp('sm-temporaryedit-uploadatt').hide();
                                Ext.getCmp('sm-temporaryedit-deleteatt').hide();
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
                    name: 'temporary.comment',
                    id: 'sm-temporaryedit-comment',
                    fieldLabel: '备注',
                    width: 800,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'sm-temporaryedit-att',
                margin: '10 0 0 55',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'sm-temporaryedit-link',
                    text: '下载附件',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    id: 'sm-temporaryedit-deleteatt',
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
            id: 'sm-temporaryedit-uploadatt',
            items: [{
                xtype: 'form',
                id: 'sm-temporaryedit-upload',
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
                tecrollable: true,
                id: 'sm-temporaryedit-detail',
                store: smTemporaryDetailStore = Ext.create('iFlat.store.sm.TemporaryDetail'),
                border: true,
                columnLines: true,
                plugins: [
                    smTemporaryDetailRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'sm-temporaryedit-detail-edit',
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
                    id: 'sm-temporaryedit-detail-add',
                    handler: 'addDetail'
                }],

                columns: [{
                    text: '删除',
                    width: 50,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    align: 'center',
                    iconCls: 'x-fa fa-close',
                    id: 'sm-temporaryedit-detail-delete',
                    handler: 'deleteDetail',
                    editor: {
                        xtype: 'label'
                    }
                }, {
                    header: '工程队',
                    width: 280,
                    dataIndex: 'temporaryDetail.team',
                    cellWrap: true,
                    editor: {
                        xtype: 'combo',
                        queryMode: 'local',
                        allowBlank: false,
                        editable: false,
                        forceSelection : true,
                        anyMatch: true,
                        displayField: 'teamName',
                        valueField: 'teamName',
                        store: smTemporaryTeamStore = Ext.create('iFlat.store.code.Team', {
                            proxy: {
                                extraParams: {
                                    'team.deptName': Ext.getCmp('global-panel').getViewModel().get('user')['porgName'],
                                    'team.type': '外包工'
                                }
                            }
                        }),
                    }
                }, {
                    header: '姓名',
                    dataIndex: 'temporaryDetail.name',
                    editor: {
                        allowBlank: false,
                    }
                }, {
                    header: '工种',
                    dataIndex: 'temporaryDetail.trades',
                    editor: {
                        allowBlank: false,
                    }
                }, {
                    header: '岗位工资标准',
                    dataIndex: 'temporaryDetail.standard',
                    editor: {
                    }
                }, {
                    header: '出勤天数',
                    dataIndex: 'temporaryDetail.days',
                    editor: {
                        allowBlank: false,
                        regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    }
                }, {
                    header: '绩效基数',
                    dataIndex: 'temporaryDetail.ratio',
                    editor: {
                        allowBlank: false,
                        regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    }
                }, {
                    header: '考核分',
                    dataIndex: 'temporaryDetail.score',
                    editor: {
                        allowBlank: false,
                        regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    }
                }, {
                    header: '实发绩效工资',
                    dataIndex: 'temporaryDetail.salary',
                    editor: {
                        allowBlank: false,
                        regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    }
                }, {
                    header: '补发（扣）工资',
                    dataIndex: 'temporaryDetail.adjust',
                    editor: {
                        allowBlank: false,
                        regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    }
                }, {
                    header: '实发薪酬',
                    dataIndex: 'temporaryDetail.summary',
                }, {
                    header: '备注',
                    width: 150,
                    dataIndex: 'temporaryDetail.comment',
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
        id: 'sm-temporaryedit-toolbar',
        hidden: true,
        items: [{
            xtype: 'button',
            text: '保存并提交',
            handler: 'saveAndSubmitTemporaryEdit',
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