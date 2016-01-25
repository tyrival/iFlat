Ext.define('iFlat.view.system.ModuleEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.system-moduleEdit',
    title: '模块编辑',
    layout: 'fit',
    modal: true,

    id: 'system-moduleedit',
    controller: 'system-module',
    closeAction: 'hide',  //关闭动作触发hide，而不是destroy
    items: {
        xtype: 'form',
        id: 'system-moduleedit-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [
            { xtype: 'textfield', id: 'system-moduleedit-nodeid', name: 'module.nodeId', fieldLabel: 'ID', width: 500, hidden: true },
            { xtype: 'textfield', name: 'module.nodeName', fieldLabel: '名称', width: 500, allowBlank : false },
            {
                xtype: 'combobox',
                id: 'system-moduleedit-select',
                name: 'parentNodeIdSelect',
                hiddenName: 'parentNodeId',
                queryMode: 'local',
                editable: true,
                fieldLabel: '父节点',
                width: 500,
                allowBlank : false,// 不允许为空
                forceSelection : true,// 必须选择一个选项
                valueField : 'nodeId',// 值,可选
                displayField : 'nodeName',// 显示文本 ，对应下面store里的'text'，
                typeAhead: true,
                minChars: 0,
                store: sysModuleEditStore = Ext.create('iFlat.store.system.ModuleEdit'),
                listeners : {
                    change: 'transmitValueToTextField',
                }
            },
            { xtype: 'textfield', name: 'module.aweIcon', fieldLabel: '图标', width: 500 },
            { xtype: 'textfield', name: 'module.sequence', fieldLabel: '排序', width: 500, allowBlank : false },
            { xtype: 'textfield', name: 'module.nameSpace', fieldLabel: '命名空间', width: 500, allowBlank : false },
            { xtype: 'textfield', name: 'module.moduleName', fieldLabel: '模块名', width: 500 },
            { xtype: 'textfield', name: 'module.viewName', fieldLabel: 'View', width: 500 },
            { xtype: 'textfield', name: 'module.controller', fieldLabel: 'Controller', width: 500 },
            { xtype: 'textarea', name: 'module.url', fieldLabel: 'Url', width: 500 },
            { xtype: 'textfield', name: 'module.parentNodeId', id: 'system-moduleedit-pid', fieldLabel: '父节点ID', width: 500, hidden: true },
            { xtype: 'checkbox', name: 'module.status', fieldLabel: '启用', inputValue: 'true', uncheckedValue: 'false' }
        ]
    },
    buttons: [
        {
            text: '保存',
            handler: 'submitModuleEdit',
        }
    ],
    listeners: {
        beforeshow: 'initComboboxValue',
        hide: 'resetEditForm',
    },
});