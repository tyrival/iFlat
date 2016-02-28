Ext.define('iFlat.view.bi.MajorMatQtyEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.bi-majormatqtyedit',
    title: '主材用量',
    layout: 'fit',
    modal: true,

    id: 'bi-majormatqtyedit',
    controller: 'bi-projectcost',
    closeAction: 'hide',
    tbar: [{
        xtype: 'form',
        id: 'bi-majormatqtyedit-import',
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
        id: 'bi-majormatqtyedit-template',
        handler: 'downloadTemplate'
    }],
    items: {
        xtype: 'form',
        id: 'bi-majormatqtyedit-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 60
        },
        items: [
            { xtype: 'textfield', name: 'majorMatQty.version', fieldLabel: '版本', hidden: true },
            { xtype: 'textfield', name: 'majorMatQty.id', fieldLabel: 'ID', width: 250, hidden: true },
            { xtype: 'textfield', name: 'majorMatQty.projNo', fieldLabel: 'projNo', width: 250, hidden: true },
            { xtype: 'textfield', name: 'majorMatQty.type', fieldLabel: 'type', width: 250, hidden: true },
            { xtype: 'datefield', name: 'majorMatQty.month', fieldLabel: '日期', format: 'Y-m-d', width: 250, hidden: true },
            {
                xtype: 'fieldset',
                title: '钢材',
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        { xtype: 'textfield', name: 'majorMatQty.steelPlate', fieldLabel: '钢板', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                        { xtype: 'textfield', name: 'majorMatQty.shapeSteel', fieldLabel: '型钢', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                        { xtype: 'textfield', name: 'majorMatQty.otherSteel', fieldLabel: '其他钢材', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }]
            },
            {
                xtype: 'fieldset',
                title: '管材',
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'majorMatQty.steelPipe', fieldLabel: '钢管', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }]
            },
            {
                xtype: 'fieldset',
                title: '焊材',
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'majorMatQty.weldingWire', fieldLabel: '焊丝', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }]
            },
            {
                xtype: 'fieldset',
                title: '油漆',
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'majorMatQty.importPaint', fieldLabel: '进口油漆', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                        { xtype: 'textfield', name: 'majorMatQty.importThinner', fieldLabel: '进口稀料', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }]
            },
            {
                xtype: 'fieldset',
                title: '电缆',
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'majorMatQty.marineCable', fieldLabel: '船用电缆', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }]
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