Ext.define('iFlat.view.pam.YearWorkEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.pam-yearworkedit',
    title: '年度工作',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.pam.YearWorkController'
    ],

    id: 'pam-yearworkedit',
    controller: 'pam-yearwork',
    closeAction: 'hide',

    //height: '95%',
    width: '95%',

    items: {
        xtype: 'form',
        id: 'pam-yearworkedit-form',
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
                name: 'yearWork.type',
                fieldLabel: '类型',
                hidden: true,
            }, {
                xtype: 'textfield',
                name: 'yearWork.status',
                fieldLabel: '状态',
                hidden: true,
                listeners: {
                    change: function (field, newValue, oldValue, eOpts) {
                        if (newValue === '0') {
                            Ext.getCmp('pam-yearworkedit-toolbar').show();
                            Ext.getCmp('pam-yearworkedit-upload').show();
                            Ext.getCmp('pam-yearworkedit-uploadbtn').show();
                            Ext.getCmp('pam-yearworkedit-delete').show();
                        } else {
                            Ext.getCmp('pam-yearworkedit-toolbar').hide();
                            Ext.getCmp('pam-yearworkedit-upload').hide();
                            Ext.getCmp('pam-yearworkedit-uploadbtn').hide();
                            Ext.getCmp('pam-yearworkedit-delete').hide();
                        }
                    }
                }
            }, {
                xtype: 'textfield',
                name: 'yearWork.id',
                fieldLabel: 'ID',
                hidden: true,
            }, {
                xtype: 'textfield',
                name: 'yearWork.pbName',
                fieldLabel: '党支部',
                hidden: true,
            }, {
                xtype: 'datefield',
                name: 'yearWork.year',
                fieldLabel: '年(真)',
                format: 'Y-m-d',
                hidden: true,
                listeners: {
                    change: function(tf, newValue, oldValue, op) {
                        tf.nextSibling('textfield').setValue(Ext.Date.format(newValue, 'Y'));
                    }
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '年月',
                editable: false
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-calendar',
                handler: function(btn){
                    btn.up('window').down('monthpicker').show();
                }
            }, {
                xtype: 'monthpicker',
                floating: true,
                defaultAlign: 'tl-tl',
                value: new Date(),
                listeners: {
                    okclick: function(mp, value, op) {
                        var year = value[1];
                        var time = year + '-01-01';
                        mp.up('window').down('textfield[name=yearWork.year]').setValue(time);
                        mp.hide();
                    },
                    cancelclick: function(mp, op) {
                        mp.hide();
                    }
                }
            }, {
                xtype: 'form',
                id: 'pam-yearworkedit-upload',
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
                id: 'pam-yearworkedit-uploadbtn',
                text: '上传',
                ui: 'orig-blue',
                handler: 'uploadAttachment'
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'pam-yearworkedit-att',
                margin: '0 0 0 50',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'pam-yearworkedit-link',
                    text: '下载附件',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    ui: 'gray',
                    text: '删除',
                    id: 'pam-yearworkedit-delete',
                    handler: 'deleteAttachment'
                }]
            }, {
                xtype: 'textfield',
                id: 'pam-yearworkedit-attachment',
                name: 'yearWork.attachment',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: 'onAttachmentChange'
                }]
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '0 10 5 10',
            width: '100%',
            items: [{
                xtype: 'textarea',
                fieldLabel: '内容',
                labelAlign: 'top',
                name: 'yearWork.content',
                width: '100%',
                height: 400
            }]
        }]
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        id: 'pam-yearworkedit-toolbar',
        disabled: true,
        items: [{
            xtype: 'button',
            text: '提交',
            handler: 'submitYearWorkEdit',
        }, '->', {
            xtype: 'button',
            text: '保存',
            handler: 'saveYearWorkEdit',
        }]
    }],
});