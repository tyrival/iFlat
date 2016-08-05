Ext.define('iFlat.view.pam.NewsInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.pam-newsinfo',
    title: '新闻稿',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.pam.NewsInfoController'
    ],

    id: 'pam-newsinfo',
    controller: 'pam-newsinfo',
    closeAction: 'hide',
    width: 800,

    items: {
        xtype: 'form',
        id: 'pam-newsinfo-form',
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
                fieldLabel: '标题',
                editable: false,
                width: 750
            }, {
                xtype: 'textfield',
                name: 'news.id',
                fieldLabel: 'id',
                editable: false,
                hidden: true
            }, {
                xtype: 'textfield',
                name: 'news.apprvAcc',
                fieldLabel: 'apprvAcc',
                editable: false,
                hidden: true
            }]
        },{
            items: [{
                xtype: 'textfield',
                fieldLabel: '类型',
                editable: false,
                width: 300,
                name: 'news.type',
            },{
                xtype: 'textfield',
                name: 'news.author',
                fieldLabel: '作者',
                editable: false,
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
            id: 'pam-newsinfo-att',
            margin: '20 0 0 65',
            hidden: true,
            items: [{
                xtype: 'button',
                id: 'pam-newsinfo-link',
                text: '下载附件',
                margin: '0 5 0 0',
                width: 100,
            }]
        },{
            xtype: 'textfield',
            id: 'pam-newsinfo-attachment',
            name: 'news.attachment',
            fieldLabel: 'attachment',
            width: 750,
            hidden: true,
            listeners: [{
                change: 'onAttachmentChange'
            }]
        }]
    },
});