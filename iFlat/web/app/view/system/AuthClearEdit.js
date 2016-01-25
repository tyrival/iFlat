Ext.define('iFlat.view.system.AuthClearEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.system-authclearedit',
    title: '权限清除',
    layout: 'fit',
    modal: true,

    require: [
        'Ext.form.Panel',
    ],

    id: 'system-authclearedit',
    controller: 'system-authority',
    closeAction: 'hide',
    items: {
        xtype: 'form',
        id: 'system-authclearedit-form',
        height: 500,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        margin: 5,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [{
            xtype: 'treepanel',
            id: 'system-authclearedit-moduletree',
            width: 400,
            singleExpand: true,
            expanderFirst: false,
            expanderOnly: true,
            rootVisible: false,
            border: true,
            rowLines: true,
            useArrows: true,
            store: sysAuthClearModuleStore = Ext.create('iFlat.store.system.AuthDuplicateModule'),
            listeners: {
                checkchange: 'changeAuthWindowModuleStatus'
            }
        }]
    },
    buttons: [
        {
            text: '清除全部权限',
            handler: 'clearSubmit',
        }, {
            text: '清除选中模块权限',
            handler: 'clearSubmit',
        }
    ],
});