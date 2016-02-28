Ext.define('iFlat.view.system.AuthDuplicateEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.system-authduplicateedit',
    title: '权限借用',
    layout: 'fit',
    modal: true,

    require: [
        'Ext.form.Panel',
    ],

    id: 'system-authduplicateedit',
    controller: 'system-authority',
    closeAction: 'hide',
    items: {
        xtype: 'form',
        id: 'system-authduplicateedit-form',
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
            width: 230,
            singleExpand: true,
            expanderFirst: false,
            expanderOnly: true,
            rootVisible: false,
            border: true,
            rowLines: true,
            useArrows: true,
            itemId: 'system-authduplicateedit-userroletree',
            id: 'system-authduplicateedit-userroletree',
            store: sysAuthDuplicateURTreeStore = Ext.create('iFlat.store.system.UserRoleTree'),
        }, {
            xtype: 'treepanel',
            id: 'system-authduplicateedit-moduletree',
            margin: '0 0 0 20',
            width: 350,
            singleExpand: true,
            expanderFirst: false,
            expanderOnly: true,
            rootVisible: false,
            border: true,
            rowLines: true,
            useArrows: true,
            store: sysAuthDuplicateModuleStore = Ext.create('iFlat.store.system.AuthDuplicateModule'),
            listeners: {
                checkchange: 'changeAuthWindowModuleStatus'
            }
        }]
    },
    buttons: [
        {
            text: '借用全部模块权限',
            handler: 'duplicateSubmit',
        }, {
            text: '借用选中模块',
            handler: 'duplicateSubmit',
        }
    ],
});