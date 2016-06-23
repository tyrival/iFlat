Ext.define('iFlat.view.sm.temp.detail.SrSettlementSecondDetailSys', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-detail-srsettlementseconddetailsys',

    requires: [
        'iFlat.view.sm.temp.SrSettlementSecondController'
    ],
    controller: 'sm-srsettlementsecond',

    width: '100%',
    scrollable: true,
    border: true,
    columnLines: true,
    store: Ext.create('iFlat.store.sm.SrSettlementDetlSecond', {
        proxy: {
            type: 'ajax',
            url: 'sm_listSrSettlementDetlSecondBySrSettlement.action',
        },
    }),

    tbar: ['->', {
        xtype: 'label',
        padding: '10',
        text: '已分配： ',
    }, {
        xtype: 'label',
        name: 'distribute',
        padding: '10',
        text: '0',
    }, {
        text: '刷新',
        handler: 'refresh',
    }],
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateDetail',
            }
        })
    ],

    columns: [{
        header: '工种',
        width: 120,
        dataIndex: 'srSettlementDetlSecond.type',
    }, {
        header: '施工内容',
        width: 200,
        dataIndex: 'srSettlementDetlSecond.content',
        cellWrap: true,
        /*editor: {
            xtype: 'textarea',
            editable: false
        }*/
    }, {
        header: '规格',
        dataIndex: 'srSettlementDetlSecond.specs',
    }, {
        header: '单位',
        width: 80,
        dataIndex: 'srSettlementDetlSecond.unit',
    }, {
        header: '数量',
        width: 80,
        dataIndex: 'srSettlementDetlSecond.settleQty1',
    }, {
        header: '单价',
        width: 80,
        dataIndex: 'srSettlementDetlSecond.settlePrice',
    }, {
        header: '金额',
        width: 80,
        dataIndex: 'srSettlementDetlSecond.settleAmount',
    }, {
        header: '数量（二级）',
        width: 120,
        dataIndex: 'srSettlementDetlSecond.qty1',
        editor: {
            name: 'srSettlementDetlSecond.qty1',
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            listeners: {
                change: 'calcAmount'
            }
        }
    }, {
        header: '单价（二级）',
        align: 'right',
        width: 120,
        dataIndex: 'srSettlementDetlSecond.price',
        editor: {
            name: 'srSettlementDetlSecond.price',
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            listeners: {
                change: 'calcAmount'
            }
        }
    }, {
        header: '金额（二级）',
        align: 'right',
        width: 120,
        dataIndex: 'srSettlementDetlSecond.amount',
        editor: {
            name: 'srSettlementDetlSecond.amount',
            allowBlank: false,
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '备注（二级）',
        width: 150,
        dataIndex: 'srSettlementDetlSecond.comment',
        editor: {
        },
        cellWrap: true,
    }],
});
