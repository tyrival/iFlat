Ext.define('iFlat.view.bi.MajorMatCstEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.bi-majormatcstedit',
    title: '主材费',
    layout: 'fit',
    modal: true,

    id: 'bi-majormatcstedit',
    controller: 'bi-projectcost',
    closeAction: 'hide',
    tbar: [{
        xtype: 'form',
        id: 'bi-majormatcstedit-import',
        items: [{
            xtype: 'fileuploadfield',
            name: 'upload',
            buttonText: '选择...',
            width: 300,
            margin: '0 0 0 0',
        }, ]
    }, {
        xtype: 'button',
        text: '导入',
        ui: 'orig-blue',
        handler: 'uploadFile'
    }, '->', {
        text: '下载模板',
        id: 'bi-majormatcstedit-template',
        handler: 'downloadTemplate'
    }],
    items: {
        xtype: 'form',
        id: 'bi-majormatcstedit-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 40
        },
        items: [
            { xtype: 'textfield', name: 'majorMatCst.version', fieldLabel: '版本', hidden: true },
            { xtype: 'textfield', name: 'majorMatCst.id', fieldLabel: 'ID', width: 250, hidden: true },
            { xtype: 'textfield', name: 'majorMatCst.projNo', fieldLabel: 'projNo', width: 250, hidden: true },
            { xtype: 'textfield', name: 'majorMatCst.type', fieldLabel: 'type', width: 250, hidden: true },
            { xtype: 'datefield', name: 'majorMatCst.month', fieldLabel: '日期', format: 'Y-m-d', width: 250, hidden: true },
            {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                items: [
                    { xtype: 'textfield', name: 'majorMatCst.steel', fieldLabel: '钢材', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    { xtype: 'textfield', name: 'majorMatCst.pipes', fieldLabel: '管材', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    { xtype: 'textfield', name: 'majorMatCst.weldingMat', fieldLabel: '焊材', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                items: [
                    { xtype: 'textfield', name: 'majorMatCst.paint', fieldLabel: '油漆', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    { xtype: 'textfield', name: 'majorMatCst.cable', fieldLabel: '电缆', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    { xtype: 'textfield', name: 'majorMatCst.oil', fieldLabel: '油料', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                ]
            },
        ]
    },
    buttons: [
        {
            text: '保存',
            handler: 'submitEditWindow',
        }
    ],
});