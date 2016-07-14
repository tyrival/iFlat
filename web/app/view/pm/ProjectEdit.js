Ext.define('iFlat.view.pm.ProjectEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.pm-projectedit',
    title: '项目管理',
    layout: 'fit',
    modal: true,

    id: 'pm-projectedit',
    controller: 'pm-project',
    closeAction: 'hide',
    //height: '95%',

    items: {
        xtype: 'form',
        id: 'pm-projectedit-form',
        margin: 5,
        border: false,
        layout: 'vbox',
        scrollable: 'y',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 60,
        },
        defaults: {
            border: false,
            xtype: 'panel',
            layout: 'hbox',
            margin: '5 10 5 0'
        },
        items: [{
            items: [{
                xtype: 'textfield',
                name: 'pmProject.id',
                fieldLabel: 'id',
                hidden: true
            },{
                xtype: 'combo',
                name: 'pmProject.type',
                allowBlank: false,
                fieldLabel: '类型',
                width: 300,
                bind: {
                    store: '{pmProjectType}'
                }
            },{
                xtype: 'textfield',
                name: 'pmProject.name',
                allowBlank: false,
                fieldLabel: '项目名称',
                width: 500,
            }]
        },{
            items: [{
                xtype: 'textarea',
                name: 'pmProject.description',
                fieldLabel: '描述',
                width: 800,
            },]
        },{
            items: [{
                xtype: 'textfield',
                name: 'pmProject.comment',
                fieldLabel: '备注',
                width: 800,
            },]
        },{
            items: [{
                xtype: 'datefield',
                name: 'credit.deadline',
                allowBlank: false,
                fieldLabel: '计划完成',
                format: 'Y-m-d',
                width: 300
            },{
                xtype: 'datefield',
                name: 'credit.completeTime',
                fieldLabel: '实际完成',
                format: 'Y-m-d',
                width: 300
            },{
                xtype: 'combo',
                name: 'pmProject.status',
                fieldLabel: '状态',
                width: 200,
                bind: {
                    store: '{pmProjectStatus}'
                }
            }]
        },{
            items: [{
                xtype: 'combo',
                name: 'pmProject.mgrName',
                fieldLabel: '项目经理',
                bind: {
                    store: '{pmProjectManager}'
                },
                width: 300,
                listeners: {
                    change: function(combo, newValue, oldValue, opts) {
                        var acc = '';
                        switch (newValue) {
                            case '梅晓晶':
                                acc = 'A200500218';
                                break;
                            case '周晨煜':
                                acc = 'A200900012';
                                break;
                        }
                        combo.nextSibling('textfield[name=pmProject.mgrAcc]').setValue(acc);
                    }
                }
            },{
                xtype: 'textfield',
                name: 'pmProject.mgrAcc',
                fieldLabel: '主管',
                width: 300,
                hidden: true,
            },{
                xtype: 'combo',
                name: 'pmProject.level',
                fieldLabel: '等级',
                width: 200,
            }]
        },{
            xtype: 'container',
            layout: 'hbox',
            id: 'pm-projectedit-att',
            margin: '20 0 0 65',
            hidden: true,
            items: [{
                xtype: 'button',
                id: 'pm-projectedit-link',
                text: '下载附件',
                margin: '0 5 0 0',
                width: 100,
            }, {
                xtype: 'button',
                ui: 'gray',
                text: '删除',
                handler: 'deleteAttachment'
            }]
        },{
            xtype: 'textfield',
            id: 'pm-projectedit-attachment',
            name: 'pmProject.attachment',
            fieldLabel: 'attachment',
            width: 750,
            hidden: true,
            listeners: [{
                change: 'onAttachmentChange'
            }]
        },{
            xtype: 'container',
            layout: 'hbox',
            margin: '20 0 10 0',
            items: [{
                xtype: 'form',
                id: 'pm-projectedit-upload',
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
        }]
    },
    buttons: [
        {
            text: '保存',
            handler: 'submitProjectEdit',
        }
    ],
});