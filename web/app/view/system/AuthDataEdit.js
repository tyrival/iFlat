Ext.define('iFlat.view.system.AuthDataEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.system-authdataedit',
    title: '操作权限',
    layout: 'fit',
    modal: true,

    require: [
        'Ext.form.Panel',
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.ItemSelector',
        'Ext.tip.QuickTipManager',
        'Ext.ux.ajax.JsonSimlet',
        'Ext.ux.ajax.SimManager'
    ],

    id: 'system-authdataedit',
    controller: 'system-authority',
    closeAction: 'hide',

    items: {
        xtype: 'form',
        id: 'system-authdataedit-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [{
            xtype: 'checkbox',
            name: 'adStatus',
            id: 'system-authdataedit-form-adstatus',
            fieldLabel: '启用',
            inputValue: 'false',
            uncheckedValue: 'false',
            listeners: {
                change: 'changeAdStatus',
            }
        }, {
            xtype: 'panel',
            height: 200,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'gridpanel',
                id: 'system-authdataedit-form-tablegrid',
                store: sysAuthDataTableListStore = Ext.create('iFlat.store.system.AuthDataTable'),
                width: 500,
                border: true,
                columnLines: true,
                columns: [{
                    header: '表/视图',
                    dataIndex: 'name',
                    width: 100,
                }, {
                    header: '描述',
                    dataIndex: 'description',
                    flex: true
                }],
                listeners: {
                    selectionchange: 'loadFieldAndFilter',
                }
            }, {
                xtype: 'treepanel',
                border: true,
                width: 380,
                margin: '0 0 0 10',
                rootVisible: false,
                store: Ext.create('iFlat.store.system.GlobalVariable'),
                listeners: {
                    rowdblclick: 'onRowdblclickGlobalVariable',
                }
            }]
        }, {
            xtype: 'panel',
            height: 300,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            tbar: [{
                text: '保存',
                ui: 'orig-blue',
                handler: 'saveAuthData',
            }, {
                xtype: 'label',
                width: 210,
            }, {
                text: '全编辑',
                handler: 'selectAllStatus',
            }, {
                text: '全只读',
                handler: 'selectAllStatus',
            }, {
                text: '全禁止',
                handler: 'selectAllStatus',
            }],
            items: [{
                xtype: 'gridpanel',
                fieldLabel: '字段权限',
                hideHeaders: true,
                store: sysAuthDataFieldList = Ext.create('iFlat.store.system.AuthDataField'),
                width: 500,
                flex: true,
                border: true,
                columnLines: true,
                listeners: {
                    rowdblclick: 'addFieldToFilter',
                },
                columns: [{
                    header: '字段',
                    dataIndex: 'fieldName',
                    width: 120,
                }, {
                    header: '描述',
                    dataIndex: 'alias',
                    flex: true,
                }, {
                    xtype: 'widgetcolumn',
                    header: '权限',
                    dataIndex: 'status',
                    width: 180,
                    widget: {
                        xtype: 'segmentedbutton',
                        items: [{
                            text: '编辑',
                            value: '2'
                        }, {
                            text: '只读',
                            value: '1'
                        }, {
                            text: '禁止',
                            value: '0'
                        }],
                        listeners: {
                            change: 'saveFieldRadioToStore',
                        }
                    }
                }]
            }, {
                xtype: 'textarea',
                name: 'filter',
                margin: '0 0 0 10',
                width: 380,
                id: 'system-authdataedit-form-filter',
                emptyText: '过滤条件...',
                hideLabel: true,
            }]
        }, {
            xtype: 'textfield',
            name: 'roleId',
            id: 'system-authdataedit-form-roleid',
            fieldLabel: 'roleId',
            hidden: true
        }, {
            xtype: 'textfield',
            name: 'account',
            id: 'system-authdataedit-form-account',
            fieldLabel: 'account',
            hidden: true
        }, {
            xtype: 'textfield',
            name: 'amId',
            id: 'system-authdataedit-form-amid',
            fieldLabel: 'amId',
            hidden: true
        }, {
            xtype: 'textfield',
            name: 'nameSpace',
            id: 'system-authdataedit-form-namespace',
            fieldLabel: 'nameSpace',
            hidden: true
        }, {
            xtype: 'textfield',
            name: 'moduleName',
            id: 'system-authdataedit-form-modulename',
            fieldLabel: 'moduleName',
            hidden: true
        }, {
            xtype: 'textfield',
            name: 'adId',
            id: 'system-authdataedit-form-adid',
            fieldLabel: 'adId',
            hidden: true
        }]
    },
    listeners: {
        hide: 'clearWindow',
    }
});