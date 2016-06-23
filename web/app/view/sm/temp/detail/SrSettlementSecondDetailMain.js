Ext.define('iFlat.view.sm.temp.detail.SrSettlementSecondDetailMain', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-detail-srsettlementseconddetailmain',

    requires: [
        'iFlat.view.sm.temp.SrSettlementSecondController',
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
        header: '工种',
        width: 120,
        dataIndex: 'srSettlementDetlSecond.type',
        editor: {
            xtype: 'combo',
            allowBlank: false,
            forceSelection: true,
            editable: false,
            listeners: {
                render: function (combo, op) {
                    var dept = combo.up('window').down('textfield[name=srSettlementSecond.deptName]').getValue();
                    if (Flat.util.isEmpty(dept)) {
                        dept = combo.up('window').down('combo[name=srSettlementSecond.deptName]').getValue();
                    }
                    var n = '';
                    switch (dept) {
                        case '修船冷作车间':
                            n = "LZ";
                            break;
                        case '修船坞修车间':
                            n = "WX";
                            break;
                        case '修船舾装车间':
                            n = "XZ";
                            break;
                        case '修船机电修理车间':
                            n = "JD";
                            break;
                    }
                    combo.setBind({
                        store: '{smSrWorkType' + n + '}',
                    });
                    setTimeout(function () {
                        combo.setValue(combo.getBind().store.lastValue[0])
                    }, 200);
                }
            }
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
