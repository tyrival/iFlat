Ext.define('iFlat.view.sm.temp.detail.SrSettlementFirstSys', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-detail-srsettlementfirstsys',

    requires: [
        'iFlat.view.sm.SrCommercialCenterSettlementController'
    ],
    controller: 'sm-srcommercialcentersettlement',

    width: '100%',
    scrollable: true,
    border: true,
    columnLines: true,
    store: Ext.create('iFlat.store.sm.SrSettlementDetlFirst'),

    tbar: ['->', {
        text: '刷新',
        handler: 'refresh',
    }],
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            //pluginId: 'sm-srsettlementfirstsys-detail-edit',
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
        dataIndex: 'srSettlementDetlFirst.type',
    }, {
        header: '施工内容',
        width: 200,
        dataIndex: 'srSettlementDetlFirst.adjustContent',
        cellWrap: true,
    }, {
        header: '数量',
        dataIndex: 'srSettlementDetlFirst.adjustQty1',
    }, {
        header: '结算数量',
        dataIndex: 'srSettlementDetlFirst.settleQty1',
        editor: {
            name: 'srSettlementDetlFirst.settleQty1',
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            listeners: {
                change: 'calcAmount'
            }
        }
    }, {
        header: '单价',
        align: 'right',
        dataIndex: 'srSettlementDetlFirst.price',
        editor: {
            name: 'srSettlementDetlFirst.price',
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            listeners: {
                change: 'calcAmount'
            }
        }
    }, {
        header: '金额',
        align: 'right',
        dataIndex: 'srSettlementDetlFirst.amount',
        editor: {
            name: 'srSettlementDetlFirst.amount',
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '规格',
        dataIndex: 'srSettlementDetlFirst.specs',
    }, {
        header: '单位',
        dataIndex: 'srSettlementDetlFirst.unit',
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'srSettlementDetlFirst.comment',
        cellWrap: true,
    }],
});
