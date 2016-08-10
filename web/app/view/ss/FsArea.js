Ext.define('iFlat.view.ss.FsArea', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ss-fsarea',
    xtype: 'ss-fsarea',

    requires: [
        'iFlat.view.ss.FsAreaController',
    ],

    controller: 'ss-fsarea',
    store: ssFsAreaStore = Ext.create('iFlat.store.ss.FsArea'),
    id: 'ss-fsarea',

    plugins: [
        ssFsAreaRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'ss-fsarea-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateFsAreaRecord',
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
            handler: 'addFsAreaRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '代码',
        dataIndex: 'fsArea.code',
        flex: 1,
        editor: {
        }
    }, {
        header: '部门',
        dataIndex: 'fsArea.dept',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '类型',
        dataIndex: 'fsArea.type',
        flex: 1,
        editor: {
            xtype: 'combo',
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection : true,
            bind: {
                store: '{fsAreaType}'
            }
        }
    }, {
        header: '区域',
        dataIndex: 'fsArea.area',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteFsArea',
        editor: {
            xtype: 'label',
        }
    }],
});