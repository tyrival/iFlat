Ext.define('iFlat.view.demo.BookEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.demo-bookedit',
    title: 'Book',
    layout: 'fit',
    modal: true,

    height: '95%',
    width: '95%',
    id: 'demo-bookedit',
    controller: 'demo-book',
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
            id: 'demo-bookedit-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 70,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                width: '100%',
                items: [{
                    xtype: 'textfield',
                    name: 'book.id',
                    id: 'demo-book-id',
                    fieldLabel: 'ID',
                    labelWidth: 50,
                    width: '50%',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'book.name',
                    fieldLabel: 'name',
                    labelWidth: 50,
                    width: '50%',
                }, ]
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '10 0 0 0',
            hidden: true,
            id: 'demo-bookedit-uploadatt',
            items: [{
                xtype: 'form',
                id: 'demo-bookedit-upload',
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 70,
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
        }, /*{
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
                store: demoBookDetlStore = Ext.create('iFlat.store.demo.BookDetl'),
                border: true,
                columnLines: true,
                plugins: [
                    demoBookDetlRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'demo-bookedit-detl-edit',
                        clicksToMoveEditor: 1,
                        autoCancel: true,
                        listeners: {
                            edit: 'updateDetl',
                            cancelEdit: 'deleteEmptyRecord',
                        }
                    })
                ],
                tbar: [{
                    xtype: 'button',
                    text: '新增',
                    ui: 'orig-blue',
                    handler: 'addDetail'
                }],
                columns: [{
                    text: '删除',
                    width: 50,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    align: 'center',
                    iconCls: 'x-fa fa-close',
                    handler: 'deleteDetail',
                    editor: {
                        xtype: 'label'
                    }
                }, {
                    header: 'id',
                    width: 100,
                    dataIndex: 'bookDetl.id',
                    cellWrap: true,
                    hidden: true,
                    editor: {
                        xtype: 'textarea',
                        allowBlank: true,
                    }
                }],
            }]
        }*/],
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        id: 'demo-bookedit-toolbar',
        items: ['->', {
            xtype: 'button',
            text: '保 存',
            handler: 'saveBookEdit',
        }]
    }],

    listeners: {
        close: 'editClose'
    }
});