Ext.define('iFlat.view.sm.Outsourcing', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-outsourcing',
    xtype: 'sm-outsourcing',

    requires: [
        'iFlat.view.sm.OutsourcingController',
    ],
    
    controller: 'sm-outsourcing',
    store: smOutsourcingStore = Ext.create('iFlat.store.sm.Outsourcing', {
        proxy: {
            extraParams: {
                'outsourcing.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        }
    }),
    id: 'sm-outsourcing',

    plugins: [
        smOutsourcingRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'sm-outsourcing-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateOutsourcingRecord',
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
            id: 'sm-outsourcing-add',
            ui: 'orig-blue',
            handler: 'addOutsourcingRecord',
        }, '->', {
            text: '刷新',
            id: 'sm-outsourcing-refresh',
            handler: 'refreshList',
        }],
    }],
    
    columns: [{
        header: '月份',
        width: 200,
        dataIndex: 'outsourcing.month',
        formatter: 'date("Y-m")',
        editor: {
            xtype: 'datefield',
            name: 'outsourcing.month',
            allowBlank: false,
            format: 'Y-m',
        }
    }, {
        header: '类型',
        dataIndex: 'outsourcing.type',
        flex: true,
        editor: {
            xtype: 'combo',
            anyMatch: true,
            name: 'outsourcing.type',
            queryMode: 'local',
            allowBlank: false,
            editable: true,
            forceSelection : true,
            typeAhead: true,
            minChars: 0,
            bind: {
                store: '{smOutsourcingType}'
            },
        }
    }, {
        header: '金额',
        dataIndex: 'outsourcing.amount',
        flex: true,
        editor: {
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteOutsourcing',
        editor: {
            xtype: 'label',
        }
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: smOutsourcingStore,
        displayInfo: true,
    }
});