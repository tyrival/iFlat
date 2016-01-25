Ext.define('iFlat.view.main.SwitchRole', {
    extend: 'Ext.window.Window',
    alias: 'widget.main-switchrole',
    title: '切换角色',
    layout: 'fit',
    modal: true,
    viewModel: 'main',

    id: 'main-switchrole',
    controller: 'main',
    closeAction: 'hide',
    items: {
        xtype: 'form',
        id: 'main-switchrole-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [{
            xtype: 'combo',
            id: 'main-switchrole-combo',
            store: switchRoleStore = Ext.create('iFlat.store.main.UserRoleInfo'),
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
    listeners: {
        show: 'initSwitchRole',
    },
    buttons: [
        {
            text: '保存',
            handler: 'switchRole',
        }
    ],
});