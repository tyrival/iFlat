Ext.define('iFlat.view.bi.ContractEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.bi-contractedit',
    title: '合同编辑',
    layout: 'fit',
    modal: true,

    id: 'bi-contractedit',
    controller: 'bi-contract',
    closeAction: 'hide',
    items: {
        xtype: 'form',
        id: 'bi-contractedit-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [
            { xtype: 'textfield', name: 'contract.id', fieldLabel: 'ID', width: 500, hidden: true },
            {
                xtype: 'combo',
                name: 'contract.projNo',
                store: biContractEditComboStore = Ext.create('iFlat.store.bi.Project'),
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,// 必须选择一个选项
                displayField: 'name',
                valueField: 'projNo',
                width: 500,
                fieldLabel: '工程'
            },
            { xtype: 'textfield', name: 'contract.owner', fieldLabel: '船东', width: 500 },
            { xtype: 'textfield', name: 'contract.surveyor', fieldLabel: '船检', width: 500 },
            {
                xtype: 'datefield',
                name: 'contract.deliveryDate',
                fieldLabel: '交船日',
                format: 'Y-m-d',
                width: 500
            },
            {
                xtype: 'textfield',
                name: 'contract.amount',
                fieldLabel: '合同价',
                width: 500,
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            },
            { xtype: 'textfield', name: 'contract.currency', fieldLabel: '币种', width: 500 },
            { xtype: 'textfield', name: 'contract.contractRate', fieldLabel: '合同汇率', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
            { xtype: 'textfield', name: 'contract.usd', fieldLabel: '结算美元', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
            { xtype: 'textfield', name: 'contract.actualRate', fieldLabel: '实际汇率', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
            { xtype: 'textfield', name: 'contract.cny', fieldLabel: '结算人民币', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
            { xtype: 'textfield', name: 'contract.usdAdd', fieldLabel: '加帐美元', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
            { xtype: 'textfield', name: 'contract.cnyAdd', fieldLabel: '加帐人民币', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
            { xtype: 'textfield', name: 'contract.commissionPct', fieldLabel: '佣金比例', width: 500, regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/, },
            { xtype: 'textfield', name: 'contract.version', fieldLabel: '版本', hidden: true },
            { xtype: 'textfield', name: 'contract.fixed', fieldLabel: '确认日期', hidden: true },
        ]
    },
    buttons: [
        {
            text: '保存',
            handler: 'submitContractEdit',
        }
    ],
});