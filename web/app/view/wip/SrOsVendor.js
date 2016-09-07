Ext.define('iFlat.view.wip.SrOsVendor', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.wip-srosvendor',
    xtype: 'wip-srosvendor',

    requires: [
        'iFlat.view.wip.SrOsVendorController',
    ],

    controller: 'wip-srosvendor',
    store: wipSrOsVendorStore = Ext.create('iFlat.store.wip.SrOsVendor'),
    id: 'wip-srosvendor',

    plugins: [
        wipSrOsVendorRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'wip-srosvendor-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateSrOsVendorRecord',
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
            id: 'wip-srosvendor-add',
            ui: 'orig-blue',
            handler: 'addSrOsVendorRecord',
        }, '->', {
            text: '刷新',
            id: 'wip-srosvendor-refresh',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '名称',
        dataIndex: 'srOsVendor.name',
        flex: true,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '类型',
        dataIndex: 'srOsVendor.type',
        width: 120,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            editable: false,
            bind: {
                store: '{wipVendorType}'
            },
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteSrOsVendor',
        editor: {
            xtype: 'label',
        }
    }],
});