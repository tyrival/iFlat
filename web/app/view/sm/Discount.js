Ext.define('iFlat.view.sm.Discount', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-discount',
    xtype: 'sm-discount',

    requires: [
        'iFlat.view.sm.DiscountController',
    ],

    controller: 'sm-discount',
    store: smDiscountStore = Ext.create('iFlat.store.sm.Discount'),
    id: 'sm-discount',

    plugins: [
        smDiscountRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'sm-discount-edit',
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
            id: 'sm-discount-add',
            ui: 'orig-blue',
            handler: 'addDiscountRecord',
        }, '->', {
            text: '刷新',
            id: 'sm-discount-refresh',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '工程队',
        dataIndex: 'discount.team',
        flex: true,
        editor: {
            xtype: 'combo',
            name: 'discount.team',
            queryMode: 'local',
            allowBlank: false,
            editable: true,
            forceSelection : true,
            anyMatch: true,
            displayField: 'teamFullName',
            valueField: 'teamName',
            width: 300,
            store: smDiscountTeamStore = Ext.create('iFlat.store.code.Team'),
        }
    }, {
        header: '比例',
        dataIndex: 'discount.rate',
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