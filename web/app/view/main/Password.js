Ext.define('iFlat.view.main.Password', {
    extend: 'Ext.window.Window',
    alias: 'widget.main-password',
    title: '修改密码',
    layout: 'fit',
    modal: true,

    id: 'main-password',
    controller: 'main',
    closeAction: 'hide',
    items: {
        xtype: 'form',
        id: 'main-password-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [
            { xtype: 'textfield', name: 'passwordChange.old', fieldLabel: '原密码', width: 250, inputType: 'password', allowBlank: false },
            { xtype: 'textfield', name: 'passwordChange.password', fieldLabel: '新密码', width: 250, inputType: 'password', allowBlank: false },
            {
                xtype: 'textfield',
                name: 'passwordChange.varify',
                fieldLabel: '密码确认',
                width: 250,
                inputType: 'password',
                allowBlank: false,
                validator: function (value) {
                    var password1 = this.previousSibling('[name=passwordChange.password]');
                    return (value === password1.getValue()) ? true : '两次输入的新密码不匹配。'
                }
            },
        ]
    },
    buttons: [
        {
            text: '保存',
            handler: 'changePassword',
        }
    ],
});