Ext.define('iFlat.view.system.TableViewEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.system-tableviewedit',
    title: '表/视图编辑',
    layout: 'fit',
    modal: true,

    id: 'system-tableviewedit',
    controller: 'system-module',
    closeAction: 'hide',
    tbar: [{
        text: '新增',
        id: 'system-tableviewedit-add',
        ui: 'orig-blue',
        handler: 'addTableViewRecord',
    }],
    items: {
        xtype: 'form',
        id: 'system-tableviewedit-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [
            { xtype: 'textfield', id: 'system-tableviewedit-namespace', name: 'module.nameSpace', fieldLabel: '命名空间', hidden: true, width: 500 },
            { xtype: 'textfield', id: 'system-tableviewedit-modulename', name: 'module.moduleName', fieldLabel: '模块名', hidden: true, width: 500 },
            {
                xtype: 'gridpanel',
                border: true,
                columnLines: true,
                store: sysTableViewEditStore = Ext.create('iFlat.store.system.TableViewEdit'),
                width: 900,
                columns: [{
                    header: 'id',
                    dataIndex: 'tableView.tvId',
                    hidden: true,
                }, {
                    header: '命名空间',
                    dataIndex: 'tableView.nameSpace',
                    hidden: true,
                }, {
                    header: '模块名',
                    dataIndex: 'tableView.moduleName',
                    hidden: true,
                }, {
                    header: '表/视图',
                    dataIndex: 'tableView.name',
                    width: 100,
                    editor: {
                        allowBlank: false
                    }
                }, {
                    header: '描述',
                    dataIndex: 'tableView.description',
                    width: 140,
                    flex: true,
                    editor: {
                        allowBlank: false
                    }
                }, {
                    header: '数据库实例',
                    dataIndex: 'tableView.dbInstance',
                    width: 140,
                    editor: {
                    }
                }, {
                    header: '数据库名',
                    dataIndex: 'tableView.dbName',
                    width: 140,
                    editor: {
                    }
                }, {
                    text: '删除',
                    id: 'system-tableviewedit-delete',
                    width: 50,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    tooltip: '删除',
                    align: 'center',
                    iconCls: 'x-fa fa-close',
                    handler: 'deleteTableView',
                    editor: {
                        xtype: 'label',
                    }
                }],
                plugins: [
                    sysTableViewRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        id: 'system-tableview-edit',
                        autoCancel: false,
                        listeners: {
                            edit: 'updateTableViewRecord',
                            canceledit: 'cancelTableViewEdit',
                        }
                    })
                ]
            }
        ]
    },
    listeners: {
        hide: 'resetGridValue',
    },
});