Ext.define('iFlat.view.bi.ProjectCostEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.bi-projectcostedit',
    title: '单船总成本',
    layout: 'fit',
    modal: true,

    id: 'bi-projectcostedit',
    controller: 'bi-projectcost',
    closeAction: 'hide',
    tbar: [{
        xtype: 'form',
        id: 'bi-projectcostedit-import',
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
        id: 'bi-projectcost-template',
        handler: 'downloadTemplate'
    }],
    items: {
        xtype: 'form',
        id: 'bi-projectcostedit-form',
        margin: 10,
        border: true,
        maxHeight: 500,
        scrollable: 'y',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 80
        },
        items: [{
            xtype: 'container',
            layout: 'hbox',
            margin: '10 0 0 0',
            items: [
                { xtype: 'textfield', name: 'projectCost.version', fieldLabel: '版本', hidden: true },
                { xtype: 'textfield', name: 'projectCost.id', fieldLabel: 'ID', width: 250, hidden: true },
                {
                    xtype: 'datefield',
                    name: 'projectCost.month',
                    fieldLabel: '日期',
                    format: 'Y-m-d',
                    width: 250,
                },
                {
                    xtype: 'combo',
                    name: 'projectCost.type',
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    forceSelection : true,
                    width: 250,
                    fieldLabel: '类型',
                    bind: {
                        store: '{projectCostType}',
                    },
                },
                {
                    xtype: 'combo',
                    name: 'projectCost.projNo',
                    store: biProjectCostEditComboStore = Ext.create('iFlat.store.bi.Project'),
                    queryMode: 'local',
                    allowBlank: false,
                    editable: true,
                    typeAhead: true,
                    minChars: 0,
                    forceSelection : true,
                    anyMatch: true,
                    displayField: 'name',
                    valueField: 'projNo',
                    width: 250,
                    fieldLabel: '工程'
                }]
            },
            {
                xtype: 'fieldset',
                margin: '10 20 0 10',
                title: '销售收入',
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
                        { xtype: 'textfield', name: 'projectCost.salesRevenue', fieldLabel: '销售收入', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }]
            },
            {
                xtype: 'fieldset',
                title: '器材费',
                defaultType: 'textfield',
                margin: '10 20 0 10',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'projectCost.matCstAdj', fieldLabel: '器材费', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'projectCost.raw', fieldLabel: '原材料', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                        { xtype: 'textfield', name: 'projectCost.device', fieldLabel: '设备费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                        { xtype: 'textfield', name: 'projectCost.foundry', fieldLabel: '外协包料', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }]
            },
            {
                xtype: 'fieldset',
                title: '加工费',
                defaultType: 'textfield',
                margin: '10 20 0 10',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'projectCost.manuCstAdj', fieldLabel: '加工费', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'projectCost.casualLabor', fieldLabel: '劳务工费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/ },
                        { xtype: 'textfield', name: 'projectCost.salary', fieldLabel: '职工薪酬', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/  },
                        { xtype: 'textfield', name: 'projectCost.maintenance', fieldLabel: '制造费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/ },
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'projectCost.power', fieldLabel: '动力费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, hidden: true },
                        { xtype: 'textfield', name: 'projectCost.outSourcing', fieldLabel: '外协作人工费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, hidden: true },
                    ]
                }, ]
            },
            {
                xtype: 'fieldset',
                title: '专项费',
                defaultType: 'textfield',
                margin: '10 20 0 10',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'projectCost.auxCstAdj', fieldLabel: '专项费', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'projectCost.design', fieldLabel: '设计费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                        { xtype: 'textfield', name: 'projectCost.survey', fieldLabel: '检验费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                        { xtype: 'textfield', name: 'projectCost.salesFee', fieldLabel: '销售费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'projectCost.purchaseAssCharge', fieldLabel: '设备采购附加费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                        { xtype: 'textfield', name: 'projectCost.salesAssCharge', fieldLabel: '销售附加费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                        { xtype: 'textfield', name: 'projectCost.colabouration', fieldLabel: '专项协作费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'projectCost.craftEquipment', fieldLabel: '专项设备工装费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                        { xtype: 'textfield', name: 'projectCost.seaTrial', fieldLabel: '试航费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                        { xtype: 'textfield', name: 'projectCost.warranty', fieldLabel: '保修费', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'projectCost.other', fieldLabel: '其他费用', width: 250, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                }, ]
            },
            {
                xtype: 'fieldset',
                title: '不可预见费',
                defaultType: 'textfield',
                margin: '10 20 10 10',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [
                        { xtype: 'textfield', name: 'projectCost.reserve', fieldLabel: '不可预见费', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
                    ]
                },]
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