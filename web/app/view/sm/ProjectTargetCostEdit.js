Ext.define('iFlat.view.sm.ProjectTargetCostEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-projecttargetcostedit',
    title: '单船工费成本',
    layout: 'fit',
    modal: true,

    id: 'sm-projecttargetcostedit',
    controller: 'sm-projecttargetcost',
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
            id: 'sm-projecttargetcostedit-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'combo',
                    name: 'projectTargetCost.projNo',
                    id: 'sm-projecttargetcostedit-projno',
                    store: smProjectTargetCostEditComboStore = Ext.create('iFlat.store.report.bi.Project', {
                        proxy: {
                            extraParams: {
                                'rptProject.status': 0,
                            }
                        }
                    }),
                    queryMode: 'local',
                    allowBlank: false,
                    editable: true,
                    typeAhead: true,
                    minChars: 0,
                    forceSelection : true,
                    displayField: 'name',
                    valueField: 'projNo',
                    width: 500,
                    fieldLabel: '工程',
                    listeners: {
                        select: 'onProjNoChange',
                    }
                }, {
                    xtype: 'textfield',
                    id: 'sm-projecttargetcost-projname',
                    name: 'projectTargetCost.projName',
                    fieldLabel: '工程名',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'projectTargetCost.amount',
                    fieldLabel: '金额',
                    regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    id: 'sm-projecttargetcostedit-attachment',
                    name: 'projectTargetCost.attachment',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        change: 'onAttachmentChange'
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'projectTargetCost.id',
                    id: 'sm-projecttargetcostedit-id',
                    fieldLabel: 'ID',
                    hidden: true,
                }]
            }, {
                xtype: 'container',
                type: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    name: 'projectTargetCost.comment',
                    id: 'sm-projecttargetcostedit-comment',
                    fieldLabel: '备注',
                    width: 800,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'sm-projecttargetcostedit-att',
                margin: '10 0 0 55',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'sm-projecttargetcostedit-link',
                    text: '下载附件',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    id: 'sm-projecttargetcostedit-deleteatt',
                    ui: 'gray',
                    text: '删除',
                    handler: 'deleteAttachment'
                }]
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '10 0 10 0',
            id: 'sm-projecttargetcostedit-uploadatt',
            items: [{
                xtype: 'form',
                id: 'sm-projecttargetcostedit-upload',
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
        }],
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        id: 'sm-projecttargetcostedit-toolbar',
        items: ['->', {
            xtype: 'button',
            text: '保 存',
            handler: 'submit',
        }]
    }],

    listeners: {
        close: 'editClose'
    }

});