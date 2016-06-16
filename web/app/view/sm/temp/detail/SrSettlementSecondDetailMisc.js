Ext.define('iFlat.view.sm.temp.detail.SrSettlementSecondDetailMisc', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-detail-srsettlementseconddetailmisc',

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
                canceledit: 'deleteEmptyRecord'
            }
        })
    ],

    columns: [{
        header: '类型',
        width: 120,
        dataIndex: 'srSettlementDetlSecond.type',
        editor: {
            allowBlank: false
        }
    }, {
        header: '施工内容',
        width: 200,
        dataIndex: 'srSettlementDetlSecond.content',
        cellWrap: true,
        editor: {
            xtype: 'textarea',
            allowBlank: false
        }
    }, {
        header: '数量',
        dataIndex: 'srSettlementDetlSecond.qty1',
        editor: {
            name: 'srSettlementDetlSecond.qty1',
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            listeners: {
                change: 'calcAmount'
            }
        }
    }, {
        header: '规格',
        dataIndex: 'srSettlementDetlSecond.specs',
        editor: {
        }
    }, {
        header: '单位',
        dataIndex: 'srSettlementDetlSecond.unit',
        editor: {
        }
    }, {
        header: '单价',
        align: 'right',
        dataIndex: 'srSettlementDetlSecond.price',
        editor: {
            name: 'srSettlementDetlSecond.price',
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            listeners: {
                change: 'calcAmount'
            }
        }
    }, {
        header: '金额',
        align: 'right',
        dataIndex: 'srSettlementDetlSecond.amount',
        editor: {
            name: 'srSettlementDetlSecond.amount',
            allowBlank: false,
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'srSettlementDetlSecond.comment',
        editor: {
        },
        cellWrap: true,
    }, {
        text: '删除',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteDetail',
        editor: {
            xtype: 'label'
        }
    }],
});
