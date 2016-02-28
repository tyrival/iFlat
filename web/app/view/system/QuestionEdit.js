Ext.define('iFlat.view.system.QuestionEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.system-questionEdit',
    title: '模块编辑',
    layout: 'fit',
    modal: true,

    id: 'system-questionedit',
    controller: 'system-question',
    closeAction: 'hide',
    width: 800,
    items: {
        xtype: 'form',
        id: 'system-questionedit-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [{
            xtype: 'container',
            layout: 'hbox',
            margin: '5 5 25 5',
            items: [{
                xtype: 'combo',
                fieldLabel: '系统',
                name: 'question.sysName',
                width: 250,
                bind: {
                    store: '{system}',
                },
            }, {
                xtype: 'textfield',
                margin: '0 15 0 15',
                fieldLabel: '联系方式',
                name: 'question.askContact',
                width: 250,
            }, {
                xtype: 'combo',
                fieldLabel: '提交至',
                name: 'question.ansAccount',
                valueField: 'account',
                displayField: 'userName',
                flex: true,
                bind: {
                    store: {
                        data: '{solver}',
                        fields: ['account', 'userName']
                    },

                },
                listeners: {
                    change: 'changeSolver'
                }
            }]
        }, {
            xtype: 'htmleditor',
            flex: true,
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '5 5 5 5',
            flex: true,
            items: [{
                xtype: 'filefield',
                name: 'upload',
                buttonText: '选择附件...',
                hideLabel: true,
                flex: true,
            }, {
                xtype: 'button',
                text: '上传',
                margin: '0 0 0 5',
                handler: 'uploadFile'
            }]
        }, {
            xtype: 'textfield',
            fieldLabel: '解决人',
            name: 'question.ansUserName',
            id: 'system-questionedit-ansusername',
            hidden: true
        }]
    },
    buttons: [
        {
            text: '保存',
            //handler: 'submitModuleEdit',
        }
    ],
    listeners: {
        //beforeshow: 'initComboboxValue',
        //hide: 'resetEditForm',
    },
});