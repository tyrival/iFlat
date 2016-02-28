Ext.define('iFlat.view.bi.MajorDevCstEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.bi-majordevcstedit',
    title: '主要设备费',
    layout: 'fit',
    modal: true,

    id: 'bi-majordevcstedit',
    controller: 'bi-projectcost',
    closeAction: 'hide',
    tbar: [{
        xtype: 'form',
        id: 'bi-majordevcstedit-import',
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
        id: 'bi-majordevcstedit-template',
        handler: 'downloadTemplate'
    }],
    items: {
        xtype: 'form',
        id: 'bi-majordevcstedit-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 100
        },
        items: [
            { xtype: 'textfield', name: 'majorDevCst.version', fieldLabel: '版本', hidden: true },
            { xtype: 'textfield', name: 'majorDevCst.id', fieldLabel: 'ID', width: 250, hidden: true },
            { xtype: 'textfield', name: 'majorDevCst.projNo', fieldLabel: 'projNo', width: 250, hidden: true },
            { xtype: 'textfield', name: 'majorDevCst.type', fieldLabel: 'type', width: 250, hidden: true },
            { xtype: 'datefield', name: 'majorDevCst.month', fieldLabel: '日期', format: 'Y-m-d', width: 250, hidden: true },
            {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                items: [
                    { xtype: 'textfield', name: 'majorDevCst.mainEngine', fieldLabel: '主机及附属含轴', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    { xtype: 'textfield', name: 'majorDevCst.genset', fieldLabel: '主发电机组', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    { xtype: 'textfield', name: 'majorDevCst.boiler', fieldLabel: '锅炉', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                items: [
                    { xtype: 'textfield', name: 'majorDevCst.windlass', fieldLabel: '锚机拖缆绞车', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    { xtype: 'textfield', name: 'majorDevCst.steeringGear', fieldLabel: '舵机', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    { xtype: 'textfield', name: 'majorDevCst.crane', fieldLabel: '起货机(克令吊)', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                items: [
                    { xtype: 'textfield', name: 'majorDevCst.ballastWaterTrtmt', fieldLabel: '压载水处理', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    { xtype: 'textfield', name: 'majorDevCst.hatchCoverSys', fieldLabel: '舱盖系统', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    { xtype: 'textfield', name: 'majorDevCst.distributionSys', fieldLabel: '配电系统', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                items: [
                    { xtype: 'textfield', name: 'majorDevCst.navigationSys', fieldLabel: '通导系统', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                ]
            }
        ]
    },
    buttons: [
        {
            text: '保存',
            handler: 'submitEditWindow',
        }
    ],
});