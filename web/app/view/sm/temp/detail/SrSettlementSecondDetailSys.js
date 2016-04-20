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
    store: Ext.create('iFlat.store.sm.SrSettlementDetlSecond'),

    tbar: [{
        text: '新增',
        ui: 'orig-blue',
        handler: 'addDetail',
    }, '->', {
        xtype: 'label',
        padding: '10',
        text: '已分配： ',
        flex: 1
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
        header: '类型',
        width: 120,
        dataIndex: 'srSettlementDetlSecond.type',
    }, {
        header: '施工内容',
        width: 200,
        dataIndex: 'srSettlementDetlSecond.content',
        shrinkWrap: 1,
    }, {
        header: '规格',
        dataIndex: 'srSettlementDetlSecond.spec',
    }, {
        header: '单位',
        dataIndex: 'srSettlementDetlSecond.unit',
    }, {
        header: '数量',
        dataIndex: 'srSettlementDetlSecond.settleQty1',
        editor: {
        }
    }, {
        header: '单价',
        dataIndex: 'srSettlementDetlSecond.settlePrice',
        editor: {
        }
    }, {
        header: '金额',
        dataIndex: 'srSettlementDetlSecond.settleAmount',
        editor: {
        }
    }, {
        header: '数量',
        dataIndex: 'srSettlementDetlSecond.qty1',
        editor: {
        }
    }, {
        header: '单价',
        align: 'right',
        dataIndex: 'srSettlementDetlSecond.price',
        editor: {
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '金额',
        align: 'right',
        dataIndex: 'srSettlementDetlSecond.amount',
        editor: {
            allowBlank: false,
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'srSettlementDetlSecond.comment',
        editor: {
        },
        shrinkWrap: 1,
    }],
});
