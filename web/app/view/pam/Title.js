Ext.define('iFlat.view.pam.Title', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-title',
    xtype: 'pam-title',

    requires: [
        'iFlat.view.pam.TitleController',
    ],

    controller: 'pam-title',
    store: pamTitleStore = Ext.create('iFlat.store.pam.Title'),
    id: 'pam-title',

    plugins: [
        pamTitleRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'pam-title-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateTitleRecord',
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
            handler: 'addTitleRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '职位',
        dataIndex: 'pamTitle.name',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '排序',
        dataIndex: 'pamTitle.sequence',
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
        handler: 'deleteTitle',
        editor: {
            xtype: 'label',
        }
    }],
});