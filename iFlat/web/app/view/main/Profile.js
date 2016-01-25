Ext.define('iFlat.view.main.Profile', {
    extend: 'Ext.window.Window',
    alias: 'widget.main-profile',
    title: '个人资料',
    layout: 'fit',
    modal: true,

    id: 'main-profile',
    controller: 'main',
    closeAction: 'hide',
    items: {
        xtype: 'form',
        id: 'main-profile-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [
            { xtype: 'textfield', name: 'user.mobileTel', fieldLabel: '移动电话', width: 500 },
            { xtype: 'textfield', name: 'user.officeTel', fieldLabel: '办公电话', width: 500 },
            { xtype: 'textfield', name: 'user.homeTel', fieldLabel: '宅电', width: 500 },
            { xtype: 'textfield', name: 'user.fax', fieldLabel: '传真', width: 500 },
            { xtype: 'textfield', name: 'user.qq', fieldLabel: 'QQ', width: 500 },
            { xtype: 'textfield', name: 'user.skype', fieldLabel: 'Skype', width: 500 },
            { xtype: 'textfield', name: 'user.email', fieldLabel: 'Email', width: 500 },
            { xtype: 'textfield', name: 'user.address', fieldLabel: '地址', width: 500 },
            { xtype: 'textfield', name: 'user.title', fieldLabel: '职位', width: 500 },
            { xtype: 'textfield', name: 'user.rank', fieldLabel: '职称', width: 500 },
            { xtype: 'textarea', name: 'user.comment', fieldLabel: '备注', width: 500 },
        ]
    },
    listeners: {
        beforeshow: 'initProfile'
    },
    buttons: [
        {
            text: '保存',
            handler: 'saveProfile',
        }
    ],
});