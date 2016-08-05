Ext.define('iFlat.view.pam.NewsView', {
    extend: 'Ext.window.Window',
    alias: 'widget.pam-newsview',
    title: '新闻稿',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.pam.NewsViewController'
    ],

    id: 'pam-newsview',
    controller: 'pam-newsview',
    closeAction: 'hide',
    width: 800,

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '采用',
            ui: 'orig-blue',
            handler: 'appvNews',
        }, {
            text: '不采用',
            ui: 'orig-blue',
            handler: 'appvNews',
        }, {
            text: '转保密办审核',
            ui: 'orig-blue',
            id: 'pam-newsview-gosec',
            controller: 'pam-newsview',
            hidden: true,
            handler: 'appvNews',
        }, '->', {
            text: '退回',
            ui: 'orig-blue',
            handler: 'appvNews',
        }],
    }],
    
    items: {
        xtype: 'form',
        id: 'pam-newsview-form',
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
                name: 'news.status',
                fieldLabel: 'status',
                editable: false,
                hidden: true
            }]
        },{
            items: [{
                xtype: 'textfield',
                fieldLabel: '类型',
                width: 300,
                name: 'news.type',
                editable: false,
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
            id: 'pam-newsview-att',
            margin: '20 0 0 65',
            hidden: true,
            items: [{
                xtype: 'button',
                id: 'pam-newsview-link',
                text: '下载附件',
                margin: '0 5 0 0',
                width: 100,
            }]
        },{
            xtype: 'textfield',
            id: 'pam-newsview-attachment',
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