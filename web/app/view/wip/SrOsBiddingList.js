Ext.define('iFlat.view.wip.SrOsBiddingList', {
    extend: 'Ext.window.Window',
    alias: 'widget.wip-srosbiddinglist',
    title: '报价详情',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.wip.SrOsBiddingController'
    ],

    controller: 'wip-srosbidding',

    id: 'wip-srosbiddinglist',
    closeAction: 'hide',
    width: 800,

    height: 350,
    y: 20,
    items: [{
        xtype: 'textfield',
        fieldLabel: 'ID',
        name: 'srOutsource.id',
        hidden: true,
    }, {
        xtype: 'grid',
        border: true,
        columnLines: true,
        flex: 1,
        tbar: [{
            text: '新增',
            ui: 'orig-blue',
            handler: 'addRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
        store: wipSrOsBiddingListStore = Ext.create('iFlat.store.wip.SrOsBidding'),
        plugins: [
            wipSrOsBiddingListRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                pluginId: 'wip-wipsrosbiddinglist-edit',
                clicksToMoveEditor: 1,
                autoCancel: true,
                listeners: {
                    edit: 'updateRecord',
                    cancelEdit: 'deleteEmptyRecord',
                }
            })
        ],

        columns: [{
            text: '供应商',
            width: 200,
            align: 'center',
            dataIndex: 'srOsBidding.vendor',
            editor: {
                xtype: 'combo',
                store: Ext.create('iFlat.store.wip.SrOsVendor'),
                queryMode: 'local',
                allowBlank: false,
                editable: true,
                typeAhead: true,
                minChars: 0,
                forceSelection : true,
                anyMatch: true,
                displayField: 'name',
                valueField: 'name',
                width: '30%',
                labelWidth: 70,
                listeners: {
                    select: function (cb, record) {
                        Ext.getCmp('wip-srosbiddinglist-vendortype').setValue(record.get('srOsVendor.type'))
                    }
                }
            }
        }, {
            text: '供方类型',
            width: 120,
            align: 'left',
            dataIndex: 'srOsBidding.vendorType',
            editor: {
                id: 'wip-srosbiddinglist-vendortype',
                editable: false
            }
        }, {
            text: '投标报价',
            width: 120,
            align: 'left',
            dataIndex: 'srOsBidding.amount',
            editor: {
                regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            }
        }, {
            text: '澄清报价',
            width: 120,
            align: 'left',
            dataIndex: 'srOsBidding.amountAdj',
            editor: {
                regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            }
        }, {
            text: '备注',
            flex: 1,
            align: 'left',
            dataIndex: 'srOsBidding.comment',
            editor: {
            }
        }, {
            text: '删除',
            width: 60,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '删除',
            align: 'center',
            iconCls: 'x-fa fa-close',
            handler: 'deleteRecord',
            editor: {
                xtype: 'label',
            }
        }]
    }],
});