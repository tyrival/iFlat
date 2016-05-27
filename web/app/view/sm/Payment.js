Ext.define('iFlat.view.sm.Payment', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-payment',
    xtype: 'sm-payment',

    requires: [
        'iFlat.view.sm.PaymentController',
    ],
    
    controller: 'sm-payment',
    store: smPaymentStore = Ext.create('iFlat.store.sm.Payment'),
    id: 'sm-payment',

    plugins: [
        smPaymentRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'sm-payment-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updatePaymentRecord',
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
            id: 'sm-payment-add',
            ui: 'orig-blue',
            handler: 'addPaymentRecord',
        }, '->', {
            text: '刷新',
            id: 'sm-payment-refresh',
            handler: 'refreshList',
        }],
    }],
    
    columns: [{
        header: '月份',
        width: 200,
        dataIndex: 'payment.month',
        formatter: 'date("Y-m")',
        editor: {
            xtype: 'datefield',
            name: 'payment.month',
            allowBlank: false,
            format: 'Y-m',
        }
    }, {
        header: '施工队',
        width: 350,
        dataIndex: 'payment.team',
        editor: {
            xtype: 'combo',
            name: 'payment.team',
            queryMode: 'local',
            allowBlank: false,
            editable: true,
            forceSelection : true,
            typeAhead: true,
            minChars: 0,
            displayField: 'teamName',
            valueField: 'teamName',
            store: smPaymentTeamStore = Ext.create('iFlat.store.code.Team', {
                proxy: {
                    extraParams: {
                        'team.type': '外包工'
                    }
                }
            }),
        }
    }, {
        header: '金额',
        dataIndex: 'payment.amount',
        flex: true,
        editor: {
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '减免',
        dataIndex: 'payment.reduce',
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
        handler: 'deletePayment',
        editor: {
            xtype: 'label',
        }
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: smPaymentStore,
        displayInfo: true,
    }
});