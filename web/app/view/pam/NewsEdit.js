Ext.define('iFlat.view.pam.NewsEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.pam-newsedit',
    title: '新闻投稿',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.pam.NewsController'
    ],

    id: 'pam-newsedit',
    controller: 'pam-news',
    closeAction: 'hide',
    width: 800,

    items: {
        xtype: 'form',
        id: 'pam-newsedit-form',
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
                name: 'news.title',
                allowBlank: true,
                fieldLabel: '标题',
                width: 750
            }, {
                xtype: 'textfield',
                name: 'news.status',
                fieldLabel: '状态',
                hidden: true,
                listeners: {
                    change: function (field, newValue, oldValue, eOpts) {
                        if (newValue == '未提交') {
                            Ext.getCmp('pam-newsedit-toolbar').show();
                            Ext.getCmp('pam-newsedit-upload').show();
                            Ext.getCmp('pam-newsedit-uploadbtn').show();
                            Ext.getCmp('pam-newsedit-delete').show();
                        } else {
                            Ext.getCmp('pam-newsedit-toolbar').hide();
                            Ext.getCmp('pam-newsedit-upload').hide();
                            Ext.getCmp('pam-newsedit-uploadbtn').hide();
                            Ext.getCmp('pam-newsedit-delete').hide();
                        }
                    }
                }
            },{
                xtype: 'textfield',
                name: 'news.id',
                fieldLabel: 'id',
                hidden: true
            }]
        },{
            items: [{
                xtype: 'combo',
                name: 'news.type',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 300,
                fieldLabel: '类型',
                bind: {
                    store: '{pamNewsType}',
                },
            },{
                xtype: 'textfield',
                name: 'news.author',
                allowBlank: true,
                fieldLabel: '作者',
                width: 450,
            }]
        },{
            items: [{
                xtype: 'textarea',
                margin: '0 10 0 10',
                fieldLabel: '正文',
                labelAlign: 'top',
                name: 'news.content',
                width: 760,
                height: 300
            }]
        },{
            xtype: 'container',
            layout: 'hbox',
            id: 'pam-newsedit-att',
            margin: '20 0 0 65',
            hidden: true,
            items: [{
                xtype: 'button',
                id: 'pam-newsedit-link',
                text: '下载附件',
                margin: '0 5 0 0',
                width: 100,
            }, {
                xtype: 'button',
                id: 'pam-newsedit-delete',
                ui: 'gray',
                text: '删除',
                handler: 'deleteAttachment'
            }]
        },{
            xtype: 'textfield',
            id: 'pam-newsedit-attachment',
            name: 'news.attachment',
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
                id: 'pam-newsedit-upload',
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
                id: 'pam-newsedit-uploadbtn',
                text: '上传',
                ui: 'orig-blue',
                handler: 'uploadAttachment'
            }]
        }]
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        id: 'pam-newsedit-toolbar',
        items: [{
            xtype: 'button',
            text: '提交',
            handler: 'submitNewsEdit',
        }, '->', {
            xtype: 'button',
            text: '保存',
            handler: 'saveNewsEdit',
        }]
    }],
});