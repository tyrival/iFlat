Ext.define('iFlat.view.system.OperatingEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.system-operatingedit',
    title: '操作权限',
    layout: 'fit',
    modal: true,

    id: 'system-operating',
    controller: 'system-module',
    closeAction: 'hide',

    tbar: [{
        text: '新增',
        id: 'system-operating-add',
        ui: 'orig-blue',
        handler: 'addOpRecord',
    }, '->', {
        text: '刷新',
        id: 'system-operating-refresh',
        handler: 'refreshList',
    }],

    items: {
        xtype: 'form',
        id: 'system-operating-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [{
            xtype: 'gridpanel',
            id: 'system-operating-grid',
            store: sysOperatingEditStore = Ext.create('iFlat.store.system.OperatingEdit'),
            width: 800,
            height: 200,
            border: true,
            columnLines: true,
            plugins: [
                sysOperatingRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    pluginId: 'system-operating-edit',
                    clicksToMoveEditor: 1,
                    autoCancel: true,
                    listeners: {
                        edit: 'saveOperating',
                        canceledit: 'deleteEmptyOp',
                    }
                })
            ],
            columns: [{
                header: '操作名',
                dataIndex: 'operating.operating',
                width: 100,
                editor: {
                    allowBlank: false,
                }
            }, {
                header: '别名',
                dataIndex: 'operating.alias',
                width: 100,
                editor: {
                    allowBlank: false,
                }
            }, {
                header: 'Action方法',
                dataIndex: 'operating.method',
                width: 150,
                editor: {
                    allowBlank: false,
                }
            }, {
                header: '排序',
                dataIndex: 'operating.sequence',
                flex: true,
                editor: {
                    allowBlank: false,
                }
            }, {
                text: '删除',
                id: 'system-operating-delete',
                width: 50,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: '删除',
                align: 'center',
                iconCls: 'x-fa fa-close',
                handler: 'deleteOperating',
            }],
        }, {
            xtype: 'textfield',
            name: 'module.nameSpace',
            id: 'system-operating-namespace',
            hidden: true
        }, {
            xtype: 'textfield',
            name: 'module.moduleName',
            id: 'system-operating-modulename',
            hidden: true
        }]
    },
    listeners: {
        hide: 'clearOperatingGrid',
    }
});