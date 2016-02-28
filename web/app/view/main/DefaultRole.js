Ext.define('iFlat.view.main.DefaultRole', {
    extend: 'Ext.window.Window',
    alias: 'widget.main-defaultrole',
    title: '默认角色',
    layout: 'fit',
    modal: true,
    viewModel: 'main',

    id: 'main-defaultrole',
    controller: 'main',
    closeAction: 'hide',
    items: {
        xtype: 'form',
        id: 'main-defaultrole-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [{
            xtype: 'combo',
            id: 'main-defaultrole-combo',
            store: defaultRoleStore = Ext.create('iFlat.store.main.DefaultRole'),
            margin: 5,
            width: 200,
            allowBlank: false,
            queryMode: 'local',
            editable: false,
            forceSelection: true,
            valueField: 'roleId',
            displayField: 'roleName',
            name: 'userRole.roleId',
        }]
    },
    buttons: [
        {
            text: '保存',
            handler: 'saveDefaultRole',
        }
    ],
});