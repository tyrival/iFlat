Ext.define('iFlat.view.main.Memo', {
    extend: 'Ext.window.Window',
    alias: 'widget.main-memo',
    title: '速记本',
    layout: 'fit',
    modal: true,

    id: 'main-memo',
    controller: 'main',
    closeAction: 'hide',
    items: {
        xtype: 'form',
        id: 'main-memo-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [
            { xtype: 'textarea', name: 'memo.note', width: 450, height: 300 },
        ]
    },
    listeners: {
        beforeshow: 'initMemo'
    },
    buttons: [
        {
            text: '保存',
            handler: 'saveMemo',
        }
    ],
});