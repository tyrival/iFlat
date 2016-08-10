Ext.define('iFlat.view.ss.FsCode', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ss-fscode',
    xtype: 'ss-fscode',

    requires: [
        'iFlat.view.ss.FsCodeController',
    ],

    controller: 'ss-fscode',
    store: ssFsCodeStore = Ext.create('iFlat.store.ss.FsCode'),
    id: 'ss-fscode',

    plugins: [
        ssFsCodeRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'ss-fscode-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateFsCodeRecord',
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
            handler: 'addFsCodeRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '项目',
        dataIndex: 'fsCode.type',
        flex: 1,
        editor: {
            xtype: 'combo',
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection : true,
            bind: {
                store: '{ssFsCodeType}'
            }
        }
    }, {
        header: '代码',
        dataIndex: 'fsCode.code',
        flex: 1,
        editor: {
        }
    }, {
        header: '检查内容',
        dataIndex: 'fsCode.description',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '默认扣分',
        dataIndex: 'fsCode.score',
        flex: 1,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '默认罚款',
        dataIndex: 'fsCode.amount',
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
        handler: 'deleteFsCode',
        editor: {
            xtype: 'label',
        }
    }],
});