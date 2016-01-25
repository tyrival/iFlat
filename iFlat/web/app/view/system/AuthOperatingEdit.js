Ext.define('iFlat.view.system.AuthOperatingEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.system-authoperatingedit',
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

    id: 'system-authoperatingedit',
    controller: 'system-authority',
    closeAction: 'hide',
    items: {
        xtype: 'form',
        id: 'system-authoperatingedit-form',
        margin: 5,

        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [{
            xtype: 'checkbox',
            name: 'aoStatus',
            id: 'system-authoperatingedit-form-aostatus',
            fieldLabel: '启用',
            inputValue: 'false',
            uncheckedValue: 'false'
        }, {
            xtype: 'gridpanel',
            border: true,
            columnLines: true,
            store: sysAuthorityOperatingStore = Ext.create('iFlat.store.system.AuthOperating'),
            width: 500,
            columns: [{
                header: '名称',
                dataIndex: 'alias',
                width: 140,
            }, {
                header: '控件id',
                dataIndex: 'pageId',
                width: 140,
                flex: true,
            }, {
                xtype: 'checkcolumn',
                header: '启用',
                dataIndex: 'status',
                width: 100,
            }]
        }, {
            xtype: 'textfield',
            name: 'amId',
            id: 'system-authoperatingedit-form-amid',
            fieldLabel: 'amId',
            width: 500,
            hidden: true
        }]
    },
    buttons: [
        {
            text: '保存',
            handler: 'submitAuthOperating',
        }
    ],
});