Ext.define('iFlat.view.wip.SrOutsourceEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.wip-sroutsourceedit',
    title: '修船外协申请',
    layout: 'fit',
    modal: true,

    height: '95%',
    width: '95%',
    id: 'wip-sroutsourceedit',
    controller: 'wip-sroutsource',
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
            id: 'wip-sroutsourceedit-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    name: 'srOutsource.projNo',
                    id: 'wip-sroutsourceedit-projno',
                    store: wipSrOutsourceEditComboStore = Ext.create('iFlat.store.report.bi.Project', {
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
                    width: '30%',
                    fieldLabel: '船名',
                    labelWidth: 70,
                    listeners: {
                        select: 'onProjNoChange',
                    }
                }, {
                    xtype: 'textfield',
                    name: 'srOutsource.capitalSource',
                    fieldLabel: '资金来源',
                    width: '25%',
                    labelWidth: 70,
                }, {
                    xtype: 'combo',
                    name: 'srOutsource.type',
                    fieldLabel: '外包类型',
                    queryMode: 'local',
                    allowBlank: true,
                    editable: false,
                    forceSelection : true,
                    width: '20%',
                    labelWidth: 70,
                    bind: {
                        store: '{wipOutsourceType}',
                    },
                }, {
                    xtype: 'combo',
                    name: 'srOutsource.matSource',
                    id: 'wip-sroutsourceedit-matsource',
                    fieldLabel: '外包性质',
                    queryMode: 'local',
                    allowBlank: true,
                    editable: false,
                    forceSelection : true,
                    width: '24%',
                    labelWidth: 70,
                    bind: {
                        store: '{wipMatSource}',
                    },
                }, {
                    xtype: 'textfield',
                    id: 'wip-sroutsourceedit-projname',
                    name: 'srOutsource.projName',
                    fieldLabel: '船名',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    id: 'wip-sroutsourceedit-projtype',
                    name: 'srOutsource.projType',
                    fieldLabel: '工程类型',
                    hidden: true
                }, ]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    name: 'srOutsource.name',
                    fieldLabel: '项目名称',
                    labelWidth: 70,
                    width: '100%'
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    id: 'wip-sroutsourceedit-attachment',
                    name: 'srOutsource.aplAtt',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        change: 'onAttachmentChange'
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'srOutsource.id',
                    id: 'wip-sroutsourceedit-id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'srOutsource.status',
                    id: 'wip-sroutsourceedit-status',
                    hidden: true,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            if (newValue === '未提交') {
                                Ext.getCmp('wip-sroutsourceedit-toolbar').show();
                                Ext.getCmp('wip-sroutsourceedit-uploadatt').show();
                                Ext.getCmp('wip-sroutsourceedit-deleteatt').show();
                            } else {
                                Ext.getCmp('wip-sroutsourceedit-toolbar').hide();
                                Ext.getCmp('wip-sroutsourceedit-uploadatt').hide();
                                Ext.getCmp('wip-sroutsourceedit-deleteatt').hide();
                            }
                        }
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'combo',
                    name: 'srOutsource.dept',
                    fieldLabel: '施工单位',
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    forceSelection : true,
                    width: '25%',
                    labelWidth: 70,
                    bind: {
                        store: '{smSrDept}',
                    },
                }, {
                    xtype: 'datefield',
                    name: 'srOutsource.tod',
                    fieldLabel: '交货期',
                    allowBlank: false,
                    format: 'Y-m-d',
                    width: '24%',
                }, {
                    xtype: 'checkbox',
                    name: 'srOutsource.hasBluePrint',
                    fieldLabel: '有图纸',
                    margin: '0 0 0 50',
                    inputValue: true,
                    labelWidth: 70,
                    width: 140,
                }, {
                    xtype: 'checkbox',
                    name: 'srOutsource.hasSample',
                    fieldLabel: '有老样',
                    inputValue: true,
                    labelWidth: 70,
                    width: 130,
                }, {
                    xtype: 'checkbox',
                    name: 'srOutsource.ownerAppoint',
                    fieldLabel: '船东指定',
                    inputValue: true,
                    labelWidth: 70,
                    width: 130,
                }, {
                    xtype: 'checkbox',
                    name: 'srOutsource.hasList',
                    fieldLabel: '附清单',
                    inputValue: true,
                    labelWidth: 70,
                    width: 130,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    name: 'srOutsource.aplComment',
                    id: 'wip-sroutsourceedit-comment',
                    fieldLabel: '备注',
                    labelWidth: 70,
                    flex: 1,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'wip-sroutsourceedit-att',
                margin: '10 0 0 75',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'wip-sroutsourceedit-link',
                    text: '下载附件',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    id: 'wip-sroutsourceedit-deleteatt',
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
            id: 'wip-sroutsourceedit-uploadatt',
            items: [{
                xtype: 'form',
                id: 'wip-sroutsourceedit-upload',
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
                    labelWidth: 70,
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
                id: 'wip-sroutsourceedit-detail',
                store: wipSrOutsourceDetailStore = Ext.create('iFlat.store.wip.SrOutsourceDetl'),
                border: true,
                columnLines: true,
                plugins: [
                    wipSrOutsourceDetailRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'wip-sroutsourceedit-detail-edit',
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
                    id: 'wip-sroutsourceedit-detail-add',
                    handler: 'addDetail'
                }],

                columns: [{
                    text: '删除',
                    width: 50,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    align: 'center',
                    iconCls: 'x-fa fa-close',
                    id: 'wip-sroutsourceedit-detail-delete',
                    handler: 'deleteDetail',
                    editor: {
                        xtype: 'label'
                    }
                }, {
                    header: '施工内容',
                    width: 300,
                    dataIndex: 'srOutsourceDetl.content',
                    cellWrap: true,
                    editor: {
                        xtype: 'textarea',
                        allowBlank: false,
                    }
                }, {
                    header: '规格',
                    width: 200,
                    dataIndex: 'srOutsourceDetl.specs',
                    editor: {
                    },
                }, {
                    header: '数量',
                    width: 200,
                    dataIndex: 'srOutsourceDetl.qty',
                    editor: {
                        allowBlank: false,
                        regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    },
                }, {
                    header: '单位',
                    width: 100,
                    dataIndex: 'srOutsourceDetl.unit',
                    editor: {
                        allowBlank: false,
                    },
                }, {
                    header: '备注',
                    flex: 1,
                    dataIndex: 'srOutsourceDetl.comment',
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
        id: 'wip-sroutsourceedit-toolbar',
        disabled: true,
        items: [{
            xtype: 'button',
            text: '保存并提交',
            handler: 'saveAndSubmitSrOutsourceEdit',
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