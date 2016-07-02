Ext.define('iFlat.view.system.Release', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.system-release',
    xtype: 'system-release',

    requires: [
        'iFlat.view.system.ReleaseController',
    ],

    controller: 'system-release',
    store: systemReleaseStore = Ext.create('iFlat.store.system.Release'),
    id: 'system-release',

    plugins: [
        systemReleaseRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'system-release-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateReleaseRecord',
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
            id: 'system-release-add',
            ui: 'orig-blue',
            handler: 'addReleaseRecord',
        }, '->', {
            text: '刷新',
            id: 'system-release-refresh',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '标题',
        dataIndex: 'release.title',
        width: 150,
        editor: {
            allowBlank: false
        }
    }, {
        header: '内容',
        dataIndex: 'release.description',
        flex: true,
        editor: {
            allowBlank: false
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteRelease',
        editor: {
            xtype: 'label',
        }
    }],
});