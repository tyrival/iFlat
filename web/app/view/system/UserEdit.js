Ext.define('iFlat.view.system.UserEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.system-useredit',
    title: '用户编辑',
    layout: 'fit',
    modal: true,

    id: 'system-useredit',
    controller: 'system-user',
    closeAction: 'hide', 
    items: {
        xtype: 'form',
        id: 'system-useredit-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [
            { xtype: 'textfield', name: 'user.userId', fieldLabel: 'ID', width: 500, hidden: true },
            { xtype: 'textfield', name: 'user.account', fieldLabel: '帐号', width: 500, allowBlank : false },
            { xtype: 'textfield', name: 'user.title', fieldLabel: '职位', width: 500 },
            { xtype: 'textfield', name: 'user.officeTel', fieldLabel: '办公电话', width: 500 },
            { xtype: 'textfield', name: 'user.homeTel', fieldLabel: '宅电', width: 500 },
            { xtype: 'textfield', name: 'user.mobileTel', fieldLabel: '移动电话', width: 500 },
            { xtype: 'textfield', name: 'user.address', fieldLabel: '地址', width: 500 },
            { xtype: 'textfield', name: 'user.qq', fieldLabel: 'QQ', width: 500 },
            { xtype: 'textfield', name: 'user.skype', fieldLabel: 'Skype', width: 500 },
            { xtype: 'textfield', name: 'user.fax', fieldLabel: '传真', width: 500 },
            { xtype: 'textfield', name: 'user.rank', fieldLabel: '职称', width: 500 },
            { xtype: 'textarea', name: 'user.comment', fieldLabel: '备注', width: 500 },
            { xtype: 'textfield', name: 'user.sequence', fieldLabel: '排序', width: 500 },
            { xtype: 'checkbox', name: 'user.status', fieldLabel: '启用', inputValue: 'true', uncheckedValue: 'false' }
        ]
    },
    buttons: [
        {
            text: '保存',
            handler: 'submitUserEdit',
        }
    ],
});