Ext.define('iFlat.view.xr.Discount', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.xr-discount',
    xtype: 'xr-discount',

    requires: [
        'iFlat.view.xr.DiscountController',
    ],

    controller: 'xr-discount',
    store: xrDiscountStore = Ext.create('iFlat.store.xr.Discount'),
    id: 'xr-discount',

    plugins: [
        xrDiscountRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'xr-discount-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateDiscountRecord',
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
            id: 'xr-discount-add',
            ui: 'orig-blue',
            handler: 'addDiscountRecord',
        }, '->', {
            text: '刷新',
            id: 'xr-discount-refresh',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '工程队',
        dataIndex: 'xrDiscount.team',
        flex: true,
        editor: {
            xtype: 'combo',
            name: 'xrDiscount.team',
            queryMode: 'local',
            allowBlank: false,
            editable: true,
            forceSelection : true,
            anyMatch: true,
            displayField: 'teamName',
            valueField: 'teamName',
            width: 300,
            store: xrDiscountTeamStore = Ext.create('iFlat.store.code.Team'),
        }
    }, {
        header: '比例',
        dataIndex: 'xrDiscount.rate',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteDiscount',
        editor: {
            xtype: 'label',
        }
    }],
});