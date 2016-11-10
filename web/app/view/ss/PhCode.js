Ext.define('iFlat.view.ss.PhCode', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ss-phcode',
    xtype: 'ss-phcode',

    requires: [
        'iFlat.view.ss.PhCodeController',
    ],

    controller: 'ss-phcode',
    store: ssPhCodeStore = Ext.create('iFlat.store.ss.PhCode'),
    id: 'ss-phcode',

    plugins: [
        ssPhCodeRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'ss-phcode-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updatePhCodeRecord',
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
            handler: 'addPhCodeRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '隐患类型',
        dataIndex: 'phCode.type',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '隐患代码',
        dataIndex: 'phCode.code',
        flex: 1,
        editor: {
        }
    }, {
        header: '分类',
        dataIndex: 'phCode.description',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '隐患明细',
        dataIndex: 'phCode.detail',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '默认扣分',
        dataIndex: 'phCode.score',
        flex: 1,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '默认罚款',
        dataIndex: 'phCode.amount',
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
        handler: 'deletePhCode',
        editor: {
            xtype: 'label',
        }
    }],
});