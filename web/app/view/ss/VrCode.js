Ext.define('iFlat.view.ss.VrCode', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ss-vrcode',
    xtype: 'ss-vrcode',

    requires: [
        'iFlat.view.ss.VrCodeController',
    ],

    controller: 'ss-vrcode',
    store: ssVrCodeStore = Ext.create('iFlat.store.ss.VrCode'),
    id: 'ss-vrcode',

    plugins: [
        ssVrCodeRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'ss-vrcode-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateVrCodeRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            ui: 'orig-blue',
            handler: 'addVrCodeRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '风险等级',
        dataIndex: 'vrCode.riskLvl',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '违章代码',
        dataIndex: 'vrCode.code',
        flex: 1,
        editor: {
        }
    }, {
        header: '检查内容',
        dataIndex: 'vrCode.description',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '默认扣分',
        dataIndex: 'vrCode.score',
        flex: 1,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '默认罚款',
        dataIndex: 'vrCode.amount',
        flex: 1,
        editor: {
            allowBlank: false,
            regex: /^\d+$/,
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteVrCode',
        editor: {
            xtype: 'label',
        }
    }],
});