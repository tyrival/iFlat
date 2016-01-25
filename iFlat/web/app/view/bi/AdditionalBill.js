Ext.define('iFlat.view.bi.AdditionalBill', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bi-additionalbill',
    xtype: 'bi-additionalbill',

    controller: 'bi-additionalbill',
    store: biAdditionalBillStore = Ext.create('iFlat.store.bi.AdditionalBill'),
    id: 'bi-additionalbill',
    tbar: [{
        text: '新增',
        id: 'bi-additionalbill-add',
        ui: 'orig-blue',
        handler: 'addAdditionalBillRecord',
    }, {
        xtype: 'form',
        id: 'bi-additionalbill-import',
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
        id: 'bi-additionalbill-template',
        handler: 'downloadTemplate'
    }, {
        text: '刷新',
        id: 'bi-additionalbill-refresh',
        handler: 'refreshList',
    }],
    plugins: [
        biAdditionalBillRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'bi-additionalbill-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateAdditionalBillRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    columns: [{
        header: 'id',
        dataIndex: 'additionalBill.id',
        hidden: true,
        editor: {
            disabled: true,
        }
    }, {
        header: '工号',
        dataIndex: 'additionalBill.projNo',
        width: 180,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            store: biAdditionalBillProjectStore = Ext.create('iFlat.store.bi.Project'),
            id: 'bi-additionalbill-combo',
            queryMode: 'local',
            editable: false,
            forceSelection : true,
            valueField : 'projNo',
            displayField : 'shortName',
        }
    }, {
        header: '项目',
        dataIndex: 'additionalBill.item',
        flex: true,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '设备（美元）',
        width: 80,
        dataIndex: 'additionalBill.deviceUsd',
        editor: {
            allowBlank: true,
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '设备',
        width: 80,
        dataIndex: 'additionalBill.device',
        editor: {
            allowBlank: true,
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '材料（美元）',
        width: 80,
        dataIndex: 'additionalBill.materialUsd',
        editor: {
            allowBlank: true,
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '材料',
        width: 80,
        dataIndex: 'additionalBill.material',
        editor: {
            allowBlank: true,
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '人工（美元）',
        width: 80,
        dataIndex: 'additionalBill.labourUsd',
        editor: {
            allowBlank: true,
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '人工',
        width: 80,
        dataIndex: 'additionalBill.labour',
        editor: {
            allowBlank: true,
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '备注',
        width: 120,
        dataIndex: 'additionalBill.comment',
        editor: {
            allowBlank: true,
        }
    }, {
        text: '删除',
        id: 'bi-additionalbill-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteAdditionalBill',
        editor: {
            xtype: 'label',
        }
    }],

});