Ext.define('iFlat.view.system.UserRoleEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.system-userroleedit',
    title: '选择角色',
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

    id: 'system-userroleedit',
    controller: 'system-user',
    closeAction: 'hide',
    items: {
        xtype: 'form',
        id: 'system-userroleedit-form',
        margin: 5,

        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [{
            xtype: 'textfield',
            name: 'user.account',
            fieldLabel: '帐号',
            width: 500,
            hidden: true
        }, {
            xtype: 'itemselector',
            name: 'itemselector',
            id: 'system-userroleedit-itemselector',
            anchor: '100%',
            scrollable: true,
            width: 500,
            height: 400,
            imagePath: '../ux/images/',
            store: sysRoleStore = Ext.create('iFlat.store.system.Role'),
            displayField: 'roleName',
            valueField: 'roleId',
            value: [],
            allowBlank: true,
            msgTarget: 'side',
            fromTitle: '未选择',
            toTitle: '已选择'
        }]
    },
    buttons: [
        {
            text: '保存',
            handler: 'submitUserRoleEdit',
        }
    ],
});